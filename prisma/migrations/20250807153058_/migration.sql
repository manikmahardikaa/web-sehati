/*
  Warnings:

  - Added the required column `type_report` to the `report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `report` ADD COLUMN `type_report` VARCHAR(191) NOT NULL;
