-- CreateTable
CREATE TABLE `likeanime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `mal_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `likeanime` ADD CONSTRAINT `likeanime_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`githubId`) ON DELETE CASCADE ON UPDATE CASCADE;
