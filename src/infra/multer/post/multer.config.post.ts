import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer";

export const multerConfigPost = {
    storage: diskStorage({
        destination: "./public/uploads/post",
        filename: (req, file, callback) => {
            const filename = file.originalname.split('.')[0].trim()
            const extension = file.originalname.split('.')[1].trim()

            const sufix = Date.now() + '-' + Math.floor(Math.random() * 1e9);
            const nameFile = `${filename}-${sufix}.${extension}`;
            callback(null, nameFile);
        }
    }),
    fileFilter: (req: any, file: Express.Multer.File, callback: Function) => {
        const mimes = ['png', 'jpg', 'jpeg'];
        const fileMime = file.mimetype.split('/')[1];

        if (!mimes.includes(fileMime)) {
            return callback(new BadRequestException("Tipo de arquivo não permitido: " + file.mimetype.split('/')), false)
        }
        callback(null, true);
    }
}