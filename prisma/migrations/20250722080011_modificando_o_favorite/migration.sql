-- CreateTable
CREATE TABLE "favorites" (
    "id" SERIAL NOT NULL,
    "resource_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
