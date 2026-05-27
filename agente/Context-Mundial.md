#  DOMINIO: Esquema Base de Datos Mundial (MySQL)

Este documento contiene el modelo de datos real que deben procesar tanto el agente de backend como el de frontend.

##  Relaciones y Restricciones del Modelo
El sistema se compone de 5 tablas interconectadas en MySQL (InnoDB) con claves primarias basadas en cadenas de texto (String).

1. **equipos**
   * PK: `EQUIPO` (varchar(50)) -> Nombre de la selección (ej: "ARGENTINA").
   * Atributos: `PAIS`, `SELECCIONADOR`.

2. **jugador**
   * PK: `NOMBRE` (varchar(60)) -> Nombre completo del jugador.
   * Atributos: `DIRECCION`, `PUESTO_HAB`, `FECHA_NAC` (datetime).
   * FK: `EQUIPO_JUGADOR` -> Referencia a `equipos(EQUIPO)`.

3. **partido**
   * PK Compuesta: (`EQUIPO_L`, `EQUIPO_V`, `FECHA`).
   * Atributos: `HORA`, `SEDE`, `RESULTADO_L`, `RESULTADO_V`, `ASISTENCIA`, `GRUPO`.
   * FK Autorreferenciales: (`EQUIPO_L_SIGUIENTE`, `EQUIPO_V_SIGUIENTE`, `FECHA_SIGUIENTE`) -> Apuntan a otro partido.

4. **jugar** (Tabla puente de participaciones)
   * PK Compuesta: (`NOMBRE_JUG`, `EQUIPO_L_PART`, `EQUIPO_V_PART`, `FECHA_PART`).
   * Atributos: `MIN_JUGAR` (smallint), `PUESTO_JUGAR`, `DORSAL`.
   * FK 1: (`EQUIPO_L_PART`, `EQUIPO_V_PART`, `FECHA_PART`) -> Referencia a `partido`.
   * FK 2: `NOMBRE_JUG` -> Referencia a `jugador`.

5. **gol**
   * PK Compuesta: (`MINUTO`, `JUGADOR_GOL`, `EQUIPO_L_GOL`, `EQUIPO_V_GOL`, `FECHA_GOL`).
   * FK: (`JUGADOR_GOL`, `EQUIPO_L_GOL`, `EQUIPO_V_GOL`, `FECHA_GOL`) -> Referencia a la tabla `jugar`.