/*
  Warnings:

  - You are about to alter the column `mal_id` on the `commentanime` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `commentanime` ADD COLUMN `date_time` DATETIME(3) NULL,
    MODIFY `mal_id` INTEGER NOT NULL;
