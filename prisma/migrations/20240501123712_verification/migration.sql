/*
  Warnings:

  - The primary key for the `Verification` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Verification" DROP CONSTRAINT "Verification_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Verification_pkey" PRIMARY KEY ("id");
