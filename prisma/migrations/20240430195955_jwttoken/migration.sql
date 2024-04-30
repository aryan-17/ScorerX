/*
  Warnings:

  - You are about to drop the column `token` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "token";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "token" TEXT;
