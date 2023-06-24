import { Video } from '@/app/_components/pages';

interface Props {
  params: { id: string };
}
const page = (props: Props): JSX.Element => {
  return (
    <div>
      <Video id={props.params.id} />
    </div>
  );
};

export default page;
