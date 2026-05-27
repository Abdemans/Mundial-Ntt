#  SKILL: Mapeo Avanzado JPA para Claves Compuestas (MySQL)

Esta capacidad se activa al generar entidades y repositorios en Spring Boot para relaciones complejas.

##  Directrices de Implementación
1. **Claves Compuestas:** Tablas como `partido`, `jugar` y `gol` requieren una clase `@Embeddable` o la anotación `@IdClass` que implemente `Serializable`, sobrescribiendo `equals()` y `hashCode()`.
2. **Control de Bucles JSON:** Para evitar desbordamientos de pila (StackOverflow) debido a las relaciones bidireccionales, añade `@JsonIgnoreProperties` en los campos `@ManyToOne`.
3. **Tipado de Fechas:** Las columnas `datetime` de MySQL se deben mapear obligatoriamente utilizando `LocalDateTime` en Java.
4. **CORS:** Todos los `@RestController` deben incluir `@CrossOrigin(origins = "http://localhost:4200")`.

##  Checklist de Validación (Vibe Coding)
- [ ] ¿La clave compuesta contiene exactamente los campos del DDL?
- [ ] ¿Se ha aplicado `@JsonIgnoreProperties` para evitar la recursividad infinita?
- [ ] ¿Los nombres de las columnas en `@JoinColumn` coinciden con las mayúsculas del script SQL?