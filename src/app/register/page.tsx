import EmailButton from './_email-button';
import { cn } from '@/core/client-utils';
import { workSans } from '@/core/fonts';
import SocialButtons from './_social-buttons';

function RegisterPage() {
  return (
    <div className='flex flex-col items-center'>
      <h2
        className={cn(
          workSans.className,
          `
          font-bold text-5xl text-white mb-10 text-center
          lg:text-black lg:text-6xl lg:mb-16
        `,
        )}
      >
        ¡Regístrate a cataLOG!
      </h2>
      <div
        className='
          flex flex-col gap-3 items-stretch
          lg:gap-4
        '
      >
        <EmailButton
          href='/register/email'
          className='
            font-semibold flex justify-center items-center gap-3 px-10
            hover:bg-amber-100
            lg:border-2 lg:border-black lg:py-2
          '
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1em'
            height='1em'
            viewBox='0 0 20 20'
          >
            <path
              fill='currentColor'
              fillRule='evenodd'
              d='m7.172 11.334l2.83 1.935l2.728-1.882l6.115 6.033c-.161.052-.333.08-.512.08H1.667c-.22 0-.43-.043-.623-.12zM20 6.376v9.457c0 .247-.054.481-.15.692l-5.994-5.914zM0 6.429l6.042 4.132l-5.936 5.858A1.663 1.663 0 0 1 0 15.833zM18.333 2.5c.92 0 1.667.746 1.667 1.667v.586L9.998 11.648L0 4.81v-.643C0 3.247.746 2.5 1.667 2.5z'
            />
          </svg>
          Continuar con email
        </EmailButton>
        <SocialButtons />
      </div>
    </div>
  );
}
export default RegisterPage;
