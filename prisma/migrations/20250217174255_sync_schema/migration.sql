/*
  Warnings:

  - Added the required column `mal_id` to the `commentAnime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `commentanime` ADD COLUMN `mal_id` VARCHAR(191) NOT NULL;
