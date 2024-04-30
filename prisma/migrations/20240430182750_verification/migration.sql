/*
  Warnings:

  - You are about to drop the column `verified` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "Runs" SET DEFAULT 0,
ALTER COLUMN "Wicket" SET DEFAULT 0,
ALTER COLUMN "Matches" SET DEFAULT 0,
ALTER COLUMN "teamId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "verified";
