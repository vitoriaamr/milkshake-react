# Coração de Ouro - Milkshake Builder 🍦

**Trabalho Acadêmico**
* **Disciplina:** Laboratório de Engenharia de Software
* **Professor:** André
* **Membros:** Vitória e Gabriel

---

## 📖 Sobre o Projeto
O "Coração de Ouro" é uma aplicação web interativa (Single Page Application) desenvolvida com React e TypeScript que permite aos usuários montarem e personalizarem seus próprios milkshakes. A interface foi projetada com uma estética *vintage/retro diner*, oferecendo uma experiência de usuário imersiva, responsiva e com animações fluidas simulando um copo sendo preenchido em tempo real.

## 🛠️ Tecnologias Utilizadas
* **React 18** (Vite)
* **TypeScript**
* **Tailwind CSS** (Estilização, Tipografia e Layout)
* **Motion (Framer Motion)** (Animações ricas e transições da interface)
* **Lucide React** (Ícones vetoriais)
* **Express** + **MySQL** (API de lojas próximas)

## 📁 Estrutura do Projeto
A organização de pastas e arquivos da aplicação baseia-se em modularidade:

```text
├── public/             # Arquivos públicos e assets estáticos
├── src/
│   ├── components/     # Componentes visuais do React
│   │   ├── Builder.tsx      # Lógica principal de montagem do pedido
│   │   ├── Hero.tsx         # Seção de introdução/cabeçalho
│   │   ├── Features.tsx     # Destaques da sorveteria
│   │   ├── Testimonials.tsx # Depoimentos de clientes
│   │   └── ...              # Outros componentes de UI
│   ├── data.ts         # Dados estáticos (ingredientes, preços, categorias)
│   ├── App.tsx         # Ponto central de montagem das telas
│   ├── main.tsx        # Ponto de entrada do React
│   ├── index.css       # Estilos globais e integração do Tailwind
│   └── types.ts        # Tipagens globais do TypeScript
├── package.json        # Dependências e definição de scripts
├── tailwind.config.js  # Configuração do Tailwind CSS
├── vite.config.ts      # Configuração do empacotador Vite
└── README.md           # Documentação
```

## 🚀 Como Rodar o Projeto

### Pré-requisitos
* [Node.js](https://nodejs.org/en/) instalado (versão 18 ou superior).
* Gerenciador de pacotes `npm` (que já vem com o Node).
* [MySQL Server](https://dev.mysql.com/downloads/mysql/) instalado e rodando localmente (porta padrão `3306`).

### Passo a Passo

1. **Instale as dependências do projeto**
   Abra o seu terminal na pasta raiz do projeto e execute:
   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente**
   Copie o arquivo `.env.example` para `.env` e ajuste as credenciais do MySQL (usuário, senha, host) conforme o seu ambiente:
   ```bash
   cp .env.example .env
   ```

3. **Crie o banco de dados e as tabelas**
   Esse comando cria o banco `shake_haven`, a tabela `stores` e popula com lojas de exemplo em São Paulo:
   ```bash
   npm run db:setup
   ```

4. **Inicie o servidor de desenvolvimento**
   Esse comando inicia o frontend (Vite) e a API (Express) juntos:
   ```bash
   npm run dev
   ```
   *O terminal exibirá o link local (`http://localhost:3000`). A API roda em `http://localhost:3001` e é acessada pelo frontend através de `/api/...` (proxy configurado no Vite).*

5. **Geração da Versão de Produção (Build)**
   Caso queira preparar o projeto para ser hospedado (deploy), execute:
   ```bash
   npm run build
   ```
   *Os arquivos minificados e otimizados para produção serão gerados  na pasta `dist/`.*

## 📍 Lojas Próximas (Geolocalização)

Na página inicial, a seção **"Lojas Próximas"** permite que o usuário clique em "Usar minha localização" para que o navegador peça permissão de geolocalização (`navigator.geolocation`). As coordenadas são enviadas para a API:

```
GET /api/stores/nearby?lat=<latitude>&lng=<longitude>&limit=5
```

A API calcula a distância (em km) de cada loja cadastrada no MySQL usando a fórmula de Haversine e retorna as mais próximas, ordenadas por distância. Os dados das lojas ficam na tabela `stores` (veja `server/schema.sql`).
