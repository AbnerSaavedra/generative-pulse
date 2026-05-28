# Nota de pruebas en Android

## Entorno usado
- Tipo de dispositivo probado: emulador de Android Studio
- Modelo o perfil usado: Medium Phone
- Version de Android usada en pruebas: Android 16 (API 36 / imagen 36.1)
- Fecha de verificacion: 27-05-2026

## Resultado general
La aplicacion compila, sincroniza y queda lista para abrirse y ejecutarse desde Android Studio con el flujo solicitado en el enunciado.

## Comandos de evaluacion verificados
1. `npm run build`
2. `npx cap sync android`
3. `npx cap open android` para abrir el proyecto nativo en Android Studio

## Observacion
Si se realizan pruebas en telefono fisico, conviene anadir en esta misma nota:
- Marca y modelo del terminal
- Version exacta de Android
- Fecha de la prueba
