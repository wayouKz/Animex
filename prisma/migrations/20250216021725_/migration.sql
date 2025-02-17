/*
  Warnings:

  - A unique constraint covering the columns `[idUser]` on the table `favoriteAnime` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `favoriteAnime_idUser_key` ON `favoriteAnime`(`idUser`);
