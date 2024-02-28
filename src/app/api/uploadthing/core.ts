import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { auth } from '@root/auth';

const f = createUploadthing();

export const uploadRouter = {
  businessImage: f({ image: { maxFileSize: '8MB' } })
    .middleware(async () => {
      const session = await auth();

      if (!session?.user) throw new UploadThingError('Unauthorized');
      return { uploadedBy: session.user };
    })
    .onUploadComplete(async ({ metadata: { uploadedBy }, file }) => {
      console.log(`Uploaded business image ${file.url} by ${uploadedBy.name}`);
    }),
  businessBanner: f({ image: { maxFileSize: '8MB' } })
    .middleware(async () => {
      const session = await auth();

      if (!session?.user) throw new UploadThingError('Unauthorized');
      return { uploadedBy: session.user };
    })
    .onUploadComplete(async ({ metadata: { uploadedBy }, file }) => {
      console.log(`Uploaded banner ${file.url} by ${uploadedBy.name}`);
    }),
  addProduct: f({ image: { maxFileSize: '8MB', maxFileCount: 4 } })
    .middleware(async () => {
      const session = await auth();

      if (!session?.user) throw new UploadThingError('Unauthorized');
      return { uploadedBy: session.user };
    })
    .onUploadComplete(async ({ metadata: { uploadedBy }, file }) => {
      console.log(`Uploaded product images ${file.url} by ${uploadedBy.name}`);
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
