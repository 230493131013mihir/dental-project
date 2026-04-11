-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2026 at 12:24 PM
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
  `doctor_id` int(11) NOT NULL,
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

INSERT INTO `appointment` (`id`, `branch_id`, `department_id`, `user_id`, `doctor_id`, `name`, `phone`, `date`, `time`, `is_active`, `created_at`, `updated_at`) VALUES
(24, 34, 18, 3, 5, 'mihir jadav', '1111111111', '2026-04-24', '11:18', 1, '2026-04-08 11:19:00', '2026-04-08 11:19:00'),
(25, 34, 21, 3, 6, 'mihir', '1111111111', '2026-04-20', '7', 1, '2026-04-08 12:18:19', '2026-04-08 12:18:19'),
(26, 34, 21, 3, 6, 'mihir jadav', '9856895652', '2026-04-20', '7', 1, '2026-04-08 12:24:05', '2026-04-08 12:24:05');

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
(5, 'public\\blog_img\\1775208153204-133616521-blog.png', 'Want to prevent shifting teeth? Maybe you need retainers', 'Retainers have benefits beyond keeping a nice smile after braces, aligners, or other orthodontic treatment. maintain teeth alignment, protecting them from extra wear.', '2026-04-08', 1, '2026-04-03 14:52:33', '2026-04-03 14:52:33');

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
(34, 'Sarthana', 'sarthanadental@gmail.com', '1234567890', 'near sarthana zoo 501 kyros bussinesss center', ' Recognized as a leading multi-specialty clinic with over 15 years of experience, full mouth rehabilitation, and cosmetic dentistry.', 'public\\branch_img\\1775539733328-396960480-sarthana.jpg', 1, '2026-03-31 10:38:24', '2026-03-31 10:38:24', 'Surat', 'Gujarat'),
(35, 'Adajan', 'Adajandental@gmail.com', '1234567890', 'Near adajan gas circle 502 kyros center', 'A well-known clinic, being the first in Surat to incorporate All-on-4 and Malo Protocol in their practice.', 'public\\branch_img\\1775539752980-813459197-place4.jpg', 1, '2026-03-31 10:39:59', '2026-03-31 10:39:59', 'Surat', 'Gujarat'),
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
(20, 36, 'Oral Surgery', ' Wisdom tooth extraction and jaw surgery', '8866173826', 'Vapidental@gmail.com', 'Ring road near rathi palace vapi', 'public\\department_img\\1774934353516-384839033-dept3.jpg', 1, '2026-03-31 10:49:13', '2026-03-31 10:49:13'),
(21, 34, 'Orthodontics', 'v', '9426848484', '230493131013.mihir@gmail.com', 'v', 'public\\department_img\\1775209965651-933389914-blog.png', 1, '2026-04-03 15:22:45', '2026-04-03 15:22:45');

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
(4, 'What should I do if I have a toothache?', 'Rinse your mouth with warm water and avoid very hot or cold foods.', 1, '2026-04-01 15:33:56', '2026-04-01 15:33:56'),
(5, 'Why is oral hygiene important?', 'Good oral hygiene helps prevent tooth decay, bad breath,gum disease.', 1, '2026-04-07 11:34:08', '2026-04-07 11:34:08'),
(6, 'How often should I visit the dentist?', 'This helps prevent cavities, gum disease,other oral health issues early.', 1, '2026-04-07 11:34:32', '2026-04-07 11:34:32');

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
(9, '34', '18', 'Dental', '1', 'qqqq', 'qq', 500, 'public\\insfrastructure_img\\1775206581462-156782794-teeth.jpg', 1, '2026-04-03 14:26:21', '2026-04-03 14:26:21');

-- --------------------------------------------------------

--
-- Table structure for table `medical`
--

CREATE TABLE `medical` (
  `id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `treatment_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medical`
--

INSERT INTO `medical` (`id`, `appointment_id`, `treatment_id`, `name`, `phone`, `date`, `status`, `is_active`, `created_at`, `updated_at`) VALUES
(22, 0, 34, 'mihir jadav', '9856895652', '2026-04-19', 'deliver', 0, '2026-04-10 15:51:00', '2026-04-10 15:51:00');

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
  `sell_qty` int(11) NOT NULL DEFAULT 0,
  `medicine_img` varchar(255) NOT NULL,
  `expirydate` date NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`id`, `branch_id`, `vendor_id`, `department_id`, `name`, `description`, `price`, `stock`, `sell_qty`, `medicine_img`, `expirydate`, `is_active`, `created_at`, `updated_at`) VALUES
(3, 34, 1, 18, 'Local Anesthetics (Pain/Numbing): ', ' amides (injectable and some topicals) and esters (primarily topical).', 250, 15, 0, 'public\\medicine_img\\1774934529728-211646587-med1.jpg', '2026-03-28', 1, '2026-03-31 10:52:09', '2026-03-31 10:52:09'),
(4, 35, 2, 19, 'Articaine', ' A 4% solution known for high lipid solubility and superior bone penetration, often used for mandibular anesthesia [1, 2].', 350, 20, 0, 'public\\medicine_img\\1774934669077-961288409-med2.jpg', '2026-03-28', 1, '2026-03-31 10:54:29', '2026-03-31 10:54:29'),
(5, 36, 1, 20, 'Metronidazole ', 'for anaerobic infections', 450, 25, 0, 'public\\medicine_img\\1774934778341-173105350-med3.jpg', '1111-11-11', 1, '2026-03-31 10:56:18', '2026-03-31 10:56:18'),
(6, 34, 1, 21, 'qq', 'qq', 10, 500, 0, 'public\\medicine_img\\1775636465464-781687495-c.png', '2026-04-10', 1, '2026-04-08 13:51:05', '2026-04-08 13:51:05');

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
(3, 'mihir', '230493131013.mihir@gmail.com', 'rr', 1111111111, 1, '2026-03-26', '2026-03-26'),
(4, 'mihir', '230493131013.mihir@gmail.com', 'qq', 1111111111, 1, '2026-04-03', '2026-04-03');

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
(1, 1, 2, 3, 'Dental Treatment', 'Teeth cleaning and whitening service', 'treatment.jpg', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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
(2, 5, 'abc', 1, 1, '2026-04-02 14:46:47', '2026-04-02 14:46:47'),
(3, 3, 'sdsdfsdf', 3, 1, '2026-04-02 15:51:43', '2026-04-02 15:51:43'),
(4, 5, 'okok', 3, 1, '2026-04-02 15:52:30', '2026-04-02 15:52:30'),
(5, 3, 'csdcsd', 3, 1, '2026-04-03 10:36:32', '2026-04-03 10:36:32');

-- --------------------------------------------------------

--
-- Table structure for table `timeslot`
--

CREATE TABLE `timeslot` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `starttime` varchar(255) NOT NULL,
  `endtime` varchar(255) NOT NULL,
  `handlepatient` int(255) NOT NULL,
  `appointpatient` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `timeslot`
--

INSERT INTO `timeslot` (`id`, `user_id`, `date`, `starttime`, `endtime`, `handlepatient`, `appointpatient`, `is_active`, `created_at`, `updated_at`) VALUES
(7, 6, '2026-04-20', '13:40', '14:40', 5, 5, 1, '2026-04-07 12:40:00', '2026-04-07 12:40:00');

-- --------------------------------------------------------

--
-- Table structure for table `treatment`
--

CREATE TABLE `treatment` (
  `id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `prescription` varchar(255) NOT NULL,
  `treatement_amount` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `treatment`
--

INSERT INTO `treatment` (`id`, `appointment_id`, `date`, `prescription`, `treatement_amount`, `is_active`, `created_at`, `updated_at`) VALUES
(34, 26, '2026-04-12', 'tt', 1500, 1, '2026-04-10 15:34:51', '2026-04-10 15:34:51');

-- --------------------------------------------------------

--
-- Table structure for table `treatment_medicines`
--

CREATE TABLE `treatment_medicines` (
  `id` int(11) NOT NULL,
  `medical_id` int(11) NOT NULL,
  `treatment_id` int(11) DEFAULT NULL,
  `medicine_id` int(11) DEFAULT NULL,
  `medicine_amount` decimal(10,2) DEFAULT NULL,
  `medicine_quantity` int(11) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `treatment_medicines`
--

INSERT INTO `treatment_medicines` (`id`, `medical_id`, `treatment_id`, `medicine_id`, `medicine_amount`, `medicine_quantity`, `status`, `is_active`, `created_at`, `updated_at`) VALUES
(29, 0, 34, 3, 100.00, 10, 'pending', 1, '2026-04-10 10:04:51', NULL),
(30, 0, 34, 4, 200.00, 8, 'pending', 1, '2026-04-10 10:04:51', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `role_id` varchar(255) NOT NULL,
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
(4, 34, 18, 'Nurse', 'mihir', '2026-04-25', '230493131013.mihir@gmail.com', 'qq', 'ss', 50000, 'public\\user_img\\1775207366966-410384772-review.jpg', 1, '2026-04-03 14:39:26', '2026-04-03 14:39:26'),
(5, 34, 18, 'Doctor', 'qqqqq', '2026-04-11', '230493131013.mihir@gmail.com', 'qqq', 'qqq', 20000, 'public\\user_img\\1775207561076-835867117-review.jpg', 1, '2026-04-03 14:42:41', '2026-04-03 14:42:41'),
(6, 34, 21, 'Doctor', 'mihir', '2026-04-26', '230493131013.mihir@gmail.com', 'be', 'abc', 250000, 'public\\user_img\\1775459710173-450995462-doctor 3.jpg', 1, '2026-04-06 12:45:10', '2026-04-06 12:45:10');

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
(2, 'dl', 'abcbvcbv', 'jk', 2147483647, 'lakanidharmikmarn@gmail.com', 22525, 'public\\vendor_img\\1774246837338-144950745-orange-removebg-preview.png', 1, '2026-03-23 11:50:37', '2026-03-23 11:50:37'),
(3, 'prem chauhan', 'Plot No. 99, First Floor, Industrial Area, Phase-2, Panchkula, Haryana, 134113', 'Fortune Labs', 2147483647, 'FortuneLabs@gmail.com', 11323, 'public\\vendor_img\\1775453176469-20746789-blog.png', 1, '2026-04-06 10:56:16', '2026-04-06 10:56:16');

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
-- Indexes for table `medical`
--
ALTER TABLE `medical`
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
-- Indexes for table `treatment_medicines`
--
ALTER TABLE `treatment_medicines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `treatment_id` (`treatment_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `expence`
--
ALTER TABLE `expence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `insfrastructure`
--
ALTER TABLE `insfrastructure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `medical`
--
ALTER TABLE `medical`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `timeslot`
--
ALTER TABLE `timeslot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `treatment`
--
ALTER TABLE `treatment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `treatment_medicines`
--
ALTER TABLE `treatment_medicines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `treatment_medicines`
--
ALTER TABLE `treatment_medicines`
  ADD CONSTRAINT `treatment_medicines_ibfk_1` FOREIGN KEY (`treatment_id`) REFERENCES `treatment` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
