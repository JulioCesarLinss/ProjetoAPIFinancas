<div align="center">
  <img width="300" alt="logo" src="https://github.com/user-attachments/assets/cd3969ab-fba6-49c0-aea0-717575399c0e" />

  <h3 style="margin-top: 10px;">API de Finanças Pessoais</h3>

  <br />

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Java](https://img.shields.io/badge/Backend-Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Framework-Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![**Projeto Acadêmico**](https://img.shields.io/badge/📚-Projeto%20Acadêmico-success?style=for-the-badge)

---


</div>

### 👨‍💻 Contribuidores

<div align="center">

| [<img src="https://avatars.githubusercontent.com/u/169162600?v=4" width="100" height="100" style="border-radius:50%">](https://github.com/ArturLima33) | [<img src="https://avatars.githubusercontent.com/u/169162345?v=4" width="100" height="100" style="border-radius:50%">](https://github.com/D4n1el20) | [<img src="https://avatars.githubusercontent.com/u/163533321?v=4" width="100" height="100" style="border-radius:50%">](https://github.com/Cyvier) | [<img src="https://avatars.githubusercontent.com/u/169077824?v=4" width="100" height="100" style="border-radius:50%">](https://github.com/felipeassiss) | [<img src="https://avatars.githubusercontent.com/u/169167613?v=4" width="100" height="100" style="border-radius:50%">](https://github.com/JulioCesarLinss) | [<img src="https://avatars.githubusercontent.com/u/169167539?v=4" width="100" height="100" style="border-radius:50%">](https://github.com/Lucci268) |
|:--:|:--:|:--:|:--:|:--:|:--:|
| **Artur Lima** | **Daniel Silva** | **Davi Magalhães** | **Felipe Assis** | **Júlio Lins** | **Lucciano Cordeiro** |

</div>

---

Este repositório contém o código-fonte completo (Frontend e Backend) do sistema **Cash+**. A aplicação permite que usuários controlem suas finanças, registrem transações, criem metas financeiras e visualizem relatórios, enquanto administradores mantêm o sistema organizado e monitoram o uso da plataforma.

---

## 🖥️ Visualização do Sistema

Abaixo, uma captura de tela da interface do usuário, demonstrando o painel principal com o resumo financeiro, metas e histórico de transações.

<div align="center">
  <img width="800" alt="Captura de tela 2025-11-28 213406" src="https://github.com/user-attachments/assets/6d9567bf-7c60-4f89-9106-bed086922bfe" />
</div>

---

### 1. Criação de Protótipos de Lo-Fi (Figma)
- Foram elaborados **sketches e storyboards** para representar o fluxo das histórias de usuário.
- Protótipo Lo-Fi disponível no Figma: [🔗 Link para o Figma](https://www.figma.com/design/jufpasxokV5zpu8cvFCZ25/Cash-?node-id=0-1&t=zuDA5kGo0uqpAJZK-1)
- **Screencast** apresentando o protótipo: [🎥 Link para o vídeo](https://github.com/user-attachments/assets/ff81ff60-9067-4536-a611-31549dc60490)

---

### 2. Diagrama de Atividades do Sistema
O diagrama de atividades (UML) mostra o fluxo principal do sistema.
- Disponível em: [📄Link para o Canva](https://www.canva.com/design/DAG1by7sao8/s8fswB0WtQV45PrH30zFrg/edit?utm_content=DAG1by7sao8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

---

### 3. Issue / Bug Tracker (GitHub)
Utilizamos o **GitHub Issues** para acompanhamento de tarefas, melhorias e bugs durante o desenvolvimento.

<div align="center">
  <img src="https://github.com/D4n1el20/ImagensProjetoAPIFinancas/blob/main/Captura%20de%20tela%202025-10-20%20180235.png?raw=true" alt="Print Issues GitHub" width="45%">
</div>

---

### 4. Gestão do Projeto (Kanban)
O andamento do projeto foi acompanhado no **Trello**.
- Apresentação do trabalho com slides disponível no [Canva](https://www.canva.com/design/DAG5VKDXrUU/1AMUgQZa77P80FfcCkxgHQ/edit?utm_content=DAG5VKDXrUU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton).

<div align="center">
  <img src="https://github.com/user-attachments/assets/97897e73-8195-4f33-804c-fdb5e38f0683" alt="Quadro da Sprint" width="50%">
</div>

---

## 💻 Tecnologias Utilizadas

**Backend:**
- **Java 17** & **Spring Boot 3.3.2**
- **Spring Data JPA** (Persistência de dados)
- **PostgreSQL** (Banco de dados relacional)
- **Bean Validation** (Validação de entradas)
- **Spring Security Crypto** (Criptografia de senhas)

**Frontend:**
- **React** (Biblioteca UI)
- **Vite** (Build tool)
- **Tailwind CSS** (Estilização)
- **Axios** (Integração com API)
- **Recharts** (Gráficos e relatórios)
- **Lucide React** (Ícones)

---

## ✨ Funcionalidades Implementadas

### Para Usuários
- **Autenticação:** Cadastro e Login com e-mail, senha e avatar.
- **Dashboard:** Visão geral do saldo, gráfico de despesas por categoria e últimas movimentações.
- **Transações:** Registro de receitas e despesas com categorização e datas personalizadas.
- **Metas Financeiras:** Criação de objetivos de economia (ex: "Computador Novo") com barra de progresso visual.
- **Lembretes:** Sistema de lembretes para pagamentos futuros.
- **Perfil:** Edição de dados cadastrais e foto de perfil.
- **Termos de Uso:** Visualização dos termos legais da aplicação.

### Para Administradores
- **Painel Admin:** Visualização de estatísticas gerais do sistema (total de usuários, usuários ativos).

---

## 🛠️ Estrutura da API (Principais Endpoints)

| Controller | Rota Base | Descrição |
| :--- | :--- | :--- |
| **Auth** | `/api/users` | Registro e Login de usuários (`/register`, `/login`, `/{id}`). |
| **Transacao** | `/api/transactions` | CRUD de transações e filtros por data/valor/categoria. |
| **Meta** | `/api/goals` | Gerenciamento de metas financeiras do usuário. |
| **Categoria** | `/api/categorias` | Criação e listagem de categorias personalizadas. |
| **Lembrete** | `/api/reminders` | Gerenciamento de lembretes de vencimento. |
| **Admin** | `/api/admin` | Rotas protegidas para listagem de usuários e estatísticas (`/statistics`). |
| **Termos** | `/api/terms-of-use` | Texto dos termos de uso. |

---

### Pré-requisitos

- Java 17+
- Node.js & npm
- PostgreSQL (Banco de dados criado com nome `cashplus_db`)
