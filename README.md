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

## UX para pessoas iniciantes — revisão de novembro de 2026

O site foi organizado para que cada função responda: **onde estou**, **o que posso fazer aqui** e **o que acontece depois de clicar**. A área **“Não entende de peças? Escolha pelo que você faz”** traz quatro situações usuais de fotografia e aponta um perfil existente, sempre com **recomendação técnica, motivo estratégico, vantagem, desvantagem e próximo passo**. A orientação principal para uma compra nova é AM5 básico com Ryzen 5 7600 + RX 7600 por equilíbrio e opções de atualização; depende de comparar preço total e não é uma promessa de compatibilidade ou disponibilidade.

O montador mantém as oito categorias e o cálculo no navegador, com textos explicativos simples por peça (para que serve, vantagem, desvantagem e o que recomendamos), estados informativos após trocar, guardar e compartilhar, confirmação antes de redefinir ou excluir, e alerta de que verificações automáticas de compatibilidade são **preliminares**. A opção `Meu próprio modelo / valor` foi renomeada para **Adicionar outra peça ou informar preço manualmente**. Valores de lojas não são cotações ao vivo e alterações manuais são identificadas.

O comparador mostra plataforma e nível, e os cartões explicam para quem a configuração é indicada e o que deve ser conferido. Filtros usam termos simples, mantendo as informações avançadas acessíveis. Controles de navegação, seleção e estados usam HTML semântico, foco visível e atualizações de status.

### Pesquisa externa e referências de organização

Foram consultados MEUPC.NET (montagem/compartilhamento/avisos), Pichau (começar pela necessidade), TecnoArt Hardware (listas recomendadas por categoria), TerabyteShop (configuração/montagem), SeuHardware (preço e categoria), além de Magalu, KaBuM e Oficina dos Bits para organização de pesquisa e categorias. Os demais links encaminhados pelo usuário, Gigantec, Mercado Livre e Amazon Brasil, foram cadastrados como **atalhos de busca**, sem tratar páginas com restrição de acesso como ofertas verificadas. Todos os 11 links estão no bloco “Onde comparar preços e aprender mais”. Sempre verificar URL, SKU, vendedor, forma de pagamento, frete, devolução e estoque antes de adicionar um preço à base. Nunca extrair preços em tempo real sem uma integração oficial autorizada.

### Verificações de interface antes de publicar

- O assistente por necessidade escolhe perfil existente, atualiza o botão selecionado e permite abrir o detalhe ou personalizar sem compra.
- As oito peças possuem explicações acessíveis e seus valores recalculam após troca ou edição.
- Salvamento é local; JSON/CSV/impressão e compartilhamento preservam os avisos de preço, sem prometer compatibilidade completa.
- Modais e páginas em larguras de 320, 390 e 1440 px não podem ter rolagem horizontal; não pode haver exceções JavaScript.
- Mudanças em instruções ou fontes não alteram números de preço já pesquisados sem nova confirmação.


## Atualização editorial — novos perfis + navegação responsiva (16/11/2026)

O site passou de 18 para **22 perfis**, sem excluir os 18 originais. Quatro configurações novas foram propostas: Ryzen 5 9600X com vídeo integrado básico, Ryzen 5 9600X com RTX 5060 8 GB, Ryzen 7 9700X com RTX 5060 Ti 16 GB e Intel Core Ultra 7 265K com RTX 5060 8 GB. Elas aparecem com selo **Novo · 2026** e filtro específico, e podem ser personalizadas, comparadas, salvas e exportadas no montador. Os preços completos de peças + R$ 250 (referência de montagem) estão em `data.json`, em `orcamentos-completos.csv` e `historico-precos.json`.

**Origem e limitações:** pesquisa direta em páginas de CPU/GPU/RAM/placa-mãe/SSD/fonte da TerabyteShop e Pichau em 16/11/2026. Peças sem cotação específica atual (alguns coolers, gabinetes, placas-mãe e CPU Intel) receberam **valor de referência histórico identificado em cada linha**. Não afirmar que todos os componentes estão disponíveis, que o preço é de checkout ou que a montagem está 100% validada. Confira BIOS AM5 para Ryzen 9000, cooler compatível, fonte/conectores e gabinete; GPU integrada do 9600X não substitui placa de vídeo para IA intensiva.

**Navegação:** menu hambúrguer real com botão e `aria-expanded` até 850 px, fecha ao selecionar item, clicar fora, pressionar Esc ou expandir a janela. Botão flutuante **↑ Topo** aparece depois de rolar 500 px, com suporte a redução de movimento. Desktops mantêm menu horizontal.

Referências técnicas: [Puget - Lightroom Classic](https://www.pugetsystems.com/solutions/content-creation/adobe-lightroom-classic/hardware-recommendations), [Puget - Photoshop](https://www.pugetsystems.com/solutions/photo-editingworkstations/adobe-photoshop/hardware-recommendations/). Páginas exatas dos componentes estão em cada `pricing.items[].url`.

## Montagem guiada do zero para iniciantes — 16/11/2026

Em **Montar do zero**, o visitante começa sem componentes pré-selecionados. São **11 etapas**: (1) finalidade de uso, (2) plataforma, (3–10) processador, placa-mãe, RAM, SSD, vídeo, fonte, cooler e gabinete, e (11) revisão. Cada escolha apresenta **2 ou 3 alternativas** com vantagens, limitações e **recomendação técnica explícita**. A recomendação é sinalizada, mas **não é pré-selecionada**; o botão de continuar permanece desabilitado até uma escolha expressa, e o usuário confirma antes de avançar. Voltar é permitido; trocar escolhas anteriores invalida escolhas posteriores dependentes.

A filtragem usa famílias de processador para restringir a placa-mãe e DDR4/DDR5 para restringir RAM. São **checagens iniciais**, não certificado de compatibilidade. Um computador completo exige CPU, placa-mãe, memória, armazenamento, vídeo (integrado somente se suportado pela CPU, ou placa separada), fonte, refrigeração e gabinete. Também é necessário confirmar BIOS, conectores, consumo, dimensões e fluxo de ar, além de sistema operacional, monitor, periféricos, frete e backup (não incluídos no total). A unidade ou opção sem preço cria **pendência de cotação**, nunca um subtotal falsamente completo.

Na última etapa, **Confirmar e abrir montador** transfere as escolhas para `builder.js` mantendo o marcador `fromScratch`, permitindo alterar o nome e preços, salvar em `localStorage`, gerar URL de compartilhamento, baixar JSON/CSV ou imprimir em PDF. Nenhuma compra é efetuada e o preço não muda automaticamente nas lojas; o recálculo instantâneo é local. Caso o usuário altere a plataforma ou CPU, deve refazer as etapas dependentes.

**Lojas adicionais:** [WAZ](https://www.waz.com.br/informatica) e [Google Shopping](https://www.google.com/shopping?hl=pt-BR) incluídos como atalhos externos de pesquisa por componente. O atalho “Novidades em informática” abre uma pesquisa Shopping genérica, não um feed de lançamentos aprovado por fabricantes. Anúncios Shopping podem ser patrocinados, não garantem cobertura do mercado, e preço/frete/estoque dependem do vendedor. WAZ também oferece serviço de montagem, mas não é tratada como prestadora vinculada à Estação RAW. Dados das 22 montagens e 72 produtos não foram alterados nesta intervenção; fontes e preços antigos permanecem identificados.

**QA antes de publicar:** executar `node --check from-scratch.js` e `builder.js`, e `python test_scratch.py`; testar as 11 etapas em 320, 390, 768 e 1440px e o cenário Intel i5-14400 com placa LGA1700 e RAM DDR4. Confirmar que nenhuma etapa passa sem seleção, total com pendência não é falseado, montador recebe oito componentes e não há erros JS ou overflow.

**Decisões especiais do assistente:** para uso intenso com IA, a recomendação gráfica entre as três opções é uma placa dedicada de 16 GB, não vídeo integrado. No Intel LGA1700 com placa-mãe informada manualmente, o padrão DDR4/DDR5 não é presumido: o usuário precisa confirmar o padrão na loja antes de fechar a montagem.