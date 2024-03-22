import { cn } from '@/core/client-utils';
import * as React from 'react';
import { FieldError } from 'react-hook-form';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div>
        <textarea
          className={cn(
            'flex min-h-[80px] w-full border border-black bg-gray-300 px-3 py-2 text-sm ring-offset-1 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 placeholder:italic placeholder:text-slate-800 placeholder:tracking-widest placeholder:text-sm',
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className='bg-red-200 text-red-600 mt-1 text-center p-0.5 w-full'>
            {error.message}
          </p>
        )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export default Textarea;
