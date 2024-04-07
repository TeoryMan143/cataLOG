import { cn } from '@/core/client-utils';
import { UploadthingDropzone } from '@/core/lib/upload-comps';

type Props = React.ComponentPropsWithoutRef<typeof UploadthingDropzone>;

function UploadDropzone({ appearance: ap, ...props }: Props) {
  // URL.createObjectURL
  return (
    <UploadthingDropzone
      appearance={{
        container: cn(``, ap?.container),
        allowedContent: cn(``, ap?.allowedContent),
        button: cn(``, ap?.button),
        label: cn(``, ap?.label),
        uploadIcon: cn(``, ap?.uploadIcon),
      }}
      {...props}
    />
  );
}
export default UploadDropzone;
