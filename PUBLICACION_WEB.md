# Publicacion de la app en web

## Opcion elegida
Se documenta la publicacion en web, ya que GenerativePulse es una app creada con Vite y Capacitor y su parte web queda generada como sitio estatico dentro de `dist/`.

## Flujo de preparacion
1. Ejecutar `npm run build` para generar la version lista para distribucion.
2. Verificar que `capacitor.config.json` apunta a `webDir: "dist"`.
3. Probar localmente el contenido generado antes de subirlo a un hosting estatico.

## Como publicarla
La opcion mas directa es desplegar la carpeta `dist/` en un servicio de hosting estatico como GitHub Pages, Netlify o Cloudflare Pages.

Flujo general:
1. Compilar la app con `npm run build`.
2. Subir el contenido de `dist/` al proveedor elegido.
3. Configurar el dominio o subdominio publico.
4. Verificar que la API externa siga respondiendo correctamente desde el dominio publicado.

## Relacion con Capacitor
Segun la documentacion oficial, Capacitor soporta proyectos web y PWA y permite reutilizar la misma base para la version Android y una publicacion web con trabajo adicional minimo.

## Ventajas para este proyecto
- Permite compartir el MVP rapidamente con una URL.
- Facilita la evaluacion visual del canvas y de la integracion con la API externa.
- Mantiene una unica base de codigo para web y Android.

## Limitaciones
- La vibracion nativa depende del dispositivo o navegador.
- Algunas APIs nativas de Capacitor tienen comportamiento limitado fuera del entorno movil.

## Referencias
- Capacitor Workflow: https://capacitorjs.com/docs/basics/workflow
- Capacitor Web/PWA: https://capacitorjs.com/docs/web
