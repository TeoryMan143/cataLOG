import { MercadoPagoConfig } from 'mercadopago';

export const mercadoConfig = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
  options: {
    idempotencyKey: process.env.MERCADO_PAGO_IDEMPOTENCY_KEY,
  },
});
