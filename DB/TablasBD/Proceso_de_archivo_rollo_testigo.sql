//cajas

INSERT INTO `archivo_caja` (`id_caja`, `tipo_caja`, `fecha_creacion`, `periodo_custodio_caja`, `estado`, `posicion`, `precinto`, `local_actual`) VALUES (DEFAULT, 1, '2015-05-11', '2020-05-11', 0, 0, '1', 1);
INSERT INTO `archivo_caja` (`id_caja`, `tipo_caja`, `fecha_creacion`, `periodo_custodio_caja`, `estado`, `posicion`, `precinto`, `local_actual`) VALUES (DEFAULT, 1, '2016-05-11', '2021-05-11', 1, 0, '2', 1);
INSERT INTO `archivo_caja` (`id_caja`, `tipo_caja`, `fecha_creacion`, `periodo_custodio_caja`, `estado`, `posicion`, `precinto`, `local_actual`) VALUES (DEFAULT, 1, '2017-05-11', '2022-05-11', 2, 0, '3', 1);


INSERT INTO `archivo_caja` (`id_caja`, `tipo_caja`, `fecha_creacion`, `periodo_custodio_caja`, `estado`, `posicion`, `precinto`, `local_actual`) 
VALUES                     (DEFAULT  , 1          ,   '2017-05-13'  ,      '2022-05-13'      ,    2    ,     0     ,    '5'    ,      1        ),
                           (DEFAULT  , 1          ,   '2017-05-14'  ,      '2022-05-14'      ,    2    ,     0     ,    '6'    ,      1        );


//creacion de solicitudes

INSERT INTO `archivo_solicitud` (`id_solicitud`,`id_caja`,`local_creacion`,`local_destino`,`ts`,`estado`,`login`)
VALUES                          (DEFAULT       ,    2    ,      10        ,   666         , '2015-04-11 00:00:00' ,1,NULL)
VALUES                          (DEFAULT       ,    3    ,      10        ,   6286         , '2016-04-11 00:00:00' ,1,NULL);

INSERT INTO `archivo_solicitud` (`id_solicitud`,`id_caja`,`local_creacion`,`local_destino`,`ts`,`estado`,`login`)
VALUES                          (DEFAULT       ,    4    ,      10        ,   6286         , '2016-04-12 00:00:00' ,1,NULL),
                                (DEFAULT       ,    5    ,      10        ,   6286         , '2012-04-11 00:00:00' ,1,NULL),
                                (DEFAULT       ,    6    ,      10        ,   6286         , '2013-04-11 00:00:00' ,1,NULL),
                                (DEFAULT       ,    7    ,      10        ,   6286         , '2015-04-11 00:00:00' ,3,NULL),
                                (DEFAULT       ,    8    ,      1        ,   6286         , '2015-04-11 00:00:00' ,3,NULL),
                                (DEFAULT       ,    9    ,      10        ,   6286         , '2015-04-11 00:00:00' ,2,NULL),
                                (DEFAULT       ,    10   ,      10        ,   6286         , '2015-04-11 00:00:00' ,2,NULL),
                                (DEFAULT       ,   11    ,      1        ,   6286         , '2016-04-11 00:00:00' ,1,NULL),
                                (DEFAULT       ,    12   ,      1        ,   6286         , '2016-04-13 00:00:00' ,1,NULL);




