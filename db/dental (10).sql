-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2026 at 12:05 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dental`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `branch_id`, `department_id`, `user_id`, `name`, `phone`, `date`, `time`, `is_active`, `created_at`, `updated_at`) VALUES
(4, 34, 18, 3, 'Dharmik Lakani-MARN', '8866112233', '2026-04-03', '11:00 AM -- 12:00 PM', 1, '2026-03-31 11:08:22', '2026-03-31 11:08:22'),
(5, 35, 19, 2, 'mj', '8866112233', '2026-03-26', '11:00 AM -- 12:00 PM', 1, '2026-03-31 11:35:47', '2026-03-31 11:35:47'),
(6, 34, 18, 3, 'adddd', '8866112233', '2026-03-26', '11:00 AM -- 12:00 PM', 1, '2026-03-31 12:04:20', '2026-03-31 12:04:20'),
(7, 35, 18, 3, 'mihir jadav', '1111111111', '2026-05-01', '11:00 AM -- 12:00 PM', 1, '2026-04-01 13:02:15', '2026-04-01 13:02:15'),
(8, 34, 18, 3, 'Dharmik Lakani-MARN', '8866112233', '2026-04-23', '10:00 AM -- 11:00 AM', 1, '2026-04-02 12:06:53', '2026-04-02 12:06:53'),
(9, 34, 18, 3, 'Dharmik Lakani-MARN', '8866112233', '2026-04-10', '10:00 AM -- 11:00 AM', 1, '2026-04-02 13:48:31', '2026-04-02 13:48:31');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `blog_img` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `blog_img`, `name`, `description`, `date`, `is_active`, `created_at`, `updated_at`) VALUES
(3, 'public\\blog_img\\1775025251572-606602332-Screenshot 2025-03-20 165423.png', 'mihir', 'abc', '0000-00-00', 1, '2026-04-01 12:04:11', '2026-04-01 12:04:11');

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_no` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `description` text NOT NULL,
  `branch_img` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`id`, `name`, `email`, `mobile_no`, `address`, `description`, `branch_img`, `is_active`, `created_at`, `updated_at`, `city`, `state`) VALUES
(34, 'Sarthana', 'sarthanadental@gmail.com', '1234567890', 'near sarthana zooo 501 kyros bussinesss center', ' Recognized as a leading multi-specialty clinic with over 15 years of experience, specializing in dental implants, full mouth rehabilitation, and cosmetic dentistry.', 'public\\branch_img\\1774933704205-301203984-place4.jpg', 1, '2026-03-31 10:38:24', '2026-03-31 10:38:24', 'Surat', 'Gujarat'),
(35, 'Adajan', 'Adajandental@gmail.com', '1234567890', 'Near adajan gas circle 502 kyros center', 'A well-known clinic, being the first in Surat to incorporate All-on-4 and Malo Protocol in their practice.', 'public\\branch_img\\1774933799317-587103827-sarthana.jpg', 1, '2026-03-31 10:39:59', '2026-03-31 10:39:59', 'Surat', 'Gujarat'),
(36, 'Vapi', 'Vapidental@gmail.com', '1234567890', 'Ring road near rathi palace vapi', ' Highly rated, 24-hour service, advanced multi-speciality dental clinic and implant center.', 'public\\branch_img\\1774933904204-853052974-place3.jpg', 1, '2026-03-31 10:41:44', '2026-03-31 10:41:44', 'Vapi', 'Gujarat');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `mobile` varchar(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `department_img` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `branch_id`, `name`, `description`, `mobile`, `email`, `address`, `department_img`, `is_active`, `created_at`, `updated_at`) VALUES
(18, 34, 'Oral & Maxillofacial Surgery', 'Wisdom tooth removal, jaw reconstruction.', '8866173826', 'sarthanadental@gmail.com', 'near sarthana zoo 510 kyros bussiness center', 'public\\department_img\\1774934088145-736128442-dept1.jpg', 1, '2026-03-31 10:44:48', '2026-03-31 10:44:48'),
(19, 35, 'Orthodontics', 'Braces and aligners.', '8866173826', 'Adajandental@gmail.com', 'near adaja gas circle 501 kyros bussines center', 'public\\department_img\\1774934220583-80941134-dept2.jpg', 1, '2026-03-31 10:47:00', '2026-03-31 10:47:00'),
(20, 36, 'Oral Surgery', ' Wisdom tooth extraction and jaw surgery', '8866173826', 'Vapidental@gmail.com', 'Ring road near rathi palace vapi', 'public\\department_img\\1774934353516-384839033-dept3.jpg', 1, '2026-03-31 10:49:13', '2026-03-31 10:49:13');

-- --------------------------------------------------------

--
-- Table structure for table `expence`
--

CREATE TABLE `expence` (
  `id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `paymenttype_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `amount` int(255) NOT NULL,
  `date` date NOT NULL,
  `expence_img` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expence`
--

INSERT INTO `expence` (`id`, `branch_id`, `payment_id`, `paymenttype_id`, `type`, `amount`, `date`, `expence_img`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 0, 101, 123456789, 'cash', 1000, '2023-03-31', '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 0, 0, 0, '1', 3213, '2026-03-26', '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 0, 0, 0, 'sa', 21121, '2026-03-29', '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `question`, `answer`, `is_active`, `created_at`, `updated_at`) VALUES
(2, 'heee', 'dsdASdad', 1, '2026-04-01 15:13:52', '2026-04-01 15:13:52'),
(3, 'a', 'a', 1, '2026-04-01 15:21:09', '2026-04-01 15:21:09'),
(4, 'wrararaer', 'asaraerarar', 1, '2026-04-01 15:33:56', '2026-04-01 15:33:56');

-- --------------------------------------------------------

--
-- Table structure for table `insfrastructure`
--

CREATE TABLE `insfrastructure` (
  `id` int(11) NOT NULL,
  `branch_id` varchar(255) NOT NULL,
  `department_id` varchar(255) NOT NULL,
  `type_id` varchar(255) NOT NULL,
  `vendor_id` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(25) NOT NULL,
  `insfrastructure_img` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `insfrastructure`
--

INSERT INTO `insfrastructure` (`id`, `branch_id`, `department_id`, `type_id`, `vendor_id`, `description`, `name`, `price`, `insfrastructure_img`, `is_active`, `created_at`, `updated_at`) VALUES
(1, '1', '2', '3', '4', 'Dental cleaning treatment', 'Teeth Cleaning', 1500, '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, '1', '2', '3', '4', 'Dental cleaning treatment', 'Teeth Cleaning', 1500, '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, '2', '2', '3', '4', 'Dental cleaning treatment', 'Teeth Cleaning', 1500, '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, '30', '12', '0', '1', 'adadad', 'mihir jadav', 1233, 'public\\insfrastructure_img\\1774245580726-259531891-rezaul-karim-102abqkKhbY-unsplash.jpg', 1, '2026-03-23 11:29:40', '2026-03-23 11:29:40'),
(6, '32', '17', '1', '1', 'woooden', 'chair', 2500, 'public\\insfrastructure_img\\1774518170021-426290850-evgeny-tchebotarev-ZPQE4XssoBc-unsplash.jpg', 1, '2026-03-26 15:12:50', '2026-03-26 15:12:50'),
(7, '33', '16', '2', '2', 'dental ttable', 'table', 4999, 'public\\insfrastructure_img\\1774518249082-557967538-jan-folwarczny-LLGRiTroses-unsplash.jpg', 1, '2026-03-26 15:14:09', '2026-03-26 15:14:09'),
(8, '30', '12', '0', '1', 'f', 'furniture', 5, 'public\\insfrastructure_img\\1774589433740-632753858-vladimir-yelizarov-I5wSAQMdVPk-unsplash.jpg', 1, '2026-03-27 11:00:33', '2026-03-27 11:00:33');

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` int(255) NOT NULL,
  `stock` int(255) NOT NULL,
  `medicine_img` varchar(255) NOT NULL,
  `expirydate` date NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`id`, `branch_id`, `vendor_id`, `department_id`, `name`, `description`, `price`, `stock`, `medicine_img`, `expirydate`, `is_active`, `created_at`, `updated_at`) VALUES
(3, 34, 1, 18, 'Local Anesthetics (Pain/Numbing): ', ' amides (injectable and some topicals) and esters (primarily topical).', 250, 15, 'public\\medicine_img\\1774934529728-211646587-med1.jpg', '2026-03-28', 1, '2026-03-31 10:52:09', '2026-03-31 10:52:09'),
(4, 35, 2, 19, 'Articaine', ' A 4% solution known for high lipid solubility and superior bone penetration, often used for mandibular anesthesia [1, 2].', 350, 20, 'public\\medicine_img\\1774934669077-961288409-med2.jpg', '2026-03-28', 1, '2026-03-31 10:54:29', '2026-03-31 10:54:29'),
(5, 36, 1, 20, 'Metronidazole ', 'for anaerobic infections', 450, 25, 'public\\medicine_img\\1774934778341-173105350-med3.jpg', '1111-11-11', 1, '2026-03-31 10:56:18', '2026-03-31 10:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `u[pdated_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `name`, `email`, `password`, `phone`, `is_active`, `created_at`, `u[pdated_at`) VALUES
(1, 'John Doe', 'john.doe@example.com', '1234567890', 0, 1, '2026-03-26', '2026-03-26'),
(2, 'John Doessk', 'john.doek@example.com', 'password123k', 1234567891, 1, '2026-03-26', '2026-03-26'),
(3, 'mihir', '230493131013.mihir@gmail.com', 'rr', 1111111111, 1, '2026-03-26', '2026-03-26');

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

CREATE TABLE `salary` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment_id` int(25) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `amount` int(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `workingdays` int(255) NOT NULL,
  `presentdays` int(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`id`, `user_id`, `payment_id`, `transaction_id`, `amount`, `status`, `workingdays`, `presentdays`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 'UPI', 25000, 'Paid', 26, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `services_img` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `branch_id`, `department_id`, `user_id`, `name`, `description`, `services_img`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 3, 'Dental Treatment', 'Teeth cleaning and whitening service', 'treatment.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 29, 14, 3, 'u', 'u', 'public\\services_img\\1774259972216-662519333-c1-removebg-preview.png', 1, '2026-03-23 15:29:32', '2026-03-23 15:29:32');

-- --------------------------------------------------------

--
-- Table structure for table `testimonial`
--

CREATE TABLE `testimonial` (
  `id` int(11) NOT NULL,
  `rating` int(5) NOT NULL,
  `description` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonial`
--

INSERT INTO `testimonial` (`id`, `rating`, `description`, `user_id`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 4, 'abc', 1, 1, '2026-04-02 14:45:55', '2026-04-02 14:45:55'),
(2, 5, 'abc', 1, 1, '2026-04-02 14:46:47', '2026-04-02 14:46:47');

-- --------------------------------------------------------

--
-- Table structure for table `timeslot`
--

CREATE TABLE `timeslot` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `timeslot`
--

INSERT INTO `timeslot` (`id`, `user_id`, `date`, `startdate`, `enddate`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 3, '2026-03-18', '0000-00-00', '0000-00-00', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `treatment`
--

CREATE TABLE `treatment` (
  `id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `medicine_id` int(11) NOT NULL,
  `medicine_amount` int(11) NOT NULL,
  `date` date NOT NULL,
  `prescription` varchar(255) NOT NULL,
  `treatement_amount` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `medicine_quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `treatment`
--

INSERT INTO `treatment` (`id`, `appointment_id`, `medicine_id`, `medicine_amount`, `date`, `prescription`, `treatement_amount`, `is_active`, `created_at`, `updated_at`, `medicine_quantity`) VALUES
(2, 5, 3, 66, '2026-04-02', 'ghg', 666, 1, '2026-03-31 13:02:53', '2026-03-31 13:02:53', 6),
(3, 4, 5, 50, '2026-04-03', 'sdc\n\nffrr', 1000, 1, '2026-03-31 13:54:07', '2026-03-31 13:54:07', 5),
(4, 5, 3, 500, '2026-04-03', 'dsfv\n\nftrr', 5000, 1, '2026-03-31 13:54:39', '2026-03-31 13:54:39', 10),
(5, 5, 3, 300, '2026-04-03', 'ghg\ndfvgd', 2000, 1, '2026-03-31 14:02:34', '2026-03-31 14:02:34', 10);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `qualification` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `salary` int(255) NOT NULL,
  `user_img` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `branch_id`, `department_id`, `role_id`, `name`, `dob`, `email`, `qualification`, `address`, `salary`, `user_img`, `is_active`, `created_at`, `updated_at`) VALUES
(3, 29, 14, 1, 'mj', '2026-03-10', 'lakanidharmikmarn@gmail.com', 'be', 'mj', 0, 'public\\user_img\\1774250664277-81289847-evgeny-tchebotarev-ZPQE4XssoBc-unsplash.jpg', 1, '2026-03-23 12:54:24', '2026-03-23 12:54:24');

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `companyname` varchar(255) NOT NULL,
  `mobile` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gstno` int(25) NOT NULL,
  `vendor_img` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`id`, `name`, `address`, `companyname`, `mobile`, `email`, `gstno`, `vendor_img`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Raj Patel', 'Surat, Gujarat', 'Patel Dental Supplies', 2147483647, 'rajpatel@gmail.com', 21, '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'dl', 'abcbvcbv', 'jk', 2147483647, 'lakanidharmikmarn@gmail.com', 22525, 'public\\vendor_img\\1774246837338-144950745-orange-removebg-preview.png', 1, '2026-03-23 11:50:37', '2026-03-23 11:50:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expence`
--
ALTER TABLE `expence`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `insfrastructure`
--
ALTER TABLE `insfrastructure`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `salary`
--
ALTER TABLE `salary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonial`
--
ALTER TABLE `testimonial`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timeslot`
--
ALTER TABLE `timeslot`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `treatment`
--
ALTER TABLE `treatment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `expence`
--
ALTER TABLE `expence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `insfrastructure`
--
ALTER TABLE `insfrastructure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `salary`
--
ALTER TABLE `salary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `testimonial`
--
ALTER TABLE `testimonial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `timeslot`
--
ALTER TABLE `timeslot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `treatment`
--
ALTER TABLE `treatment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
