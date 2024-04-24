import { cn } from '@/core/client-utils';
import SocialButton from './social-button';
import { workSans } from '@/core/fonts';
import { getBusinessSocials } from '@/core/lib/db/business';
import GetIcon from './get-icon';

const getLink = (key: string, name: string) => {
  const netKeys: { [x: string]: string | undefined } = {
    instagram: `https://www.instagram.com/${name}`,
    facebook: `https://www.facebook.com/${name}`,
    whatsapp: undefined,
    webPage: name,
  };
  return netKeys[key];
};

async function SocialLinks({ id }: { id: string }) {
  const dbLinks = await getBusinessSocials(id);

  if (!dbLinks) {
    return <p>
      Sin redes sociales
    </p>;
  }

  const { businessId, id: foo, ...links } = dbLinks;

  return (
    <ul
      className={cn('flex gap-3 items-center font-medium', workSans.className)}
    >
      {Object.entries(links).map(([net, name]) => {
        if (name) {
          return (
            <SocialButton href={getLink(net, name) ?? undefined} key={net}>
              <GetIcon net={net} /> {name}
            </SocialButton>
          );
        }
      })}

    </ul>
  );
}
export default SocialLinks;
