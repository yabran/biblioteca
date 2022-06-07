Proyecto biblioteca escuela

Para correr localmente se necesita la base de datos:

docker-compose up -d


Crear el archivo .env y configurar las variables de entorno mencionadas en el archivo .env.template

MONGO_URL=mongodb://localhost:27017/bibliotecadb


Instalar las dependencias del proyecto:
yarn install


Correr el servidor de desarrolllo:
yarn dev

