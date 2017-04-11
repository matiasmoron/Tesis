-- -----------------------------------------------------
-- Table `oltp`.`archivo_tipo_caja`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `oltp`.`archivo_tipo_caja` ;

CREATE TABLE IF NOT EXISTS `oltp`.`archivo_tipo_caja` (
  `id_tipo_caja` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(75) NULL,
  `tiempo_custodio_anios` TINYINT UNSIGNED NULL,
  `frecuencia` TINYINT UNSIGNED NULL COMMENT 'Sirve para saber como las fechas van a ser manejadas.\n 0-diario\n 1-mensual\n 2-anual',
  PRIMARY KEY (`id_tipo_caja`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `oltp`.`archivo_posiciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `oltp`.`archivo_posiciones` ;

CREATE TABLE IF NOT EXISTS `oltp`.`archivo_posiciones` (
  `id_posiciones` INT UNSIGNED NOT NULL,
  `descripcion` VARCHAR(45) NULL,
  `estado` TINYINT UNSIGNED NULL,
  `capacidad ?` TINYINT NULL,
  PRIMARY KEY (`id_posiciones`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `oltp`.`archivo_caja`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `oltp`.`archivo_caja` ;

CREATE TABLE IF NOT EXISTS `oltp`.`archivo_caja` (
  `id_caja` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tipo_caja` TINYINT NULL,
  `fecha_creacion` DATETIME NULL,
  `periodo_custodio_caja` DATE NULL COMMENT 'Fecha a partir de la cual se puede destruir la caja. La fecha se calcula a partir de tipo_caja.tiempo_custodio',
  `estado` TINYINT UNSIGNED NULL DEFAULT 0,
  `posicion` INT NULL DEFAULT 0,
  `precinto` VARCHAR(50) NULL,
  `local_actual` INT UNSIGNED NULL,
  PRIMARY KEY (`id_caja`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '\n';


-- -----------------------------------------------------
-- Table `oltp`.`archivo_traslados_caja`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `oltp`.`archivo_traslados_caja` ;

CREATE TABLE IF NOT EXISTS `oltp`.`archivo_traslados_caja` (
  `id_traslados_caja` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `local_origen` INT NULL,
  `local_destino` INT NULL,
  `estado` TINYINT NULL,
  `ts_emision` DATETIME NULL,
  `ts_recepcion` DATETIME NULL,
  `login_emision` VARCHAR(45) NULL,
  `login_recepcion` VARCHAR(45) NULL,
  `id_caja` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id_traslados_caja`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'Mantiene un registro de los traslados que tuvo una caja desde el momento que fué creada';


-- -----------------------------------------------------
-- Table `oltp`.`archivo_precinto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `oltp`.`archivo_precinto` ;

CREATE TABLE IF NOT EXISTS `oltp`.`archivo_precinto` (
  `precinto` VARCHAR(50) NOT NULL,
  `id_caja` INT UNSIGNED NOT NULL,
  `ts` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `login` VARCHAR(45) NULL,
  PRIMARY KEY (`precinto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = 'Mantiene el historial de precintos de una caja. El precinto actual está almacenado en la tabla archivo_caja';


-- -----------------------------------------------------
-- Table `oltp`.`archivo_local_tipo_solicitud`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `oltp`.`archivo_local_tipo_solicitud` ;

CREATE TABLE IF NOT EXISTS `oltp`.`archivo_local_tipo_solicitud` (
  `local` INT NOT NULL,
  `tipo_local` CHAR(2) NULL,
  `id_tipo` TINYINT NULL,
  PRIMARY KEY (`local`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `oltp`.`archivo_layout`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `oltp`.`archivo_layout` ;

CREATE TABLE IF NOT EXISTS `oltp`.`archivo_layout` (
  `id_layout` INT NOT NULL,
  `id_caja` INT UNSIGNED NOT NULL,
  `ts` TIMESTAMP NOT NULL,
  `local` INT NULL,
  `estado` TINYINT NULL,
  `login` VARCHAR(45) NULL,
  PRIMARY KEY (`id_caja`, `id_layout`, `ts`))
ENGINE = InnoDB
COMMENT = 'Registro de movimientos internos dentro de los depositos';


-- -----------------------------------------------------
-- Table `oltp`.`archivo_solicitud`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `oltp`.`archivo_solicitud` ;

CREATE TABLE IF NOT EXISTS `oltp`.`archivo_solicitud` (
  `id_solicitud` INT NOT NULL AUTO_INCREMENT,
  `id_caja` INT UNSIGNED NOT NULL,
  `local_creacion` INT NULL,
  `local_destino` INT NULL,
  `ts` TIMESTAMP NULL,
  `estado` TINYINT NULL,
  `login` VARCHAR(45) NULL,
  PRIMARY KEY (`id_solicitud`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `oltp`.`archivo_caja_obs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `oltp`.`archivo_caja_obs` ;

CREATE TABLE IF NOT EXISTS `oltp`.`archivo_caja_obs` (
  `id_caja` INT UNSIGNED NOT NULL,
  `observacion` VARCHAR(100) NULL,
  PRIMARY KEY (`id_caja`))
ENGINE = InnoDB
COMMENT = 'posibles observaciones que pueda tener una caja';


-- -----------------------------------------------------
-- Table `oltp`.`archivo_atributo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `oltp`.`archivo_atributo` ;

CREATE TABLE IF NOT EXISTS `oltp`.`archivo_atributo` (
  `id_atributo` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NULL,
  `tipo` VARCHAR(45) NULL,
  `multi` TINYINT(1) NULL,
  PRIMARY KEY (`id_atributo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `oltp`.`archivo_tipo_atributo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `oltp`.`archivo_tipo_atributo` ;

CREATE TABLE IF NOT EXISTS `oltp`.`archivo_tipo_atributo` (
  `id_atributo` INT NOT NULL,
  `id_tipo_caja` VARCHAR(45) NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `oltp`.`archivo_atributo_valor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `oltp`.`archivo_atributo_valor` ;

CREATE TABLE IF NOT EXISTS `oltp`.`archivo_atributo_valor` (
  `id_caja` INT NOT NULL,
  `id_atributo` INT NULL,
  `valor` VARCHAR(45) NULL,
  INDEX `index_id_caja` (`id_caja` ASC),
  INDEX `index_atributo_valor` (`id_atributo` ASC, `valor` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `oltp`.`archivo_tipo_caja`
-- -----------------------------------------------------
START TRANSACTION;
USE `oltp`;
INSERT INTO `oltp`.`archivo_tipo_caja` (`id_tipo_caja`, `descripcion`, `tiempo_custodio_anios`, `frecuencia`) VALUES (DEFAULT, 'Rollo Testigo', 5, 0);
INSERT INTO `oltp`.`archivo_tipo_caja` (`id_tipo_caja`, `descripcion`, `tiempo_custodio_anios`, `frecuencia`) VALUES (DEFAULT, 'Vouchers', 15, 0);
INSERT INTO `oltp`.`archivo_tipo_caja` (`id_tipo_caja`, `descripcion`, `tiempo_custodio_anios`, `frecuencia`) VALUES (DEFAULT, 'Revistas Familia', 5, 1);
INSERT INTO `oltp`.`archivo_tipo_caja` (`id_tipo_caja`, `descripcion`, `tiempo_custodio_anios`, `frecuencia`) VALUES (DEFAULT, 'Rollo Testigo Viejo', 5, 0);
COMMIT;


-- -----------------------------------------------------
-- Data for table `oltp`.`archivo_caja`
-- -----------------------------------------------------
START TRANSACTION;
USE `oltp`;
INSERT INTO `oltp`.`archivo_caja` (`id_caja`, `tipo_caja`, `fecha_creacion`, `periodo_custodio_caja`, `estado`, `posicion`, `precinto`, `local_actual`) VALUES (DEFAULT, 1, '2015-04-11', '2020-04-11', 0, 0, '0', 8300);

COMMIT;

  