import { FaGithub } from 'react-icons/fa';
import style from './Header.module.css';
import { Icon } from '@/app/_components/parts';

export const Header = (): JSX.Element => {
  return (
    <header className={style.header}>
      <div className={style.header__wrapper}>
        <nav className={style.nav}>
          <a href="/" className={style.logo}>
            Video Chat
          </a>
          <div className={style.nav__wrapper}>
            <Icon
              color={'white'}
              url={
                'https://github.com/Taiki0807/video-chat'
              }
              name={'github'}
            >
              <FaGithub size={32} />
            </Icon>
          </div>
        </nav>
      </div>
    </header>
  );
};
