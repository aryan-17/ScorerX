/*
  Warnings:

  - The values [UMPIRE] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[gameId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[FirstName,LastName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Made the column `playedMatches` on table `Team` required. This step will fail if there are existing NULL values in that column.
  - Made the column `winRate` on table `Team` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('BATSMAN', 'BOWLER', 'ALL_ROUNDER');
ALTER TABLE "Profile" ALTER COLUMN "Role" DROP DEFAULT;
ALTER TABLE "Profile" ALTER COLUMN "Role" TYPE "Role_new" USING ("Role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "Profile" ALTER COLUMN "Role" SET DEFAULT 'ALL_ROUNDER';
COMMIT;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "gameId" INTEGER;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL,
ALTER COLUMN "playedMatches" SET NOT NULL,
ALTER COLUMN "playedMatches" SET DEFAULT 0,
ALTER COLUMN "winRate" SET NOT NULL,
ALTER COLUMN "winRate" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_gameId_key" ON "Profile"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_FirstName_LastName_key" ON "User"("FirstName", "LastName");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
