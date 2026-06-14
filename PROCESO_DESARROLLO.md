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

Esta base tecnica corresponde a la primera entrega del proyecto. La segunda entrega no parte de cero: reutiliza esta estructura y la amplia con una integracion de API externa publica y mejoras de interfaz centradas en la funcionalidad principal.

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

Como mejora de esta segunda entrega, la consulta dejo de ser solo aleatoria y paso a ser personalizada: el usuario puede definir un tema o intencion de foco y la app usa el endpoint de busqueda de Advice Slip para recuperar consejos relacionados. Si no hay coincidencias, la app muestra un consejo general como respaldo.

En una iteracion posterior se mejoro la UX sustituyendo el campo libre por un selector de temas recomendados. Con ello se evita enviar valores poco utiles a la API y se hace mas consistente la demostracion durante las pruebas y capturas.

Despues se amplio esa mejora para no perder flexibilidad: la app mantiene temas sugeridos, pero permite elegir `Otro tema` y escribir una intencion personalizada. Ademas, se anadio una opcion para traducir el consejo mostrado al espanol, de modo que la informacion sea mas comprensible en la experiencia final.

## 7. Ajustes de compatibilidad p5.sound
Siguiendo el tutorial y sus recomendaciones:
- p5.js y p5.sound se colocaron en public.
- Se cargan como scripts clasicos en index.html.
- El sketch se ejecuta en instance mode.

## 8. Consultas y pasos seguidos en la documentacion
Durante la primera entrega se consultaron los recursos base de Capacitor, ViteJS y p5.js para:
- Configurar el proyecto con Vite.
- Inicializar Capacitor y generar el proyecto Android.
- Preparar el flujo de compilacion y apertura en Android Studio.
- Integrar `Haptics` como funcionalidad nativa inicial.
- Resolver la carga de `p5.sound` mediante scripts clasicos e instance mode.

Durante la segunda entrega se retomaron esos mismos recursos para:
- Mantener el flujo `build -> sync -> open` en Android Studio.
- Consolidar `Preferences` como almacenamiento persistente.
- Integrar una API publica externa de forma dinamica.
- Mejorar la interfaz con selector de tema, opcion de tema personalizado y traduccion del consejo al espanol.

## 9. Aprendizajes clave
- Capacitor permite transportar logica web a Android con bajo costo de integracion.
- La persistencia de sesion mejora la UX cuando la app se cierra o pausa.
- p5.sound puede requerir integracion clasica para evitar conflictos con bundlers.
