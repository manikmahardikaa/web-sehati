/*
  Warnings:

  - Added the required column `description` to the `film` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `film` ADD COLUMN `description` LONGTEXT NOT NULL;
