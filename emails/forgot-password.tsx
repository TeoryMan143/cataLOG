import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

function ForgotPassword({ url }: { url: string }) {
  return (
    <Html>
      <Preview>Recupera tu contraseña de catalog</Preview>
      <Tailwind>
        <Body className='bg-white my-auto font-sans px-2'>
          <Head>
            <Container className='bg-black w-full py-4 rounded-md'>
              <Heading className='text-white text-4xl text-center'>
                CataLOG
              </Heading>
            </Container>
          </Head>
          <Section className='text-xl text-center mt-6'>
            <Text className='text-xl text-center'>
              <strong>Recuperar contraseña</strong>
            </Text>
            <Text className='text-xl text-center'>
              Si no estás intentando recuperar tu contraseña, ignora este
              correo.
            </Text>
            <Button
              className='mt-6 mx-auto p-2 text-white bg-black rounded-md'
              href={url}
            >
              Click aqui para recuperar
            </Button>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}
export default ForgotPassword;
