/*
  Warnings:

  - You are about to drop the `_categorytofoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `foto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_categorytofoto` DROP FOREIGN KEY `_CategoryToFoto_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categorytofoto` DROP FOREIGN KEY `_CategoryToFoto_B_fkey`;

-- DropTable
DROP TABLE `_categorytofoto`;

-- DropTable
DROP TABLE `foto`;

-- CreateTable
CREATE TABLE `Photo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `visible` BOOLEAN NOT NULL DEFAULT true,
    `img_path` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryToPhoto` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryToPhoto_AB_unique`(`A`, `B`),
    INDEX `_CategoryToPhoto_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CategoryToPhoto` ADD CONSTRAINT `_CategoryToPhoto_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToPhoto` ADD CONSTRAINT `_CategoryToPhoto_B_fkey` FOREIGN KEY (`B`) REFERENCES `Photo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
