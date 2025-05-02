#Challenge-1 - Experiência Conversacional
Desenvolver um caso de uso conversacional relacionado à FURIA

# FURIA Fan Chat

Este é um projeto de chatbot simples criado para fãs da equipe de CS da FURIA. Ele permite fazer perguntas básicas sobre o elenco atual, cultura do time, próximas partidas, estatísticas, redes sociais, curiosidades, memes, sobre cada jogador, consegue te direcionar para a loja e contém direcionamento para o whatsapp, caso o fã deseje algo a mais.

## Tecnologias Utilizadas

*   **Framework:** Next.js (v15+)
*   **Linguagem:** TypeScript
*   **UI Library:** React (v19+)
*   **Estilização:** Tailwind CSS
*   **Componentes UI (Base):** shadcn/ui (o template base inclui, embora poucos tenham sido usados diretamente no chat)
*   **Gerenciador de Pacotes:** pnpm (mas npm ou yarn também podem ser usados)

## Pré-requisitos

*   Node.js (versão 20.x ou superior recomendada)
*   pnpm (ou npm/yarn)

## Instalação

1.  Clone este repositório (ou descompacte o arquivo `.zip` se você o baixou):
    ```bash
    # Se clonando:
    git clone <url-do-repositorio>
    cd furia-fan-chat
    # Se descompactando:
    # unzip furia_chat_app_source.zip
    # cd furia_chat_app
    ```

2.  Instale as dependências do projeto. Use o gerenciador de pacotes de sua preferência (o projeto foi inicializado com pnpm):
    ```bash
    pnpm install
    # ou
    # npm install
    # ou
    # yarn install
    ```

## Rodando o Projeto

Para iniciar o servidor de desenvolvimento local:

```bash
pnpm dev
# ou
# npm run dev
# ou
# yarn dev
```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

Observações

# Observações
* A lógica do chatbot atual é muito básica e baseada em respostas pré-definidas encontradas em src/components/ChatInterface.tsx.
* Os dados sobre a FURIA (elenco, etc.) estão hardcoded no mesmo arquivo (furiaData). Para uma aplicação real, esses dados deveriam ser buscados de uma API externa, na qual procurei bastante, porém encontrei relatos que não tinha nenhuma.
* O design segue um tema preto e branco, conforme a paleta de cores do time.
