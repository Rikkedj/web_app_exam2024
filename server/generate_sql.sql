CREATE TABLE `Captions`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `caption` TEXT NOT NULL,
    `is_correct` TINYINT(1) NOT NULL
);
CREATE TABLE `Games`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` BIGINT NOT NULL
);
CREATE TABLE `Memes`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `image` TEXT NOT NULL
);
CREATE TABLE `Rounds`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `round_number` BIGINT NOT NULL,
    `caption` BIGINT NOT NULL,
    `meme` BIGINT NOT NULL,
    `game_id` BIGINT NOT NULL
);
CREATE TABLE `Users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` TEXT NOT NULL,
    `e-mail` TEXT NOT NULL,
    `hash` BIGINT NOT NULL,
    `salt` BIGINT NOT NULL
);
ALTER TABLE
    `Captions` ADD CONSTRAINT `captions_id_foreign` FOREIGN KEY(`id`) REFERENCES `Memes`(`id`);
ALTER TABLE
    `Games` ADD CONSTRAINT `games_id_foreign` FOREIGN KEY(`id`) REFERENCES `Users`(`id`);
ALTER TABLE
    `Memes` ADD CONSTRAINT `memes_id_foreign` FOREIGN KEY(`id`) REFERENCES `Captions`(`id`);
ALTER TABLE
    `Rounds` ADD CONSTRAINT `rounds_game_id_foreign` FOREIGN KEY(`game_id`) REFERENCES `Games`(`id`);
ALTER TABLE
    `Rounds` ADD CONSTRAINT `rounds_meme_foreign` FOREIGN KEY(`meme`) REFERENCES `Memes`(`id`);
ALTER TABLE
    `Rounds` ADD CONSTRAINT `rounds_caption_foreign` FOREIGN KEY(`caption`) REFERENCES `Captions`(`id`);