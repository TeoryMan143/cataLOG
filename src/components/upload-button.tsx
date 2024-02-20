import { cn } from '@/core/client-utils';
import { UploadthingButton } from '@/core/lib/upload-comps';

type Props = React.ComponentPropsWithoutRef<typeof UploadthingButton>;

function UploadButton({ appearance: ap, ...props }: Props) {
  return (
    <UploadthingButton
      appearance={{
        container: cn(``, ap?.container),
        allowedContent: cn(``, ap?.allowedContent),
        button: cn(``, ap?.allowedContent),
      }}
      {...props}
    />
  );
}
export default UploadButton;
