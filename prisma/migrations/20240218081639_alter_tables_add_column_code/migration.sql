/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `objects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `objects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_objectId_fkey";

-- AlterTable
ALTER TABLE "objects" ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "permissions" ALTER COLUMN "objectId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "roles" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "objects_code_key" ON "objects"("code");

-- CreateIndex
CREATE UNIQUE INDEX "roles_code_key" ON "roles"("code");

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "objects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
