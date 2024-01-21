import Link from 'next/link';
import Button from '../../components/button';
import EmailButton from './email-button';

const buttons = [
  {
    text: 'Continuar con Google',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='0.98em'
        height='1em'
        viewBox='0 0 256 262'
      >
        <path
          fill='#4285F4'
          d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'
        />
        <path
          fill='#34A853'
          d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'
        />
        <path
          fill='#FBBC05'
          d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z'
        />
        <path
          fill='#EB4335'
          d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'
        />
      </svg>
    ),
  },
  {
    text: 'Continuar con Facebook',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='1em'
        height='1em'
        viewBox='0 0 256 256'
      >
        <path
          fill='#1877F2'
          d='M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445'
        />
        <path
          fill='#FFF'
          d='m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165z'
        />
      </svg>
    ),
  },
];

function RegisterPage() {
  return (
    <div className='flex flex-col items-center'>
      <h2 className='font-bold text-5xl text-white mb-10 text-center'>
        ¡Resgístrate a cataLOG!
      </h2>
      <div className='flex flex-col gap-3'>
        <EmailButton
          href='/register/email'
          className='font-semibold flex justify-center items-center gap-3 w-[22rem]'
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
        {buttons.map(({ text, icon: Icon }) => (
          <Button
            className='font-semibold flex justify-center items-center gap-3 w-[22rem]'
            key={crypto.randomUUID()}
          >
            {Icon}
            {text}
          </Button>
        ))}
        <Link href='#' className='text-center text-white underline text-sm'>
          Ya tengo una cuenta
        </Link>
      </div>
    </div>
  );
}
export default RegisterPage;
