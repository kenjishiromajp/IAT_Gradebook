-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 04-Ago-2018 às 08:29
-- Versão do servidor: 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gradebook`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `Class`
--

CREATE TABLE `Class` (
  `ID` int(11) NOT NULL,
  `Name` varchar(155) NOT NULL,
  `StartDate` datetime NOT NULL,
  `EndDate` datetime DEFAULT NULL,
  `SubjectGroup_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Class`
--

INSERT INTO `Class` (`ID`, `Name`, `StartDate`, `EndDate`, `SubjectGroup_ID`) VALUES
(1, 'ClassFrontEnd: Morning (JS & ES6)', '2018-07-01 00:00:00', '2019-07-01 00:00:00', 2),
(2, 'ClassFrontEnd:  Night (JS & ES6)', '2018-07-01 00:00:00', '2019-07-01 00:00:00', 2),
(3, 'ClassFrontEnd:  Morning (HTML5 & CSS)', '2018-07-01 00:00:00', '2019-07-01 00:00:00', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Course`
--

CREATE TABLE `Course` (
  `ID` int(11) NOT NULL,
  `Name` varchar(155) NOT NULL,
  `School_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Course`
--

INSERT INTO `Course` (`ID`, `Name`, `School_ID`) VALUES
(5, 'Programming FrontEnd', 1),
(6, 'Programming BackEnd', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Mark`
--

CREATE TABLE `Mark` (
  `ID` int(11) NOT NULL,
  `Student_Class_ID` int(11) NOT NULL,
  `Task_ID` int(11) NOT NULL,
  `Value` decimal(10,2) NOT NULL,
  `Approved` tinyint(4) DEFAULT NULL,
  `Description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Mark`
--

INSERT INTO `Mark` (`ID`, `Student_Class_ID`, `Task_ID`, `Value`, `Approved`, `Description`) VALUES
(69, 1, 11, '10.00', 1, NULL),
(70, 1, 12, '10.00', 1, NULL),
(71, 2, 11, '10.00', 1, NULL),
(73, 2, 12, '10.00', 1, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Role`
--

CREATE TABLE `Role` (
  `ID` int(11) NOT NULL,
  `Name` varchar(155) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Role`
--

INSERT INTO `Role` (`ID`, `Name`) VALUES
(1, 'Admin'),
(2, 'Principal'),
(3, 'Teacher'),
(4, 'Student');

-- --------------------------------------------------------

--
-- Estrutura da tabela `School`
--

CREATE TABLE `School` (
  `ID` int(11) NOT NULL,
  `Name` varchar(155) NOT NULL,
  `Address` varchar(155) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `School`
--

INSERT INTO `School` (`ID`, `Name`, `Address`) VALUES
(1, 'School 1', 'School 1 St');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Student`
--

CREATE TABLE `Student` (
  `ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Student`
--

INSERT INTO `Student` (`ID`, `User_ID`) VALUES
(1, 5),
(2, 7),
(3, 10);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Student_Class`
--

CREATE TABLE `Student_Class` (
  `ID` int(11) NOT NULL,
  `Student_ID` int(11) NOT NULL,
  `Class_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Student_Class`
--

INSERT INTO `Student_Class` (`ID`, `Student_ID`, `Class_ID`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 2, 3),
(4, 1, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Subject`
--

CREATE TABLE `Subject` (
  `ID` int(11) NOT NULL,
  `Name` varchar(155) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Subject`
--

INSERT INTO `Subject` (`ID`, `Name`) VALUES
(1, 'Javascript'),
(2, 'ES6'),
(3, 'PHP'),
(4, 'Yii2 Framework'),
(5, 'HTML'),
(6, 'CSS');

-- --------------------------------------------------------

--
-- Estrutura da tabela `SubjectGroup`
--

CREATE TABLE `SubjectGroup` (
  `ID` int(11) NOT NULL,
  `DurationValue` decimal(10,2) NOT NULL,
  `DurationUnit` varchar(155) NOT NULL,
  `StartDate` datetime NOT NULL,
  `EndDate` datetime DEFAULT NULL,
  `Course_ID` int(11) NOT NULL,
  `SubjectGroupOrder` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `SubjectGroup`
--

INSERT INTO `SubjectGroup` (`ID`, `DurationValue`, `DurationUnit`, `StartDate`, `EndDate`, `Course_ID`, `SubjectGroupOrder`) VALUES
(1, '1.00', 'Year', '2018-07-01 00:00:00', NULL, 5, 1),
(2, '1.00', 'Year', '2018-07-01 00:00:00', NULL, 5, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Subject_SubjectGroup`
--

CREATE TABLE `Subject_SubjectGroup` (
  `Subject_ID` int(11) NOT NULL,
  `SubjectGroup_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Subject_SubjectGroup`
--

INSERT INTO `Subject_SubjectGroup` (`Subject_ID`, `SubjectGroup_ID`) VALUES
(1, 2),
(2, 2),
(5, 1),
(6, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Task`
--

CREATE TABLE `Task` (
  `ID` int(11) NOT NULL,
  `Name` varchar(155) NOT NULL,
  `MarkWeightAverage` decimal(10,2) NOT NULL,
  `TotalMark` decimal(10,2) NOT NULL,
  `TeacherClass_ID` int(11) NOT NULL,
  `TaskCategory_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Task`
--

INSERT INTO `Task` (`ID`, `Name`, `MarkWeightAverage`, `TotalMark`, `TeacherClass_ID`, `TaskCategory_ID`) VALUES
(7, 'Evaluation 1: (Teacher) -> HTML -> ClassFrontEnd:  Morning (HTML5 & CSS)', '20.00', '10.00', 1, 1),
(8, 'Evaluation 2: (Teacher) -> HTML -> ClassFrontEnd:  Morning (HTML5 & CSS)', '10.00', '10.00', 1, 1),
(9, 'Evaluation 1: (Teacher) -> CSS -> ClassFrontEnd:  Morning (HTML5 & CSS) ', '20.00', '10.00', 4, 1),
(10, 'Evaluation 1: (Other Teacher) -> Javascript -> ClassFrontEnd:  Night (JS & ES6)', '20.00', '10.00', 3, 1),
(11, 'Evaluation 1: (Teacher) -> Javascript -> ClassFrontEnd:  Morning (JS & ES6)', '20.00', '10.00', 5, 1),
(12, 'Evaluation 2: (Teacher) -> Javascript -> ClassFrontEnd:  Morning (JS & ES6)', '10.00', '10.00', 5, 1),
(13, 'Evaluation 1: (Other Teacher) -> ES6 -> ClassFrontEnd:  Morning (JS & ES6)', '10.00', '10.00', 6, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `TaskCategory`
--

CREATE TABLE `TaskCategory` (
  `ID` int(11) NOT NULL,
  `Name` varchar(155) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `TaskCategory`
--

INSERT INTO `TaskCategory` (`ID`, `Name`) VALUES
(1, 'Evaluation'),
(2, 'Homework');

-- --------------------------------------------------------

--
-- Estrutura da tabela `Teacher`
--

CREATE TABLE `Teacher` (
  `ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Teacher`
--

INSERT INTO `Teacher` (`ID`) VALUES
(4),
(6),
(13),
(14),
(15);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Teacher_Class`
--

CREATE TABLE `Teacher_Class` (
  `ID` int(11) NOT NULL,
  `Teacher_ID` int(11) NOT NULL,
  `Class_ID` int(11) NOT NULL,
  `Subject_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Teacher_Class`
--

INSERT INTO `Teacher_Class` (`ID`, `Teacher_ID`, `Class_ID`, `Subject_ID`) VALUES
(1, 4, 3, 5),
(2, 4, 2, 5),
(3, 6, 2, 1),
(4, 4, 3, 6),
(5, 4, 1, 1),
(6, 6, 1, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Teacher_Subject`
--

CREATE TABLE `Teacher_Subject` (
  `Teacher_ID` int(11) NOT NULL,
  `Subject_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `Teacher_Subject`
--

INSERT INTO `Teacher_Subject` (`Teacher_ID`, `Subject_ID`) VALUES
(4, 1),
(4, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `User`
--

CREATE TABLE `User` (
  `ID` int(11) NOT NULL,
  `Name` varchar(155) NOT NULL,
  `Email` varchar(155) NOT NULL,
  `Password` varchar(155) NOT NULL,
  `AccessToken` varchar(155) DEFAULT NULL,
  `Role_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `User`
--

INSERT INTO `User` (`ID`, `Name`, `Email`, `Password`, `AccessToken`, `Role_ID`) VALUES
(2, 'Admin', 'admin@admin.com', '$2y$13$d4Y9tx7qa6WzgLaaW/tK3OsTb.jJQXiBbcH.TdiPSZeHqentqnQ0e', 'OfljL7yLTgg2xvgJjhUrvkmBTRva9R_T', 1),
(3, 'Principal', 'principal@principal.com', '$2y$13$3r0uWtX09uDJ18gHGpxtgu/4znvvaubglsuxXv8KVuUk1F.YNQnpC', 'j8-AnETDWvBSCU3lER0EoZDcPgsgo2xK', 2),
(4, 'Teacher', 'teacher@teacher.com', '$2y$13$xBC6myFuF3rracI.0jDVEe4QDKunIFdaR4HIHH31bhyzfzhKxQnje', 'ptIhyt0DRsYUdXh8jJwzgtXS1-57HU7h', 3),
(5, 'Student', 'student@student.com', '$2y$13$uLYb22cnIjdHZGNRQsnX2uG/w0y4WEhC4uLV0niHKsYZNzOX2pgq6', 'itzafEzgN-MBeMDGeVy_3pTCHAzYBpQg', 4),
(6, 'Other Teacher', 'otherteacher@otherteacher.com', '$2y$13$HwQzS8yxXIbEftwKD./J8e0fUgx0iR32ZVHnvqUpAtReSXrOUUCV2', '5gIMLf-tCLdFRYpzcAbjHX3k0cgtJRXl', 3),
(7, 'Other Student', 'otherstudent@otherstudent.com', '$2y$13$uLYb22cnIjdHZGNRQsnX2uG/w0y4WEhC4uLV0niHKsYZNzOX2pgq6', 'zIub-Gwuj7w8bETWyZjeRgSK23Z7P4IS', 4),
(10, 'daddasd', 'saddsadd@jdhsakd.com', '$2y$13$.GWe1dNmYstju54GGxbMFuDpc16f/YXqv4PDYk6PFDk5HrmzDBvIa', NULL, 4),
(13, 'teacher doido', 'teacherzao@teacherzao.com', '$2y$13$QKFzV3CVecg/svpygs8Ls.kxq9QN2JrpAXlTG61DXNSbyMVNhl12W', NULL, 3),
(14, 'teacher doido', 'ototeacherzao@teacherzao.com', '$2y$13$YsB68UIY0JY0.upyBGgm7uLSaxGXN0.ErITFSeVO.4xVmCgDBQIQy', NULL, 3),
(15, 'um prof', 'prof@prof.com', '$2y$13$HwQzS8yxXIbEftwKD./J8e0fUgx0iR32ZVHnvqUpAtReSXrOUUCV2', 'uRUmzjvhLHjg7RgJW9qW1sJJCbdV88Uo', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Class`
--
ALTER TABLE `Class`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_Class_SubjectGroup2` (`SubjectGroup_ID`);

--
-- Indexes for table `Course`
--
ALTER TABLE `Course`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_Course_School2` (`School_ID`);

--
-- Indexes for table `Mark`
--
ALTER TABLE `Mark`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_Mark_Student_Class1` (`Student_Class_ID`),
  ADD KEY `fk_Mark_Task1` (`Task_ID`);

--
-- Indexes for table `Role`
--
ALTER TABLE `Role`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `School`
--
ALTER TABLE `School`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Student`
--
ALTER TABLE `Student`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_Student_User2` (`User_ID`);

--
-- Indexes for table `Student_Class`
--
ALTER TABLE `Student_Class`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_Student_Class_Student2` (`Student_ID`),
  ADD KEY `fk_Student_Class_Class2` (`Class_ID`);

--
-- Indexes for table `Subject`
--
ALTER TABLE `Subject`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `SubjectGroup`
--
ALTER TABLE `SubjectGroup`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_SubjectGroup_Course2` (`Course_ID`);

--
-- Indexes for table `Subject_SubjectGroup`
--
ALTER TABLE `Subject_SubjectGroup`
  ADD PRIMARY KEY (`Subject_ID`,`SubjectGroup_ID`),
  ADD KEY `fk_Subject_SubjectGroup1_SubjectGroup1` (`SubjectGroup_ID`);

--
-- Indexes for table `Task`
--
ALTER TABLE `Task`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_Task_TaskCategory` (`TaskCategory_ID`),
  ADD KEY `fk_Task_TeacherClass_ID` (`TeacherClass_ID`) USING BTREE;

--
-- Indexes for table `TaskCategory`
--
ALTER TABLE `TaskCategory`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Teacher`
--
ALTER TABLE `Teacher`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `Teacher_Class`
--
ALTER TABLE `Teacher_Class`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_TeacherClass_Teacher` (`Teacher_ID`),
  ADD KEY `fk_TeacherClass_ClassSubject` (`Class_ID`,`Subject_ID`),
  ADD KEY `Subject_ID` (`Subject_ID`);

--
-- Indexes for table `Teacher_Subject`
--
ALTER TABLE `Teacher_Subject`
  ADD PRIMARY KEY (`Teacher_ID`,`Subject_ID`),
  ADD KEY `fk_Teacher_Subject1_Subject1` (`Subject_ID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_User_Role1` (`Role_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Class`
--
ALTER TABLE `Class`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Course`
--
ALTER TABLE `Course`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Mark`
--
ALTER TABLE `Mark`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `Role`
--
ALTER TABLE `Role`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `School`
--
ALTER TABLE `School`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Student`
--
ALTER TABLE `Student`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Student_Class`
--
ALTER TABLE `Student_Class`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Subject`
--
ALTER TABLE `Subject`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `SubjectGroup`
--
ALTER TABLE `SubjectGroup`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Task`
--
ALTER TABLE `Task`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `TaskCategory`
--
ALTER TABLE `TaskCategory`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Teacher_Class`
--
ALTER TABLE `Teacher_Class`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `Class`
--
ALTER TABLE `Class`
  ADD CONSTRAINT `fk_Class_SubjectGroup2` FOREIGN KEY (`SubjectGroup_ID`) REFERENCES `SubjectGroup` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `Course`
--
ALTER TABLE `Course`
  ADD CONSTRAINT `fk_Course_School2` FOREIGN KEY (`School_ID`) REFERENCES `School` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `Mark`
--
ALTER TABLE `Mark`
  ADD CONSTRAINT `fk_Mark_Student_Class1` FOREIGN KEY (`Student_Class_ID`) REFERENCES `Student_Class` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Mark_Task1` FOREIGN KEY (`Task_ID`) REFERENCES `Task` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `Student`
--
ALTER TABLE `Student`
  ADD CONSTRAINT `fk_Student_User2` FOREIGN KEY (`User_ID`) REFERENCES `User` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `Student_Class`
--
ALTER TABLE `Student_Class`
  ADD CONSTRAINT `fk_Student_Class_Class2` FOREIGN KEY (`Class_ID`) REFERENCES `Class` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Student_Class_Student2` FOREIGN KEY (`Student_ID`) REFERENCES `Student` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `SubjectGroup`
--
ALTER TABLE `SubjectGroup`
  ADD CONSTRAINT `fk_SubjectGroup_Course2` FOREIGN KEY (`Course_ID`) REFERENCES `Course` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `Subject_SubjectGroup`
--
ALTER TABLE `Subject_SubjectGroup`
  ADD CONSTRAINT `fk_Subject_SubjectGroup1_Subject1` FOREIGN KEY (`Subject_ID`) REFERENCES `Subject` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Subject_SubjectGroup1_SubjectGroup1` FOREIGN KEY (`SubjectGroup_ID`) REFERENCES `SubjectGroup` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `Task`
--
ALTER TABLE `Task`
  ADD CONSTRAINT `Task_ibfk_1` FOREIGN KEY (`TeacherClass_ID`) REFERENCES `Teacher_Class` (`ID`),
  ADD CONSTRAINT `Task_ibfk_2` FOREIGN KEY (`TaskCategory_ID`) REFERENCES `TaskCategory` (`ID`);

--
-- Limitadores para a tabela `Teacher`
--
ALTER TABLE `Teacher`
  ADD CONSTRAINT `Teacher_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `User` (`ID`);

--
-- Limitadores para a tabela `Teacher_Class`
--
ALTER TABLE `Teacher_Class`
  ADD CONSTRAINT `Teacher_Class_ibfk_1` FOREIGN KEY (`Class_ID`) REFERENCES `Class` (`ID`),
  ADD CONSTRAINT `Teacher_Class_ibfk_2` FOREIGN KEY (`Subject_ID`) REFERENCES `Subject` (`ID`),
  ADD CONSTRAINT `Teacher_Class_ibfk_3` FOREIGN KEY (`Teacher_ID`) REFERENCES `Teacher` (`ID`);

--
-- Limitadores para a tabela `Teacher_Subject`
--
ALTER TABLE `Teacher_Subject`
  ADD CONSTRAINT `Teacher_Subject_ibfk_1` FOREIGN KEY (`Teacher_ID`) REFERENCES `Teacher` (`ID`),
  ADD CONSTRAINT `fk_Teacher_Subject1_Subject1` FOREIGN KEY (`Subject_ID`) REFERENCES `Subject` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `fk_User_Role1` FOREIGN KEY (`Role_ID`) REFERENCES `Role` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
