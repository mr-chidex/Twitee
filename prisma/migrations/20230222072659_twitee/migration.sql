/*
  Warnings:

  - You are about to drop the column `commentId` on the `Twit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[twitId]` on the table `Twit` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Twit" DROP CONSTRAINT "Twit_commentId_fkey";

-- DropIndex
DROP INDEX "Twit_commentId_key";

-- AlterTable
ALTER TABLE "Twit" DROP COLUMN "commentId",
ADD COLUMN     "twitId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Twit_twitId_key" ON "Twit"("twitId");

-- AddForeignKey
ALTER TABLE "Twit" ADD CONSTRAINT "Twit_twitId_fkey" FOREIGN KEY ("twitId") REFERENCES "Twit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
