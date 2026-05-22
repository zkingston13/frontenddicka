-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-03-2025 a las 21:31:23
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `almacendicka`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `razonSocial` varchar(255) NOT NULL,
  `domicilio` varchar(255) NOT NULL,
  `usuario_id` bigint(20) UNSIGNED NOT NULL,
  `usuarioModificacion` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `razonSocial`, `domicilio`, `usuario_id`, `usuarioModificacion`, `created_at`, `updated_at`) VALUES
(1, 'Sabritas estados unidos', 'Av sabritas del las papas', 1, NULL, '2025-03-04 08:12:36', '2025-03-11 04:40:08'),
(9, 'zapatos Mexico', 'Av zapatos', 1, NULL, '2025-03-06 05:26:34', '2025-03-06 05:26:34'),
(10, 'Alminos mexicanos', 'Av almidones', 1, NULL, '2025-03-08 02:41:43', '2025-03-08 02:41:43'),
(12, 'Almidones Mexicanos S.A. de C.v', 'Calle. 26 No. 2756 Zona Industrial', 1, NULL, '2025-03-11 04:55:29', '2025-03-11 04:55:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs`
--

CREATE TABLE `logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `accion` varchar(255) NOT NULL,
  `tabla_afectada` varchar(255) NOT NULL,
  `registro_id` bigint(20) UNSIGNED DEFAULT NULL,
  `datos_anteriores` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`datos_anteriores`)),
  `datos_nuevos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`datos_nuevos`)),
  `usuario_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `logs`
--

INSERT INTO `logs` (`id`, `accion`, `tabla_afectada`, `registro_id`, `datos_anteriores`, `datos_nuevos`, `usuario_id`, `created_at`, `updated_at`) VALUES
(1, 'create', 'clientes', 5, NULL, '{\"razonSocial\":\"galletitas\",\"domicilio\":\"av galletitaa\",\"usuario_id\":1,\"id\":5}', 1, '2025-03-04 09:39:09', '2025-03-04 09:39:09'),
(2, 'update', 'clientes', 5, '{\"id\":5,\"razonSocial\":\"galletitas\",\"domicilio\":\"av galletitaa\",\"usuario_id\":1,\"usuarioModificacion\":null,\"created_at\":\"2025-03-04T03:39:09.000000Z\",\"updated_at\":\"2025-03-04T03:39:09.000000Z\"}', '{\"domicilio\":\"av galletitaa 2\",\"updated_at\":\"2025-03-04 03:39:25\"}', 1, '2025-03-04 09:39:25', '2025-03-04 09:39:25'),
(3, 'update', 'clientes', 5, '{\"id\":5,\"razonSocial\":\"galletitas\",\"domicilio\":\"av galletitaa 2\",\"usuario_id\":1,\"usuarioModificacion\":null,\"created_at\":\"2025-03-04T03:39:09.000000Z\",\"updated_at\":\"2025-03-04T03:39:25.000000Z\"}', '{\"domicilio\":\"av galletitaa 1\",\"updated_at\":\"2025-03-04 03:39:49\"}', 1, '2025-03-04 09:39:49', '2025-03-04 09:39:49'),
(4, 'delete', 'clientes', 5, '{\"id\":5,\"razonSocial\":\"galletitas\",\"domicilio\":\"av galletitaa 1\",\"usuario_id\":1,\"usuarioModificacion\":null}', NULL, 1, '2025-03-04 09:41:05', '2025-03-04 09:41:05'),
(5, 'create', 'clientes', 6, NULL, '{\"razonSocial\":\"galletitas\",\"domicilio\":\"AV galletas\",\"usuario_id\":1,\"id\":6}', 1, '2025-03-05 04:56:51', '2025-03-05 04:56:51'),
(6, 'update', 'clientes', 6, '{\"id\":6,\"razonSocial\":\"galletitas\",\"domicilio\":\"AV galletas\",\"usuario_id\":1,\"usuarioModificacion\":null,\"created_at\":\"2025-03-04T22:56:51.000000Z\",\"updated_at\":\"2025-03-04T22:56:51.000000Z\"}', '{\"razonSocial\":\"galletitas 1\",\"domicilio\":\"AV galletas 2\",\"updated_at\":\"2025-03-04 22:57:07\"}', 1, '2025-03-05 04:57:07', '2025-03-05 04:57:07'),
(7, 'delete', 'clientes', 6, '{\"id\":6,\"razonSocial\":\"galletitas 1\",\"domicilio\":\"AV galletas 2\",\"usuario_id\":1,\"usuarioModificacion\":null}', NULL, 1, '2025-03-05 04:57:12', '2025-03-05 04:57:12'),
(8, 'create', 'clientes', 7, NULL, '{\"razonSocial\":\"3\",\"domicilio\":\"3\",\"usuario_id\":1,\"id\":7}', 1, '2025-03-05 05:34:21', '2025-03-05 05:34:21'),
(9, 'delete', 'clientes', 7, '{\"id\":7,\"razonSocial\":\"3\",\"domicilio\":\"3\",\"usuario_id\":1,\"usuarioModificacion\":null}', NULL, 1, '2025-03-05 05:34:27', '2025-03-05 05:34:27'),
(10, 'create', 'clientes', 8, NULL, '{\"razonSocial\":\"galletas\",\"domicilio\":\"AV galletas\",\"usuario_id\":1,\"id\":8}', 1, '2025-03-05 08:50:49', '2025-03-05 08:50:49'),
(11, 'delete', 'clientes', 8, '{\"id\":8,\"razonSocial\":\"galletas\",\"domicilio\":\"AV galletas\",\"usuario_id\":1,\"usuarioModificacion\":null}', NULL, 1, '2025-03-05 19:12:57', '2025-03-05 19:12:57'),
(12, 'create', 'usuarios', 2, NULL, '{\"nombre\":\"Nuevo Usuario\",\"nombreUsuario\":\"nuevo_user\",\"numEmpleado\":1002,\"email\":\"nuevo@correo.com\",\"IsActive\":true,\"rol_id\":2,\"id\":2}', 1, '2025-03-05 20:23:37', '2025-03-05 20:23:37'),
(13, 'delete', 'usuarios', 2, '{\"id\":2,\"nombre\":\"Nuevo Usuario\",\"nombreUsuario\":\"nuevo_user\",\"numEmpleado\":1002,\"email\":\"nuevo@correo.com\",\"IsActive\":1,\"rol_id\":2}', NULL, 1, '2025-03-06 04:41:59', '2025-03-06 04:41:59'),
(14, 'create', 'usuarios', 3, NULL, '{\"nombre\":\"Nuevo Usuario\",\"nombreUsuario\":\"Luis\",\"numEmpleado\":1002,\"email\":\"nuevo@correo.com\",\"IsActive\":true,\"rol_id\":1,\"id\":3}', 1, '2025-03-06 04:42:25', '2025-03-06 04:42:25'),
(15, 'update', 'usuarios', 3, '{\"id\":3,\"nombre\":\"Nuevo Usuario\",\"nombreUsuario\":\"Luis\",\"numEmpleado\":1002,\"email\":\"nuevo@correo.com\",\"password\":\"$2y$12$sBfcsbPAYS4t2K2KmnsW6u6Ymw09PE3pS6tBRRCBPAbHmy4hWoq.C\",\"IsActive\":1,\"rol_id\":1,\"created_at\":\"2025-03-05T22:42:25.000000Z\",\"updated_at\":\"2025-03-05T22:42:25.000000Z\"}', '{\"nombreUsuario\":\"vato loco\",\"password\":\"$2y$12$g\\/uqAFLpUNq6bXPidbI8Z.lLJvy.Q2u2DoUr4zbpA4rUpYr5lmZgm\",\"IsActive\":true,\"rol_id\":2,\"updated_at\":\"2025-03-05 22:53:39\"}', 1, '2025-03-06 04:53:39', '2025-03-06 04:53:39'),
(16, 'create', 'clientes', 9, NULL, '{\"razonSocial\":\"zapatos Mexico\",\"domicilio\":\"Av zapatos\",\"usuario_id\":1,\"id\":9}', 1, '2025-03-06 05:26:34', '2025-03-06 05:26:34'),
(17, 'delete', 'productos', 1, '{\"id\":1,\"sku\":\"123456\",\"nombre\":\"Sabritas 200gr\",\"cliente_id\":1,\"propiedades\":\"bolsas\",\"caracteristicas\":\"20 tarimas\",\"usuario_id\":1,\"usuarioModificacion\":null}', NULL, 1, '2025-03-06 05:35:35', '2025-03-06 05:35:35'),
(18, 'delete', 'productos', 1, '{\"id\":1,\"sku\":\"123456\",\"nombre\":\"papas sabritas\",\"cliente_id\":1,\"propiedades\":\"asfsdvfbfb\",\"caracteristicas\":\"xcvVXVXvXCVXCVXD\",\"usuario_id\":1,\"usuarioModificacion\":null}', NULL, 1, '2025-03-06 05:39:51', '2025-03-06 05:39:51'),
(19, 'delete', 'productos', 1, '{\"id\":1,\"sku\":\"sdfsdfsdf\",\"nombre\":\"sdfsdfsdf\",\"cliente_id\":1,\"propiedades\":\"sdfsdfsdfsd\",\"caracteristicas\":\"sdfsdfsdfsdfsd\",\"usuario_id\":1,\"usuarioModificacion\":null}', NULL, 1, '2025-03-06 05:48:58', '2025-03-06 05:48:58'),
(20, 'create', 'productos', 2, NULL, '{\"sku\":\"SKU12345\",\"nombre\":\"Producto de Prueba\",\"cliente_id\":1,\"propiedades\":\"{\\\"color\\\": \\\"rojo\\\", \\\"peso\\\": \\\"500g\\\"}\",\"caracteristicas\":\"{\\\"material\\\": \\\"pl\\u00e1stico\\\"}\",\"usuario_id\":1,\"id\":2}', 1, '2025-03-06 06:54:54', '2025-03-06 06:54:54'),
(21, 'update', 'productos', 2, '{\"id\":2,\"sku\":\"SKU12345\",\"nombre\":\"Producto de Prueba\",\"cliente_id\":1,\"propiedades\":\"{\\\"color\\\": \\\"rojo\\\", \\\"peso\\\": \\\"500g\\\"}\",\"caracteristicas\":\"{\\\"material\\\": \\\"pl\\u00e1stico\\\"}\",\"usuario_id\":1,\"usuarioModificacion\":null,\"created_at\":\"2025-03-06T00:54:54.000000Z\",\"updated_at\":\"2025-03-06T00:54:54.000000Z\"}', '{\"sku\":\"SKU12345-EDITADO\",\"nombre\":\"Producto Actualizado\",\"propiedades\":\"{\\\"color\\\": \\\"azul\\\", \\\"peso\\\": \\\"600g\\\"}\",\"caracteristicas\":\"{\\\"material\\\": \\\"metal\\\"}\",\"usuarioModificacion\":1,\"updated_at\":\"2025-03-06 00:56:36\"}', 1, '2025-03-06 06:56:36', '2025-03-06 06:56:36'),
(22, 'create', 'productos', 3, NULL, '{\"sku\":\"SKU12345-2\",\"nombre\":\"Producto Actualizado\",\"cliente_id\":1,\"propiedades\":\"{\\\"color\\\": \\\"azul\\\", \\\"peso\\\": \\\"600g\\\"}\",\"caracteristicas\":\"{\\\"material\\\": \\\"metal\\\"}\",\"usuario_id\":1,\"id\":3}', 1, '2025-03-06 07:09:18', '2025-03-06 07:09:18'),
(23, 'update', 'productos', 3, '{\"id\":3,\"sku\":\"SKU12345-2\",\"nombre\":\"Producto Actualizado\",\"cliente_id\":1,\"propiedades\":\"{\\\"color\\\": \\\"azul\\\", \\\"peso\\\": \\\"600g\\\"}\",\"caracteristicas\":\"{\\\"material\\\": \\\"metal\\\"}\",\"usuario_id\":1,\"usuarioModificacion\":null,\"created_at\":\"2025-03-06T01:09:18.000000Z\",\"updated_at\":\"2025-03-06T01:09:18.000000Z\"}', '{\"sku\":\"1\",\"usuarioModificacion\":1,\"updated_at\":\"2025-03-06 01:09:47\"}', 1, '2025-03-06 07:09:47', '2025-03-06 07:09:47'),
(24, 'update', 'productos', 3, '{\"id\":3,\"sku\":\"1\",\"nombre\":\"Producto Actualizado\",\"cliente_id\":1,\"propiedades\":\"{\\\"color\\\": \\\"azul\\\", \\\"peso\\\": \\\"600g\\\"}\",\"caracteristicas\":\"{\\\"material\\\": \\\"metal\\\"}\",\"usuario_id\":1,\"usuarioModificacion\":1,\"created_at\":\"2025-03-06T01:09:18.000000Z\",\"updated_at\":\"2025-03-06T01:09:47.000000Z\"}', '{\"sku\":\"20\",\"updated_at\":\"2025-03-06 01:16:55\"}', 1, '2025-03-06 07:16:55', '2025-03-06 07:16:55'),
(25, 'create', 'lotes', 1, NULL, '{\"producto_id\":2,\"lote\":\"Lote123456\",\"caducidad\":\"2025-12-31\",\"numPalets\":10,\"numPiezas\":500,\"unidadMedida\":\"cajas\",\"usuario_id\":1,\"id\":1}', 1, '2025-03-06 20:35:29', '2025-03-06 20:35:29'),
(26, 'create', 'usuarios', 4, NULL, '{\"nombre\":\"Axel aldhir\",\"nombreUsuario\":\"Axel130\",\"numEmpleado\":\"130\",\"email\":\"axel@hotmail.com\",\"IsActive\":true,\"rol_id\":\"1\",\"id\":4}', 1, '2025-03-07 23:05:23', '2025-03-07 23:05:23'),
(27, 'delete', 'usuarios', 3, '{\"id\":3,\"nombre\":\"Nuevo Usuario\",\"nombreUsuario\":\"vato loco\",\"numEmpleado\":1002,\"email\":\"nuevo@correo.com\",\"IsActive\":1,\"rol_id\":2}', NULL, 1, '2025-03-07 23:05:44', '2025-03-07 23:05:44'),
(28, 'update', 'usuarios', 4, '{\"id\":4,\"nombre\":\"Axel aldhir\",\"nombreUsuario\":\"Axel130\",\"numEmpleado\":130,\"email\":\"axel@hotmail.com\",\"IsActive\":1,\"rol_id\":1}', '{\"rol_id\":\"3\"}', 1, '2025-03-07 23:07:36', '2025-03-07 23:07:36'),
(29, 'update', 'productos', 2, '{\"id\":2,\"sku\":\"123456\",\"nombre\":\"Sabritas 20gr\",\"cliente_id\":1,\"propiedades\":\"{\\\"color\\\": \\\"azul\\\", \\\"peso\\\": \\\"600g\\\"}\",\"caracteristicas\":\"{\\\"material\\\": \\\"metal\\\"}\",\"usuario_id\":1,\"usuarioModificacion\":1}', '{\"sku\":\"1234567\"}', 1, '2025-03-08 00:20:12', '2025-03-08 00:20:12'),
(30, 'update', 'productos', 3, '{\"id\":3,\"sku\":\"20\",\"nombre\":\"Producto Actualizado\",\"cliente_id\":1,\"propiedades\":\"{\\\"color\\\": \\\"azul\\\", \\\"peso\\\": \\\"600g\\\"}\",\"caracteristicas\":\"{\\\"material\\\": \\\"metal\\\"}\",\"usuario_id\":1,\"usuarioModificacion\":1}', '{\"sku\":\"2301\",\"nombre\":\"CErvezas\",\"propiedades\":\"250ml\",\"caracteristicas\":\"vidrio\"}', 1, '2025-03-08 00:21:17', '2025-03-08 00:21:17'),
(31, 'update', 'productos', 2, '{\"id\":2,\"sku\":\"1234567\",\"nombre\":\"Sabritas 20gr\",\"cliente_id\":1,\"propiedades\":\"{\\\"color\\\": \\\"azul\\\", \\\"peso\\\": \\\"600g\\\"}\",\"caracteristicas\":\"{\\\"material\\\": \\\"metal\\\"}\",\"usuario_id\":1,\"usuarioModificacion\":1}', '{\"propiedades\":\"600gr\",\"caracteristicas\":\"caja\"}', 1, '2025-03-08 00:25:53', '2025-03-08 00:25:53'),
(32, 'create', 'productos', 4, NULL, '{\"sku\":\"zfzczxvzxczx\",\"nombre\":\"asfasfasfasfa\",\"cliente_id\":\"1\",\"propiedades\":\"afsafasfasf\",\"caracteristicas\":\"asfasfasfasf\",\"usuario_id\":1,\"id\":4}', 1, '2025-03-08 00:26:14', '2025-03-08 00:26:14'),
(33, 'delete', 'productos', 4, '{\"id\":4,\"sku\":\"zfzczxvzxczx\",\"nombre\":\"asfasfasfasfa\",\"cliente_id\":1,\"propiedades\":\"afsafasfasf\",\"caracteristicas\":\"asfasfasfasf\",\"usuario_id\":1,\"usuarioModificacion\":null}', NULL, 1, '2025-03-08 00:26:19', '2025-03-08 00:26:19'),
(34, 'create', 'lotes', 2, NULL, '{\"producto_id\":\"2\",\"lote\":\"6516561616\",\"caducidad\":\"2029-06-12\",\"numPalets\":\"100\",\"numPiezas\":\"50000\",\"unidadMedida\":\"litros\",\"usuario_id\":1,\"id\":2}', 1, '2025-03-08 01:02:56', '2025-03-08 01:02:56'),
(35, 'update', 'lotes', 2, '{\"id\":2,\"producto_id\":2,\"lote\":\"6516561616\",\"caducidad\":\"2029-06-12\",\"numPalets\":100,\"numPiezas\":50000,\"unidadMedida\":\"litros\",\"usuario_id\":1,\"usuarioModificacion\":null}', '{\"unidadMedida\":\"cajas grandes\",\"usuarioModificacion\":1}', 1, '2025-03-08 01:03:14', '2025-03-08 01:03:14'),
(36, 'update', 'lotes', 1, '{\"id\":1,\"producto_id\":2,\"lote\":\"Lote123456\",\"caducidad\":\"2025-12-31\",\"numPalets\":10,\"numPiezas\":500,\"unidadMedida\":\"cajas\",\"usuario_id\":1,\"usuarioModificacion\":null}', '{\"producto_id\":\"3\",\"usuarioModificacion\":1}', 1, '2025-03-08 02:32:41', '2025-03-08 02:32:41'),
(37, 'create', 'productos', 5, NULL, '{\"sku\":\"10000\",\"nombre\":\"tekila\",\"cliente_id\":\"1\",\"propiedades\":\"1L\",\"caracteristicas\":\"vidrio\",\"usuario_id\":1,\"id\":5}', 1, '2025-03-08 02:33:24', '2025-03-08 02:33:24'),
(38, 'delete', 'productos', 5, '{\"id\":5,\"sku\":\"10000\",\"nombre\":\"tekila\",\"cliente_id\":1,\"propiedades\":\"1L\",\"caracteristicas\":\"vidrio\",\"usuario_id\":1,\"usuarioModificacion\":null}', NULL, 1, '2025-03-08 02:33:32', '2025-03-08 02:33:32'),
(39, 'delete', 'usuarios', 4, '{\"id\":4,\"nombre\":\"Axel aldhir\",\"nombreUsuario\":\"Axel130\",\"numEmpleado\":130,\"email\":\"axel@hotmail.com\",\"IsActive\":1,\"rol_id\":3}', NULL, 1, '2025-03-08 02:35:44', '2025-03-08 02:35:44'),
(40, 'create', 'clientes', 10, NULL, '{\"razonSocial\":\"Alminos mexicanos\",\"domicilio\":\"Av almidones\",\"usuario_id\":1,\"id\":10}', 1, '2025-03-08 02:41:43', '2025-03-08 02:41:43'),
(41, 'create', 'productos', 6, NULL, '{\"sku\":\"12345676464\",\"nombre\":\"almidon\",\"cliente_id\":\"10\",\"propiedades\":\"fecula de maiz\",\"caracteristicas\":\"polvo\",\"usuario_id\":1,\"id\":6}', 1, '2025-03-08 02:42:29', '2025-03-08 02:42:29'),
(42, 'update', 'lotes', 1, '{\"id\":1,\"producto_id\":3,\"lote\":\"Lote123456\",\"caducidad\":\"2025-12-31\",\"numPalets\":10,\"numPiezas\":500,\"unidadMedida\":\"cajas\",\"usuario_id\":1,\"usuarioModificacion\":1}', '{\"unidadMedida\":\"cajas grandes\"}', 1, '2025-03-11 03:39:15', '2025-03-11 03:39:15'),
(43, 'create', 'lotes', 3, NULL, '{\"producto_id\":\"2\",\"lote\":\"lote 1\",\"caducidad\":\"2025-03-10\",\"numPalets\":\"1000\",\"numPiezas\":\"500\",\"unidadMedida\":\"Kg\",\"usuario_id\":1,\"id\":3}', 1, '2025-03-11 03:39:49', '2025-03-11 03:39:49'),
(44, 'update', 'productos', 3, '{\"id\":3,\"sku\":\"2301\",\"nombre\":\"CErvezas\",\"cliente_id\":1,\"propiedades\":\"250ml\",\"caracteristicas\":\"vidrio\",\"usuario_id\":1,\"usuarioModificacion\":1}', '{\"nombre\":\"Cervezas\"}', 1, '2025-03-11 03:40:14', '2025-03-11 03:40:14'),
(45, 'create', 'productos', 7, NULL, '{\"sku\":\"2232323232\",\"nombre\":\"Agluitnante\",\"cliente_id\":\"9\",\"propiedades\":\"liquido\",\"caracteristicas\":\"tambos 200kg\",\"usuario_id\":1,\"id\":7}', 1, '2025-03-11 03:40:55', '2025-03-11 03:40:55'),
(46, 'create', 'clientes', 11, NULL, '{\"razonSocial\":\"almidones mexico\",\"domicilio\":\"Calle almidones\",\"usuario_id\":1,\"id\":11}', 1, '2025-03-11 03:41:37', '2025-03-11 03:41:37'),
(47, 'create', 'usuarios', 5, NULL, '{\"nombre\":\"Rosa Isela\",\"nombreUsuario\":\"Rosa01\",\"numEmpleado\":3087,\"email\":\"gdl.inventarios@dickalogistic.com.mx\",\"IsActive\":true,\"rol_id\":\"3\",\"id\":5}', 1, '2025-03-11 03:48:16', '2025-03-11 03:48:16'),
(48, 'update', 'clientes', 1, '{\"id\":1,\"razonSocial\":\"Sabritas Mexico\",\"domicilio\":\"Av sabritas del las papas\",\"usuario_id\":1,\"usuarioModificacion\":null}', '{\"razonSocial\":\"Sabritas estados unidos\"}', 1, '2025-03-11 04:40:08', '2025-03-11 04:40:08'),
(49, 'delete', 'clientes', 11, '{\"id\":11,\"razonSocial\":\"almidones mexico\",\"domicilio\":\"Calle almidones\",\"usuario_id\":1,\"usuarioModificacion\":null}', NULL, 1, '2025-03-11 04:41:47', '2025-03-11 04:41:47'),
(50, 'create', 'productos', 8, NULL, '{\"sku\":\"100-013-603\",\"nombre\":\"Kristal 300 R|BP\",\"cliente_id\":\"1\",\"propiedades\":\"AZUCAR\",\"caracteristicas\":\"SACO\",\"usuario_id\":1,\"id\":8}', 1, '2025-03-11 04:52:59', '2025-03-11 04:52:59'),
(51, 'create', 'clientes', 12, NULL, '{\"razonSocial\":\"Almidones Mexicanos S.A. de C.v\",\"domicilio\":\"Calle. 26 No. 2756 Zona Industrial\",\"usuario_id\":1,\"id\":12}', 1, '2025-03-11 04:55:29', '2025-03-11 04:55:29'),
(52, 'update', 'productos', 8, '{\"id\":8,\"sku\":\"100-013-603\",\"nombre\":\"Kristal 300 R|BP\",\"cliente_id\":1,\"propiedades\":\"AZUCAR\",\"caracteristicas\":\"SACO\",\"usuario_id\":1,\"usuarioModificacion\":null}', '{\"cliente_id\":\"12\",\"usuarioModificacion\":1}', 1, '2025-03-11 04:55:55', '2025-03-11 04:55:55'),
(53, 'update', 'productos', 8, '{\"id\":8,\"sku\":\"100-013-603\",\"nombre\":\"Kristal 300 R|BP\",\"cliente_id\":12,\"propiedades\":\"AZUCAR\",\"caracteristicas\":\"SACO\",\"usuario_id\":1,\"usuarioModificacion\":1}', '{\"nombre\":\"Krystar 300 R|BP\"}', 1, '2025-03-11 05:03:35', '2025-03-11 05:03:35'),
(54, 'create', 'lotes', 4, NULL, '{\"folio\":\"1890\",\"producto_id\":\"8\",\"lote\":\"LA24K93012\",\"caducidad\":\"2027-10-10\",\"numPalets\":\"18\",\"numPiezas\":\"840\",\"unidadMedida\":\"22.5Kg\",\"fechaRecibido\":\"2025-03-10\",\"observaciones\":null,\"usuario_id\":1,\"id\":4}', 1, '2025-03-11 06:00:47', '2025-03-11 06:00:47'),
(55, 'update', 'lotes', 4, '{\"id\":4,\"folio\":1890,\"producto_id\":8,\"lote\":\"LA24K93012\",\"caducidad\":\"2027-10-10\",\"numPalets\":18,\"numPiezas\":840,\"unidadMedida\":\"22.5Kg\",\"fechaRecibido\":\"2025-03-10\",\"observaciones\":null,\"usuario_id\":1,\"usuarioModificacion\":null}', '{\"observaciones\":\"n\\/a\",\"usuarioModificacion\":1}', 1, '2025-03-11 06:03:11', '2025-03-11 06:03:11'),
(56, 'update', 'lotes', 4, '{\"id\":4,\"folio\":1890,\"producto_id\":8,\"lote\":\"LA24K93012\",\"caducidad\":\"2027-10-10\",\"numPalets\":18,\"numPiezas\":840,\"unidadMedida\":\"22.5Kg\",\"fechaRecibido\":\"2025-03-10\",\"observaciones\":\"n\\/a\",\"usuario_id\":1,\"usuarioModificacion\":1}', '{\"observaciones\":\"swswwszwsws\"}', 1, '2025-03-12 02:20:35', '2025-03-12 02:20:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lotes`
--

CREATE TABLE `lotes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `folio` int(11) NOT NULL,
  `producto_id` bigint(20) UNSIGNED NOT NULL,
  `lote` varchar(100) NOT NULL,
  `caducidad` varchar(50) NOT NULL,
  `numPalets` int(11) NOT NULL,
  `numPiezas` int(11) NOT NULL,
  `unidadMedida` varchar(20) NOT NULL,
  `fechaRecibido` date NOT NULL DEFAULT '2025-03-10',
  `observaciones` text DEFAULT NULL,
  `usuario_id` bigint(20) UNSIGNED NOT NULL,
  `usuarioModificacion` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `lotes`
--

INSERT INTO `lotes` (`id`, `folio`, `producto_id`, `lote`, `caducidad`, `numPalets`, `numPiezas`, `unidadMedida`, `fechaRecibido`, `observaciones`, `usuario_id`, `usuarioModificacion`, `created_at`, `updated_at`) VALUES
(1, 0, 3, 'Lote123456', '2025-12-31', 10, 500, 'cajas grandes', '2025-03-10', '10 cajas dañadas en pallet 18', 1, 1, '2025-03-06 20:35:29', '2025-03-11 03:39:15'),
(3, 0, 2, 'lote 1', '2025-03-10', 1000, 500, 'Kg', '2025-03-10', NULL, 1, NULL, '2025-03-11 03:39:49', '2025-03-11 03:39:49'),
(4, 1890, 8, 'LA24K93012', '2027-10-10', 18, 840, '22.5Kg', '2025-03-10', 'swswwszwsws', 1, 1, '2025-03-11 06:00:47', '2025-03-12 02:20:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lote_ubicacions`
--

CREATE TABLE `lote_ubicacions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lote_id` bigint(20) UNSIGNED NOT NULL,
  `ubicacions_id` bigint(20) UNSIGNED NOT NULL,
  `piezasRecibida` int(11) NOT NULL,
  `totalUbicaciones` int(11) NOT NULL,
  `piezasEntregadas` int(11) NOT NULL,
  `piezasAlmacen` int(11) NOT NULL,
  `usuario_id` bigint(20) UNSIGNED NOT NULL,
  `usuarioModificacion` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `lote_ubicacions`
--

INSERT INTO `lote_ubicacions` (`id`, `lote_id`, `ubicacions_id`, `piezasRecibida`, `totalUbicaciones`, `piezasEntregadas`, `piezasAlmacen`, `usuario_id`, `usuarioModificacion`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 500, 10, 0, 500, 1, NULL, '2025-03-07 02:44:43', NULL),
(2, 1, 2, 500, 10, 0, 500, 1, NULL, '2025-03-07 04:00:09', NULL),
(3, 1, 3, 500, 10, 0, 500, 1, NULL, '2025-03-07 04:00:09', NULL),
(4, 1, 4, 500, 10, 0, 500, 1, NULL, '2025-03-07 04:00:09', NULL),
(5, 1, 5, 500, 10, 0, 500, 1, NULL, '2025-03-07 04:00:09', NULL),
(6, 1, 6, 500, 10, 0, 500, 1, NULL, '2025-03-07 04:00:09', NULL),
(7, 1, 7, 500, 10, 0, 500, 1, NULL, '2025-03-07 04:00:09', NULL),
(8, 1, 8, 500, 10, 0, 500, 1, NULL, '2025-03-07 04:00:09', NULL),
(9, 1, 9, 500, 10, 0, 500, 1, NULL, '2025-03-07 04:00:09', NULL),
(10, 1, 10, 500, 10, 0, 500, 1, NULL, '2025-03-07 04:00:09', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000001_create_cache_table', 1),
(2, '0001_01_01_000002_create_jobs_table', 1),
(3, 'a2025_02_10_013557_create_rols_table', 1),
(4, 'b2025_02_10_013757_create_ubicacions_table', 1),
(5, 'c2025_02_10_013704_create_transportes_table', 1),
(6, 'd2025_02_10_005532_create_usuarios_table', 1),
(7, 'e2025_02_10_005656_create_clientes_table', 1),
(8, 'f2025_02_10_013337_create_productos_table', 1),
(9, 'g2025_02_10_011755_create_lotes_table', 1),
(10, 'h2025_02_10_010328_create_lote_ubicacions_table', 1),
(11, 'i2025_02_10_013621_create_salidas_table', 1),
(15, '2025_03_01_221505_create_sessions_table', 3),
(16, '2025_03_03_005750_create_personal_access_tokens_table', 4),
(17, '2025_03_03_012430_create_personal_access_tokens_table', 5),
(18, '2025_03_01_192130_create_logs_table', 6),
(19, '2025_03_10_215521_add_columns_to_lotes_table', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(92, 'App\\Models\\Usuario', 1, 'auth_token', '461057c5f6d818435e3570b281759aa2eb4b4536e91f3ad2bd52ef2fad679e36', '[\"*\"]', '2025-03-07 08:52:26', NULL, '2025-03-06 20:35:14', '2025-03-07 08:52:26'),
(93, 'App\\Models\\Usuario', 1, 'auth_token', '0831128307106edd885951910d976924f4af0817fecee549acac37cb2dff8a55', '[\"*\"]', NULL, NULL, '2025-03-06 20:45:55', '2025-03-06 20:45:55'),
(94, 'App\\Models\\Usuario', 1, 'auth_token', '52c084174bedb61e3e5938179ec61914da66f129ba3ab1dbddfa124a53ff7258', '[\"*\"]', NULL, NULL, '2025-03-07 07:19:33', '2025-03-07 07:19:33'),
(95, 'App\\Models\\Usuario', 1, 'auth_token', '746779d4c1862323260ed3bca0ed582158445fdd725d62ccd34c3e623fd9d23c', '[\"*\"]', NULL, NULL, '2025-03-07 07:19:41', '2025-03-07 07:19:41'),
(96, 'App\\Models\\Usuario', 1, 'auth_token', '9addcd645469c3685950088d9d991ebb8fd50a905c394ef224ca2c4a8ca899e9', '[\"*\"]', NULL, NULL, '2025-03-07 07:19:43', '2025-03-07 07:19:43'),
(97, 'App\\Models\\Usuario', 1, 'auth_token', '2e62261dd206156436acdecf0f1d2f2e7c97e7207ea39a8f29c7d22e8c337bf8', '[\"*\"]', NULL, NULL, '2025-03-07 07:19:44', '2025-03-07 07:19:44'),
(98, 'App\\Models\\Usuario', 1, 'auth_token', 'fe3883291aa8d317a89fcbe701edd0b626922d3f02764595eafe151da5728ad5', '[\"*\"]', NULL, NULL, '2025-03-07 07:19:44', '2025-03-07 07:19:44'),
(99, 'App\\Models\\Usuario', 1, 'auth_token', 'e4f51e5d06c34e5d297e2395fa0d80ea791215d122bd55a59039fc01dd133c5a', '[\"*\"]', NULL, NULL, '2025-03-07 07:19:55', '2025-03-07 07:19:55'),
(100, 'App\\Models\\Usuario', 1, 'auth_token', 'bd530c53521f92efb2017a05a4056d8a33432dc752465548a563bbf08f4b750c', '[\"*\"]', NULL, NULL, '2025-03-07 07:49:31', '2025-03-07 07:49:31'),
(101, 'App\\Models\\Usuario', 1, 'auth_token', 'df5d5fd5a6294d535faec23339ee375868105ed41ddbff6f34bb494df77ccecb', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:12', '2025-03-07 07:56:12'),
(102, 'App\\Models\\Usuario', 1, 'auth_token', '5da36045b3e03a586c9834dabc2b6841748139e84104201cbb5068b2aa25a377', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:35', '2025-03-07 07:56:35'),
(103, 'App\\Models\\Usuario', 1, 'auth_token', 'd9ab16638a0b229c2d8fd232e9cf3ff9f056c39a34504c6f06a1d3f8dd64cfdf', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:40', '2025-03-07 07:56:40'),
(104, 'App\\Models\\Usuario', 1, 'auth_token', '896264aa22bf7cd66ff74639470b85b8d95218791e24399b97f4d523b9db4d31', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:42', '2025-03-07 07:56:42'),
(105, 'App\\Models\\Usuario', 1, 'auth_token', '17ec37ad50402170c94ae7fc64f24c783fdcb27a03a17783a2ac8a24e607f76f', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:42', '2025-03-07 07:56:42'),
(106, 'App\\Models\\Usuario', 1, 'auth_token', 'effa1fb1a194f77491f4bb6921deadf0751faf771fb7e42f623dc9b1dfcaaa1f', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:43', '2025-03-07 07:56:43'),
(107, 'App\\Models\\Usuario', 1, 'auth_token', '33103eb1f7ac79eaf1205b4002d76f25fad924c6184c4f851070dca29a4e24ef', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:44', '2025-03-07 07:56:44'),
(108, 'App\\Models\\Usuario', 1, 'auth_token', 'c0f271417a626df78bb8bb0979fb23467c3f2875d297ed9b0bb416fd9b402363', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:46', '2025-03-07 07:56:46'),
(109, 'App\\Models\\Usuario', 1, 'auth_token', '293f177fde802ec498a37157764bb0771dcabe54bccf4b0953174fe27e736af2', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:47', '2025-03-07 07:56:47'),
(110, 'App\\Models\\Usuario', 1, 'auth_token', '022a74abb2c5d80bdd934c9c434ddc77bdff8922bcd52ae5365c88ed27cf989f', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:48', '2025-03-07 07:56:48'),
(111, 'App\\Models\\Usuario', 1, 'auth_token', '388b20cafdacef7017be8a2b1c32a1d38594a7a5f6a6c85469ad9896b613ecdf', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:48', '2025-03-07 07:56:48'),
(112, 'App\\Models\\Usuario', 1, 'auth_token', '17f8946ce0c69f1f8483bd477307722ef2f0ce0b92195acb2c10db4af60eb008', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:49', '2025-03-07 07:56:49'),
(113, 'App\\Models\\Usuario', 1, 'auth_token', '398b4cb68013d4b917326122ec68a99cbef6976f196d438d8494ba15993787d1', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:50', '2025-03-07 07:56:50'),
(114, 'App\\Models\\Usuario', 1, 'auth_token', '7fd8a77ea9ba6adf05c4efe416e67a5c571f8bcd6d539c1b1b5cd2859df9c9fc', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:50', '2025-03-07 07:56:50'),
(115, 'App\\Models\\Usuario', 1, 'auth_token', 'f65e988c914b5e1940ed1646e4f8e37bc39aa60cab9a4ae29c7ce46ff78e39ea', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:51', '2025-03-07 07:56:51'),
(116, 'App\\Models\\Usuario', 1, 'auth_token', '373008e3e8661b145cbc22630db610789bb5862f3010d663234f218a0baf7d1d', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:51', '2025-03-07 07:56:51'),
(117, 'App\\Models\\Usuario', 1, 'auth_token', '5655bfb3c1420e28a489de664ced007a413ff7d4548a9e9df7950608025a85bf', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:52', '2025-03-07 07:56:52'),
(118, 'App\\Models\\Usuario', 1, 'auth_token', 'fd18f5fc5e539986e093dfc1026e7f51a0be82aa55923287e8a4adadfac5d694', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:53', '2025-03-07 07:56:53'),
(119, 'App\\Models\\Usuario', 1, 'auth_token', '07984f5d13303ba1c63d05888bb78f122dd14e07d0d81797ed78e4bd042019e9', '[\"*\"]', NULL, NULL, '2025-03-07 07:56:53', '2025-03-07 07:56:53'),
(120, 'App\\Models\\Usuario', 1, 'auth_token', '6b8838966262abb572e8ffd0bc1d430e0be29f5b2a630b603b249b21ffc80ce2', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:33', '2025-03-07 07:57:33'),
(121, 'App\\Models\\Usuario', 1, 'auth_token', '482c3ee7e1aa74b0f0b4bc371f2964701dd8aaf28ddff7c2c8e315b91b261d81', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:35', '2025-03-07 07:57:35'),
(122, 'App\\Models\\Usuario', 1, 'auth_token', '3774570960e518b54d4c876750ddb21d560644883d690a861662be1d4cc4b0a6', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:36', '2025-03-07 07:57:36'),
(123, 'App\\Models\\Usuario', 1, 'auth_token', '1fb4bc469d1d751e223191e281d9502f70f920197ac7ad2a5c2479f1f568cd81', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:36', '2025-03-07 07:57:36'),
(124, 'App\\Models\\Usuario', 1, 'auth_token', '19499d6eb1cecc9abf3672803e200ee60b90e37c2ca5d407499ce7c82697f98a', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:37', '2025-03-07 07:57:37'),
(125, 'App\\Models\\Usuario', 1, 'auth_token', 'e5df62895f0588966ad1020377219a97691b67c13780a0a8405656eee97b1052', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:38', '2025-03-07 07:57:38'),
(126, 'App\\Models\\Usuario', 1, 'auth_token', '3674fe86969b51cbadd2825829cc34169d57d52dcd1b2b4b35b4de7f029a2447', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:40', '2025-03-07 07:57:40'),
(127, 'App\\Models\\Usuario', 1, 'auth_token', '92f000cb97272566f240e25705325a5d60b3208ba9caec469b802582659e2061', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:41', '2025-03-07 07:57:41'),
(128, 'App\\Models\\Usuario', 1, 'auth_token', 'd5b4967e854731d1a38fed9365e30eaedb1bbc825043cc0c84bd7ba09ed2470b', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:42', '2025-03-07 07:57:42'),
(129, 'App\\Models\\Usuario', 1, 'auth_token', 'b7bc137550cac44d3ebd698d91fa38468fe0fc932c003f0acf601d8aaea8361c', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:43', '2025-03-07 07:57:43'),
(130, 'App\\Models\\Usuario', 1, 'auth_token', 'd81a6c5f8dcebb84339f60df8883c6b7d33325eea5108ed68a28940e775195fd', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:43', '2025-03-07 07:57:43'),
(131, 'App\\Models\\Usuario', 1, 'auth_token', '201880cf16f3d6b5e385b05f484a7c2243413fbad693876b9cf9411152243d7f', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:44', '2025-03-07 07:57:44'),
(132, 'App\\Models\\Usuario', 1, 'auth_token', 'c7a5ad97f01a0f83b4bee5b2daeb196fa4648b3e9a89a05b698435ee4785ddeb', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:44', '2025-03-07 07:57:44'),
(133, 'App\\Models\\Usuario', 1, 'auth_token', '1444dbc780776d1e3f7b36c2521110309086c5789d1a8d4ae0fe81d38743e1c5', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:45', '2025-03-07 07:57:45'),
(134, 'App\\Models\\Usuario', 1, 'auth_token', '31ad4cc7ec5c9dd966cfdcf8bef35eb3fdeced1afbd7829c7f0e6f14bf560433', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:46', '2025-03-07 07:57:46'),
(135, 'App\\Models\\Usuario', 1, 'auth_token', 'cfe12f36fb8d3e91e1a54f1913d3c21179a28687d109601abcda82fdd6665415', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:46', '2025-03-07 07:57:46'),
(136, 'App\\Models\\Usuario', 1, 'auth_token', 'b76ea1a17096a116a31719e340387494c36435a3772cb28f7530256541720588', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:47', '2025-03-07 07:57:47'),
(137, 'App\\Models\\Usuario', 1, 'auth_token', '3efc1cb3f6557f010dca6602e66a888d964939f1473adb7adc116c63c7836a23', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:47', '2025-03-07 07:57:47'),
(138, 'App\\Models\\Usuario', 1, 'auth_token', '2e4b17cf19be8af59824a3c282656c0d24c57b1811630f6ee34bea2d03e002a2', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:48', '2025-03-07 07:57:48'),
(139, 'App\\Models\\Usuario', 1, 'auth_token', '9b4e8b5a12dc5b225e770b201498977365b45c0b344edc39ab81195a646261b2', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:49', '2025-03-07 07:57:49'),
(140, 'App\\Models\\Usuario', 1, 'auth_token', 'e21d5a004eb1bc4ccd237b11f83c013c96dee0cf163fd8b90181122970f9afe8', '[\"*\"]', NULL, NULL, '2025-03-07 07:57:49', '2025-03-07 07:57:49'),
(141, 'App\\Models\\Usuario', 1, 'auth_token', '051df5dd6f3affb7e869dcfb30cb4169352e36af36e5271b320df43bf86cf972', '[\"*\"]', NULL, NULL, '2025-03-07 08:03:15', '2025-03-07 08:03:15'),
(142, 'App\\Models\\Usuario', 1, 'auth_token', 'd8a79cb94436d6d598ca2833199aca11f904383630e808097350fab1a5b83e16', '[\"*\"]', NULL, NULL, '2025-03-07 08:04:06', '2025-03-07 08:04:06'),
(143, 'App\\Models\\Usuario', 1, 'auth_token', '2a677a29e5d1adefa3479bd55927c37fc076107e0b9679988a7ac78299d4e4e5', '[\"*\"]', NULL, NULL, '2025-03-07 08:21:34', '2025-03-07 08:21:34'),
(144, 'App\\Models\\Usuario', 1, 'auth_token', 'f6f0bf570571644b864b9e3211de0ae8b4dd1db45b18994d1afacdf436bfa825', '[\"*\"]', NULL, NULL, '2025-03-07 08:21:44', '2025-03-07 08:21:44'),
(145, 'App\\Models\\Usuario', 1, 'auth_token', '35482d93be70cb1e35863308e037b0afcfe2f321115039eecc787ebebd1e97bb', '[\"*\"]', NULL, NULL, '2025-03-07 08:22:16', '2025-03-07 08:22:16'),
(146, 'App\\Models\\Usuario', 1, 'auth_token', 'fc8fc216088c511dd18ffbe4b7252626c91c9dac2b812a91c9bb459c5d789005', '[\"*\"]', NULL, NULL, '2025-03-07 08:22:47', '2025-03-07 08:22:47'),
(147, 'App\\Models\\Usuario', 1, 'auth_token', 'afbe736a36df928aa666f7dd4333df98b17272858454e5b3ad961833a350d011', '[\"*\"]', NULL, NULL, '2025-03-07 08:23:01', '2025-03-07 08:23:01'),
(148, 'App\\Models\\Usuario', 1, 'auth_token', '3d1d9692d8cfe87b4f5fbb4277462ebbd77efc071c950ecab0005270403410cd', '[\"*\"]', NULL, NULL, '2025-03-07 08:23:02', '2025-03-07 08:23:02'),
(149, 'App\\Models\\Usuario', 1, 'auth_token', 'f06156391f9e16b173d73a11e5d44dfc25c5c1f1888ec54ab9a063e2b36f0027', '[\"*\"]', NULL, NULL, '2025-03-07 08:23:04', '2025-03-07 08:23:04'),
(150, 'App\\Models\\Usuario', 1, 'auth_token', '89388357f8809dfd33d8ac71f7fdd350e05d096c5b2722b96a3a3d6f8e044aa0', '[\"*\"]', NULL, NULL, '2025-03-07 08:23:05', '2025-03-07 08:23:05'),
(151, 'App\\Models\\Usuario', 1, 'auth_token', '90a1a8d1ad6b9f5ef60b0fbe1612c2361cb79cb6feccd686119aea9396ebc2b7', '[\"*\"]', NULL, NULL, '2025-03-07 08:23:05', '2025-03-07 08:23:05'),
(152, 'App\\Models\\Usuario', 1, 'auth_token', 'b2b8319c7e5ca7bda8c00b10baed856eb1039c06205eeb68a2fe0d8dbc730ec7', '[\"*\"]', NULL, NULL, '2025-03-07 08:23:06', '2025-03-07 08:23:06'),
(153, 'App\\Models\\Usuario', 1, 'auth_token', 'bfc5f4ced2020f939206b8b79a01f3a9ee402bf20064b8eb9c5f0fa7e4f35f72', '[\"*\"]', NULL, NULL, '2025-03-07 08:23:07', '2025-03-07 08:23:07'),
(154, 'App\\Models\\Usuario', 1, 'auth_token', '11042788a6a50fd559b632a5da8fbe4137e1a0818aac3bf1f0176ef2cffe8ad6', '[\"*\"]', NULL, NULL, '2025-03-07 08:23:07', '2025-03-07 08:23:07'),
(155, 'App\\Models\\Usuario', 1, 'auth_token', '100b6b982740f0e5c242968f9887360e964459df3615bbe7ef124833df8591c9', '[\"*\"]', NULL, NULL, '2025-03-07 08:23:08', '2025-03-07 08:23:08'),
(156, 'App\\Models\\Usuario', 1, 'auth_token', '15ecd1cee80ddc23ec2001a30b8cbcbb2216e563fe86268cc1b9b22907e3f5d4', '[\"*\"]', NULL, NULL, '2025-03-07 08:23:08', '2025-03-07 08:23:08'),
(157, 'App\\Models\\Usuario', 1, 'auth_token', '62afb93733ec15fc5586c1f7ad827207aecf014de4c34b7236d1b8c706af1045', '[\"*\"]', NULL, NULL, '2025-03-07 08:23:09', '2025-03-07 08:23:09'),
(158, 'App\\Models\\Usuario', 1, 'auth_token', '361305e5692b5fca719a4682bbca76211cbdb51197ae2eb545ad8cc1dac97dfa', '[\"*\"]', NULL, NULL, '2025-03-07 08:26:57', '2025-03-07 08:26:57'),
(159, 'App\\Models\\Usuario', 1, 'auth_token', '0c4e2f6f0b334ce565fe195c5a0c68617c1c920619d5e06c4171f8d13b662c09', '[\"*\"]', NULL, NULL, '2025-03-07 08:29:19', '2025-03-07 08:29:19'),
(160, 'App\\Models\\Usuario', 1, 'auth_token', '838b6162c3acebd558c99b6efed881435ddd6a79776ff6f00980735b24bab73a', '[\"*\"]', NULL, NULL, '2025-03-07 08:30:20', '2025-03-07 08:30:20'),
(161, 'App\\Models\\Usuario', 1, 'auth_token', '3143bcddd2a83c64264193adf95ac247a5b1b7793d93759ad790d8ebb573e888', '[\"*\"]', NULL, NULL, '2025-03-07 08:34:37', '2025-03-07 08:34:37'),
(162, 'App\\Models\\Usuario', 1, 'auth_token', '9ed1ac55fa924e2f1d4bd2b9fab39e7ee3b3fc2c35dccbcd66f6109fa7208335', '[\"*\"]', NULL, NULL, '2025-03-07 08:39:49', '2025-03-07 08:39:49'),
(163, 'App\\Models\\Usuario', 1, 'auth_token', '0941c6b5cc3a1edf2f031f4f75e21b0aeac6456181626cc793d39ef2e36d66b4', '[\"*\"]', '2025-03-07 08:51:35', NULL, '2025-03-07 08:39:50', '2025-03-07 08:51:35'),
(164, 'App\\Models\\Usuario', 1, 'auth_token', 'ff25904178baef5965e3d820159e89b8f8f74439d2698d455f15af123aeccbdb', '[\"*\"]', '2025-03-07 08:52:05', NULL, '2025-03-07 08:51:44', '2025-03-07 08:52:05'),
(165, 'App\\Models\\Usuario', 1, 'auth_token', 'cc8d473c7a8b2c0fca7e895afa32e5c99d3f83c7f005c19d4c9b2919ec68c9e8', '[\"*\"]', '2025-03-07 22:49:04', NULL, '2025-03-07 08:52:35', '2025-03-07 22:49:04'),
(166, 'App\\Models\\Usuario', 1, 'auth_token', '7fa0f7370fc5d0372a6ff13059d66fde173e0e7f7d73437d3fce9eab159b6263', '[\"*\"]', '2025-03-07 09:37:46', NULL, '2025-03-07 09:06:59', '2025-03-07 09:37:46'),
(167, 'App\\Models\\Usuario', 1, 'auth_token', 'de0364cbd64c0763dc3f05ea85ffde5baadb99629004c22f2398b914c18fbaef', '[\"*\"]', '2025-03-07 10:17:00', NULL, '2025-03-07 09:37:51', '2025-03-07 10:17:00'),
(168, 'App\\Models\\Usuario', 1, 'auth_token', '30df3e6a72ed6ce0260446aed822f58deb607af1791d30a463e5ee162a8f09d1', '[\"*\"]', NULL, NULL, '2025-03-07 10:12:09', '2025-03-07 10:12:09'),
(169, 'App\\Models\\Usuario', 1, 'auth_token', 'b447db27864ee33f4c03950ec584751aa98738fcdc9ca67f2392a1a0ab9fdb5a', '[\"*\"]', NULL, NULL, '2025-03-07 10:12:33', '2025-03-07 10:12:33'),
(170, 'App\\Models\\Usuario', 1, 'auth_token', 'c4e4206946dc9481df6936831c9abaa642754491581db4a9f74815b136408bf8', '[\"*\"]', '2025-03-07 10:17:55', NULL, '2025-03-07 10:17:10', '2025-03-07 10:17:55'),
(171, 'App\\Models\\Usuario', 1, 'auth_token', '2cc2436e7b7e1b8d77033f88fbc53cebaa3de50666710ee97f7be9191a4c4ed2', '[\"*\"]', '2025-03-07 10:18:59', NULL, '2025-03-07 10:18:37', '2025-03-07 10:18:59'),
(172, 'App\\Models\\Usuario', 1, 'auth_token', '9731cc87fbb9b1e7a042427fd57aaf997bb2439967c83577e38eff3614125338', '[\"*\"]', '2025-03-07 10:19:22', NULL, '2025-03-07 10:19:06', '2025-03-07 10:19:22'),
(173, 'App\\Models\\Usuario', 1, 'auth_token', 'c9943d177882c77b8c36afa7ee1b71b42e8beea02815b462f91245437ccb637f', '[\"*\"]', '2025-03-07 10:19:47', NULL, '2025-03-07 10:19:32', '2025-03-07 10:19:47'),
(174, 'App\\Models\\Usuario', 1, 'auth_token', 'c6f95497d6babb9bc8e753915a330c5ae20c3e4dd63b8680b3cd05fe86cd1ae6', '[\"*\"]', '2025-03-07 10:34:46', NULL, '2025-03-07 10:34:35', '2025-03-07 10:34:46'),
(175, 'App\\Models\\Usuario', 1, 'auth_token', '8006064331415384697e8e9e0771d8b58fba062ffcc488ca230384de221e25df', '[\"*\"]', '2025-03-07 11:04:44', NULL, '2025-03-07 10:34:58', '2025-03-07 11:04:44'),
(176, 'App\\Models\\Usuario', 1, 'auth_token', 'b38d37d94641d6fc377cd3402e2b327e3bd82b4055a2e5202c950e3c246f9068', '[\"*\"]', '2025-03-07 11:05:06', NULL, '2025-03-07 11:04:49', '2025-03-07 11:05:06'),
(177, 'App\\Models\\Usuario', 1, 'auth_token', '6d70cebf590c84f44f0f11557ad15ff2b1b86edc5892683d29f5c11dc72ed5d4', '[\"*\"]', '2025-03-07 11:24:25', NULL, '2025-03-07 11:07:09', '2025-03-07 11:24:25'),
(178, 'App\\Models\\Usuario', 1, 'auth_token', 'fb70bba2b49ad8a786ca9c594c200a1296d8476bdeb09e7163e1bdcba314e0ea', '[\"*\"]', NULL, NULL, '2025-03-07 11:07:57', '2025-03-07 11:07:57'),
(179, 'App\\Models\\Usuario', 1, 'auth_token', 'f4b778f31a0b7fdbd797e2fcab3e727d993a0234cadbaacb00deb2299dfc760d', '[\"*\"]', '2025-03-07 11:27:30', NULL, '2025-03-07 11:24:37', '2025-03-07 11:27:30'),
(180, 'App\\Models\\Usuario', 1, 'auth_token', 'e12e78f34191ae7f278212fcd8612bf2176b96b9b3703bb83e477bcab873b8b7', '[\"*\"]', '2025-03-07 11:31:43', NULL, '2025-03-07 11:27:46', '2025-03-07 11:31:43'),
(181, 'App\\Models\\Usuario', 1, 'auth_token', '58a057470aeeb1e7b55547dce92e85cf570e27d5f4b495e301dcba9c2a3048de', '[\"*\"]', '2025-03-07 12:04:08', NULL, '2025-03-07 11:32:04', '2025-03-07 12:04:08'),
(182, 'App\\Models\\Usuario', 1, 'auth_token', '602a41dd5e5d9c7565a33c234ab98ebf663dac418c264396e67b50719c6819dd', '[\"*\"]', '2025-03-07 22:40:30', NULL, '2025-03-07 12:14:12', '2025-03-07 22:40:30'),
(183, 'App\\Models\\Usuario', 1, 'auth_token', '749a52c6e72057f8e928d32cb7be2cc8f13b0cde8397586cc4d4970c0aed4a0b', '[\"*\"]', '2025-03-07 22:48:24', NULL, '2025-03-07 22:40:42', '2025-03-07 22:48:24'),
(184, 'App\\Models\\Usuario', 1, 'auth_token', '1b75763e4a539ad38e321affd1e25b60f96a04c106fab5d3662bb6ea546f551a', '[\"*\"]', '2025-03-08 01:11:16', NULL, '2025-03-07 22:48:33', '2025-03-08 01:11:16'),
(185, 'App\\Models\\Usuario', 1, 'auth_token', '6e903228c2d79cf57dfbb3bb436a5e69ce6b173685e1a1ab83607f955ea89351', '[\"*\"]', '2025-03-08 02:37:22', NULL, '2025-03-07 22:49:26', '2025-03-08 02:37:22'),
(186, 'App\\Models\\Usuario', 1, 'auth_token', 'f52393bcee88ef926ab352a1d121ee378e8495289da10b90f5b8f6172b5df063', '[\"*\"]', '2025-03-08 01:12:38', NULL, '2025-03-08 01:12:06', '2025-03-08 01:12:38'),
(187, 'App\\Models\\Usuario', 1, 'auth_token', '105ad99427acf4b81ac6e29f606537615aff4745973bd5b36c252cd2d2b55170', '[\"*\"]', '2025-03-08 02:30:35', NULL, '2025-03-08 01:21:52', '2025-03-08 02:30:35'),
(188, 'App\\Models\\Usuario', 1, 'auth_token', '80b23d1c6be47f85be6f4cc7570c2da308b4f31f0f9a7bce4ed4531e30f135fd', '[\"*\"]', '2025-03-08 03:24:02', NULL, '2025-03-08 02:30:50', '2025-03-08 03:24:02'),
(189, 'App\\Models\\Usuario', 1, 'auth_token', '9b1f35baafbb6d638f604ac242dc695892a96de19ffaec06ca8c4945da29a84f', '[\"*\"]', '2025-03-08 03:25:09', NULL, '2025-03-08 03:24:41', '2025-03-08 03:25:09'),
(190, 'App\\Models\\Usuario', 1, 'auth_token', '05b38c507f0414f591669ac839ca21f1ab507d3ce8fef813b74200d9a8362f8b', '[\"*\"]', '2025-03-08 03:27:10', NULL, '2025-03-08 03:26:47', '2025-03-08 03:27:10'),
(191, 'App\\Models\\Usuario', 1, 'auth_token', 'ac58651398bb5d4157684d497e1619570c4e964f6aa191157f94525ccd2e0ac1', '[\"*\"]', '2025-03-08 03:27:32', NULL, '2025-03-08 03:27:20', '2025-03-08 03:27:32'),
(192, 'App\\Models\\Usuario', 1, 'auth_token', '4fcecbbea7e098ac1730cf4c10f01291e65e52099ab4ac8296ab3bb6b0669635', '[\"*\"]', '2025-03-08 03:39:25', NULL, '2025-03-08 03:27:43', '2025-03-08 03:39:25'),
(193, 'App\\Models\\Usuario', 1, 'auth_token', 'c175803d647f090aebf72b73f3842c5ee7aab67b5f74127156417d12160259aa', '[\"*\"]', '2025-03-08 03:50:34', NULL, '2025-03-08 03:39:45', '2025-03-08 03:50:34'),
(194, 'App\\Models\\Usuario', 1, 'auth_token', '932f9e2815e016bc1797dba1ef462eda5c8eac295503fb1fb8784d66c7e046ae', '[\"*\"]', '2025-03-11 04:28:51', NULL, '2025-03-11 03:38:36', '2025-03-11 04:28:51'),
(195, 'App\\Models\\Usuario', 1, 'auth_token', '15e71a0ea07c3b752a2c2fb7fea8905677c3fe7a3219a53749d60f233e6310c4', '[\"*\"]', '2025-03-11 05:39:20', NULL, '2025-03-11 04:35:51', '2025-03-11 05:39:20'),
(196, 'App\\Models\\Usuario', 1, 'auth_token', '79f77591536c970d007ac2e8acbf1e2a1ea4355d2314b13e2cd52983b19c2c83', '[\"*\"]', '2025-03-11 06:03:20', NULL, '2025-03-11 05:39:56', '2025-03-11 06:03:20'),
(197, 'App\\Models\\Usuario', 5, 'auth_token', '69a7a7aab2e5bfd2b5c4eec6075d44d806ed4c57b1f8037d31952cb759d59f1f', '[\"*\"]', '2025-03-12 02:17:50', NULL, '2025-03-11 06:03:42', '2025-03-12 02:17:50'),
(198, 'App\\Models\\Usuario', 1, 'auth_token', '0bf606758cf86e3619598b173487cee8c0f162fccd415685d1a7d2e4c3f4e43b', '[\"*\"]', '2025-03-12 02:29:32', NULL, '2025-03-12 02:18:01', '2025-03-12 02:29:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sku` varchar(100) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `cliente_id` bigint(20) UNSIGNED NOT NULL,
  `propiedades` text NOT NULL,
  `caracteristicas` text NOT NULL,
  `usuario_id` bigint(20) UNSIGNED NOT NULL,
  `usuarioModificacion` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `sku`, `nombre`, `cliente_id`, `propiedades`, `caracteristicas`, `usuario_id`, `usuarioModificacion`, `created_at`, `updated_at`) VALUES
(2, '1234567', 'Sabritas 20gr', 1, '600gr', 'caja', 1, 1, '2025-03-06 06:54:54', '2025-03-08 00:25:53'),
(3, '2301', 'Cervezas', 1, '250ml', 'vidrio', 1, 1, '2025-03-06 07:09:18', '2025-03-11 03:40:13'),
(6, '12345676464', 'almidon', 10, 'fecula de maiz', 'polvo', 1, NULL, '2025-03-08 02:42:29', '2025-03-08 02:42:29'),
(7, '2232323232', 'Agluitnante', 9, 'liquido', 'tambos 200kg', 1, NULL, '2025-03-11 03:40:55', '2025-03-11 03:40:55'),
(8, '100-013-603', 'Krystar 300 R|BP', 12, 'AZUCAR', 'SACO', 1, 1, '2025-03-11 04:52:59', '2025-03-11 05:03:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rols`
--

CREATE TABLE `rols` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `puesto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `rols`
--

INSERT INTO `rols` (`id`, `puesto`) VALUES
(2, 'Administrador'),
(1, 'Jefe de operaciones'),
(5, 'Montacargista'),
(3, 'Supervisor'),
(4, 'Verificador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salidas`
--

CREATE TABLE `salidas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `transporte_id` bigint(20) UNSIGNED NOT NULL,
  `lote_id` bigint(20) UNSIGNED NOT NULL,
  `paletPiso` int(11) NOT NULL,
  `cantidadEntregada` int(11) NOT NULL,
  `usuario_id` bigint(20) UNSIGNED NOT NULL,
  `ultimaModificacion` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transportes`
--

CREATE TABLE `transportes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `qrTrasporte` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `transportes`
--

INSERT INTO `transportes` (`id`, `qrTrasporte`) VALUES
(1, 'unidad sabritas 1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicacions`
--

CREATE TABLE `ubicacions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `qrUbicaciones` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `ubicacions`
--

INSERT INTO `ubicacions` (`id`, `qrUbicaciones`, `created_at`, `updated_at`) VALUES
(1, 'rack 1 ubicacion 4', '0000-00-00 00:00:00', NULL),
(2, 'rack 1 ubicacion 2', '2025-03-07 03:57:49', NULL),
(3, 'rack 1 ubicacion 3', '2025-03-07 03:57:49', NULL),
(4, 'rack 1 ubicacion 4', '2025-03-07 03:57:49', NULL),
(5, 'rack 1 ubicacion 5', '2025-03-07 03:57:49', NULL),
(6, 'rack 1 ubicacion 6', '2025-03-07 03:57:49', NULL),
(7, 'rack 1 ubicacion 7', '2025-03-07 03:57:49', NULL),
(8, 'rack 1 ubicacion 8', '2025-03-07 03:57:49', NULL),
(9, 'rack 1 ubicacion 9', '2025-03-07 03:57:49', NULL),
(10, 'rack 1 ubicacion 10', '2025-03-07 03:57:49', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `nombreUsuario` varchar(30) NOT NULL,
  `numEmpleado` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(250) NOT NULL,
  `IsActive` tinyint(1) NOT NULL DEFAULT 1,
  `rol_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `nombreUsuario`, `numEmpleado`, `email`, `password`, `IsActive`, `rol_id`, `created_at`, `updated_at`) VALUES
(1, 'Miguel Angel Ornelas Sandoval', 'Miguel001', 1, 'xfrikix000@gmail.com', '$2y$12$Jc526U.Yb9mrhmqCIj6G2u0uG4HCNnOwrJ3Tk5SkQZuXfdYoFYvWC', 1, 1, NULL, '2025-03-03 04:58:12'),
(5, 'Rosa Isela', 'Rosa01', 3087, 'gdl.inventarios@dickalogistic.com.mx', '$2y$12$OyL02VbFhmcjLqQlvPYJle.PT5M50EKVi5Czc3W2E7MRs/2er0Eyu', 1, 3, '2025-03-11 03:48:16', '2025-03-11 03:48:16');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clientes_usuario_id_foreign` (`usuario_id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `lotes`
--
ALTER TABLE `lotes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lotes_producto_id_foreign` (`producto_id`),
  ADD KEY `lotes_usuario_id_foreign` (`usuario_id`);

--
-- Indices de la tabla `lote_ubicacions`
--
ALTER TABLE `lote_ubicacions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lote_ubicacions_lote_id_foreign` (`lote_id`),
  ADD KEY `lote_ubicacions_ubicacions_id_foreign` (`ubicacions_id`),
  ADD KEY `lote_ubicacions_usuario_id_foreign` (`usuario_id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productos_cliente_id_foreign` (`cliente_id`),
  ADD KEY `productos_usuario_id_foreign` (`usuario_id`);

--
-- Indices de la tabla `rols`
--
ALTER TABLE `rols`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rols_puesto_unique` (`puesto`);

--
-- Indices de la tabla `salidas`
--
ALTER TABLE `salidas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `salidas_transporte_id_foreign` (`transporte_id`),
  ADD KEY `salidas_lote_id_foreign` (`lote_id`),
  ADD KEY `salidas_usuario_id_foreign` (`usuario_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `transportes`
--
ALTER TABLE `transportes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ubicacions`
--
ALTER TABLE `ubicacions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuarios_nombreusuario_unique` (`nombreUsuario`),
  ADD UNIQUE KEY `usuarios_numempleado_unique` (`numEmpleado`),
  ADD UNIQUE KEY `usuarios_email_unique` (`email`),
  ADD KEY `usuarios_rol_id_foreign` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `logs`
--
ALTER TABLE `logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `lotes`
--
ALTER TABLE `lotes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `lote_ubicacions`
--
ALTER TABLE `lote_ubicacions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=199;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `rols`
--
ALTER TABLE `rols`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `salidas`
--
ALTER TABLE `salidas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `transportes`
--
ALTER TABLE `transportes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ubicacions`
--
ALTER TABLE `ubicacions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `lotes`
--
ALTER TABLE `lotes`
  ADD CONSTRAINT `lotes_producto_id_foreign` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `lotes_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `lote_ubicacions`
--
ALTER TABLE `lote_ubicacions`
  ADD CONSTRAINT `lote_ubicacions_lote_id_foreign` FOREIGN KEY (`lote_id`) REFERENCES `lotes` (`id`),
  ADD CONSTRAINT `lote_ubicacions_ubicacions_id_foreign` FOREIGN KEY (`ubicacions_id`) REFERENCES `ubicacions` (`id`),
  ADD CONSTRAINT `lote_ubicacions_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `productos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `salidas`
--
ALTER TABLE `salidas`
  ADD CONSTRAINT `salidas_lote_id_foreign` FOREIGN KEY (`lote_id`) REFERENCES `lotes` (`id`),
  ADD CONSTRAINT `salidas_transporte_id_foreign` FOREIGN KEY (`transporte_id`) REFERENCES `transportes` (`id`),
  ADD CONSTRAINT `salidas_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_rol_id_foreign` FOREIGN KEY (`rol_id`) REFERENCES `rols` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
