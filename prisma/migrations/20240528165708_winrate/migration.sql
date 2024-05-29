/*
  Warnings:

  - You are about to drop the column `winRate` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "matchWon" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "winRate";
