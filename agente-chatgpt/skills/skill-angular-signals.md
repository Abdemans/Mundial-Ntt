#  SKILL: Reactividad Moderna con Signals y Control Flow (Angular 21)

Esta capacidad se activa al programar cualquier componente standalone o servicio de la interfaz de usuario.

##  Directrices de Implementación
1. **Gestión de Estado:** Prohibido usar variables primitivas directas para estados mutables. Se debe declarar el estado mediante `signal()`, mutándolo con `.set()` o `.update()`.
2. **Control de Flujo:** Prohibido el uso de las antiguas directivas `*ngIf` o `*ngFor`. Es obligatorio utilizar la nueva sintaxis declarativa del framework:
   ```html
   @if (cargando()) { ... }
   @for (item of lista(); track item.id) { ... }
   @empty { ... }