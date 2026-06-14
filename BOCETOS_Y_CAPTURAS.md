# Bocetos, capturas e ideas originales

## Idea inicial
La adaptacion parte del tutorial Pomodoro y lo transforma en una experiencia de foco con identidad visual propia. La decision principal fue que el canvas no fuera decorativo, sino un reflejo directo del estado de la sesion.

## Boceto funcional
Se plantearon tres bloques principales:
- Un encabezado breve para explicar la propuesta y el stack.
- Un canvas central con anillos y particulas que cambian con el progreso.
- Un panel lateral con temporizador, controles, configuracion y dato externo.

## Evolucion visual
1. Primera idea: replicar un temporizador simple con texto centrado.
2. Segunda iteracion: usar circulos concentricos para representar intensidad y paso del tiempo.
3. Version final: separar modos foco y descanso con cambios de color, ritmo y pulso visual.

## Capturas incluidas
- Pantalla inicial de la app: `src/assets/imageInicial.png`
- Temporizador en modo foco: `src/assets/imageModoFoco.png`
- Animacion activa durante foco: `src/assets/imageModoFocoAnimacion.png`
- Temporizador de foco en uso: `src/assets/imageTempFoco.png`
- Cambio a modo descanso: `src/assets/imageModoDescanso.png`
- Consulta a API externa: `src/assets/imageActDatoConAPIExterna.png`
- Segunda entrega documentada en `src/assets/segundaEntrega/`

## Material incluido
- Recurso visual de apoyo del proyecto: `src/assets/hero.png`
- Capturas exportadas desde el emulador Android Studio dentro de `src/assets/`

Nota sobre `hero.png`:
- Se conserva como recurso de apoyo del proceso de ideacion.
- No forma parte de la interfaz final del MVP.
- Su procedencia no quedo documentada en el proyecto, por lo que no se considera material principal de la entrega ni recurso recomendado para una publicacion abierta.

## Uso de este material en la documentacion
- Este documento centraliza la evidencia visual del proyecto.
- El proceso de ideacion y evolucion funcional se complementa con `PROCESO_DESARROLLO.md`.
- Las pruebas funcionales descritas en `PRUEBAS_Y_MEJORAS.md` pueden contrastarse con estas capturas.

## Secuencia visual recomendada para la segunda entrega
Para explicar bien la evolucion de la app, conviene mostrar una secuencia corta y clara con las capturas mas representativas de `src/assets/segundaEntrega/`.

1. `imageEstadoBaseAntesTema.png`
   - Estado inicial del MVP antes de mejorar la personalizacion del dato externo.
2. `imageTemaConsejoSelect1.png`
   - Incorporacion de un selector guiado para reducir errores al consultar la API.
3. `imageOtroTemaPersonalizado.png`
   - Ampliacion de la mejora con la opcion `Otro tema`, que mantiene flexibilidad sin perder control.
4. `imageConsejoPersonalizado1.png`
   - Consulta dinamica adaptada a un tema elegido por el usuario.
5. `imageConsejoTraducidoEspanol2.png`
   - Estado final con consejo recuperado, fallback claro y traduccion al espanol.

## Valor documental de la secuencia
- La primera captura funciona como referencia de partida.
- La segunda y la tercera muestran mejoras incrementales reales en la interfaz.
- La cuarta demuestra la integracion dinamica con la API.
- La quinta resume el MVP refinado y listo para defender en la entrega.

## Capturas de apoyo opcionales
Si necesitas ampliar la explicacion sin recargar demasiado la documentacion, puedes usar como apoyo:
- `imageConsejoPersonalizado2.png`
- `imageTemaConsejoSelect4.png`
- `imageConsejoTraducidoEspanol1.png`

Estas capturas son utiles, pero no son imprescindibles si ya presentas bien la secuencia principal.

## Justificacion breve
La propuesta busca demostrar continuidad respecto al tutorial base: mantiene el temporizador y la vibracion nativa, pero anade una capa de identidad audiovisual, persistencia de estado y preparacion para futuras consultas externas configurables.
