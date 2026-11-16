# Estação RAW · Guia de desktops para fotografia

Site responsivo, estático e independente de backend para comparar 18 perfis de computadores para fotografia (AM4, AM5 e Intel), pesquisar 63 modelos de componentes e consultar 109 registros de ofertas, com links e alertas técnicos.

## Início rápido

No diretório do projeto, execute `python -m http.server 8080` e abra http://localhost:8080. Não precisa instalar pacotes nem configurar chaves. Também pode publicar todos os arquivos diretamente na Vercel em um projeto sem framework, ou apontar a Vercel para o GitHub.

## Conteúdo

- `index.html`: conteúdo, acessibilidade, SEO, ordenação por preço e metodologia.
- `styles.css`: identidade visual e responsividade.
- `app.js`: busca, filtros, detalhe dos custos de cada montagem, comparador e links.
- `data.json`: os 18 perfis, 63 componentes, 109 ofertas históricas e **orçamentos completos com fontes por item**, alternativas de custo e histórico.
- `orcamentos-completos.csv`: auditoria de todas as peças, preços, quantidades, origem, critérios de estimativa e total dos 18 PCs.
- `favicon.svg`: identidade do site.

## Como interpretar os preços (atualização 16/11/2026)

A antiga visualização de subtotais parciais foi substituída por **orçamento completo de cada PC**, incluindo os oito grupos de componentes (vídeo integrado e cooler incluso aparecem a R$ 0) e **R$ 250 de referência de montagem e testes**. O valor do serviço se baseia em preço publicado por prestador brasileiro; pode variar conforme loja e escopo.

Os valores foram montados a partir de três situações claramente diferenciadas no detalhe dos perfis:

1. **Preço pesquisado**: anúncio de varejo ou comparador consultado para novembro de 2026, com produto identificado.
2. **Oferta da pesquisa de 02/11**: cotação validada na planilha fornecida, preservada como referência histórica, sem garantia de preço atual.
3. **Referência / estimativa**: produto fora de estoque, preço mais antigo, classe equivalente ou combinação de módulos equivalentes. Cada hipótese e fonte estão identificadas na linha da peça.

**Todas as oito linhas de custo de cada perfil estão preenchidas, mas isso NÃO significa que todos os SKUs estejam em estoque, que haja oito ofertas atuais validadas, ou que uma loja venda o conjunto pelo total apresentado.** Existe automação semanal de pesquisa e publicação mediante QA; não há atualização em tempo real. Preço final exige conferência de vendedor, disponibilidade, CEP e forma de pagamento. Não estão incluídos frete, licenças Windows/software, periféricos, monitores e dispositivos de backup. Valores são **estimativas de custo, não cotações fechadas**.

**Notas específicas**: no AM5 básico o Ryzen 5 7600 BOX inclui cooler e o AK400 é opcional, por isso o cooler padrão acrescenta R$ 0 ao total. Em AM4 avançado existem **dois SSDs** de 1TB, e ambos foram somados. Em APU Intel/AMD a GPU é integrada e não requer compra separada. Em configurações com peças raras, sobretudo placas de vídeo antigas e módulos DDR5 64 GB, o preço referencial pode diferir substancialmente de uma oferta disponível.

## Hospedagem

Site estático sem banco, sem integrações e sem APIs de terceiros. O Google Fonts é opcional; o CSS utiliza fontes alternativas locais se a rede estiver indisponível.

## Política editorial

Guia independente, não afiliado às lojas. Antes de comprar, confirmar SKU, vendedor, entrega, preço, condição, disponibilidade, garantia, BIOS e compatibilidade. Há revisão semanal agendada com fonte e QA, sem preço em tempo real.

## Produção (Vercel)

Este repositório é a fonte de código do site **Estação RAW**, com implantação automática em Vercel mediante conexão GitHub.

Projeto: https://vercel.com/liuhelpme-4965s-projects/estacao-raw
Site: https://estacao-raw.vercel.app

## Atualizações

Para renovar os preços, revisar cada `profiles[].pricing.items[]` em `data.json`, preservar as fontes e `date`, recalcular `partsTotal` e `completeTotal` e regenerar `orcamentos-completos.csv`. Não converter preços históricos ou proxies em ofertas atuais sem verificação.

## Revisão semanal e primeira modernização — 16/11/2026

Há uma automação do ChatGPT programada para **segundas-feiras, ~8h de Brasília**. Ela realiza pesquisa atualizada, valida dados, publica por branch/PR quando apropriado e confirma o deploy Vercel. **A automação não implica atualizações em tempo real**, nem dispensa verificar anúncios no checkout. Se as integrações ou a QA falharem, os preços anteriores devem ser preservados.

A primeira modernização acrescentou **seis peças alternativas** ao catálogo e dois registros de preço de SSD para SKU existente; a lista passa de 63 para 69 modelos. Também acrescentou a cada um dos 18 perfis um cenário com outras RAMs (mantida capacidade e geração DDR) e, quando justificável, SSD de mesmo modelo/capacidade (sem trocar CPU/GPU). O valor do cenário alternativo continua completo, incluindo montagem de R$ 250, mas não é um PC pronto disponível para checkout. Frequências e latências de memória podem ser diferentes; confirmar compatibilidade, BIOS e QVL.

- `orcamentos-completos.csv`: montagem original por perfil, inalterada na primeira revisão.
- `orcamentos-otimizados.csv`: peças e preços do cenário alternativo por perfil.
- `historico-precos.json`: linha de base dos 18 totais originais e alternativos para a comparação histórica.
- `data.json`: campos `pricing.alternative`, `meta.lastEditorialReview`, `history`.

**Critério de publicação semanal**: não confundir preços de pesquisa com estoque; registrar URL exata, SKU, data e divergências; preservar perfis antigos; rejeitar mudanças sem compatibilidade ou sem QA; disponibilizar relatório de alterações, histórico e fonte.

**Fontes técnicas atualizadas:** Adobe Lightroom Classic 16.0, versão novembro/2026: https://helpx.adobe.com/br/lightroom-classic/desktop/introduction-to-lightroom-classic/system-requirements.html. O Lightroom recomenda **8GB de VRAM dedicada ou 16GB de memória compartilhada para IA plenamente acelerada**, 16GB ou mais RAM e SSD rápido; no guia, a recomendação operacional de 32GB RAM para RAW permanece.


## Montador de perfis personalizado (edição em 16/11/2026)

- Em qualquer um dos 18 perfis, clique **Personalizar**; também é possível abrir pelo detalhamento do PC.
- Troque CPU, placa-mãe, RAM, SSD, GPU, fonte, cooler e gabinete pelos modelos do catálogo; edite o nome, quantidade, valor unitário, link de referência e custo de montagem. As contas mudam **imediatamente no navegador**.
- Preços dos anúncios são **pesquisas com data**, não preços ao vivo: `data.json` traz a última revisão editorial. O botão **Recarregar preços publicados** busca novamente o JSON do site e atualiza o preço dos produtos selecionados do catálogo, exceto alterações manuais. Ele **não consulta diretamente o checkout das lojas**.
- O alerta automático de socket e DDR é preliminar; confirme BIOS, QVL, fonte, medidas e conectores com os fabricantes. Caso haja item sem preço, o total é exibido como **Preço pendente**, não falsamente como custo completo.
- **Salvar no navegador** usa `localStorage` (até 30 perfis por navegador, sem cadastro). **Compartilhar** utiliza um link que carrega o próprio perfil, incluindo valores informados. **Baixar** gera JSON (backup / transferência) ou CSV (orçamento), ou abre a impressão para salvar em PDF. Sem coleta de dados pessoais em servidor.
- Importar JSON é possível em **Meus perfis**; a importação valida o formato e os oito grupos de peças.
- Fonte de pesquisa adicional: [SeuHardware](https://seuhardware.com/), com links específicos para as oito categorias. Como o SeuHardware se define como plataforma de publicidade e não loja, a referência é editorial; comprador deve conferir preço, SKU, vendedor e estoque no varejista.

### Testes sugeridos

- Desktop 1440 px, tablet 768 px, celular 390 px e 320 px: abrir montador, alterar CPU/RAM, mudar quantidades, verificar recálculo e avisos, salvar, reabrir, importar/exportar JSON e CSV, compartilhar link e conferir acessibilidade do diálogo.
- Nenhuma mudança no banco, no servidor ou nas ofertas históricas para suportar esta funcionalidade; projeto permanece estático e gratuito.