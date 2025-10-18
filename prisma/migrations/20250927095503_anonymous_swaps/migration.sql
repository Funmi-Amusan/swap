/*
  Warnings:

  - You are about to drop the column `userId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Swap` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Appointment" DROP CONSTRAINT "Appointment_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Swap" DROP CONSTRAINT "Swap_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Appointment" DROP COLUMN "userId",
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "contactPhone" TEXT;

-- AlterTable
ALTER TABLE "public"."Swap" DROP COLUMN "userId";
