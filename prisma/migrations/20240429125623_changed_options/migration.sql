/*
  Warnings:

  - Made the column `Gender` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `DOB` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "Gender" SET NOT NULL,
ALTER COLUMN "DOB" SET NOT NULL;
