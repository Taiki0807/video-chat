import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { postFetcher } from '@/utils/httpClient';

const useRoom = () => {
  const [modal, setModal] = useState(false);
  const [resultText, setResultText] = useState('');
  const router = useRouter();

  const handleClick_modal = () => {
    setModal(true);
  };

  const handleClose_modal = () => {
    setModal(false);
  };

  const copyToClipboard = async () => {
    await global.navigator.clipboard.writeText(resultText);
  };

  const handleClick = async () => {
    try {
      const data = await postFetcher('/api/v1/room', {});
      setResultText(
        `http://localhost:3000/room/${data.roomId}`
      );
      handleClick_modal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleConnectClick = () => {
    router.push(resultText);
  };

  return {
    modal,
    resultText,
    handleClick_modal,
    handleClose_modal,
    copyToClipboard,
    handleClick,
    handleConnectClick,
  };
};

export default useRoom;
