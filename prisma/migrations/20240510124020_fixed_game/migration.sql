/*
  Warnings:

  - You are about to drop the column `approved` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "approved",
ADD COLUMN     "finished" BOOLEAN NOT NULL DEFAULT false;
