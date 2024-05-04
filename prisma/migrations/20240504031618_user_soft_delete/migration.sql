-- AlterEnum
ALTER TYPE "LogAction" ADD VALUE 'USER_DELETE';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3);
