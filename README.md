# Projeto Finanças Web

Projeto frontend desenvolvido com **Angular 20**, integrado a uma API REST construída com **Spring Boot**.  
O sistema já conta com componentes de **Login**, **Criação de Usuários**, **Consulta e Edição de Movimentações Financeiras**, além de um **Cadastro de Categorias**.  
Toda a parte de formulários foi implementada utilizando **Formulários Reativos** e a autenticação utiliza **CryptoJS** para criptografia.

## Tecnologias e Ferramentas

- Angular 20
- TypeScript
- RxJS
- Angular Forms (Reativos)
- Bootstrap 5
- CryptoJS

## Funcionalidades

- **Tela de Login**  
Permite autenticar um usuário com e-mail e senha válidos, utilizando criptografia com CryptoJS.

- **Tela de Criação de Usuários**  
Formulário para cadastro de novos usuários com validação de campos obrigatórios.

- **Consulta de Movimentações Financeiras**  
Exibe uma lista de movimentações cadastradas, com totais de entradas, saídas e saldo.  
Possui também ações para edição e exclusão de movimentações.

- **Edição de Movimentações Financeiras**  
Permite atualizar dados de movimentações já cadastradas.

- **Cadastro de Categorias**  
Formulário para criação e gerenciamento de categorias utilizadas nas movimentações financeiras.

Este projeto se comunica com a API Spring Boot para autenticação, cadastro de usuários, movimentações e categorias.  
Repositório da API:  
[https://github.com/a-devrepo/projetoUsuariosApi](https://github.com/a-devrepo/projetoUsuariosApi)

## Como executar o projeto

**Clone o repositório**

```bash
git clone https://github.com/a-devrepo/projetoFinancasWeb
cd projetoFinancasWeb
```
**Instale os modules**
```bash
npm install
```
**Inicie o projeto**
```bash
ng serve
```
**Acesse no browser**
```bash
http://localhost:4200
```