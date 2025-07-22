/*
  Warnings:

  - You are about to drop the `favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_user_id_fkey";

-- DropTable
DROP TABLE "favorites";

-- CreateTable
CREATE TABLE "favorite_posts" (
    "id" SERIAL NOT NULL,
    "resource_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "favorite_posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorite_posts" ADD CONSTRAINT "favorite_posts_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_posts" ADD CONSTRAINT "favorite_posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
