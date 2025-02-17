/*
  Warnings:

  - A unique constraint covering the columns `[githubId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `favoriteanime` DROP FOREIGN KEY `favoriteAnime_idUser_fkey`;

-- DropIndex
DROP INDEX `favoriteAnime_idUser_fkey` ON `favoriteanime`;

-- CreateIndex
CREATE UNIQUE INDEX `users_githubId_key` ON `users`(`githubId`);

-- AddForeignKey
ALTER TABLE `favoriteAnime` ADD CONSTRAINT `favoriteAnime_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `users`(`githubId`) ON DELETE CASCADE ON UPDATE CASCADE;
