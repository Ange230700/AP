DROP TABLE IF EXISTS `Product`;

CREATE TABLE `Product` (
  `id` INT UNIQUE PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `price` VARCHAR(10) NOT NULL,
  `stock_quantity` INT NOT NULL
);
