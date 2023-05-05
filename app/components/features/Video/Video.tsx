'use client';
import { useRef, useEffect, useState } from 'react';
import style from './Video.module.css';

export const Video = (): JSX.Element => {
  const [offerSDP, setOfferSDP] = useState<string>('');
  const [answerSDP, setAnswerSDP] = useState<string>('');

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef =
    useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const roomName = 'VNodi2FTuYzU2EyW9pxFKR';
    const socket = new WebSocket(
      `ws://localhost:8000/ws/signaling/${roomName}/`
    );

    socket.onopen = () => {
      console.log('WebSocket connected.');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected.');
    };

    return () => {
      socket.close();
    };
  }, []);
  useEffect(() => {
    const init = async () => {
      try {
        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const remoteStream = new MediaStream();

        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }

        peerConnectionRef.current = new RTCPeerConnection();

        stream.getTracks().forEach((track) => {
          peerConnectionRef.current?.addTrack(
            track,
            stream
          );
        });

        peerConnectionRef.current.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            const remoteStream = remoteVideoRef.current
              ?.srcObject as MediaStream;
            remoteStream.addTrack(track);
          });
        };
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const handleCreateOffer = async () => {
    try {
      const offer =
        await peerConnectionRef.current?.createOffer();
      if (offer) {
        await peerConnectionRef.current?.setLocalDescription(
          offer
        );
      }

      const currentPeerConnection =
        peerConnectionRef.current;
      if (currentPeerConnection) {
        currentPeerConnection.onicecandidate = async (
          event
        ) => {
          if (event.candidate) {
            setOfferSDP(
              JSON.stringify(
                currentPeerConnection.localDescription
              )
            );
          }
        };
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleOfferSDPChange = (event: any) => {
    setOfferSDP(event.target.value);
  };

  const handleCreateAnswer = async () => {
    try {
      const offer = JSON.parse(offerSDP);

      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(
          offer
        );

        const answer =
          await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(
          answer
        );

        peerConnectionRef.current.onicecandidate = async (
          event
        ) => {
          if (
            event.candidate &&
            peerConnectionRef.current
          ) {
            setAnswerSDP(
              JSON.stringify(
                peerConnectionRef.current.localDescription
              )
            );
          }
        };
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswerSDPChange = (event: any) => {
    setAnswerSDP(event.target.value);
  };
  const handleAddAnswer = async () => {
    try {
      const answer = JSON.parse(answerSDP);

      if (
        peerConnectionRef.current &&
        !peerConnectionRef.current.currentRemoteDescription
      ) {
        await peerConnectionRef.current.setRemoteDescription(
          answer
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay />
      <div className={style.input}>
        <button onClick={handleCreateOffer}>
          Create Offer
        </button>
        <input
          type="text"
          value={offerSDP}
          onChange={handleOfferSDPChange}
        />
        <button onClick={handleCreateAnswer}>
          Create Answer
        </button>
        <input
          type="text"
          value={answerSDP}
          onChange={handleAnswerSDPChange}
        />
        <button onClick={handleAddAnswer}>
          Add Answer
        </button>
      </div>
    </div>
  );
};
