# Data-Table Engine 📊

[cite_start]Este proyecto es una herramienta funcional desarrollada para el *Instituto Tolimense de Formación Técnica Profesional (ITFIP)*[cite: 5]. [cite_start]El objetivo de la aplicación es permitir la carga, visualización y manipulación de conjuntos de datos JSON en el frontend, aplicando conceptos de algoritmia de arreglos[cite: 8, 22].

 Funcionalidades

[cite_start]De acuerdo con los requerimientos del taller[cite: 23], el software incluye:

* [cite_start]*Módulo de Carga:* Permite subir archivos JSON locales o cargar un set de datos de prueba predefinido[cite: 24].
* [cite_start]*Búsqueda (Search):* Filtrado dinámico en tiempo real mediante un campo de entrada[cite: 26].
* [cite_start]*Cálculo Agregado:* Fila de totales que calcula automáticamente el promedio de las notas utilizando la función reduce[cite: 17, 44].
* [cite_start]*Edición Inline:* Las celdas son editables y los cambios se reflejan inmediatamente en el estado interno[cite: 45].
* [cite_start]*Paginación:* Manejo eficiente de datos para mejorar el rendimiento del DOM[cite: 19].

 Lógica de Ordenamiento (Sort)

[cite_start]Tal como se solicita en la guía de entrega[cite: 55], a continuación se explica la lógica implementada para el ordenamiento de columnas:

1.  [cite_start]*Activación:* Se activa mediante un evento onclick en los encabezados (<th>) de la tabla[cite: 27].
2.  *Estado de Dirección:* Se utiliza una variable booleana ascendente que se invierte en cada clic, permitiendo alternar entre orden de A-Z y Z-A.
3.  *Algoritmo:* Se emplea el método nativo .sort() de JavaScript.
    * Para *cadenas de texto* (Nombre), se utiliza localeCompare para asegurar un orden alfabético correcto incluyendo caracteres especiales.
    * Para *valores numéricos* (Edad y Nota), se realiza una resta directa (a - b) para garantizar precisión matemática.
4.  [cite_start]*Inmutabilidad:* Antes de renderizar, se trabaja sobre una copia del estado original (datosFiltrados) para mantener la integridad de la fuente de datos inicial[cite: 15, 57].

 Tecnologías Utilizadas

* *HTML5:* Estructura semántica de la tabla.
* *CSS3:* Diseño responsivo y estilos de interfaz.
* [cite_start]*JavaScript (ES6+):* Uso de funciones de alto orden como map, filter y reduce para la gestión de datos[cite: 13, 59].

---
[cite_start]*Institución:* Uniespinal - Educación Superior con Calidad para Todos[cite: 28].
[cite_start]*Ubicación:* El Espinal - Tolima[cite: 30]. Pedro Alejandro Bayona
