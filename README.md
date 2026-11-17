# Estação RAW · Guia de desktops para fotografia

Site responsivo, estático e independente de backend para comparar **22 perfis** de computadores de fotografia (18 originais + 4 propostas mais recentes), pesquisar **89 modelos de componentes** e consultar **141 registros de ofertas e pesquisas**, com links e alertas técnicos.

## Substituição de links problemáticos e montagem ampliada — 17/11/2026

- **38 linhas de peças nos orçamentos de 22 perfis** foram atualizadas quando o anúncio antigo estava indisponível, redirecionava para um catálogo genérico ou não fornecia referência suficientemente específica. A alteração pode atingir preço total e lista de componentes; **não equivale a confirmação de estoque de todos os novos anúncios**. A observação de cada troca preserva o **modelo originalmente recomendado**, que continua opção válida se o comprador encontrá-lo disponível e compatível.
- Catálogo agora com **89 produtos e 141 registros de ofertas/referências**, incluindo alternativas de gabinete com ventilação de fábrica, DDR4 32 GB, NVMe 1 TB, SSD SATA 2 TB, pasta térmica, cooler BOX fornecido pela CPU (quando aplicável) e modelos anteriores. Relatório específico em `auditoria-trocas-2026-11-17.json`.
- São **10 categorias** no editor: oito componentes essenciais mais **ventoinhas extras** e **pasta térmica**, ambos opcionais. A pasta pode vir aplicada no cooler — antes de comprar outra, verifique a embalagem. Cooler BOX gratuito só quando acompanha o processador correto; não é um cooler gratuito para qualquer CPU.
- Os **22 perfis** exibem **Salvar perfil** e **Baixar perfil** diretamente no cartão e na janela de detalhes. Salvar guarda uma cópia no navegador; baixar gera um JSON portátil. O editor permite personalizar, recalcular preço na hora, compartilhar e exportar JSON/CSV/imprimir. O JSON legado de 8 ou 9 linhas continua importável e é atualizado para 10 categorias.
- **Preços datados, não compras garantidas:** links redirecionados, 403 e esgotados não significam a mesma coisa; são sinalizados separadamente. As 27 verificações individuais anteriores não cobrem todas as 140 URLs da base antiga, e nem as novas substituições foram certificadas como disponíveis até o fechamento do carrinho. Revise frete, garantia e compatibilidade antes de pagar.

## Revisão de links, compatibilidade e custo-benefício — 17/11/2026

**Situação e limites:** auditoria editorial de **27 URLs entre 140 URLs distintas** de anúncio/referência registrados no catálogo e nos perfis; **113 URLs não foram verificadas individualmente**. Duas referências adicionais foram consultadas fora dessa base. O relatório estruturado `auditoria-links-2026-11-17.json` documenta quais links abriram, redirecionaram para categoria, mostraram apenas preços antigos ou bloquearam acesso automatizado. **Não é certificação de funcionamento de 100% dos links nem garantia de estoque.** Bloqueio HTTP 403 pode decorrer de restrição ao robô e não indica que o produto saiu de linha.

- **22 perfis mantidos:** na atualização anterior, nenhuma troca era automática; nesta etapa os anúncios problemáticos em 38 linhas foram substituídos por alternativas identificadas com histórico do modelo anterior. O catálogo individual passou a **89 peças e 141 registros de oferta/pesquisa**, incluindo DDR4 de 32 GB, RTX 5060, fonte 650 W, refrigeração de processador AG400 G2 e AK620 Zero Dark Zoria, mais ventoinhas individuais e kits de três. Os preços incluem data, modelo/SKU e ressalvas sobre estoque.
- **Quatro campos separados:** `Pasta térmica` é o composto de transferência de calor (muitas vezes já aplicado); `Cooler` é o dissipador do **processador**; `Gabinete` é a caixa física onde se monta o PC; `Ventoinhas extras do gabinete` são peças **opcionais** para melhorar a circulação de ar. Kits com três peças contam como uma unidade de kit. Não adicionar ventoinha do gabinete no campo de cooler do processador. O montador filtra o catálogo por categoria exata e avisa/bloqueia entradas manuais claramente trocadas.
- **CPU sem gráficos integrados exige GPU dedicada:** Ryzen 5 5600, Ryzen 7 5700X, Ryzen 7 5800X3D, Core i5-10400F e outros Intel F/KF não produzem imagem por conta própria. Uma saída HDMI na placa-mãe não produz imagem com essas CPUs: a GPU separada é **obrigatória** para conectar o monitor. Se a CPU passar a ser uma dessas e a configuração só tiver vídeo integrado, o montador adiciona uma etapa pendente da GPU e marca o orçamento como **montagem incompleta — não comprar** até a escolha.
- **Compatibilidade preliminar:** filtra placa-mãe pelo soquete da CPU (AM4, AM5, LGA1200, LGA1700, LGA1851); tipo de RAM DDR4/DDR5 quando identificável; cooler LGA1851 apenas se fonte especificar suporte. CPU sem vídeo e ausência de GPU é impedimento; manualmente, gabinete no campo cooler ou vice-versa gera alerta. Continuação requer verificar BIOS suportada, QVL da RAM, potência/conectores da fonte, dimensões de gabinete e cooler, ventilação e espaço da GPU.
- **Custo-benefício conforme o perfil:** até três alternativas por campo com preço e data de pesquisa, respeitando a categoria, o encaixe conhecido e evitando reduzir automaticamente capacidade de RAM/SSD, quantidade de VRAM da placa de vídeo ou potência nominal da fonte. Recomendações não se aplicam a todos os perfis igualmente: para RAM/SSD de maior capacidade, apenas alternativas com capacidade pelo menos equivalente; para CPU de vídeo integrado, processadores sem iGPU não aparecem como alternativa econômica que funcionaria sem GPU. Fatores de desempenho e confiabilidade devem ser conferidos, preço isolado não decide a compra.
- **JSON anterior preservado:** arquivos salvos com oito ou nove tipos de peças continuam importáveis, e os campos opcionais de ventoinhas e pasta térmica são acrescentados; novos JSONs contêm dez campos. Salvar, compartilhar, alterar valores, baixar JSON/CSV continuam disponíveis sem API paga.

**Fontes oficiais e amostras:** AMD especificação Ryzen 5 5600 (requer placa de vídeo), Intel documentação da designação F/KF; especificações de MSI para placas AM5 que indicam saída de vídeo apenas com CPU compatível; páginas exatas da Pichau e TerabyteShop para produtos pesquisados em 17/11. Preço da página não garante preço no checkout. Os downloads `orcamentos-completos.csv` e `orcamentos-otimizados.csv` representam os perfis de referência e não somam ventoinhas opcionais adicionadas manualmente: estas constam da exportação pessoal.

## Início rápido

No diretório do projeto, execute `python -m http.server 8080` e abra http://localhost:8080. Não precisa instalar pacotes nem configurar chaves. Também pode publicar todos os arquivos diretamente na Vercel em um projeto sem framework, ou apontar a Vercel para o GitHub.

## Conteúdo

- `index.html`: conteúdo, acessibilidade, SEO, ordenação por preço e metodologia.
- `styles.css`: identidade visual e responsividade.
- `app.js`: busca, filtros, detalhe dos custos de cada montagem, comparador e links.
- `data.json`: os 22 perfis, 89 componentes, 141 registros de ofertas (históricos e pesquisados) e **orçamentos completos com fontes por item**, alternativas de custo e histórico.
- `orcamentos-completos.csv`: auditoria de todas as peças, preços, quantidades, origem, critérios de estimativa e total dos 22 PCs.
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

Guia independente, não afiliado às lojas. Antes de comprar, confirmar SKU, vendedor, entrega, preço, condição, disponibilidade, garantia, BIOS e compatibilidade. Há revisão semanal agendada com fontes e QA; o recálculo de preços é instantâneo no navegador, mas **não é uma cotação ao vivo**.

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
- Fonte de pesquisa adicional: [SeuHardware](https://seuhardware.com/), disponível na seção de fontes do site, sem atalhos repetidos em cada peça do montador. Como o SeuHardware se define como plataforma de publicidade e não loja, a referência é editorial; comprador deve conferir preço, SKU, vendedor e estoque no varejista.

### Testes sugeridos

- Desktop 1440 px, tablet 768 px, celular 390 px e 320 px: abrir montador, alterar CPU/RAM, mudar quantidades, verificar recálculo e avisos, salvar, reabrir, importar/exportar JSON e CSV, compartilhar link e conferir acessibilidade do diálogo.
- Nenhuma mudança no banco, no servidor ou nas ofertas históricas para suportar esta funcionalidade; projeto permanece estático e gratuito.

## UX para pessoas iniciantes — revisão de novembro de 2026

O site foi organizado para que cada função responda: **onde estou**, **o que posso fazer aqui** e **o que acontece depois de clicar**. A área **“Não entende de peças? Escolha pelo que você faz”** traz quatro situações usuais de fotografia e aponta um perfil existente, sempre com **recomendação técnica, motivo estratégico, vantagem, desvantagem e próximo passo**. A orientação principal para uma compra nova é AM5 básico com Ryzen 5 7600 + RX 7600 por equilíbrio e opções de atualização; depende de comparar preço total e não é uma promessa de compatibilidade ou disponibilidade.

O montador mantém as oito categorias obrigatórias, ventoinhas adicionais e pasta térmica opcionais, com cálculo no navegador, com textos explicativos simples por peça (para que serve, vantagem, desvantagem e o que recomendamos), estados informativos após trocar, guardar e compartilhar, confirmação antes de redefinir ou excluir, e alerta de que verificações automáticas de compatibilidade são **preliminares**. A opção `Meu próprio modelo / valor` foi renomeada para **Adicionar outra peça ou informar preço manualmente**. Valores de lojas não são cotações ao vivo e alterações manuais são identificadas.

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


## Copiar JSON para uma IA e colar configurações — 16/11/2026

Cada um dos **22 perfis** agora possui botão **JSON para IA**, também disponível no detalhamento. Ele abre uma janela que explica o que está acontecendo e oferece duas alternativas: copiar somente o JSON ou copiar um pedido em linguagem simples com o JSON, incluindo solicitação de análise técnica (CPU/placa-mãe/DDR, GPU, refrigeração, fonte, gabinete, SSD, vantagens, limitações e custo-benefício). Nada é enviado automaticamente a plataformas externas. Caso a área de transferência do navegador não esteja disponível, o texto é selecionado para cópia manual.

O mesmo painel fica acessível pelo botão **Copiar / colar JSON para IA** dentro de montagens personalizadas ou criadas do zero. É possível **colar um JSON completo**, inclusive envolto em bloco de código Markdown, conferir o formato e abrir no montador após confirmação explícita. A importação verifica identificador de perfil, oito categorias obrigatórias, quantidade, preços e campos essenciais. Nomes ou preços alterados no JSON passam a ser identificados como **não verificados**, em vez de herdar indevidamente a fonte do preço anterior. Perfis salvos em navegador não são apagados pela importação. O formato permanece compatível com o download JSON existente (`v:1`, `baseId`, `rows`, `assembly`, `name`).

**Limpeza de interface solicitada:** foram retirados botões repetitivos de pesquisa no SeuHardware do editor de peças e os atalhos WAZ/Google Shopping de dentro das etapas do assistente. A informação longa de “Antes de comprar” foi retirada do bloco lateral; permanecem avisos de compatibilidade e de que os valores são referências, em pontos relevantes. As lojas continuam acessíveis na seção de fontes e referências.

**QA:** `node --check` de app.js, builder.js, from-scratch.js e json-assistant.js; testes funcionais Chromium via scripts injetados, em 320/390/768/1440 px, para copiar pergunta + JSON, analisar formato, rejeitar texto inválido, alterar preço via JSON, importar e abrir montador, abrir novamente a cópia de uma montagem personalizada e confirmar ausência de rolagem horizontal e exceções JS. As 22 montagens foram preservadas com seus preços-base; o catálogo individual foi ampliado para 80 produtos sem mudar os orçamentos históricos.