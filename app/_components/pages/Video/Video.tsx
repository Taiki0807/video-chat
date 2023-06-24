'use client';
import { BiMicrophoneOff } from 'react-icons/bi';
import {
  BsCameraVideoOff,
  BsFillCameraVideoFill,
} from 'react-icons/bs';
import { FaMicrophone } from 'react-icons/fa';
import { Button, Modal } from '../../parts';
import style from './Video.module.css';
import useVideo from './useVideo';

interface Props {
  id: string;
}

export const Video = (props: Props): JSX.Element => {
  const {
    localVideoRef,
    remoteVideoRef,
    videoEnabled,
    audioEnabled,
    handleAudioToggle,
    handleClick_modal,
    handleClose_modal,
    handleLeave,
    handleVideoToggle,
    modal,
  } = useVideo({ roomID: props.id });

  return (
    <div className={style.container}>
      <div className={style.videoContainer}>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className={style.video}
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className={style.video}
        />
      </div>
      <div className={style.vide__footer}>
        <div className={style.icon__item}>
          {videoEnabled ? (
            <BsFillCameraVideoFill
              color={'white'}
              size={30}
              onClick={handleVideoToggle}
            />
          ) : (
            <BsCameraVideoOff
              color={'red'}
              size={30}
              onClick={handleVideoToggle}
            />
          )}
          {audioEnabled ? (
            <FaMicrophone
              color="white"
              size={30}
              onClick={handleAudioToggle}
            />
          ) : (
            <BiMicrophoneOff
              color={'red'}
              size={30}
              onClick={handleAudioToggle}
            />
          )}
        </div>
        <div className={style.right}>
          <Modal open={modal} onClose={handleClose_modal}>
            <div className={style.modal__item}>
              <p>切断しますか？</p>
              <Button color="danger" onClick={handleLeave}>
                切断
              </Button>
            </div>
          </Modal>
          <Button
            color="danger"
            onClick={handleClick_modal}
          >
            Leave
          </Button>
        </div>
      </div>
    </div>
  );
};
