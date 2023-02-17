-- DropForeignKey
ALTER TABLE "Twit" DROP CONSTRAINT "Twit_userId_fkey";

-- AlterTable
ALTER TABLE "Twit" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Twit" ADD CONSTRAINT "Twit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
