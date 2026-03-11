# Controle de Gastos
Aplicação para controle de gastos residenciais com .NET 10, React e MySQL.

## Tecnologias utilizadas

### Backend
- .NET 10
- ASP.NET Core Web API
- Entity Framework Core
- MySQL
- Swagger

### Frontend
- React
- TypeScript
- Vite

### Banco
- MySQL 8
- MySQL Workbench

---

## Estrutura do Projeto
<img width="372" height="431" alt="image" src="https://github.com/user-attachments/assets/1eb76677-4236-4d47-8439-f1faf34a40fb" />
<img width="320" height="394" alt="image" src="https://github.com/user-attachments/assets/4d9c5117-a1c8-4f1a-8769-5fa629ee019e" />

---

## Pré-requisitos
- .NET SDK 10
- Node.js
- npm
- MySQL 8

Versões utilizadas no desenvolvimento:

- .NET SDK `10.0.103`
- Node `24.11.1`
- npm `11.6.2`

Portas utilizadas

- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:5029`

---

## Funcionalidades implementadas

### Pessoas
- Criar pessoa
- Listar pessoas
- Editar pessoa
- Excluir pessoa

### Categorias
- Criar categoria
- Listar categorias
- Excluir categoria

### Transações
- Criar transação
- Listar transações
- Excluir transação

### Relatórios
- Consulta de totais por **pessoa**
- Consulta de totais por **categoria**

---

## Regras de negócio implementadas

- Ao **excluir uma pessoa**, todas as transações vinculadas a ela também são removidas.
- O **valor da transação deve ser positivo**.
- **Menores de 18 anos** só podem registrar **transações do tipo despesa**.
- A **categoria deve ser compatível com o tipo da transação**:
  - Transações do tipo **despesa** não podem utilizar categorias com finalidade **receita**.
  - Transações do tipo **receita** não podem utilizar categorias com finalidade **despesa**.
  - Categorias com finalidade **ambas** podem ser utilizadas para qualquer tipo de transação.
- Os relatórios apresentam **totais consolidados por pessoa e por categoria**, além de um **total geral**.

---

# Telas do Sistema

<img width="1914" height="908" alt="image" src="https://github.com/user-attachments/assets/4dd701ae-baa9-4fda-9372-0ff97fdc0c1a" />
<img width="1916" height="902" alt="image" src="https://github.com/user-attachments/assets/8d76f860-0b65-4c1b-bc03-9f2220acfc4d" />
<img width="1915" height="907" alt="image" src="https://github.com/user-attachments/assets/89fb7cd3-16a5-4552-b9b5-ff4ac4fef22d" />
<img width="1913" height="905" alt="image" src="https://github.com/user-attachments/assets/6d11d2a6-6f0c-4410-84d9-d15a5f49e066" />
<img width="1915" height="905" alt="image" src="https://github.com/user-attachments/assets/e3b7011b-aa38-475d-b270-eb5d61edfb52" />
<img width="1918" height="909" alt="image" src="https://github.com/user-attachments/assets/3e10b445-dedf-48c8-98dc-fbfceb0603f5" />
<img width="1918" height="907" alt="image" src="https://github.com/user-attachments/assets/9228be6c-e9a9-49d1-87fd-36052e81b7d1" />
<img width="1917" height="907" alt="image" src="https://github.com/user-attachments/assets/19f51492-47a1-452f-90d1-7016a59cf6a5" />

---

## Possíveis futuras melhorias

- Deploy completo da aplicação (frontend + backend)
- Melhorias de **UX e responsividade**
- Edição de **categorias e transações no frontend**
- Implementação de **testes automatizados**

---
