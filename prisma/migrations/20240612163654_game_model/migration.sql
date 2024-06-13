-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_gameId_fkey";

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "gameId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
