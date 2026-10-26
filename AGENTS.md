<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Política Operativa de Git y GitHub - Proyecto DTY

Esta sección define las reglas obligatorias e infranqueables para la gestión de Git y GitHub en el proyecto. Ningún agente ni colaborador automatizado puede ejecutar operaciones de creación de ramas, commits, push, PR o despliegues sin cumplir estrictamente con los gates de autorización aquí descritos.

---

## 1. Flujo Normal de Trabajo

- **Rama Base de Integración:** `dev` es la rama base para el desarrollo diario e integración continua.
- **Ramas de Trabajo:** Cada nueva feature, bugfix o tarea independiente debe trabajarse en su propia rama dedicada, creada a partir de `dev` actualizado.
- **Convención de Nombres de Ramas:**
  - `feature/nombre-descriptivo` para nuevas funcionalidades.
  - `bugfix/nombre-descriptivo` para correcciones de errores.
  - `hotfix/nombre-descriptivo` para incidencias críticas y urgentes de producción.
  - *Nota:* Solo se utilizarán otros prefijos (p. ej. `experimental/`, `merge/` citados como opciones secundarias en `docs/Estructura_git&github.pdf`) si los documentos oficiales del equipo lo requieren de manera expresa.
- **Integración:** Las ramas de trabajo se integran en `dev` exclusivamente mediante Pull Request (PR).
- **Prohibición de Trabajo Directo:** Queda terminantemente prohibido trabajar o commitear directamente en `dev` o en `main` para desarrollar funcionalidades.
- **Sin ramas intermedias innecesarias:** No introduzcas ramas como `test` o `staging` en el flujo habitual de una feature salvo que sean requeridas explícitamente por el procedimiento acordado de publicación.

---

## 2. Autorización Obligatoria para Crear o Cambiar de Rama

- **Propuesta y Espera:** Antes de crear una rama nueva, presenta:
  1. El nombre propuesto (siguiendo las convenciones).
  2. La rama base de la cual parte.
  3. Una explicación breve del motivo.
  *Después, espera confirmación explícita antes de ejecutar cualquier comando Git.*
- **Cero Iniciativa Propia:** Nunca crees una rama por iniciativa propia, aun cuando consideres que es lo técnicamente correcto o que la tarea lo exige.
- **Prohibido Cambiar de Rama sin Permiso:** No ejecutes `git checkout` o `git switch` a otra rama sin autorización explícita para ese cambio concreto.
- **Ramas Existentes:** Si ya existe una rama idónea para la tarea, identifícala y pregunta si se debe continuar utilizándola antes de actuar.
- **Protección de Cambios Locales:** Si existen cambios locales sin confirmar, inspecciónalos con `git status` / `git diff` y explica cómo protegerlos (stash o commit autorizado) antes de sugerir un cambio de rama.
- **Alcance Estricto:** La confirmación para crear una rama autoriza **únicamente** la creación/checkout de esa rama; **no** autoriza commits, push, PR, merge ni despliegues posteriores.

---

## 3. Commits Locales Durante el Trabajo

- **Granularidad:** Guarda el progreso en commits locales pequeños y lógicos cuando haya una unidad de cambio coherente, en lugar de acumular cambios hasta el final de la tarea.
- **Staging Selectivo:** Antes de cada commit, inspecciona `git status` y prepara el staging de forma selectiva (`git add <archivo específico>`). **Prohibido el uso indiscriminado de `git add .` o `git add -A`**.
- **Archivos Excluidos:** No incluyas cambios ajenos a la tarea, modificaciones preexistentes no relacionadas, secretos, `.env.local` ni archivos de configuración sensible.
- **Formato Conventional Commits:** Sigue la especificación de Conventional Commits alineada con `docs/Estructura_git&github.pdf`:
  - Formato: `<type>[optional scope]: <description>`
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `perf`, `chore`, `BREAKING CHANGE (!)`.
  - Ejemplo: `feat(courses): improve course carousel`
- **Autorización Previa al Commit:** Antes de ejecutar cualquier `git commit`:
  1. Muestra un resumen detallado de los archivos y cambios incluidos.
  2. Solicita confirmación explícita.
  3. **No ejecutes `git commit` hasta recibir la autorización afirmativa.**
- **Gate Obligatorio de Verificación de Código:** Antes de solicitar la confirmación de un commit con código, ejecuta estrictamente en este orden:
  1. `npx tsc --noEmit`
  2. `npm run lint`
  3. `npm run build`
  *Si alguno de estos comandos falla, el commit queda cancelado de inmediato y se debe reportar y explicar el error.*
- **Excepción Documental:** Si el cambio es puramente documental (p. ej. archivos `.md`, documentación), se pueden omitir las verificaciones de código que no apliquen, justificando con claridad cuáles y por qué se omitieron.
- **Integridad de Colaboradores:** Nunca descartes, sobrescribas ni fuerces cambios de otros colaboradores.

---

## 4. Push y Pull Request Únicamente bajo Solicitud Expresa

- **Prohibición de Automatización Remota:** No ejecutes `git push`, no abras Pull Requests y no realices merges de forma autónoma.
- **Push Solicitado:** Cuando se ordene expresamente hacer push:
  - Verifica la rama activa, los commits locales pendientes, el estado del remoto y el diff.
  - Sube únicamente la rama de trabajo autorizada.
- **Pull Request:** Al solicitar abrir una PR:
  - Prepara la PR desde la rama de trabajo hacia `dev`.
  - Utiliza la plantilla de `.github/pull_request_template.md`.
- **Interpretación de «haz push y crea la PR»:** Si la instrucción literal es «haz push y crea la PR», se entienden autorizadas únicamente esas dos acciones específicas para la rama y los cambios validados de la tarea actual.
- **Sin Permiso de Merge ni Deploy:** La autorización de push o creación de PR no otorga permiso para fusionar (merge) ni desplegar a producción. Para merge o deploy se requiere una instrucción separada e inequívoca.
- **Prohibición de Operaciones Destructivas:** Prohibido terminantemente ejecutar force push (`--force`, `-f`), reescribir historial compartido (`rebase` interactivo público, `reset --hard` en ramas remotas) o cualquier acción destructiva sin explicar previamente su impacto y recibir autorización explícita.

---

## 5. Protocolo de Inicio Obligatorio de Cada Tarea

Antes de modificar cualquier archivo:
1. **Revisión:** Leer estas reglas y las instrucciones aplicables del repositorio.
2. **Inspección de Estado:** Ejecutar e inspeccionar `git status`, rama actual, tracking remoto y cambios preexistentes.
3. **Definición de Alcance:** Resumir el alcance de la tarea y verificar si existe una rama de trabajo adecuada.
4. **Propuesta:** Si se requiere crear o cambiar de rama, proponer nombre, base y motivo, y esperar confirmación explícita antes de ejecutarlo.
5. **Restricción:** No ejecutar ninguna otra operación de Git que no haya sido expresamente autorizada.

---

## 6. Protocolo de Fin Obligatorio de Cada Tarea

Al finalizar la tarea, se debe emitir un informe que detalle:
- **Archivos modificados:** Lista explícita de archivos tocados.
- **Pruebas y verificaciones:** Comandos ejecutados (`tsc`, `lint`, `build`, tests) y sus resultados.
- **Commits locales:** Hashes y mensajes de los commits creados localmente.
- **Cambios pendientes:** Cualquier cambio sin commitear o en staging.
- **Estado Remoto / PR:** Enlace o estado de la rama remota o PR (únicamente si fueron autorizados y ejecutados).

---

## 7. Documentación y Coherencia

- **Alineación Documental:** Todas las normas anteriores respetan y complementan la convención de ramas y mensajes de commit de `docs/Estructura_git&github.pdf`.
- **Preservación Técnica:** Las directivas técnicas del bloque `<!-- BEGIN:nextjs-agent-rules -->` deben permanecer intactas.
- **Resolución de Conflictos:** Si alguna guía o documento oficial entra en conflicto con esta política operativa, no debe ignorarse silenciosamente: se debe advertir la discrepancia formalmente para su resolución antes de alterar otras guías.

