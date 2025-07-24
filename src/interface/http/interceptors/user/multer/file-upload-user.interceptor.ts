import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfigUser } from '@infra/multer/user/multer.config.user';

export function CustomFileUserInterceptor(fieldName: string) {
  return FileInterceptor(fieldName, multerConfigUser);
}
