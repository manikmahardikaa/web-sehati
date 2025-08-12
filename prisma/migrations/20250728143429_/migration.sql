-- CreateTable
CREATE TABLE `wa_blast_psikologi` (
    `id` VARCHAR(191) NOT NULL,
    `phone_numbers` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `report_url` VARCHAR(191) NOT NULL,
    `psikologi_id` VARCHAR(191) NOT NULL,
    `scheduled_at` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENTING',
    `count_contact` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sent_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wa_blast_psikologi` ADD CONSTRAINT `wa_blast_psikologi_psikologi_id_fkey` FOREIGN KEY (`psikologi_id`) REFERENCES `psikologi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
