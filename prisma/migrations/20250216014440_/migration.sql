-- DropForeignKey
ALTER TABLE `favoriteanime` DROP FOREIGN KEY `favoriteAnime_idUser_fkey`;

-- DropIndex
DROP INDEX `favoriteAnime_idUser_fkey` ON `favoriteanime`;

-- AlterTable
ALTER TABLE `favoriteanime` MODIFY `idUser` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `githubId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `favoriteAnime` ADD CONSTRAINT `favoriteAnime_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `users`(`githubId`) ON DELETE CASCADE ON UPDATE CASCADE;
