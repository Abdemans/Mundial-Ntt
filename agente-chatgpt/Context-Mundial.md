# 📊 DOMINIO: Esquema Base de Datos Club Deportivo (H2 en Memoria)

Este documento contiene el modelo de datos para cumplir con los requisitos obligatorios del proyecto final.

## 🗄️ Estructura de Tablas Relacionales (1:M)
El sistema se compone exclusivamente de dos entidades relacionadas persistidas en una base de datos H2 en memoria.

1. **equipos** (Lado "Uno")
   * **PK:** `EQUIPO` (String) -> Identificador del club (ej: "ARGENTINA").
   * **Atributos:** `PAIS` (String), `SELECCIONADOR` (String).

2. **jugador** (Lado "Muchos" / Dueño de la FK)
   * **PK:** `NOMBRE` (String) -> Nombre completo del jugador (ej: "LIONEL MESSI").
   * **Atributos:** `DIRECCION` (String), `PUESTO_HAB` (String), `FECHA_NAC` (Temporal/LocalDateTime).
   * **FK:** `EQUIPO_JUGADOR` -> Clave foránea que referencia a `equipos(EQUIPO)`.