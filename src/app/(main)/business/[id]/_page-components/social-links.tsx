import { cn } from '@/core/client-utils';
import SocialButton from './social-button';
import { workSans } from '@/core/fonts';
import { getBusinessSocials } from '@/core/lib/db/business';
import GetIcon from './get-icon';

async function SocialLinks({ id }: { id: string }) {
  const dbLinks = await getBusinessSocials(id);

  if (!dbLinks) {
    return <p>Añadir</p>;
  }

  const { businessId, id: foo, ...links } = dbLinks;

  return (
    <ul
      className={cn('flex gap-3 items-center  font-medium', workSans.className)}
    >
      {Object.entries(links).map(([net, name]) => {
        if (name) {
          return (
            <SocialButton href={name} key={net}>
              <GetIcon net={net} /> {name}
            </SocialButton>
          );
        }
      })}
    </ul>
  );
}
export default SocialLinks;
