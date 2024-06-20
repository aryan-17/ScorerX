/*
  Warnings:

  - You are about to drop the column `finished` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "finished",
ADD COLUMN     "started" BOOLEAN NOT NULL DEFAULT false;
