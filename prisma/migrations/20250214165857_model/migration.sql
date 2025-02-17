-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favoriteAnime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `mal_id` INTEGER NOT NULL,

    UNIQUE INDEX `favoriteAnime_mal_id_key`(`mal_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `favoriteAnime` ADD CONSTRAINT `favoriteAnime_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
