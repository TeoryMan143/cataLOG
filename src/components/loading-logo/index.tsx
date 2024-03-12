import { workSans } from '@/core/fonts';
import Logo from '../logo';
import styles from './style.module.css';
import { cn } from '@/core/client-utils';

function LaodingLogo() {
  return (
    <div className='bg-black border border-white p-2 rounded-lg flex flex-col items-center'>
      <Logo className={cn(styles.animation, 'text-9xl text-white')} />
      <p
        className={cn(
          workSans.className,
          styles.animation,
          'text-center text-lg text-white',
        )}
      >
        Cargando
      </p>
    </div>
  );
}
export default LaodingLogo;
