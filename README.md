# Sistema de Controle de Estoque

Solução profissional de gestão de estoque para controle de matérias-primas, produtos e capacidade de produção.

## 📌 Visão Geral do Projeto

Este projeto é uma aplicação web full-stack desenvolvida para gerenciar o inventário de uma indústria de manufatura. O sistema permite aos usuários:
- Cadastrar e gerenciar **Produtos** (com valor e composição).
- Cadastrar e gerenciar **Matérias-Primas** (com níveis de estoque).
- Associar Matérias-Primas aos Produtos (Ficha Técnica/Bill of Materials).
- Calcular a capacidade potencial de produção com base no estoque atual.
- Maximizar o valor de produção com sugestões inteligentes.

## 🏗 Arquitetura

O sistema segue uma arquitetura moderna e desacoplada:

- **Backend**: Java / Quarkus (API REST)
- **Frontend**: React / TypeScript (SPA)
- **Banco de Dados**: PostgreSQL (Containerizado)

## 🚀 Principais Funcionalidades

- **Gestão de Produtos**: CRUD para produtos acabados com precificação.
- **Gestão de Materiais**: CRUD para matérias-primas com rastreamento de estoque.
- **Lógica de Composição**: Definição de receitas vinculando materiais aos produtos.
- **Análise de Produção**: Algoritmo para determinar possibilidades de fabricação baseadas no estoque.
- **Maximização de Valor**: Prioriza sugestões de produção de alto valor.

## 🛠 Pré-requisitos

Antes de executar o projeto, certifique-se de ter o seguinte instalado:

- **Java JDK 21+** (Recomendado para Quarkus)
- **Node.js 20+** (Para o Frontend)
- **Docker & Docker Compose** (Para o Banco de Dados)

## 🏁 Guia de Início Rápido

### 1. Iniciar o Banco de Dados
O projeto utiliza Docker Compose para iniciar uma instância do PostgreSQL.

```bash
docker-compose up -d
```

### 2. Executar o Backend
Navegue até o diretório `backend` e inicie o servidor de desenvolvimento Quarkus.

```bash
cd backend
./mvnw compile quarkus:dev
```
*A API estará disponível em `http://localhost:8080`*

### 3. Executar o Frontend
Navegue até o diretório `frontend`, instale as dependências e inicie o servidor de desenvolvimento Vite.

```bash
cd frontend
npm install
npm run dev
```
*A interface web estará disponível em `http://localhost:5173`*

## 📚 Documentação

Para informações mais detalhadas, consulte a documentação específica:

- [Documentação do Backend](./backend/README.md)
- [Documentação do Frontend](./frontend/README.md)

---
*Desenvolvido por Tony Souza.*