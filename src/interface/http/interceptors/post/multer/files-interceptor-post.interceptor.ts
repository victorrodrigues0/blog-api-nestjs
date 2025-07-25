import { multerConfigPost } from "@infra/multer/post/multer.config.post"
import { FilesInterceptor } from "@nestjs/platform-express"

export const CustomFilesPostInterceptor = (fieldName: string, maxCount = 10) => {
    return FilesInterceptor(fieldName, maxCount, multerConfigPost);
}