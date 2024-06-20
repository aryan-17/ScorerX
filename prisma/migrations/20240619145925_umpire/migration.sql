/*
  Warnings:

  - A unique constraint covering the columns `[umpireId]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_id_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "umpireId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Game_umpireId_key" ON "Game"("umpireId");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_umpireId_fkey" FOREIGN KEY ("umpireId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
