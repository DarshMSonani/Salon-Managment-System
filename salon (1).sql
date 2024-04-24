-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2024 at 02:45 PM
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
  `category` enum('hairCut','hairColor','hairShave','hairStraight','bearedTrim','bearedShave','weddingCut','cleanUp','massage','receptionist') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `email`, `phoneNumber`, `joinDate`, `category`, `created_at`, `updated_at`) VALUES
(5, 'Headphone', 'gauravbavadiya99@gmail.com', '07041857968', '2024-06-02 18:30:00', 'bearedShave', '2024-04-06 11:42:47', '2024-04-06 11:42:47'),
(6, 'Headphone', 'user@gmail.com', '07041857968', '2024-06-04 18:30:00', 'hairShave', '2024-04-06 11:43:22', '2024-04-06 11:43:22'),
(8, 'Headphone', 'sahilsakhavaaaala0077@gmail.com', '07041857968', '2024-06-03 18:30:00', 'hairShave', '2024-04-06 11:56:49', '2024-04-06 11:56:49'),
(10, 'Headphone', 'bansijpatel9@gmail.com', '07041857968', '2024-06-03 18:30:00', 'hairStraight', '2024-04-06 11:57:59', '2024-04-06 11:57:59'),
(11, 'Headphone', 'www@www.vom', '07041857968', '2024-06-03 18:30:00', 'hairShave', '2024-04-06 11:59:17', '2024-04-06 11:59:17'),
(13, 'Headphone', 'uswer@gmail.com', '07041857968', '2024-06-03 18:30:00', 'hairColor', '2024-04-06 12:09:24', '2024-04-06 12:09:24'),
(14, 'Headphone', 'sonanidarshm04@gmail.com', '07041857968', '2024-06-03 18:30:00', 'bearedShave', '2024-04-06 12:21:00', '2024-04-06 12:21:00');

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
  `whenCreate` varchar(255) NOT NULL,
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
  `category` enum('hairCut','hairColor','hairShave','hairStraight','bearedTrim','bearedShave','weddingCut','cleanUp','massage','receptionist') NOT NULL,
  `whenCreate` varchar(255) NOT NULL,
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
  `role` enum('admin','user') NOT NULL,
  `whenCreate` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`whenCreate`)),
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `existusers`
--

INSERT INTO `existusers` (`id`, `userId`, `name`, `email`, `role`, `whenCreate`, `created_at`, `updated_at`) VALUES
(1, 5, 'Ram', 'ram@ram.com', 'user', '\"2024-04-08T14:02:43.000Z\"', '2024-04-08 12:40:22', '2024-04-08 12:40:22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@admin.com', '$2b$10$Q.KL4vssgr0MUkqRnIjSIe0P8v8TiZgTLKc5zhxeg./BivZ5klOPS', 'admin', '2024-04-06 04:27:44', '2024-04-06 04:27:44'),
(2, 'Darsh Sonani', 'sonanidarshm04@gmail.com', '$2b$10$4MuLKESZI.fcX9FguoWe2uOA/BSPRI5jBoS9VaQJ3kkNH6UYIz5p6', 'user', '2024-04-06 04:29:06', '2024-04-08 08:50:04');

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
(10, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEyNTc4ODUzfQ.20WBwd1-ggOp0kH4qhuh9jEJCi5tCoIqK9jExjxMrmQ', 'admin', '2024-04-08 12:20:53', '2024-04-08 12:20:53');

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `existusers`
--
ALTER TABLE `existusers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `existappoitments`
--
ALTER TABLE `existappoitments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `existemployees`
--
ALTER TABLE `existemployees`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `existusers`
--
ALTER TABLE `existusers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usersessions`
--
ALTER TABLE `usersessions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
