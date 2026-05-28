# GenerativePulse

App movil con Capacitor basada en Vite + Vanilla JS + p5.js.

Incluye:
- Canvas generativo con p5.js ligado al estado del temporizador.
- Funcion nativa con Capacitor Haptics (vibracion al completar un ciclo).
- Almacenamiento local con Capacitor Preferences (persistencia de ajustes).
- Consulta externa configurable y sin API key (por defecto: api.adviceslip.com).

## Stack
- Vite
- Capacitor (Core + Android)
- Capacitor Haptics
- Capacitor Preferences
- p5.js

## Estructura principal
- `src/main.js`: UI, logica del temporizador, preferencias y API externa.
- `src/sketch.js`: canvas generativo en p5.js (instance mode).
- `src/style.css`: estilos responsivos para movil y desktop.
- `android/`: proyecto nativo generado por Capacitor.

## Flujo de desarrollo
1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar en navegador:
   ```bash
   npm run dev
   ```

3. Build web:
   ```bash
   npm run build
   ```

4. Sincronizar Android:
   ```bash
   npm run android:sync
   ```

5. Abrir Android Studio:
   ```bash
   npm run android:open
   ```

6. Flujo completo de entrega:
   ```bash
   npm run android:run
   ```

## Notas tecnicas
- El estado de foco/descanso y la configuracion se guardan localmente mediante `Preferences`.
- La API externa se llama al iniciar y al finalizar cada ciclo para mostrar un dato util al usuario.
- Si `Haptics` no esta disponible (por ejemplo en navegador), la app sigue funcionando sin fallar.

## Proceso creativo resumido
La propuesta adapta el Pomodoro base hacia una experiencia visual generativa. Se prioriza la relacion entre tiempo y canvas: el progreso temporal cambia dinamica, color y ritmo de la animacion. El componente nativo elegido es vibracion por su utilidad para notificar cambios de estado sin depender de sonido.

## Fuentes
- Capacitor Docs: https://capacitorjs.com/docs
- Vite Guide: https://vite.dev/guide/
- p5.js Reference: https://p5js.org/reference/
- Advice Slip API: https://api.adviceslip.com/

## Documentacion de entrega
- PROCESO_DESARROLLO.md
- BOCETOS_Y_CAPTURAS.md
- PRUEBAS_Y_MEJORAS.md
- NOTA_DISPOSITIVO_ANDROID.md
- FUENTES_Y_USO_IA.md
- LICENSE

El documento `BOCETOS_Y_CAPTURAS.md` recoge las referencias visuales del proyecto, incluyendo capturas del emulador guardadas en `src/assets/`.

## Checklist para generar el ZIP final
Incluir:
- src/
- public/
- android/
- index.html
- package.json
- package-lock.json
- capacitor.config.json
- README.md
- PROCESO_DESARROLLO.md
- PRUEBAS_Y_MEJORAS.md
- BOCETOS_Y_CAPTURAS.md
- NOTA_DISPOSITIVO_ANDROID.md
- FUENTES_Y_USO_IA.md
- LICENSE

Excluir:
- node_modules/
- dist/ (o www/ si aplica)
- android/app/build/
- android/build/
- android/.gradle/
- android/.idea/
- android/capacitor-cordova-android-plugins/build/
- android/local.properties
- archivos APK generados

## Recomendacion antes de comprimir
1. Ejecutar `npm run build`.
2. Ejecutar `npx cap sync android`.
3. Verificar la app en Android Studio o emulador.
4. Eliminar compilados y temporales antes de crear el `.zip`.
