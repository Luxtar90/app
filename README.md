README
TaskEase
TaskEase es una aplicación de gestión de tareas que permite a los usuarios registrarse, iniciar sesión y restablecer sus contraseñas. Este proyecto está construido utilizando Next.js para el frontend y Node.js con Express y Prisma para el backend.

Requisitos Previos
Node.js (v14.x o superior)
npm (v6.x o superior
README
TaskEase
TaskEase es una aplicación de gestión de tareas que permite a los usuarios registrarse, iniciar sesión y restablecer sus contraseñas. Este proyecto está construido utilizando Next.js para el frontend y Node.js con Express y Prisma para el backend.

Requisitos Previos
Node.js (v14.x o superior)
npm (v6.x o superior)
Configuración del Proyecto
1. Clonar el Repositorio
bash
Copiar código
git clone https://github.com/tu-usuario/task-ease.git
cd task-ease
2. Instalar Dependencias
Instala las dependencias tanto para el frontend como para el backend.

Frontend
bash
Copiar código
cd taskapp
npm install
Backend
bash
Copiar código
cd backend-app
npm install
3. Configurar Variables de Entorno
Crea un archivo .env en la raíz de ambos proyectos (taskapp y backend-app) y añade las siguientes variables de entorno.

Frontend (taskapp/.env)
env
Copiar código
NEXT_PUBLIC_API_URL=http://localhost:3001
Backend (backend-app/.env)
env
Copiar código
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_jwt_secret"
4. Configurar Prisma
Generar el Cliente de Prisma
bash
Copiar código
cd backend-app
npx prisma generate
Crear y Aplicar Migraciones
bash
Copiar código
npx prisma migrate dev --name init
5. Ejecutar el Proyecto
Iniciar el Backend
bash
Copiar código
cd backend-app
npm start
Iniciar el Frontend
bash
Copiar código
cd taskapp
npm run dev
6. Verificar la Configuración
Abre tu navegador web y navega a http://localhost:3000 para verificar que la aplicación frontend está funcionando correctamente.

Estructura del Proyecto
lua
Copiar código
task-ease/
│
├── backend-app/
│   ├── controllers/
│   ├── migrations/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── app.js
│   ├── package.json
│   └── prisma/
│       └── schema.prisma
│
├── taskapp/
│   ├── components/
│   ├── pages/
│   ├── public/
│   ├── styles/
│   ├── .env
│   ├── next.config.js
│   └── package.json
│
└── README.md
Dependencias Principales
Frontend
Next.js
React
styled-components
axios
Backend
Express
Prisma
bcrypt
jsonwebtoken
cors
Funcionalidades
Registro de Usuario: Permite a los usuarios registrarse en la aplicación.
Inicio de Sesión: Permite a los usuarios iniciar sesión.
Restablecimiento de Contraseña: Permite a los usuarios restablecer su contraseña mediante un enlace enviado por correo electrónico.
Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para discutir los cambios que deseas realizar.

Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

¡Gracias por utilizar TaskEase! Si tienes alguna pregunta o problema, no dudes en abrir un issue en el repositorio.
