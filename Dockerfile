# Usa una imagen oficial de Node.js como base
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos esenciales
COPY package.json package-lock.json* tsconfig.json ./

# Instala todas las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# Elimina dependencias innecesarias y reinstala solo las de producción
RUN rm -rf node_modules && npm install --only=production

# Expone el puerto en el que corre la aplicación
EXPOSE 443

# Comando para ejecutar la aplicación
CMD ["node", "dist/index.js"]