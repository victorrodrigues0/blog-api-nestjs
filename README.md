# Blog API NestJS

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
</p>

<div align="center">
  <a href="#introducao">Introdução</a> •
  <a href="#sobre">Sobre</a> •
  <a href="#tecnologias">Tecnologias</a> •
  <a href="#arquitetura">Arquitetura</a> •
  <a href="#modelagem-de-dados">Modelagem de Dados</a> •
  <a href="#instalacao">Instalação</a> •
  <a href="#executando-o-projeto">Executando o Projeto</a> •
  <a href="#documentacao-swagger">Swagger</a> •
  <a href="#contribuicao">Contribuição</a>
</div>

---

## Introdução

Este projeto foi desenvolvido com base em princípios reconhecidos de engenharia de software, que visam garantir organização, clareza e facilidade de manutenção:

- **DDD (Domain-Driven Design):** Valoriza o entendimento profundo das regras e necessidades do negócio, promovendo uma modelagem fiel desses conceitos no código.
- **Clean Architecture:** Propõe uma separação clara entre as diferentes camadas do sistema, facilitando a evolução, manutenção e testes da aplicação.
- **SOLID:** Conjunto de boas práticas para escrita de código mais modular, flexível e de fácil adaptação a mudanças.
- **REST:** Um padrão para construção de APIs, que torna a comunicação entre sistemas mais simples, padronizada e eficiente.

A adoção desses conceitos contribui para um projeto mais robusto, sustentável e preparado para crescer de forma segura.

---

## Sobre

API de Blog desenvolvida em **NestJS**, estruturada seguindo os princípios da **Clean Architecture** e **Domain-Driven Design (DDD)**. O projeto é modular, escalável e de fácil manutenção, com autenticação, posts, comentários e sistema de favoritos.

---

## Tecnologias

- **Node.js** + **NestJS**
- **TypeScript**
- **Prisma ORM** (PostgreSQL)
- **JWT** para autenticação
- **Swagger** para documentação automática
- **Docker** (opcional para banco de dados)

---

## Arquitetura

O projeto segue a Clean Architecture, separando responsabilidades em camadas:

- **Domain:** Entidades, repositórios e regras de negócio.
- **Application:** Casos de uso (usecases) que orquestram as regras.
- **Infra:** Implementações concretas (ex: Prisma).
- **Interface:** Controladores HTTP, DTOs e validações.

```
src/
  domain/
    user/ post/ comment/ favorite/ auth/
  application/
    usecases/
  infra/
    database/ prisma/
  interface/
    http/ dtos/
```

---

## Modelagem de Dados

### Usuário (`users`)
- `id` (PK)
- `name`
- `email` (único)
- `password`
- Relacionamentos: posts, favoritos, comentários

### Post (`posts`)
- `id` (PK)
- `headline`
- `content`
- `user_id` (FK)
- Relacionamentos: favoritos, comentários

### Favoritos (`favorite_posts`)
- `resource_id` (PK, FK para posts)
- `user_id` (PK, FK para users)

### Comentários (`comments`)
- `id` (PK)
- `content`
- `user_id` (FK)
- Relacionamentos: posts (via `comment_posts`)

### Comentários em Posts (`comment_posts`)
- `comment_id` (PK, FK para comments)
- `post_id` (PK, FK para posts)

---

## Instalação

### Pré-requisitos

- Node.js >= 18
- Docker (opcional, recomendado para banco de dados)

### 1. Clone o repositório

```bash
git clone <url-do-repo>
cd blog-api-nestjs
```

### 2. Suba o banco de dados com Docker

```bash
docker-compose up -d
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Rode as migrações do banco

```bash
npm run migrate
```

---

## Executando o Projeto

### Desenvolvimento

```bash
npm run dev
```

A API estará disponível em: [http://localhost:3000/api](http://localhost:3000/api)

### Produção

```bash
npm run build
npm run start:prod
```

---

## Documentação Swagger

Acesse a documentação interativa em:  
[http://localhost:3000/api](http://localhost:3000/api)

---

## Testes

> **Atenção:** _Esta aplicação ainda **NÃO** possui testes automatizados implementados._

---

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/nome`)
3. Commit suas mudanças (`git commit -m 'feat: ...'`)
4. Push na branch (`git push origin feature/nome`)
5. Abra um Pull Request

---

## Licença

Este projeto é **UNLICENSED** (privado).
