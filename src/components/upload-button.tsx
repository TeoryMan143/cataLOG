import { cn } from '@/core/client-utils';
import { UploadthingButton } from '@/core/lib/upload-comps';

type Props = React.ComponentPropsWithoutRef<typeof UploadthingButton>;

function UploadButton({ appearance: ap, ...props }: Props) {
  return (
    <UploadthingButton
      appearance={{
        container: cn(``, ap?.container),
        allowedContent: cn(
          `text-amber-100 lg:text-gray-500`,
          ap?.allowedContent,
        ),
        button: cn(
          `
            bg-gray-600 transition
            hover:bg-amber-500
            focus-within:ring-amber-500
            lg:bg-gray-500
            active:scale-95
            ut-uploading:animate-pulse
            after:bg-amber-600
          `,
          ap?.button,
        ),
      }}
      {...props}
    />
  );
}
export default UploadButton;
