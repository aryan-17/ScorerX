/*
  Warnings:

  - The primary key for the `Verification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Verification` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Verification_email_key";

-- AlterTable
ALTER TABLE "Verification" DROP CONSTRAINT "Verification_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Verification_pkey" PRIMARY KEY ("email");
