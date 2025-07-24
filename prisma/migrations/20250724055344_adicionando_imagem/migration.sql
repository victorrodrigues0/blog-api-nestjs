-- AlterTable
ALTER TABLE "users" ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'public/';

-- CreateTable
CREATE TABLE "post_images" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "post_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post_images" ADD CONSTRAINT "post_images_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
