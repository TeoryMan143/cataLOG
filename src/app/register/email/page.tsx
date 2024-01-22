import Logo from '@/components/logo';
import RegisterEmailForm from './_register-email-form';

function EmailPage() {
  return (
    <div className='flex flex-col gap-6 items-center'>
      <h2 className='font-bold text-[1.7rem] text-white text-center'>
        Completa los siguientes datos para obtener tu cuenta cataLOG
      </h2>
      <div className='bg-black rounded-full p-14 relative border-2 border-white'>
        <Logo className='text-8xl text-slate-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-2' />
      </div>
      <RegisterEmailForm />
    </div>
  );
}
export default EmailPage;
