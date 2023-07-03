import { useRouter } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';

interface Props {
  roomID: string;
}

const useWebSocket = ({ roomID }: Props) => {
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const isConnectedRef = useRef<boolean>(true);

  const peerConnectionRef =
    useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    async function restart() {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

      const remoteStream = new MediaStream();

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
      const peerConnectionConfig = {
        iceServers: [
          {
            urls: [
              'stun:stun1.1.google.com:19302',
              'stun:stun2.1.google.com:19302',
            ],
          },
        ],
      };
      peerConnectionRef.current = new RTCPeerConnection(
        peerConnectionConfig
      );

      stream.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, stream);
      });

      peerConnectionRef.current.onicecandidate = (
        event
      ) => {
        if (event.candidate) {
          socketRef.current?.send(
            JSON.stringify({
              type: 'candidate',
              candidate: event.candidate,
            })
          );
        }
      };
      peerConnectionRef.current.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          const remoteStream = remoteVideoRef.current
            ?.srcObject as MediaStream;
          remoteStream.addTrack(track);
        });
      };
      if (peerConnectionRef.current) {
        const offer =
          await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(
          offer
        );
      }
      if (peerConnectionRef.current) {
        socketRef.current?.send(
          JSON.stringify({
            type: 'offer',
            sdp: peerConnectionRef.current.localDescription,
          })
        );
      }
      if (remoteVideoRef.current) {
        remoteVideoRef.current.style.display = 'block';
      }
      peerConnectionRef.current.oniceconnectionstatechange =
        () => {
          if (
            peerConnectionRef.current &&
            peerConnectionRef.current.iceConnectionState ===
              'disconnected'
          ) {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.pause();
              remoteVideoRef.current.style.display = 'none';
            }
            peerConnectionRef.current.ontrack = (event) => {
              event.streams[0]
                .getTracks()
                .forEach((track) => {
                  const remoteStream = remoteVideoRef
                    .current?.srcObject as MediaStream;
                  remoteStream.addTrack(track);
                });
            };

            isConnectedRef.current = true;
            socketRef.current?.send(
              JSON.stringify({
                type: 'disconnect',
              })
            );

            if (peerConnectionRef.current) {
              peerConnectionRef.current.close();
              peerConnectionRef.current = null;
            }
          }
        };
    }

    const init = async () => {
      try {
        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const remoteStream = new MediaStream();

        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
        const peerConnectionConfig = {
          iceServers: [
            {
              urls: [
                'stun:stun1.1.google.com:19302',
                'stun:stun2.1.google.com:19302',
              ],
            },
          ],
        };
        peerConnectionRef.current = new RTCPeerConnection(
          peerConnectionConfig
        );

        stream.getTracks().forEach((track) => {
          peerConnectionRef.current?.addTrack(
            track,
            stream
          );
        });

        peerConnectionRef.current.onicecandidate = (
          event
        ) => {
          if (event.candidate) {
            socketRef.current?.send(
              JSON.stringify({
                type: 'candidate',
                candidate: event.candidate,
              })
            );
          }
        };
        peerConnectionRef.current.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            const remoteStream = remoteVideoRef.current
              ?.srcObject as MediaStream;
            remoteStream.addTrack(track);
          });
        };

        const offer =
          await peerConnectionRef.current?.createOffer();
        if (offer) {
          await peerConnectionRef.current?.setLocalDescription(
            offer
          );
          socketRef.current?.send(
            JSON.stringify({
              type: 'offer',
              sdp: offer,
            })
          );
        }

        peerConnectionRef.current.oniceconnectionstatechange =
          () => {
            if (
              peerConnectionRef.current &&
              peerConnectionRef.current
                .iceConnectionState === 'disconnected'
            ) {
              if (remoteVideoRef.current) {
                remoteVideoRef.current.pause();
                remoteVideoRef.current.style.display =
                  'none';
              }
              const remoteStream = remoteVideoRef.current
                ?.srcObject as MediaStream;
              remoteStream
                .getVideoTracks()
                .forEach((track) => {
                  track.enabled = false;
                  track.stop();
                  remoteStream.removeTrack(track);
                });

              isConnectedRef.current = true;

              if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
                peerConnectionRef.current = null;
              }
            }
          };
      } catch (error) {
        console.error(error);
      }
    };
    init();
    socketRef.current = new WebSocket(
      process.env.NEXT_PUBLIC_API_WEBSOCKET_URL +
        `/ws/signaling/${roomID}/`
    );

    socketRef.current.onopen = () => {
      console.log('WebSocket connected.');
      socketRef.current?.send(
        JSON.stringify({
          type: 'websocketConnected',
        })
      );
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket disconnected.');
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };

    socketRef.current.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      console.log(message);

      if (message.type === 'offer') {
        if (
          remoteVideoRef.current &&
          remoteVideoRef.current &&
          isConnectedRef.current
        ) {
          isConnectedRef.current = false;
          restart();
        }
        try {
          if (
            peerConnectionRef.current &&
            peerConnectionRef.current.signalingState !==
              'stable'
          ) {
            await peerConnectionRef.current.setRemoteDescription(
              message.sdp
            );

            const answer =
              await peerConnectionRef.current.createAnswer();
            await peerConnectionRef.current.setLocalDescription(
              answer
            );

            console.log('answer', answer);

            peerConnectionRef.current.onicecandidate =
              async (event) => {
                if (
                  event.candidate &&
                  peerConnectionRef.current
                ) {
                  socketRef.current?.send(
                    JSON.stringify({
                      type: 'answer',
                      sdp: peerConnectionRef.current
                        .localDescription,
                    })
                  );
                }
              };
          }
        } catch (error) {
          console.error(error);
        }
      } else if (message.type === 'answer') {
        try {
          if (
            peerConnectionRef.current &&
            peerConnectionRef.current.signalingState !==
              'stable'
          ) {
            await peerConnectionRef.current.setRemoteDescription(
              message.sdp
            );
          }
        } catch (error) {
          console.error(error);
        }
      } else if (message.type === 'candidate') {
        try {
          const candidate = new RTCIceCandidate(
            message.candidate
          );
          await peerConnectionRef.current?.addIceCandidate(
            candidate
          );
        } catch (error) {
          console.error(error);
        }
      } else if (message.type === 'disconnect') {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.pause();
          remoteVideoRef.current.srcObject = null;
          remoteVideoRef.current.style.display = 'none';
        }

        const remoteStream = remoteVideoRef.current
          ?.srcObject as MediaStream;
        remoteStream.getVideoTracks().forEach((track) => {
          track.enabled = false;
          track.stop();
          remoteStream.removeTrack(track);
        });
      } else if (message.type === 'camera-false') {
        if (remoteVideoRef.current) {
          const remoteTracks = (
            remoteVideoRef.current.srcObject as MediaStream
          )?.getVideoTracks();
          remoteTracks?.forEach((track) => {
            track.enabled = false;
          });
        }
      } else if (message.type === 'camera-true') {
        if (remoteVideoRef.current) {
          const remoteTracks = (
            remoteVideoRef.current.srcObject as MediaStream
          )?.getVideoTracks();
          remoteTracks?.forEach((track) => {
            track.enabled = true;
          });
        }
      } else if (message.type === 'audio-true') {
        if (remoteVideoRef.current) {
          const remoteTracks = (
            remoteVideoRef.current.srcObject as MediaStream
          )?.getAudioTracks();
          remoteTracks?.forEach((track) => {
            track.enabled = true;
          });
        }
      } else if (message.type === 'audio-false') {
        if (remoteVideoRef.current) {
          const remoteTracks = (
            remoteVideoRef.current.srcObject as MediaStream
          )?.getAudioTracks();
          remoteTracks?.forEach((track) => {
            track.enabled = false;
          });
        }
      }
    };

    return () => {
      socketRef.current?.close();
    };
  }, [roomID]);
  const handleVideoToggle = () => {
    setVideoEnabled(!videoEnabled);
    const tracks = (
      localVideoRef.current?.srcObject as MediaStream
    )?.getVideoTracks();
    tracks?.forEach((track) => {
      track.enabled = !videoEnabled;
    });
    socketRef.current?.send(
      JSON.stringify({
        type: videoEnabled ? 'camera-false' : 'camera-true',
      })
    );
  };

  const handleAudioToggle = () => {
    const tracks = (
      localVideoRef.current?.srcObject as MediaStream
    )?.getAudioTracks();
    tracks?.forEach((track) => {
      track.enabled = !audioEnabled;
    });
    setAudioEnabled(!audioEnabled);
    socketRef.current?.send(
      JSON.stringify({
        type: audioEnabled ? 'audio-false' : 'audio-true',
      })
    );
  };

  const handleLeave = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    router.push('/');
  };
  const handleClick_modal = () => {
    setModal(true);
  };
  const handleClose_modal = () => {
    setModal(false);
  };
  return {
    localVideoRef,
    remoteVideoRef,
    handleVideoToggle,
    handleAudioToggle,
    handleClick_modal,
    handleClose_modal,
    handleLeave,
    peerConnectionRef,
    modal,
    videoEnabled,
    audioEnabled,
  };
};

export default useWebSocket;
