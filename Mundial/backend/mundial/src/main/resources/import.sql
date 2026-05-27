-- 1. Insertar Selecciones en la tabla EQUIPO
INSERT INTO equipos (equipo, pais, seleccionador) VALUES ('ARGENTINA', 'Argentina', 'Lionel Scaloni');
INSERT INTO equipos (equipo, pais, seleccionador) VALUES ('ESPANA', 'España', 'Luis de la Fuente');
INSERT INTO equipos (equipo, pais, seleccionador) VALUES ('FRANCIA', 'Francia', 'Didier Deschamps');

-- 2. Insertar Jugadores en la tabla JUGADOR
INSERT INTO jugadors (nombre, direccion, puesto_hab, fecha_nac, equipo_jugador) VALUES ('LIONEL MESSI', 'Rosario 123', 'DC', '1987-06-24 00:00:00', 'ARGENTINA');
INSERT INTO jugadors (nombre, direccion, puesto_hab, fecha_nac, equipo_jugador) VALUES ('LAMINE YAMAL', 'Rocafonda 304', 'ED', '2007-07-13 00:00:00', 'ESPANA');
INSERT INTO jugadors (nombre, direccion, puesto_hab, fecha_nac, equipo_jugador) VALUES ('KYLIAN MBAPPE', 'Paris 789', 'DC', '1998-12-20 00:00:00', 'FRANCIA');