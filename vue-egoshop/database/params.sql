-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2020-06-04 04:02:55
-- 服务器版本： 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ego`
--

-- --------------------------------------------------------

--
-- 表的结构 `params`
--

CREATE TABLE `params` (
  `id` int(11) NOT NULL,
  `itemCatId` text NOT NULL,
  `paramData` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `params`
--

INSERT INTO `params` (`id`, `itemCatId`, `paramData`) VALUES
(10005, '10001', '[{"value":"品牌","children":[{"childValue":"戴尔","value":""},{"childValue":"宏碁","value":""},{"childValue":"mac","value":""},{"childValue":"小米","value":""}]},{"value":"内存","children":[{"value":"","childValue":"256"},{"childValue":"固态","value":""}]}]'),
(10007, '1001', '[{"value":"hello","children":[{"childValue":"wrodl","value":""}]}]'),
(10008, '1002', '[{"value":"主题","children":[{"childValue":"好看","value":""}]},{"value":"时么","children":[{"value":"","children":[],"childValue":"时的1"},{"childValue":"是的2","value":""}]}]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `params`
--
ALTER TABLE `params`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `params`
--
ALTER TABLE `params`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10009;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
