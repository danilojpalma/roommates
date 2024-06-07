# Proyecto API de gestion de gastos para Roommates

Este proyecto es una aplicación web simple diseñada para ayudar a grupos de roommates a gestionar sus gastos compartidos de manera eficiente. Permite registrar gastos, añadir nuevos usuarios (roommates), visualizar todos los gastos registrados y editar o eliminar gastos existentes. La aplicación utiliza Node.js, Express para el backend, y HTML, CSS, y JavaScript para el frontend.


## Prerrequisitos

Para poder ejecutar la API, se deben cumplir los siguientes prerrequisitos:

- Node.js 

## Instalación

Para instalar la API, se deben seguir los siguientes pasos:

1. Clonar el repositorio
```bash
git clone https://github.com/danilojpalma/roommates.git
```
2. Acceder al directorio del repositorio.
```bash
cd roommates
```
3. Instalar las dependencias del proyecto.
```bash
npm install
```

## Uso

Escribir en la consola el siguiente comando para inciar el servidor

```shell
npm run dev
```
Una vez que hayas iniciado el servidor, abre tu navegador web y navega a http://localhost:3000.

### Registro de Usuarios
Puedes añadir nuevos usuarios (roommates) a la lista de personas que comparten el espacio. Cada usuario tiene un ID único generado automáticamente, así como un saldo inicial de cero.

### Registro de Gastos:
Permite registrar gastos realizados por los roommates. Al registrar un gasto, se actualiza el balance de los roommates involucrados según el tipo de acción (agregar o eliminar un gasto).

### Visualización de Gastos 
Ofrece una vista completa de todos los gastos registrados, permitiendo a los roommates ver el historial de gastos y balances actuales.

### Edición y Eliminación de Gastos 
Los roommates pueden editar detalles de gastos previamente registrados o eliminarlos completamente.



## Código fuente

El código fuente de la API se encuentra en el siguiente repositorio de GitHub:

[https://github.com/danilojpalma/roommates.git](https://github.com/danilojpalma/roommates.git)


## Licencia

Este proyecto se encuentra bajo la licencia MIT. Para más información, consultar el archivo `LICENSE.md`.