# Estação RAW · Guia de desktops para fotografia

Site responsivo, estático e independente de backend para comparar 18 perfis de computadores para fotografia (AM4, AM5 e Intel), pesquisar 63 modelos de componentes e consultar 109 registros de ofertas, com links e alertas técnicos.

## Início rápido

No diretório do projeto, execute `python -m http.server 8080` e abra http://localhost:8080. Não precisa instalar pacotes nem configurar chaves. Também pode publicar todos os arquivos diretamente na Vercel em um projeto sem framework, ou apontar a Vercel para o GitHub.

## Conteúdo

- `index.html`: conteúdo acessível e metadados SEO.
- `styles.css`: responsividade e identidade visual.
- `app.js`: filtros, busca, detalhes de componentes, comparador (até 3 PCs), paginação e fontes.
- `data.json`: 18 perfis, 63 modelos, 109 ofertas e 189 atalhos de canais complementares, incluindo registros pendentes.

## Limites dos dados

Pesquisa de ofertas em **02/11/2026**. Não são valores ao vivo. Nenhuma das 18 configurações está 100% precificada. Os valores de subtotal refletem só os componentes confirmados, e a cobertura aparece nos cartões. Nenhum preço foi estimado para suprir lacunas. As pesquisas complementares em Shopee, Mercado Livre e Google Shopping estavam interrompidas; os links correspondentes são somente atalhos de busca. Os dois documentos Word apresentam guias técnicos e registros históricos anteriores, não sendo mesclados aos preços da planilha.

## Hospedagem

Site estático sem banco, sem integrações e sem APIs de terceiros. O Google Fonts é opcional; o CSS utiliza fontes alternativas locais se a rede estiver indisponível.

## Política editorial

Guia independente, não afiliado às lojas. Antes de comprar, confirmar SKU, vendedor, entrega, preço, condição, disponibilidade, garantia, BIOS e compatibilidade. Não há atualização automática de preços.

## Produção (Vercel)

Este repositório é a fonte de código do site **Estação RAW**, com implantação automática em Vercel mediante conexão GitHub.

Projeto Git conectado: https://vercel.com/liuhelpme-4965s-projects/estacao-raw
Site: https://estacao-raw.vercel.app

## Atualizações

Para renovar os preços, gerar uma nova versão verificada dos dados e atualizar `data.json`; não apresentar os preços históricos como tempo real.