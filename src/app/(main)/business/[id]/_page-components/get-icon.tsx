import FacebookIcon from '@/components/icons/facebook';
import InstagramIcon from '@/components/icons/instagram';
import WebIcon from '@/components/icons/web';
import WhatsappIcon from '@/components/icons/whatsapp';
import Whatsapp from '@/components/icons/whatsapp';

function GetIcon({ net }: { net: string }) {
  if (net === 'instagram') {
    return <InstagramIcon />;
  }

  if (net === 'facebook') {
    return <FacebookIcon />;
  }

  if (net === 'whatsapp') {
    return <WhatsappIcon />;
  }

  if (net === 'webPage') {
    return <WebIcon />;
  }

  return (
    <svg
      className='text-red-400'
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
    >
      <path
        fill='currentColor'
        d='M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12S5.925 1 12 1m-1 13h2V6.5h-2zm2.004 1.5H11v2.004h2.004z'
      />
    </svg>
  );
}
export default GetIcon;
