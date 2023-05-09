'use client';
import { FaRegCopy } from 'react-icons/fa';
import { Button, Modal } from '../../parts';
import style from './TopPage.module.css';
import useRoom from './useRoom';

export const TopPage = (): JSX.Element => {
  const {
    modal,
    handleClick,
    handleClose_modal,
    resultText,
    copyToClipboard,
    handleConnectClick,
  } = useRoom();
  return (
    <div className={style.toppage}>
      <Modal open={modal} onClose={handleClose_modal}>
        <div className={style.modal__item}>
          <div className={style.linktext}>
            <div className={style.link___item}>
              <p>{resultText}</p>
              <FaRegCopy
                size={20}
                onClick={copyToClipboard}
              />
            </div>
          </div>
          <Button
            color="primary"
            onClick={handleConnectClick}
          >
            接続
          </Button>
        </div>
      </Modal>
      <Button color="primary" onClick={handleClick}>
        ルーム作成
      </Button>
    </div>
  );
};
