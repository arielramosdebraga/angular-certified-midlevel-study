# 🎬 Angular Movies App

Aplicação desenvolvida para estudo da certificação **Angular Mid-Level**, focando em conceitos modernos do framework como **Standalone Components**, **RxJS**, **Signals**, **Router** e **Forms**.

---

## 🚀 Funcionalidades

- 📃 Listagem de filmes
- 🔍 Filtro de filmes por:
  - Título
  - Ano de lançamento
- ⭐ Marcar/desmarcar filmes como favoritos
- 📄 Visualização de detalhes do filme
- 🔗 Navegação com Angular Router (lazy loading)
- 🔄 Consumo de dados com RxJS Observables
- 🎨 Destaque visual ao passar o mouse (directive)

---

## 🧠 Conceitos aplicados

Este projeto cobre diversos tópicos importantes para Angular moderno:

- ✅ Standalone Components
- ✅ Angular Router (com lazy loading)
- ✅ RxJS (`Observable`, `async pipe`)
- ✅ Template-driven Forms (`ngModel`)
- ✅ Pipes customizados
- ✅ Diretivas customizadas
- ✅ Gerenciamento de estado com `signal`
- ✅ Comunicação entre componentes
- ✅ Boas práticas sem `subscribe` manual

---

## 🏗️ Estrutura do Projeto

```
src/app/
├── home/                # Lista de filmes + filtros
├── movie-item/         # Componente de item de filme
├── movie-details/      # Tela de detalhes (lazy-loaded)
├── services/           # Services (movies + favorites)
├── pipes/              # Pipes customizados
├── model/              # Interfaces de dados
├── highlight.directive.ts
├── app.routes.ts       # Configuração de rotas
```

---

## 🔍 Filtros de Filmes (Última Feature)

A aplicação permite filtrar filmes dinamicamente com base nos inputs do usuário:

- Digitação em tempo real
- Atualização automática da lista
- Uso de `ngModel` + `ngModelChange`
- Integração com `Observable` via `async pipe`

### Exemplo de uso:

```html
<input [(ngModel)]="title" (ngModelChange)="filterMovies()" />
<input [(ngModel)]="releaseDate" (ngModelChange)="filterMovies()" />
```

---

## 🔄 Fluxo de Dados

1. Usuário digita no input
2. `filterMovies()` é chamado
3. Service retorna um `Observable` filtrado
4. Template usa `async pipe`
5. UI atualiza automaticamente

---

## 🧩 Services

### MoviesService

- Busca lista de filmes
- Filtra filmes com base em título e ano

### FavoritesService

- Gerencia filmes favoritos usando **Signals**
- Permite adicionar/remover favoritos
- Compartilha estado entre componentes

---

## 🎨 Pipes

- `millionDollar` → formata valores monetários
- `minToDuration` → converte minutos para horas

---

## ▶️ Como rodar o projeto

```bash
# instalar dependências
npm install

# rodar aplicação
ng serve
```

Acesse:
http://localhost:4200

---

## 🧪 Testes

O projeto utiliza **Vitest** para testes:

```bash
npm run test
```

---

## 📌 Observações

- Não há uso de `subscribe` manual (boas práticas com async pipe)
- Projeto baseado em arquitetura moderna do Angular (standalone)
- Código voltado para aprendizado e certificação

---

## 📚 Objetivo

Este projeto foi desenvolvido com foco em:

- Preparação para certificação Angular
- Consolidação de conceitos modernos
- Prática com arquitetura limpa e reativa

---

## 👨‍💻 Autor

**Ariel Ramos de Braga**  
Frontend Developer

---

## ⭐ Se esse projeto te ajudou

Deixe uma estrela ⭐ no repositório!
