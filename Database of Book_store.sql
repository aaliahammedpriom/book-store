-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2024 at 02:56 AM
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
-- Database: `book store`
--
CREATE DATABASE IF NOT EXISTS `book store` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `book store`;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(8) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `email`, `password`) VALUES
(1, 'admin@gmail.com', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `book_store`
--

CREATE TABLE `book_store` (
  `isbn` int(15) NOT NULL,
  `name` varchar(30) NOT NULL,
  `edition` varchar(5) NOT NULL,
  `author` text NOT NULL,
  `publisher` text NOT NULL,
  `type` text NOT NULL,
  `quantity` int(50) NOT NULL,
  `price` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book_store`
--

INSERT INTO `book_store` (`isbn`, `name`, `edition`, `author`, `publisher`, `type`, `quantity`, `price`) VALUES
(1052, 'Harry Potter', '7th', 'J.K. Rowling', 'Hogwards', 'Fiction', 50, 2000),
(12356789, 'The Alchemist', '8th', 'Paulo Coelho', 'Harper Collins', 'Fiction', 0, 1200),
(14258963, 'The Kite Runner', '7th', 'Khaled Hosseini', 'Bloomsbury', 'Novel', 60, 1500),
(124567894, 'Are you Afraid of the Dark?', '10th', 'Sidney Sheldon', 'Grand Central Publishing', 'Thriller', 0, 120);

-- --------------------------------------------------------

--
-- Table structure for table `rent_book`
--

CREATE TABLE `rent_book` (
  `id` int(11) NOT NULL,
  `bName` text NOT NULL,
  `editon` text NOT NULL,
  `author` text NOT NULL,
  `publisher` text NOT NULL,
  `price` int(15) NOT NULL,
  `uName` text NOT NULL,
  `starting_date` date NOT NULL,
  `return_date` date NOT NULL,
  `cNumber` varchar(15) NOT NULL,
  `address` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rent_book`
--

INSERT INTO `rent_book` (`id`, `bName`, `editon`, `author`, `publisher`, `price`, `uName`, `starting_date`, `return_date`, `cNumber`, `address`) VALUES
(12, 'Harry Potter', '7th', 'J.K. Rowling', 'Hogwards', 2000, 'Abdul', '2024-04-27', '2024-05-27', '01717487665', 'Dhamrai,Dhaka'),
(13, 'Harry Potter', '7th', 'J.K. Rowling', 'Hogwards', 2000, 'Abdul', '2024-04-27', '2024-05-27', '01717487665', 'Dhamrai,Dhaka'),
(14, 'The Kite Runner', '7th', 'Khaled Hosseini', 'Bloomsbury', 1500, 'Abdul', '2024-04-27', '2024-05-27', '01717487665', 'Cumilla,BD'),
(15, 'Harry Potter', '7th', 'J.K. Rowling', 'Hogwards', 2000, 'Abdul', '2024-04-27', '2024-05-27', '01717487665', 'Khulna,BD');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(8) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(40) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `address` varchar(100) NOT NULL,
  `password` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `email`, `contact`, `address`, `password`) VALUES
(64, 'Asif Abdullah', 'asifabdullah@gmail.com', '01778983315', 'Dhamrai,BD', 'asdfqwer'),
(67, 'FT', 'ft@gmail.com', '01521775655', 'Dhaka,BD', '123456'),
(68, 'Rishan Islam', 'rishan@gmail.com', '01778983315', 'Rajshahi,BD', '123456');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `book_store`
--
ALTER TABLE `book_store`
  ADD PRIMARY KEY (`isbn`);

--
-- Indexes for table `rent_book`
--
ALTER TABLE `rent_book`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `rent_book`
--
ALTER TABLE `rent_book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
