# 🛠️ SKILL: Mapeo Relacional 1:M y Control de Ciclos (Spring Data JPA + H2)

Esta capacidad se activa al generar las entidades, repositorios y la lógica de persistencia para el motor H2 en memoria.

## 📋 Directrices de Implementación

1. **Mapeo Bidireccional de la Relación (1:M):**
   * En la entidad **Equipo**, configura la colección de jugadores con `@OneToMany(mappedBy = "equipo", fetch = FetchType.LAZY)`.
   * En la entidad **Jugador**, configura la relación con `@ManyToOne` y `@JoinColumn(name = "EQUIPO_JUGADOR", nullable = false)`.

2. **Corte del Bucle Infinito (Jackson):**
   * Añade obligatoriamente la anotación `@JsonIgnoreProperties("jugadores")` sobre el campo `equipo` en la clase `Jugador` para evitar errores de desbordamiento de pila en la serialización REST.

3. **Gestión de Claves Primarias:**
   * Al ser identificadores basados en texto asignados manualmente, **no** utilices la anotación `@GeneratedValue` en ninguna entidad.

4. **Conectividad y CORS:**
   * Añade `@CrossOrigin(origins = "http://localhost:4200")` a nivel de clase en todos los controladores REST expuestos en el puerto `8080`.

## 🔬 Checklist de Validación (Vibe Coding)
- [ ] ¿La entidad Jugador tiene el `@JsonIgnoreProperties` para romper la recursividad circular?
- [ ] ¿Se ha omitido la generación automática de IDs (`@GeneratedValue`) al usar PKs de tipo String?
- [ ] ¿Los controladores exponen las operaciones CRUD básicas solicitadas en el enunciado?