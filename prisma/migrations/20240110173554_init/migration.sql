/*
  Warnings:

  - You are about to drop the column `Stock` on the `item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `item` DROP COLUMN `Stock`,
    ADD COLUMN `stock` INTEGER NOT NULL DEFAULT 0;
