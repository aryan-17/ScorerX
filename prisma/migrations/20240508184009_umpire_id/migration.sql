/*
  Warnings:

  - You are about to drop the column `gameId` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[umpireId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_gameId_fkey";

-- DropIndex
DROP INDEX "Profile_gameId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "gameId",
ADD COLUMN     "umpireId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_umpireId_key" ON "Profile"("umpireId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_umpireId_fkey" FOREIGN KEY ("umpireId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
