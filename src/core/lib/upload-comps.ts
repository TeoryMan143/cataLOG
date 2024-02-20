import { UploadRouter } from '@/app/api/uploadthing/core';
import {
  generateUploadButton,
  generateUploadDropzone,
} from '@uploadthing/react';

export const UploadthingDropzone = generateUploadDropzone<UploadRouter>();
export const UploadthingButton = generateUploadButton<UploadRouter>();
