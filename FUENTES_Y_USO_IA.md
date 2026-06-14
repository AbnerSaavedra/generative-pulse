# Fuentes utilizadas y uso de IA

## Documentacion tecnica
- Capacitor Docs: https://capacitorjs.com/docs
- Capacitor Overview / Getting Started: https://capacitorjs.com/docs/getting-started
- Capacitor Android Workflow: https://capacitorjs.com/docs/basics/workflow
- Capacitor Haptics: https://capacitorjs.com/docs/apis/haptics
- Capacitor Preferences: https://capacitorjs.com/docs/apis/preferences
- Capacitor Web/PWA: https://capacitorjs.com/docs/web
- Capacitor Deploying to Google Play: https://capacitorjs.com/docs/android/deploying-to-google-play
- Vite Guide: https://vite.dev/guide/
- p5.js Reference: https://p5js.org/reference/

## API externa usada
- Advice Slip API (sin API key): https://api.adviceslip.com/
- MyMemory Translation API: https://api.mymemory.translated.net/get

## Recursos visuales y materiales de apoyo
- `src/assets/hero.png`
  - Uso: recurso visual de apoyo durante la fase de ideacion y documentacion.
  - Integracion en la app final: no se usa en la interfaz final ni en el flujo funcional del MVP.
  - Autor / procedencia: no documentado dentro del proyecto.
  - Estado de uso recomendado: mantener solo como apoyo interno de proceso. No considerarlo parte del producto final publicable mientras no se pueda acreditar su origen o licencia.

## Recursos del enunciado
- Especificaciones del reto
- Tutorial paso a paso Pomodoro con Capacitor + p5.js + ViteJS
- Documento de recursos externos

## Como se usaron estos recursos en el proyecto
- Primera entrega:
  - Se tomo como base el tutorial de Pomodoro para configurar Vite, Capacitor, Android Studio y la integracion de `Haptics`.
  - Se consulto la documentacion de `Preferences` para persistir configuracion y estado de sesion.
  - Se reviso la referencia de p5.js para estructurar el canvas generativo en instance mode.
- Segunda entrega:
  - Se reutilizo la base tecnica anterior y se extendio con una API publica externa para enriquecer el flujo principal de la app.
  - Se reviso de nuevo la documentacion de flujo Android de Capacitor para compilar, sincronizar y probar la app actualizada en el emulador.
  - Se consultaron los recursos del enunciado para validar que la API elegida fuese gratuita, sin API key obligatoria y util para una peticion personalizada.

## Uso de IA
Se uso asistencia de IA para:
- Acelerar la generacion de base de codigo
- Proponer estructura de modulos y mejoras de UX
- Revisar cumplimiento de requisitos

Todo el resultado fue revisado manualmente, probado y ajustado segun los requisitos del enunciado.
