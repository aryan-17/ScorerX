/*
  Warnings:

  - You are about to drop the column `userId` on the `Verification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Verification" DROP CONSTRAINT "Verification_userId_fkey";

-- DropIndex
DROP INDEX "Verification_userId_key";

-- AlterTable
ALTER TABLE "Verification" DROP COLUMN "userId",
ALTER COLUMN "verified" SET DEFAULT false;
