# Desafio FullStack
Projeto criado para o teste técnico da Lupit.

O projeto foi desenvolvido em locahost, dessa forma os endereços iniciais do projeto são:
* Banco de dados: localhost:3306
* Backend: localhost:3301
* Frontend: localhost:3300

#### Instalação do banco de dados

Primeiramente, acessar o script ```lupit.sql``` e importar o banco de dados para o banco desejado. 

Utilizei o MySQL com o meu projeto, desde o MySQL Server à MySQL Workbench, sendo assim, o arquivo .env está configurado com esse ambiente, será necessário alterar as credenciais para utilizar o backend.

#### Backend

No backend, utilizei o NestJS e o Prisma ORM, por isso que no interior da pasta "prisma" existe uma sub-pasta chamada migrations.

Caso o endereço para teste seja diferentes dos informados acima, sugiro alterar o parâmetro ```origin``` no arquivo ```main.ts``` para o endereço correspondente (atualmente está o localhost e port do frontend).

Após baixar o repositório rode o comando ```npm install``` na pasta /backend para criar a node_modules e, depois o comando ```npx prisma generate```.

Para testar as rotas basta importar o arquivo com nome ```rotas_insomnia``` no seu insomnia, eu utilizei o insomnia para o teste das rotas, mas basicamente são as rotas exigidas no teste, com exceção da rota GET /player/:id que traz as informações do jogador informado na url.

#### Frontend

O frontend foi desenvolvido em Next.js (v14.1.0) utilizando como base os exemplos.

Após baixar o repositório rode o comando ```npm install``` na pasta /frontend para criar a node_modules e, depois o comando ```npm run dev``` para iniciar o servidor local.

As telas foram criadas de acordo com o arquivo FRONTEND.md, sendo elas:
* Listar jogadores (tela inicial);
* Adicionar jogador ('/jogadores/novo');
* Editar jogador ('/jogadores/:id').

Qualquer dúvida estou à disposição!
