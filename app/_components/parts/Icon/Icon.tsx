import Link from 'next/link';
import style from './Icon.module.css';

interface Props {
  color?: 'black' | 'white';
  children: React.ReactNode;
  name: string;
  url: string;
}

export const Icon = (props: Props): JSX.Element => {
  const color = props.color ?? 'white';
  return (
    <div>
      <Link
        href={props.url}
        className={`${style.icon} ${
          style[`icon-${color}`]
        }`}
      >
        {props.children}
        <span className={style.sr_only}>{props.name}</span>
      </Link>
    </div>
  );
};
