function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='bg-[url("/bg-register.webp")] absolute w-[100dvw] h-[100dvh] bg-[center_right_-28rem] bg-cover'></div>
      <div className='bg-black/30 w-[100dvw] h-[100dvh] absolute'></div>
      <div className='bg-black/35 w-[23dvw] h-[100dvh] absolute'></div>
      <div className='bg-black/60 w-[35dvw] h-[100dvh] absolute right-0'></div>
      <main className='h-[100dvh] grid place-content-center relative z-10'>
        {children}
      </main>
    </>
  );
}
export default RegisterLayout;
