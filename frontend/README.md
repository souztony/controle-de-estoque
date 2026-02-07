# Controle de Estoque - Frontend

Interface de usuário para o Sistema de Controle de Estoque. Construído com React e TypeScript, impulsionado pelo Vite para atualizações rápidas de desenvolvimento.

## 🛠 Stack Tecnológica

- **Framework**: React 19 + TypeScript
- **Ferramenta de Build**: Vite
- **Estilização**: Tailwind CSS 4
- **Gerenciamento de Estado**: Redux Toolkit
- **Roteamento**: React Router DOM 7
- **Cliente HTTP**: Axios
- **Ícones**: Lucide React
- **Testes**: Vitest, React Testing Library, Cypress

## ⚙️ Pré-requisitos

Certifique-se de que o **Node.js 20+** esteja instalado em sua máquina.

## 🚀 Executando a Aplicação

### 1. Instalar Dependências
Navegue até o diretório `frontend` e instale os pacotes necessários:

```bash
npm install
```

### 2. Iniciar Servidor de Desenvolvimento
Execute a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

A aplicação estará acessível em **[http://localhost:5173](http://localhost:5173)**.

### 3. Build para Produção
Para criar uma versão pronta para produção:

```bash
npm run build
```

## 🧪 Testes

### Testes Unitários (Vitest)
Os testes unitários são escritos usando Vitest e React Testing Library.

```bash
npm run test
```

### Testes Ponta a Ponta (Cypress)
Cypress é utilizado para testes de integração e E2E.

Abrir o Executor de Testes do Cypress:
```bash
npm run cypress:open
```

Executar testes do Cypress em modo headless:
```bash
npm run cypress:run
```

## 🧹 Linting

O projeto utiliza ESLint para garantir a qualidade do código. Para executar o linter:

```bash
npm run lint
```
