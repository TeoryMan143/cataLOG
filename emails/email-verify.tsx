import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

function EmailVerify({ url }: { url: string }) {
  return (
    <Html>
      <Preview>Verifica tu cuenta de catalog</Preview>
      <Tailwind>
        <Body className='bg-white my-auto font-sans px-2'>
          <Head />
          <Container className='bg-black w-full py-4 rounded-md'>
            <Text className='text-white text-4xl text-center'>CataLOG</Text>
          </Container>
          <Section className='text-xl text-center mt-6'>
            <Text className='text-xl text-center'>
              <strong>Verificar correo</strong>
            </Text>
            <Text className='text-xl text-center'>
              Si no te has registrado en cataLOG ignora este correo.
            </Text>
            <Button
              className='mt-6 mx-auto p-2 text-white bg-black rounded-md'
              href={url}
            >
              Click aqui para verificar
            </Button>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}
export default EmailVerify;
