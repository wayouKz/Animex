-- DropForeignKey
ALTER TABLE `favoriteanime` DROP FOREIGN KEY `favoriteAnime_idUser_fkey`;

-- DropIndex
DROP INDEX `favoriteAnime_idUser_key` ON `favoriteanime`;

-- AddForeignKey
ALTER TABLE `favoriteAnime` ADD CONSTRAINT `favoriteAnime_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `users`(`githubId`) ON DELETE CASCADE ON UPDATE CASCADE;
