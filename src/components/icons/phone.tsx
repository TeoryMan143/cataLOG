function PhoneIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='currentColor'
        d='M10.5 20h3q.2 0 .35-.15t.15-.35q0-.2-.15-.35T13.5 19h-3q-.2 0-.35.15t-.15.35q0 .2.15.35t.35.15M7 23q-.825 0-1.412-.587T5 21V3q0-.825.588-1.412T7 1h10q.825 0 1.413.588T19 3v18q0 .825-.587 1.413T17 23zm0-5v3h10v-3zm0-2h10V6H7zM7 4h10V3H7zm0 14v3zM7 4V3z'
      />
    </svg>
  );
}

export default PhoneIcon;
