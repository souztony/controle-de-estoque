# Controle de Estoque - Backend

API Backend para o Sistema de Controle de Estoque. Construído com Java e Quarkus, projetado para alta performance e baixo consumo de memória.

## 🛠 Stack Tecnológica

- **Framework**: Quarkus (Supersonic Subatomic Java)
- **Acesso a Dados**: Hibernate ORM com Panache
- **Driver de Banco de Dados**: PostgreSQL JDBC
- **Documentação da API**: SmallRye OpenAPI (Swagger UI)
- **Testes**: JUnit 5 & RestAssured

## ⚙️ Configuração

A aplicação é configurada através do arquivo `src/main/resources/application.properties`.

Propriedades principais:
- `quarkus.datasource.db-kind`: postgresql
- `quarkus.hibernate-orm.database.generation`: drop-and-create (para desenvolvimento/testes)

> [!NOTE]
> Garanta que o banco de dados PostgreSQL esteja em execução (via Docker Compose na raiz) antes de iniciar a aplicação.

## 🚀 Executando a Aplicação

### Modo de Desenvolvimento
Para executar a aplicação em modo de desenvolvimento (com live coding):

```bash
./mvnw compile quarkus:dev
```
A aplicação estará ouvindo na porta **8080**.

### Empacotamento
Para construir a aplicação:
```bash
./mvnw clean package
```
Isso gera o arquivo `quarkus-run.jar` no diretório `target/quarkus-app/`.

## 🧪 Testes

O backend inclui uma suíte de testes unitários e de integração.

Para executar todos os testes:
```bash
./mvnw test
```

## 📖 Documentação da API

Uma vez que a aplicação esteja em execução, você pode acessar a documentação interativa da API (Swagger UI) em:

**[http://localhost:8080/q/swagger-ui/](http://localhost:8080/q/swagger-ui/)**

Esta interface permite explorar os endpoints para:
- `/products` (CRUD de Produtos)
- `/materials` (CRUD de Matérias-Primas)
- `/production` (Lógica de Produção)

## 🏗 Principais Endpoints

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| **GET** | `/products` | Listar todos os produtos |
| **GET** | `/materials` | Listar todos os materiais disponíveis |
| **GET** | `/production/calculate` | Calcular produção possível baseada no estoque |
