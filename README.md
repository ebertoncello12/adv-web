## Treinamento React

#### 1. Requisitos necessários

- Install docker
- Install docker-compose
- Install Makefile

#### 2. Passos para executar o projeto em desenvolvimento

* Configurações necessárias para executar o projeto em desenvolvimento

  - Recomendamos criar uma alias `dcli` para executar o comando:  `docker-compose -f docker-compose.cli.yml run --rm`
  - Copiar o arquivo `.env.dist` com o nome `.env`
    - Configure o arquivo `.env`

* Lista de comandos

| COMANDOS                         | DESCRIÇÃO                                |
|----------------------------------|------------------------------------------|
| dcli yarn install                | Para instalar todas dependências         |
| dcli yarn add `lib`              | Para instalar uma dependência            |
| dcli yarn lint:fix               | Para analisar todo código                |
| dcli yarn format:fix             | Para formatar todo código                |
| dcli yarn build                  | Para construir o código para produção    |
| dcli yarn preview                | Para visualizar versão final de produção |
| dcli --service-ports yarn start  | Para iniciar a aplicação                 |

* Para acessar o site em desenvolvimento, use o url com pelo `ip` exemplo

    ```bash
    On Your Network:  http://172.26.0.2:3000
    ```

#### 3. Estrutura de Branch do projeto padrão GitFlow
* Branch
  * main (Produção, tagmento de versão)
    * hotfix/LGPD-xx (Correções pontuais)
  * develop (Desenvolvimento)
    * feature/LGPD-xx (Desenvolvimento de novas funções)
    * bugfix/LGPD-xx (Correções de bugs)
  * release (Temporária pra ambiente de homologação)
    * pacote de versão para teste a partir da branch `develop`, após testada será feito o merge na branch `main`

### 5. Theme base

 - https://github.com/devias-io/material-kit-react
