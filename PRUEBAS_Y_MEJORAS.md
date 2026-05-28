# Pruebas y mejoras

## Pruebas funcionales realizadas
1. Compilacion web:
- Comando ejecutado: npm run build
- Resultado: correcto

2. Sincronizacion Android:
- Comando ejecutado: npx cap sync android
- Resultado: correcto

3. Apertura en Android Studio:
- Comando ejecutado: npx cap open android
- Resultado: correcto

4. Ejecucion en emulador:
- La app inicia y renderiza UI + canvas.
- El temporizador inicia, pausa y reinicia.
- Evidencia visual asociada: `src/assets/imageInicial.png`, `src/assets/imageModoFocoAnimacion.png`

5. Persistencia de configuracion:
- Se guarda y restaura minutos de foco/descanso y endpoint API.

6. Persistencia de sesion:
- Se guarda tiempo restante y estado de pausa/ejecucion.
- Al reabrir, la sesion se recupera.

7. Funcionalidad nativa:
- Haptics se invoca al finalizar ciclo.
- En navegador, falla de forma controlada sin romper app.

8. API externa:
- Se consulta endpoint configurable sin API key.
- Se maneja error de red con mensaje al usuario.
- Evidencia visual asociada: `src/assets/imageActDatoConAPIExterna.png`

## Evidencia visual complementaria
La referencia completa de bocetos y capturas se encuentra en `BOCETOS_Y_CAPTURAS.md`.

## Mejoras aplicadas
- Se redujo complejidad del bundle corrigiendo import no soportado de p5.sound.
- Se ajusto integracion a scripts clasicos desde public, alineado al tutorial.
- Se agrego guardado de estado para evitar perdida de progreso.

## Mejoras futuras sugeridas
- Añadir pruebas unitarias para funciones de tiempo.
- Añadir selector de tema visual.
- Incluir segunda funcionalidad nativa (Motion o Camera).
- Añadir historial de sesiones.
