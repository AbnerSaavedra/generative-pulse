# Nota de pruebas en Android

## Contexto de las pruebas
Este proyecto tuvo una primera entrega y una segunda entrega. Por eso se registran dos momentos de verificacion dentro del mismo proceso de desarrollo.

## Entorno usado
- Tipo de dispositivo probado: emulador de Android Studio
- Modelo o perfil usado: Medium Phone
- Version de Android usada en pruebas: Android 16 (API 36 / imagen 36.1)

## Verificaciones realizadas
- Primera entrega:
  - Fecha de verificacion: 27-05-2026
  - Alcance: compilacion base con Capacitor, canvas, temporizador, persistencia local y funcion nativa principal.
- Segunda entrega:
  - Fecha de verificacion: 14-06-2026
  - Alcance: integracion ampliada con API externa, selector de tema, tema personalizado y traduccion opcional al espanol.

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
