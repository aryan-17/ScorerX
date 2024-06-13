/*
  Warnings:

  - A unique constraint covering the columns `[gameCode]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gameCode` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "gameCode" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_gameCode_key" ON "Game"("gameCode");
