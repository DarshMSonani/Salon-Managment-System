-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 04, 2024 at 02:38 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `salon`
--

-- --------------------------------------------------------

--
-- Table structure for table `appoitments`
--

CREATE TABLE `appoitments` (
  `id` bigint(20) NOT NULL,
  `userId` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `people` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `time` time NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `appoitmentType` enum('hairCut','hairColor','hairShave','hairStraight','bearedTrim','bearedShave','weddingCut','cleanUp','massage') NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `totalPrice` decimal(10,0) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appoitments`
--

INSERT INTO `appoitments` (`id`, `userId`, `userName`, `people`, `date`, `time`, `phoneNumber`, `appoitmentType`, `price`, `totalPrice`, `created_at`, `updated_at`) VALUES
(2, 5, 'Jenil', 6, '2024-08-28 00:00:00', '15:37:00', '1234567890', 'hairCut', 70, 420, '2024-08-27 10:06:17', '2024-08-27 10:06:17');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `joinDate` datetime NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` enum('hairCut','hairColor','hairShave','hairStraight','bearedTrim','bearedShave','weddingCut','cleanUp','massage','receptionist') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `email`, `phoneNumber`, `joinDate`, `image`, `category`, `created_at`, `updated_at`) VALUES
(3, 'ff frddd', 'dd@dd.com', '02032201555', '0000-00-00 00:00:00', 'Image1719383246700.png', 'massage', '2024-06-26 06:28:07', '2024-06-26 06:28:07'),
(4, 'jenil', 'jenilsojitra4@gmail.com', '1234567890', '0000-00-00 00:00:00', 'Image1724753270677.jpg', 'cleanUp', '2024-08-27 10:07:13', '2024-08-27 10:07:50');

-- --------------------------------------------------------

--
-- Table structure for table `existappoitments`
--

CREATE TABLE `existappoitments` (
  `id` bigint(20) NOT NULL,
  `appoitmentId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `people` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `time` time NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `appoitmentType` enum('hairCut','hairColor','hairShave','hairStraight','bearedTrim','bearedShave','weddingCut','cleanUp','massage') NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `totalPrice` decimal(10,0) NOT NULL,
  `deletedBy` enum('user','admin') NOT NULL,
  `whenCreate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`whenCreate`)),
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `existemployees`
--

CREATE TABLE `existemployees` (
  `id` bigint(20) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `joinDate` datetime NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` enum('hairCut','hairColor','hairShave','hairStraight','bearedTrim','bearedShave','weddingCut','cleanUp','massage','receptionist') NOT NULL,
  `whenCreate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`whenCreate`)),
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `existreviews`
--

CREATE TABLE `existreviews` (
  `id` bigint(20) NOT NULL,
  `reviewId` bigint(20) NOT NULL,
  `userId` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `star` enum('1','2','3','4','5') NOT NULL,
  `review` longtext NOT NULL,
  `deletedBy` enum('user','admin') NOT NULL,
  `whenCreate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`whenCreate`)),
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `existusers`
--

CREATE TABLE `existusers` (
  `id` bigint(20) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdBy` enum('self','admin') NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `whenCreate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`whenCreate`)),
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) NOT NULL,
  `userId` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `star` enum('1','2','3','4','5') NOT NULL,
  `review` longtext NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdBy` enum('self','admin') NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `createdBy`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@admin.com', '$2b$10$R9EiARuQzwEWDXrtngnA.ezbacDMPEXX3cqPPlgJutFrXiBGyIUFW', 'self', 'admin', '2024-06-26 06:14:22', '2024-06-26 06:14:22'),
(2, 'Darsh', 'darsh@darsh.com', '$2b$10$Thu8P01aBARpUphpdnCtmOZbH.a8GEJKvzQ81xUSQvEU4W5t7.WDi', 'self', 'user', '2024-06-26 06:15:28', '2024-06-26 06:15:28'),
(4, 'ff fr', 'jiseja9220@kinsef.com', '$2b$10$YRxHLusMT2s8Co.JbH9a4e38c4urrmrb4Zm7T4G6nTUJ9Bj3BHcEW', 'admin', 'user', '2024-06-26 06:22:33', '2024-06-26 06:22:33'),
(5, 'Jenil', 'jenilsojitra4@gmail.com', '$2b$10$9lOnrmKRRivGL6MWgbb0HOODLogIWg6Dv5ke92H5mrF9aHI/2hnRW', 'self', 'user', '2024-08-27 10:03:43', '2024-08-27 10:03:43');

-- --------------------------------------------------------

--
-- Table structure for table `usersessions`
--

CREATE TABLE `usersessions` (
  `id` bigint(20) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `token` varchar(255) NOT NULL,
  `role` enum('admin','user','employee') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usersessions`
--

INSERT INTO `usersessions` (`id`, `userId`, `token`, `role`, `created_at`, `updated_at`) VALUES
(13, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE5MzgyNzg5fQ.kfi2OeNGA91yF4aZd7EDfokDVmW3IB2YEZt2lw5_bxc', 'user', '2024-06-26 06:19:49', '2024-06-26 06:19:49'),
(15, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI0NzUzMTU0fQ.imyyuzgWvV6cChgvrdIhUNdk-1jNdpIBdde4Jdhn77Q', 'admin', '2024-08-27 10:05:54', '2024-08-27 10:05:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appoitments`
--
ALTER TABLE `appoitments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `existappoitments`
--
ALTER TABLE `existappoitments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `existemployees`
--
ALTER TABLE `existemployees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `existreviews`
--
ALTER TABLE `existreviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `existusers`
--
ALTER TABLE `existusers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `usersessions`
--
ALTER TABLE `usersessions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appoitments`
--
ALTER TABLE `appoitments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `existappoitments`
--
ALTER TABLE `existappoitments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `existemployees`
--
ALTER TABLE `existemployees`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `existreviews`
--
ALTER TABLE `existreviews`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `existusers`
--
ALTER TABLE `existusers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usersessions`
--
ALTER TABLE `usersessions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
