/*
  Warnings:

  - You are about to drop the column `date` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "date",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false;
