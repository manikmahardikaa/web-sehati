/*
  Warnings:

  - Made the column `image_url` on table `psikologi` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `psikologi` MODIFY `image_url` VARCHAR(191) NOT NULL;
