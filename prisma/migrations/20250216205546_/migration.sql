/*
  Warnings:

  - Added the required column `image` to the `favoriteAnime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `favoriteAnime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `likeanime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `likeanime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `favoriteanime` ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `likeanime` ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
