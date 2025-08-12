/*
  Warnings:

  - You are about to drop the column `count_contact` on the `wa_blast_psikologi` table. All the data in the column will be lost.
  - You are about to drop the column `scheduled_at` on the `wa_blast_psikologi` table. All the data in the column will be lost.
  - You are about to drop the column `sent_at` on the `wa_blast_psikologi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `wa_blast_psikologi` DROP COLUMN `count_contact`,
    DROP COLUMN `scheduled_at`,
    DROP COLUMN `sent_at`;
