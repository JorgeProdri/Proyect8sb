-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-12-2023 a las 17:09:52
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cacao`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `analisis`
--

CREATE TABLE `analisis` (
  `cod_analisis` int(11) NOT NULL,
  `fecha_analisis` datetime NOT NULL,
  `obsev_analisis` varchar(150) NOT NULL,
  `cod_lote` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cosecha`
--

CREATE TABLE `cosecha` (
  `cod_cosecha` int(10) NOT NULL,
  `fecha_cosecha` date NOT NULL,
  `produc_cosecha` float NOT NULL,
  `estado_cosecha` varchar(10) NOT NULL,
  `cod_lote` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hacienda`
--

CREATE TABLE `hacienda` (
  `cod_hacienda` int(11) NOT NULL,
  `nomb_hacienda` varchar(20) NOT NULL,
  `direccion_hacienda` varchar(50) NOT NULL,
  `contac_hacienda` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lote`
--

CREATE TABLE `lote` (
  `cod_lote` int(11) NOT NULL,
  `nomb_lote` varchar(20) NOT NULL,
  `dimenx_lote` int(20) NOT NULL,
  `dimeny_lote` int(20) NOT NULL,
  `estado_lote` varchar(10) NOT NULL,
  `cod_hacienda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacion`
--

CREATE TABLE `notificacion` (
  `id` int(11) NOT NULL,
  `IdSensor` varchar(20) NOT NULL,
  `fecha` datetime NOT NULL,
  `descrip` varchar(100) NOT NULL,
  `cod_lote` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `phprecipitacion`
--

CREATE TABLE `phprecipitacion` (
  `cod_phprecipitacion` int(11) NOT NULL,
  `sensor_id` varchar(20) NOT NULL,
  `ph` float NOT NULL,
  `precipitacion` float NOT NULL,
  `cod_lote` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `radiacion`
--

CREATE TABLE `radiacion` (
  `cod_radiacion` int(11) NOT NULL,
  `sensor_id` varchar(20) NOT NULL,
  `radiacion` float NOT NULL,
  `cod_lote` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte`
--

CREATE TABLE `reporte` (
  `cod_reporte` int(11) NOT NULL,
  `fecha_reporte` datetime NOT NULL,
  `obser_reporte` varchar(150) NOT NULL,
  `detalle_reporte` varchar(100) NOT NULL,
  `cod_lote` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temphum`
--

CREATE TABLE `temphum` (
  `codigo_T_H` int(11) NOT NULL,
  `sensor_id` varchar(20) NOT NULL,
  `temperatura` float NOT NULL,
  `humedad` float NOT NULL,
  `cod_lote` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `cod_usuario` int(10) NOT NULL,
  `nomb_usuario` varchar(20) NOT NULL,
  `ape_usuario` varchar(20) NOT NULL,
  `user_usuario` varchar(15) NOT NULL,
  `pass_usuario` varchar(20) NOT NULL,
  `telefono_usuario` int(10) NOT NULL,
  `estado_usuario` varchar(10) NOT NULL,
  `cod_hacienda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `analisis`
--
ALTER TABLE `analisis`
  ADD PRIMARY KEY (`cod_analisis`),
  ADD UNIQUE KEY `cod_lote` (`cod_lote`);

--
-- Indices de la tabla `cosecha`
--
ALTER TABLE `cosecha`
  ADD PRIMARY KEY (`cod_cosecha`),
  ADD UNIQUE KEY `cod_lote` (`cod_lote`);

--
-- Indices de la tabla `hacienda`
--
ALTER TABLE `hacienda`
  ADD PRIMARY KEY (`cod_hacienda`);

--
-- Indices de la tabla `lote`
--
ALTER TABLE `lote`
  ADD PRIMARY KEY (`cod_lote`),
  ADD UNIQUE KEY `cod_hacienda` (`cod_hacienda`);

--
-- Indices de la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cod_lote` (`cod_lote`);

--
-- Indices de la tabla `phprecipitacion`
--
ALTER TABLE `phprecipitacion`
  ADD PRIMARY KEY (`cod_phprecipitacion`),
  ADD UNIQUE KEY `cod_lote` (`cod_lote`);

--
-- Indices de la tabla `radiacion`
--
ALTER TABLE `radiacion`
  ADD PRIMARY KEY (`cod_radiacion`),
  ADD UNIQUE KEY `cod_lote` (`cod_lote`);

--
-- Indices de la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD PRIMARY KEY (`cod_reporte`),
  ADD UNIQUE KEY `cod_lote` (`cod_lote`);

--
-- Indices de la tabla `temphum`
--
ALTER TABLE `temphum`
  ADD PRIMARY KEY (`codigo_T_H`),
  ADD UNIQUE KEY `cod_lote` (`cod_lote`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`cod_usuario`),
  ADD UNIQUE KEY `cod_hacienda` (`cod_hacienda`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `analisis`
--
ALTER TABLE `analisis`
  MODIFY `cod_analisis` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `hacienda`
--
ALTER TABLE `hacienda`
  MODIFY `cod_hacienda` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `lote`
--
ALTER TABLE `lote`
  MODIFY `cod_lote` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notificacion`
--
ALTER TABLE `notificacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `phprecipitacion`
--
ALTER TABLE `phprecipitacion`
  MODIFY `cod_phprecipitacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `radiacion`
--
ALTER TABLE `radiacion`
  MODIFY `cod_radiacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reporte`
--
ALTER TABLE `reporte`
  MODIFY `cod_reporte` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `temphum`
--
ALTER TABLE `temphum`
  MODIFY `codigo_T_H` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `analisis`
--
ALTER TABLE `analisis`
  ADD CONSTRAINT `analisis_ibfk_1` FOREIGN KEY (`cod_lote`) REFERENCES `lote` (`cod_lote`);

--
-- Filtros para la tabla `cosecha`
--
ALTER TABLE `cosecha`
  ADD CONSTRAINT `cosecha_ibfk_1` FOREIGN KEY (`cod_lote`) REFERENCES `lote` (`cod_lote`);

--
-- Filtros para la tabla `lote`
--
ALTER TABLE `lote`
  ADD CONSTRAINT `lote_ibfk_1` FOREIGN KEY (`cod_hacienda`) REFERENCES `hacienda` (`cod_hacienda`) ON DELETE CASCADE;

--
-- Filtros para la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD CONSTRAINT `notificacion_ibfk_1` FOREIGN KEY (`cod_lote`) REFERENCES `lote` (`cod_lote`);

--
-- Filtros para la tabla `phprecipitacion`
--
ALTER TABLE `phprecipitacion`
  ADD CONSTRAINT `phprecipitacion_ibfk_1` FOREIGN KEY (`cod_lote`) REFERENCES `lote` (`cod_lote`);

--
-- Filtros para la tabla `radiacion`
--
ALTER TABLE `radiacion`
  ADD CONSTRAINT `radiacion_ibfk_1` FOREIGN KEY (`cod_lote`) REFERENCES `lote` (`cod_lote`);

--
-- Filtros para la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD CONSTRAINT `reporte_ibfk_1` FOREIGN KEY (`cod_lote`) REFERENCES `lote` (`cod_lote`);

--
-- Filtros para la tabla `temphum`
--
ALTER TABLE `temphum`
  ADD CONSTRAINT `temphum_ibfk_1` FOREIGN KEY (`cod_lote`) REFERENCES `lote` (`cod_lote`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`cod_hacienda`) REFERENCES `hacienda` (`cod_hacienda`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
