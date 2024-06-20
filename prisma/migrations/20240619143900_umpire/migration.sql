/*
  Warnings:

  - You are about to drop the column `umpireId` on the `Profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_umpireId_fkey";

-- DropIndex
DROP INDEX "Profile_umpireId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "umpireId";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_id_fkey" FOREIGN KEY ("id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
