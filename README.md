# Estação RAW · Guia de desktops para fotografia

Site responsivo, estático e independente de backend para comparar 18 perfis de computadores para fotografia (AM4, AM5 e Intel), pesquisar 63 modelos de componentes e consultar 109 registros de ofertas, com links e alertas técnicos.

## Início rápido

No diretório do projeto, execute `python -m http.server 8080` e abra http://localhost:8080. Não precisa instalar pacotes nem configurar chaves. Também pode publicar todos os arquivos diretamente na Vercel em um projeto sem framework, ou apontar a Vercel para o GitHub.

## Conteúdo

- `index.html`: conteúdo, acessibilidade, SEO, ordenação por preço e metodologia.
- `styles.css`: identidade visual e responsividade.
- `app.js`: busca, filtros, detalhe dos custos de cada montagem, comparador e links.
- `data.json`: os 18 perfis, 63 componentes, 109 ofertas históricas e **orçamentos completos com fontes por item**.
- `orcamentos-completos.csv`: auditoria de todas as peças, preços, quantidades, origem, critérios de estimativa e total dos 18 PCs.
- `favicon.svg`: identidade do site.

## Como interpretar os preços (atualização 16/11/2026)

A antiga visualização de subtotais parciais foi substituída por **orçamento completo de cada PC**, incluindo os oito grupos de componentes (vídeo integrado e cooler incluso aparecem a R$ 0) e **R$ 250 de referência de montagem e testes**. O valor do serviço se baseia em preço publicado por prestador brasileiro; pode variar conforme loja e escopo.

Os valores foram montados a partir de três situações claramente diferenciadas no detalhe dos perfis:

1. **Preço pesquisado**: anúncio de varejo ou comparador consultado para novembro de 2026, com produto identificado.
2. **Oferta da pesquisa de 02/11**: cotação validada na planilha fornecida, preservada como referência histórica, sem garantia de preço atual.
3. **Referência / estimativa**: produto fora de estoque, preço mais antigo, classe equivalente ou combinação de módulos equivalentes. Cada hipótese e fonte estão identificadas na linha da peça.

**Todas as oito linhas de custo de cada perfil estão preenchidas, mas isso NÃO significa que todos os SKUs estejam em estoque, que haja oito ofertas atuais validadas, ou que uma loja venda o conjunto pelo total apresentado.** A pesquisa não é atualizada automaticamente. Preço final exige conferência de vendedor, disponibilidade, CEP e forma de pagamento. Não estão incluídos frete, licenças Windows/software, periféricos, monitores e dispositivos de backup. Valores são **estimativas de custo, não cotações fechadas**.

**Notas específicas**: no AM5 básico o Ryzen 5 7600 BOX inclui cooler e o AK400 é opcional, por isso o cooler padrão acrescenta R$ 0 ao total. Em AM4 avançado existem **dois SSDs** de 1TB, e ambos foram somados. Em APU Intel/AMD a GPU é integrada e não requer compra separada. Em configurações com peças raras, sobretudo placas de vídeo antigas e módulos DDR5 64 GB, o preço referencial pode diferir substancialmente de uma oferta disponível.

## Hospedagem

Site estático sem banco, sem integrações e sem APIs de terceiros. O Google Fonts é opcional; o CSS utiliza fontes alternativas locais se a rede estiver indisponível.

## Política editorial

Guia independente, não afiliado às lojas. Antes de comprar, confirmar SKU, vendedor, entrega, preço, condição, disponibilidade, garantia, BIOS e compatibilidade. Não há atualização automática de preços.

## Produção (Vercel)

Este repositório é a fonte de código do site **Estação RAW**, com implantação automática em Vercel mediante conexão GitHub.

Projeto: https://vercel.com/liuhelpme-4965s-projects/estacao-raw
Site: https://estacao-raw.vercel.app

## Atualizações

Para renovar os preços, revisar cada `profiles[].pricing.items[]` em `data.json`, preservar as fontes e `date`, recalcular `partsTotal` e `completeTotal` e regenerar `orcamentos-completos.csv`. Não converter preços históricos ou proxies em ofertas atuais sem verificação.