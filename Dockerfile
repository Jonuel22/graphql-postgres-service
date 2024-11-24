# Usa una imagen base (ejemplo: Node.js)
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "run", "start"]
