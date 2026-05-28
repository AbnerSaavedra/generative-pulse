# Proceso creativo y de desarrollo

## 1. Ideacion
La propuesta parte del tutorial Pomodoro base y evoluciona hacia una app llamada GenerativePulse. La idea central es combinar productividad con feedback visual generativo para reflejar el estado temporal de la sesion (foco/descanso).

Como apoyo visual de esta evolucion se adjuntan bocetos y capturas en `BOCETOS_Y_CAPTURAS.md`, incluyendo la pantalla inicial, estados de foco, descanso y consulta a la API externa.

## 2. Base tecnica
Se selecciono el stack solicitado en el enunciado:
- Capacitor
- ViteJS
- Vanilla JS
- p5.js para canvas generativo

Se creo el proyecto con Vite y posteriormente se inicializo Capacitor con Android.

## 3. Adaptacion funcional sobre el tutorial
Partiendo del enfoque Pomodoro:
- Se implemento el temporizador con controles iniciar, pausar y reiniciar.
- Se agrego modo foco/descanso con transicion automatica.
- Se integraron visuales generativas que cambian segun progreso y estado.

Las capturas `src/assets/imageInicial.png`, `src/assets/imageModoFoco.png`, `src/assets/imageModoFocoAnimacion.png` y `src/assets/imageModoDescanso.png` documentan esta adaptacion visual y funcional.

## 4. Integracion nativa
Se uso Capacitor Haptics para vibracion tactil al finalizar un ciclo. Esto cumple el requisito de funcionalidad nativa del dispositivo.

## 5. Persistencia local
Se implemento almacenamiento local con Capacitor Preferences para:
- Configuracion del usuario (minutos foco, minutos descanso, endpoint API)
- Estado de sesion (tiempo restante, modo actual, estado en pausa/ejecucion)

## 6. API externa configurable
Se agrego un endpoint configurable sin API key para consumir datos externos. Por defecto se usa Advice Slip API.

## 7. Ajustes de compatibilidad p5.sound
Siguiendo el tutorial y sus recomendaciones:
- p5.js y p5.sound se colocaron en public.
- Se cargan como scripts clasicos en index.html.
- El sketch se ejecuta en instance mode.

## 8. Aprendizajes clave
- Capacitor permite transportar logica web a Android con bajo costo de integracion.
- La persistencia de sesion mejora la UX cuando la app se cierra o pausa.
- p5.sound puede requerir integracion clasica para evitar conflictos con bundlers.
