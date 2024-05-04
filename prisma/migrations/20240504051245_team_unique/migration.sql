/*
  Warnings:

  - A unique constraint covering the columns `[name,ownerId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_teamId_fkey";

-- DropIndex
DROP INDEX "Team_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_ownerId_key" ON "Team"("name", "ownerId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
