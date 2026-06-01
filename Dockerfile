FROM node:20.19.5-alpine3.22   

# Define o diretório de trabalho
WORKDIR /opt/cesusc-devops

# Copia os arquivos necessários
COPY src/ src/
COPY LICENSE .
COPY package.json .
RUN npm install

# Expõe a porta 3000 (ajuste conforme seu app)
EXPOSE 3000

# Comando para rodar o app com Node.Js (ajuste o nome do módulo se necessário)
CMD ["node", "src/app.js"]
