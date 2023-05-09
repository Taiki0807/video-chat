import style from './Modal.module.css';

interface Props {
  open: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

export const Modal = (props: Props): JSX.Element | null => {
  if (props.open) {
    return (
      <div>
        <div className={style.overlay}>
          <div className={style.content}>
            <button
              className={style.close__btn}
              onClick={props.onClose}
            >
              <div className={style.close__line}></div>
              <div className={style.close__line}></div>
            </button>
            {props.children}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
