-- CreateTable
CREATE TABLE `wa_blast_ads` (
    `id` VARCHAR(191) NOT NULL,
    `phone_numbers` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `patient_id` VARCHAR(191) NOT NULL,
    `petugas_lapangan_id` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `scheduled_at` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENTING',
    `count_contact` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sent_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wa_blast_ads` ADD CONSTRAINT `wa_blast_ads_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wa_blast_ads` ADD CONSTRAINT `wa_blast_ads_petugas_lapangan_id_fkey` FOREIGN KEY (`petugas_lapangan_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
