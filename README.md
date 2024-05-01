# DoaPix RESTful API

<div align="center">
  <img src="https://img.shields.io/static/v1?label=javascript&message=language&color=yellow&style=for-the-badge&logo=javascript"/>
  <img src="https://img.shields.io/static/v1?label=node&message=environment&color=orange&style=for-the-badge&logo=node.js"/>  
  <img src="https://img.shields.io/static/v1?label=express&message=framework&color=green&style=for-the-badge&logo=express"/>  
  <img src="https://img.shields.io/static/v1?label=typescript&message=superset&color=blue&style=for-the-badge&logo=typescript"/>
  <img src="https://img.shields.io/static/v1?label=postgresql&message=database&color=blue&style=for-the-badge&logo=postgresql"/>
  <img src="https://img.shields.io/static/v1?label=docker&message=container&color=blue&style=for-the-badge&logo=docker"/>
  <img src="http://img.shields.io/static/v1?label=License&message=MIT&color=green&style=for-the-badge"/>
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/ViniciusGR797/doapix-api?style=for-the-badge">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/ViniciusGR797/doapix-api?style=for-the-badge">
  <img alt="GitHub forks" src="https://img.shields.io/github/forks/ViniciusGR797/doapix-api?style=for-the-badge">
  <img alt="Bitbucket open issues" src="https://img.shields.io/bitbucket/issues/ViniciusGR797/doapix-api?style=for-the-badge">
  <img alt="Bitbucket open pull request" src="https://img.shields.io/bitbucket/pr-raw/ViniciusGR797/doapix-api?style=for-the-badge">
  <img src="http://img.shields.io/static/v1?label=STATUS&message=Development&color=GREEN&style=for-the-badge"/>
</div>

<div align="center">
  <img src="https://cdn.discordapp.com/attachments/1089358473483006105/1221211189598490745/logo_DoaPix.png?ex=6611c08c&is=65ff4b8c&hm=bfa3604406bb3863cbed3e2a3a792570a719106e840dbdd6a057068a11375ab3&" alt="logo DoaPix">
</div>

> O software proposto tem como objetivo facilitar o processo de doações solidárias, integrando o PIX como método de pagamento. Simplifique sua experiência de doação com eficiência.

## Tópicos 

:small_blue_diamond: [🔗 URLs de acesso](#-urls-de-acesso)

:small_blue_diamond: [🏡 Execução localmente](#-execução-localmente)

:small_blue_diamond: [🐳 Execução com Docker](#-execução-com-docker)

:small_blue_diamond: [📃 Executando os Testes Unitários](#-executando-os-testes-unitários)

:small_blue_diamond: [⚙ Executando os Testes Automatizados](#-executando-os-testes-automatizados)

:small_blue_diamond: [📭 Postman e Testes Funcionais](#-postman-e-testes-funcionais)

:small_blue_diamond: [🛠 Construído com](#-construído-com)

:small_blue_diamond: [📫 Documentação](#-documentação)

:small_blue_diamond: [🙌 Reconhecimento](#-reconhecimento)

:small_blue_diamond: [📄 Licença](#-licença)

## 🔗 URLs de acesso

Para acessar a API DoaPix em ambientes de homologação ou produção:

<div align="center">

| Ambiente | URL |
|---|---|
| `Produção` | https://doapix-api.vercel.app |
| `Homologação` | https://doapix-api.vercel.app |

</div>

Para informações detalhadas sobre a utilização da API, acesse a [Documentação do Projeto e o Swagger](#-documentação).

## 🏡 Execução localmente

Certifique-se de ter o [Node.js](https://nodejs.org/en) instalado em sua máquina antes de prosseguir com essas etapas.

Siga as etapas abaixo para executar o projeto localmente em sua máquina:

* Clone esse repositório na sua máquina, colocando a respectiva URL do repositório:
```
git clone https://github.com/ViniciusGR797/doapix-api.git
```

* Navegar para o diretório do projeto clonado:
```
cd doapix-api
```

* Crie um arquivo chamado **_.env_** e configure corretamente as variáveis de ambiente necessárias. Você pode usar o arquivo **_.env.sample_** como referência.

* Instale o gerenciador de pacotes Yarn:
```
npm install -g yarn
```

* Agora, instale todas as dependências listadas no arquivo 'package.json', executando o seguinte comando:
```
yarn install
```

* Com as dependências instaladas, execute o seguinte comando para iniciar o servidor:
```
yarn start
```

* Após a execução, você poderá acessar a API por meio da porta local fornecida no terminal, por exemplo: `http://localhost:3000/api-docs/`.

* Se desejar parar a execução da aplicação, pressione `Ctrl + C` no terminal, a execução do projeto será encerrada.

## 🐳 Execução com Docker

Antes de executar o projeto com Docker, certifique-se de ter o [Docker](https://www.docker.com/get-started) e o [Docker Compose](https://docs.docker.com/compose/install/) instalados em sua máquina. 

Para executar o projeto usando Docker, siga as etapas abaixo:

* Crie um arquivo chamado **_.env_** e configure corretamente as variáveis de ambiente necessárias. Você pode usar o arquivo **_.env.sample_** como referência.

* No terminal, navegue até a pasta raiz do projeto e execute o seguinte comando:
```
docker-compose up --build
```
Isso iniciará os contêineres Docker necessários para executar o projeto.

Para parar a execução dos contêineres, pressione `Ctrl + C` no terminal. Isso interromperá a execução dos contêineres e liberará os recursos utilizados.

Caso deseje executar novamente o projeto usando o Docker, basta seguir novamente as etapas anteriores, garantindo que você tenha o arquivo **_.env_** configurado corretamente e execute o comando `docker-compose up` no terminal.

## 📃 Executando os Testes Unitários

## ⚙ Executando os Testes Automatizados

## 📭 Postman/Insomnia e Testes Funcionais

## 🛠 Construído com

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript): Linguagem de programação de script amplamente usada para desenvolvimento web.
* [Node.js](https://nodejs.org/en): Plataforma de tempo de execução de JavaScript baseada no V8 do Google.
* [Express.js](https://expressjs.com/): Framework web rápido e minimalista para Node.js.
* [TypeScript](https://www.typescriptlang.org/): Superset do JavaScript que adiciona tipos estáticos e outras características ao código.
* [PostgreSQL](https://www.postgresql.org/): Banco de dados SQL código aberto, robusto e altamente extensível.
* [Swagger UI](https://swagger.io/tools/swagger-ui/): Interface de usuário interativa para explorar e testar APIs RESTful.
* [Docker](https://www.docker.com/): Plataforma de contêineres que facilita a criação e implantação de aplicativos em ambientes isolados.

Essas são as principais tecnologias utilizadas para construir esta API RESTful. O JavaScript e TypeScript, onde o primeiro proporciona a base e o último adiciona uma camada de tipos sólidos. Node.js fornece o ambiente de execução, enquanto o Express.js agiliza o desenvolvimento da web. O PostgreSQL é utilizado como banco de dados para armazenar e recuperar os dados da aplicação de forma eficiente. O Swagger UI fornece uma interface amigável para explorar e testar a API. O Docker é utilizado para empacotar a aplicação e suas dependências em contêineres, facilitando a implantação e a portabilidade.

## 📫 Documentação

A documentação do projeto e da API está disponível nos seguintes links:

- [Documentação do Projeto](https://cdn.discordapp.com/attachments/1089358473483006105/1234334535622066217/Documento_de_Projeto_-_DoaPix.pdf?ex=66305b1e&is=662f099e&hm=96b1a756b05e138532f64d283bb6ab5b6247fd448ae25ae8e7b5791995cc5448&): Este documento fornece uma visão geral do projeto DoaPix, incluindo sua finalidade, escopo e funcionalidades.
- [Documentação do Swagger Online](https://doapix-api.vercel.app/), [Documentação do Swagger Json](https://github.com/ViniciusGR797/doapix-api/blob/master/src/swagger/swagger.json) e [Yaml](https://github.com/ViniciusGR797/doapix-api/blob/master/src/swagger/swagger.yaml): A documentação do Swagger descreve os endpoints e os modelos da API de forma detalhada.

Após executar a aplicação, você pode acessar o Swagger UI pela rota `/api-docs` e `/docs`, onde encontrará uma interface interativa para explorar e testar a API.

Certifique-se de revisar esses documentos para obter mais informações sobre o projeto DoaPix e para entender como interagir com a API usando o Swagger UI. Eles fornecerão detalhes importantes sobre o escopo, os recursos e os endpoints disponíveis na aplicação.

## 🙌 Reconhecimento

Gostaríamos de expressar nosso sincero agradecimento às seguintes pessoas que contribuíram para este projeto:

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/mrjonas151">
          <img src="https://avatars.githubusercontent.com/u/89425034?v=4" width="100px;" alt="Foto do Jonas"/><br>
          <sub>
            <b>Jonas Tomaz de Aquinos</b>
          </sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/RobertoLuiz99">
          <img src="https://avatars.githubusercontent.com/u/117315179?v=4" width="100px;" alt="Foto do Roberto"/><br>
          <sub>
            <b>Roberto Luiz Pereira Raposo</b>
          </sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/ViniciusGR797">
          <img src="https://avatars.githubusercontent.com/u/106624536?v=4" width="100px;" alt="Foto do Vinícius"/><br>
          <sub>
            <b>Vinícius Gomes Ribeiro</b>
          </sub>
        </a>
      </td>
    </tr>
  </table>
</div>

Agradecemos a todos os membros da equipe por seu trabalho árduo, dedicação e contribuições valiosas para o projeto. Seu empenho e habilidades foram fundamentais para o sucesso deste trabalho.

## 📝 Licença

Este projeto está licenciado sob os termos da [Licença](LICENSE). Por favor, consulte o arquivo LICENSE para obter mais detalhes.

A licença escolhida para o projeto é um elemento importante para estabelecer os direitos de uso, distribuição e modificações do código-fonte. É essencial que todos os usuários, colaboradores e interessados revisem e compreendam os termos e condições da licença antes de utilizar ou contribuir para o projeto.

Recomenda-se que você leia atentamente o arquivo LICENSE para garantir o cumprimento das regras estabelecidas e o uso adequado do código fornecido neste repositório.

[⬆ Voltar ao topo](#doapix-restful-api)
