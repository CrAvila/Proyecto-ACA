# CAP web client

Este es el cliente web del proyecto QuakeSphere.

' link de proyecto '

## Features:
- Añadir datos sísmicos de API externa.
- Agregar página Main para describir la funcionalidad.
- Filtrar eventos sísmicos por:
  - Rango de fechas.
  - Rango de magnitud.
  - Rango de intensidad.
  - Rango de profundidad.
- Realizar cambio de interfaz en las diferentes páginas del cliente.
- Agregar página de Gráficos de sismos por país.
- Agregar componente de Machine Learning para predicciones.

## Tecnologías Utilizadas:
- **[Vite](https://vitejs.dev/)**: Herramienta de desarrollo rápida y optimizada para proyectos modernos de frontend. 
- **[React](https://reactjs.org/)**: Biblioteca de JavaScript para construir interfaces de usuario.
- **[TypeScript](https://www.typescriptlang.org/)**: Superconjunto de JavaScript que agrega tipos estáticos opcionales.
- **[HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)**: Lenguaje estándar para crear páginas web y aplicaciones.
- **[SCSS](https://sass-lang.com/)**: Preprocesador CSS que agrega características como variables, anidación y mixins.

## Dependencias Principales:
- **[axios](https://axios-http.com/)**: Biblioteca para hacer solicitudes HTTP.
- **[react-colorful](https://github.com/omgovich/react-colorful)**: Selector de color para React.
- **[react-globe.gl](https://github.com/vasturiano/react-globe.gl)**: Biblioteca para crear globos interactivos en React.
- **[react-toastify](https://github.com/fkhadra/react-toastify)**: Biblioteca para mostrar notificaciones en React.
- **[recharts](https://recharts.org/)**: Conjunto de gráficos para React basado en componentes.

  
## :wrench: Setup:
1. ```bash
   npm i
   ```
2. Copiar el .env.sample en .env.local y llenar los valores de las variables de entorno.
3. ```bash
   npm run dev
   ```
   Iniciar el servidor de Vite.
4. Abrir el navegador.

---

# Sistemas de Información Geográfica

Proyecto: Mapa Interactivo de Sismos en El Salvador - **QuakeSphere**

## Introducción

El Salvador está situado en una región de gran actividad sísmica, lo que lo hace vulnerable a los terremotos. Un mapa sísmico interactivo para El Salvador puede proporcionar información en tiempo real sobre los terremotos en la región, ayudando a aumentar la concienciación y la preparación de la población.

## Objetivos

- El objetivo principal del Proyecto QuakeSphere es mejorar el sistema de alerta y gestión de riesgos sísmicos mediante la integración de Machine Learning y Sistemas de Información Geográfica (SIG).
- Crear un mapa interactivo basado en la web que muestre datos históricos sobre sismos en El Salvador.
- Proporcionar información detallada sobre los terremotos, incluida su magnitud, localización, profundidad y fecha/hora de ocurrencia.
- Permitir a los usuarios ver y comparar terremotos a lo largo del tiempo, así como consultar datos históricos sobre sismos en El Salvador.
- Proporcionar una interfaz intuitiva desarrollada en tecnologías como React, y librerías o frameworks necesarios para el estilo para que sea fácil de usar y que facilite el acceso y la comprensión de la información.

## Metodología

- La metodología se estructura en tres fases principales: Planificación y Preparación, Ejecución, y Finalización y Cierre.
- En la fase de Planificación y Preparación, que abarca las semanas 1 y 2, definimos el alcance del proyecto, establecemos objetivos claros, y elaboramos un plan detallado de tareas, recursos y plazos. Además, asignamos responsabilidades específicas dentro del equipo.
- La fase de Ejecución, que se extiende de la semana 3 a la 10, se divide en dos subfases. Primero, implementamos modelos de predicción de terremotos utilizando Machine Learning, lo cual incluyó la adquisición y preprocesamiento de datos, selección y entrenamiento de modelos, y evaluación y ajuste de la precisión.
- En la segunda subfase, desarrollamos herramientas de visualización avanzadas utilizando SIG, creamos interfaces de usuario y realizamos pruebas de usabilidad y rendimiento. Esta fase es crucial para asegurar que las herramientas sean intuitivas y eficientes para los usuarios finales.
- Finalmente, en la fase de Finalización y Cierre, durante las semanas 11 y 12, llevamos a cabo pruebas finales del sistema, corregimos errores y preparamos la documentación técnica y de usuario. La entrega del producto final y el cierre formal del proyecto marcan la conclusión de nuestra metodología.

## Resultados Esperados

- Mapa web completo, interactivo y en tiempo real que muestra datos históricos sobre los terremotos en El Salvador.
- Mayor concienciación y preparación de la población ante los terremotos, así como una mayor comprensión de la frecuencia, localización e impacto de los terremotos en la región.
- Una valiosa herramienta para que los organismos interesados o las autoridades de gestión de desastres y el público en general accedan y analicen los datos sobre los sismos en El Salvador.
- Incrementar la precisión de las predicciones sísmicas y fortalecer las capacidades de respuesta ante emergencias.

## Conclusión

El Proyecto QuakeSphere tiene el potencial de proporcionar información valiosa sobre la frecuencia, la localización y el impacto de los terremotos en la región. Mediante la creación de un mapa completo, en tiempo real y fácil de usar, el proyecto pretende aumentar la concienciación y la preparación ante los terremotos y ayudar a reducir su impacto en El Salvador. Además, la integración de tecnologías avanzadas como Machine Learning y USGS permite una mejor comprensión y anticipación de la actividad sísmica, contribuyendo significativamente a la seguridad pública y la planificación de emergencias.


## Recursos

Los datos y la información creados o producidos por el USGS se consideran de dominio público en los Estados Unidos.

[USGS Copyright y créditos](https://www.usgs.gov/information-policies-and-instructions/copyrights-and-credits#:~:text=Important%20information%20related%20to%20copyrights,in%20the%20U.S.%20Public%20Domain)
