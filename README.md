# Proyecto-de-Autoestudio-Cashtracker
Aplicación Full Stack para el control de gastos personales desarrollada con Express.js y Next.js. Proyecto basado en el curso de Udemy: Full Stack Node.js, React, TypeScript, NestJS, Next.js.


# 💸 Cashtracker

**Cashtracker** es una aplicación web Full Stack para el control y visualización de gastos personales, desarrollada como parte de un proyecto de autoestudio basado en el curso de Udemy *"Full Stack Node.js, React, TypeScript, NestJS, Next.js"* impartido por Juan Pablo de la Torre Valdez.

## 🚀 Tecnologías utilizadas

- **Frontend:** Next.js, TypeScript
- **Backend:** Express.js, Node.js
- **Base de datos:** MongoDB
- **Autenticación:** JWT (JSON Web Tokens)
- **Estilos:** Tailwind CSS

## 🎯 Funcionalidades

- Registro e inicio de sesión seguro con JWT
- Panel de control para visualizar gastos diarios/mensuales
- CRUD de transacciones (crear, editar, eliminar, listar)
- Gráficas para análisis financiero básico
- Validación de formularios y manejo de sesiones

## 🛠 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/cashtracker.git
cd cashtracker

# Instalar dependencias
npm install

# Variables de entorno
cp .env.example .env
# Edita .env con tu configuración local

# Iniciar proyecto
npm run dev
