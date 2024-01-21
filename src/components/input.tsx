import { cn } from '@/core/utils';

interface Props extends React.ComponentPropsWithRef<'input'> {
  icon?: React.ReactElement<React.ComponentProps<'svg'>>;
}

function Input({ className, icon: Icon, ...props }: Props) {
  return (
    <div className='relative'>
      <span className='absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-white z-10'>
        {Icon}
      </span>
      <input
        className={cn(
          `
          w-72 bg-gray-300/55 py-2 text-center backdrop-blur-sm text-black
          placeholder:italic placeholder:text-slate-800 placeholder:tracking-widest placeholder:text-sm
          focus:backdrop-blur-none focus:bg-gray-500
          `,
          className
        )}
        {...props}
      />
    </div>
  );
}
export default Input;
