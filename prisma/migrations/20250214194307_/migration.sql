/*
  Warnings:

  - Added the required column `githubId` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `githubId` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL;
