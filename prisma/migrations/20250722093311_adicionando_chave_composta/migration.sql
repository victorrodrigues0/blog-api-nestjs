/*
  Warnings:

  - The primary key for the `favorite_posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `favorite_posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "favorite_posts" DROP CONSTRAINT "favorite_posts_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "favorite_posts_pkey" PRIMARY KEY ("resource_id", "user_id");
