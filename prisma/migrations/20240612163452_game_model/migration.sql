/*
  Warnings:

  - You are about to drop the `_GameToTeam` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gameId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_GameToTeam" DROP CONSTRAINT "_GameToTeam_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameToTeam" DROP CONSTRAINT "_GameToTeam_B_fkey";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "gameId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_GameToTeam";

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
