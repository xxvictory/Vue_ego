-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2020-06-02 04:56:32
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
-- 表的结构 `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `image` text NOT NULL,
  `sellPoint` text NOT NULL,
  `price` text NOT NULL,
  `cid` text NOT NULL,
  `num` text NOT NULL,
  `barcode` text NOT NULL,
  `status` text NOT NULL,
  `created` text NOT NULL,
  `updated` text NOT NULL,
  `descs` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `project`
--

INSERT INTO `project` (`id`, `title`, `image`, `sellPoint`, `price`, `cid`, `num`, `barcode`, `status`, `created`, `updated`, `descs`) VALUES
(10015, '三体-刘慈欣', '', '未来科幻', '99', '', '999', '', '', '', '', '<p>这是大刘的得意之作，连奥巴马都喜欢看！</p>'),
(10016, '流浪地球-刘慈欣', '', '已经拍成了电视剧', '22', '', '222', '', '', '', '', '<p>吴京主演的，感觉还可以的。厂面不错！</p>'),
(10028, '梦里花落知多少', '2.jpg', '小时代！！！', '11', '10001', '11', '', '', '', '', '<p>还不错，但是要看书籍，不要看电影</p>'),
(10031, '我与地坛', '', '做一个不动声色的人', '55', '', '464', '', '', '', '', '人生尔尔，错过了，就是一辈子'),
(10032, '舞！舞！舞！', '', '村上春树经典作品', '234', '43', '34', '', '', '', '', '人不是慢慢变老的，而是一瞬间变老的'),
(10033, '岁月神偷', '', '经典书籍', '23', '', '23', '', '', '', '', '我没有精力去认识一个新的人，或者花力气去宠福新维系一段感情，跟没办法在把自己的故事讲述一遍又一遍'),
(10035, '解忧杂货店', '', '无论现在有多么的不开心，你要相信明天会比今天更好', '34', '', '12', '', '', '', '', '<p>无论现在有多么的不开心，你要相信明天会比今天更好!!!!</p>'),
(10036, '挪威的森林', '', '村上春树经典作品，校园系列', '345', '45', '45', '', '', '', '', '哪里会有人喜欢孤独，只不过是不喜欢失望罢了'),
(10038, '小王子', '', '写给成年人的童话故事', '20', '', '1', '', '1', '', '', '所有人都曾是小孩，虽然之后少数人记得'),
(10039, '笑场', 'mock\\upload\\1585277506405-u=2137641711,889921437&fm=26&gp=0.jpg', '李诞的作品，很有意思，集成了扯经', '55', '100002', '1000', '', '1', '', '', '<p>未曾开言，我先笑场，笑过之后，听我来诉一诉衷肠</p>'),
(10040, '万历十五年', 'mock\\upload\\1585277681739-u=2137641711,889921437&fm=26&gp=0.jpg', '人民的名义里面出现过很多次', '45', '10002', '26', '', '1', '', '', '<p>在明朝当皇帝其实没那么幸福，比其清朝来说，还是清朝的皇帝牛逼，毕竟清朝才是更加牛逼的中央集权制</p>'),
(10041, '瓦尔登湖', 'mock\\upload\\1585277978775-u=2137641711,889921437&fm=26&gp=0.jpg', '非常优秀，值得阅读', '100', '', '100', '', '1', '', '', '<p>哲学类的书籍!!!</p>');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10042;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
