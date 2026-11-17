'use strict';
/* Exportação legível de configurações para IA e importação local com confirmação. Sem API externa. */
(()=>{
 const $=s=>document.querySelector(s);
 let DATA=null,current=null;
 const COMPAT=window.EstacaoCompat;
 const labels=COMPAT.allLabels;
 function byProfile(id){
  const p=DATA?.profiles.find(x=>x.id===id);if(!p)throw Error('Não encontramos esse computador no catálogo.');
  return {v:1,baseId:p.id,name:`Meu perfil — ${p.title}`,assembly:p.pricing.assembly??250,
   rows:[...p.pricing.items.map(r=>({label:r.label,name:r.name,qty:r.qty,unitPrice:r.unitPrice,source:r.source||'Pesquisa editorial',url:r.url||'',date:p.pricing.date||DATA.meta.pricingDate||'',productId:null,manual:false,kind:r.kind||'referencia'})),COMPAT.optionalFan(),COMPAT.optionalPaste()],
   updatedAt:new Date().toISOString(),contexto:{finalidade:'Fotografia: Lightroom, Photoshop, Capture One e arquivos RAW',plataforma:p.platform,nivel:p.level,tipoDeVideo:p.gpuType,recomendacaoOriginal:p.why||'',cuidados:p.warning||'',pesquisaEditorial:p.pricing.date||DATA.meta.pricingDate||'',precificacao:'Valores editoriais de referência, não cotações ao vivo'}};
 }
 function normalize(data){
  if(!data||typeof data!=='object'||data.v!==1||typeof data.baseId!=='string')throw Error('O texto não é um JSON de montagem da Estação RAW. Use o botão de copiar JSON para começar.');
  const p=DATA?.profiles.find(x=>x.id===data.baseId);
  if(!p)throw Error('Esta configuração usa um perfil de base que não existe mais no catálogo.');
  if(!Array.isArray(data.rows)||![8,9,10].includes(data.rows.length))throw Error('O JSON deve conter os 8 componentes principais (ou 9/10 incluindo opcionais de ventoinhas e pasta térmica).');
  const upgraded=[...data.rows];if(!upgraded.some(r=>r?.label==='Ventoinhas extras do gabinete'))upgraded.push(COMPAT.optionalFan());if(!upgraded.some(r=>r?.label==='Pasta térmica'))upgraded.push(COMPAT.optionalPaste());
  if(new Set(upgraded.map(r=>r?.label)).size!==10||labels.some(label=>!upgraded.some(r=>r?.label===label)))throw Error('Cada categoria deve aparecer uma vez: cooler do processador, gabinete, ventoinhas e pasta térmica separados.');
  if(typeof data.name!=='string'||!data.name.trim()||data.name.length>160||typeof data.assembly!=='number'||!Number.isFinite(data.assembly)||data.assembly<0||data.assembly>100000)throw Error('Confira o nome do perfil e o valor da montagem.');
  const baseRows=Object.fromEntries([...p.pricing.items,COMPAT.optionalFan(),COMPAT.optionalPaste()].map(r=>[r.label,r]));
  const rows=upgraded.map(r=>{
   if(typeof r.name!=='string'||r.name.length>260||!Number.isInteger(r.qty)||r.qty<0||r.qty>8||!(r.unitPrice===null||(typeof r.unitPrice==='number'&&Number.isFinite(r.unitPrice)&&r.unitPrice>=0&&r.unitPrice<=1000000)))throw Error('Há uma peça com nome, quantidade ou preço inválido.');
   const base=baseRows[r.label];const edited=!!r.manual||r.name!==base.name||r.unitPrice!==base.unitPrice;
   if(COMPAT.wrongManualCategory(r.label,r.name))throw Error(`A peça ${r.name} parece não pertencer ao campo ${r.label}. Escolha a categoria correta.`);
   const selectedProduct=DATA.products.find(x=>x.id===r.productId);if(selectedProduct&&selectedProduct.category!==COMPAT.categoryFor[r.label])throw Error(`A peça ${selectedProduct.name} está no campo errado: ${r.label}.`);
   const url=typeof r.url==='string'&&/^https:\/\/[a-z\d][^\s<>"']*$/i.test(r.url)?r.url:'';
   return {label:r.label,name:r.name,qty:r.qty,unitPrice:r.unitPrice,
    source:edited?'Informado em JSON — não verificado':String(r.source||'Pesquisa editorial').slice(0,350),
    url,date:String(r.date||'').slice(0,20),productId:edited?'custom':(DATA.products.some(x=>x.id===r.productId)?r.productId:null),manual:edited,kind:edited?'referencia':String(r.kind||'referencia').slice(0,60)};
  });
  return {v:1,baseId:p.id,name:data.name,assembly:data.assembly,rows,updatedAt:new Date().toISOString(),fromScratch:!!data.fromScratch};
 }
 function promptFor(build){
  return `Analise a configuração de computador abaixo para edição de fotografias (Lightroom Classic, Photoshop, Capture One e arquivos RAW). Explique em linguagem simples:\n1. Se processador, placa-mãe e memória são compatíveis (incluindo soquete, geração DDR e BIOS).\n2. Se fonte, cooler do processador, ventoinhas extras do gabinete, SSD e placa de vídeo são adequados. CPUs sem vídeo integrado precisam obrigatoriamente de GPU dedicada para mostrar imagem, mesmo com HDMI na placa-mãe.\n3. Vantagens, desvantagens, peças que podem faltar e possíveis gargalos.\n4. Qual é sua RECOMENDAÇÃO TÉCNICA e o motivo, com até três alternativas de melhoria por prioridade e custo-benefício.\n5. Quais preços são apenas referências e precisam ser conferidos na loja.\nNão presuma estoque, preços ao vivo ou compatibilidade total sem especificações do fabricante. Se você sugerir um novo JSON para eu importar de volta, preserve v, baseId e exatamente as nove categorias label (incluindo Ventoinhas extras do gabinete; arquivos antigos com oito são aceitos), e mantenha unitPrice como null quando o preço não estiver confirmado. Não inclua dados pessoais.\n\nCONFIGURAÇÃO (JSON):\n${JSON.stringify(build,null,2)}`;
 }
 function status(msg){$('#json-assistant-status').textContent=msg;}
 function open(build){current=JSON.parse(JSON.stringify(build));const dialog=$('#json-assistant-dialog');
  const details=$('#details-dialog');if(details?.open)details.close();
  $('#json-assistant-profile-name').textContent=current.name;
  $('#json-assistant-output').value=JSON.stringify(current,null,2);
  $('#json-assistant-input').value='';$('#json-assistant-copy-status').textContent='';$('#json-assistant-manual-wrap').hidden=true;$('#json-assistant-manual').value='';status('');if(!dialog.open)dialog.showModal();dialog.scrollTop=0;
 }
 async function copy(value){
  const note=$('#json-assistant-copy-status'),wrap=$('#json-assistant-manual-wrap'),field=$('#json-assistant-manual');
  wrap.hidden=true;field.value='';
  try{if(!navigator.clipboard?.writeText)throw Error('Área de transferência não autorizada');await navigator.clipboard.writeText(value);note.textContent='Copiado! Cole o texto no ChatGPT ou em outra IA. Nenhuma informação foi enviada automaticamente.';return;}
  catch{/* O navegador pode bloquear a permissão de cópia, especialmente em alguns celulares. */}
  try{const temp=document.createElement('textarea');temp.value=value;temp.setAttribute('readonly','');temp.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';document.body.append(temp);temp.focus();temp.select();const copied=typeof document.execCommand==='function'&&document.execCommand('copy');temp.remove();if(copied){note.textContent='Copiado! Cole o texto no ChatGPT ou em outra IA.';return;}}catch{/* Mantém a alternativa manual abaixo. */}
  wrap.hidden=false;field.value=value;field.focus();field.select();note.textContent='O navegador bloqueou a cópia automática. O texto COMPLETO está selecionado abaixo para você copiar manualmente.';
 }
 function downloadPrompt(){if(!current)return;const data=promptFor(current),blob=new Blob([data],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='analise-estacao-raw.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#json-assistant-copy-status').textContent='Arquivo de texto gerado para baixar. Ele contém a pergunta e a configuração JSON.';}
 function importPasted(){
  let text=$('#json-assistant-input').value.trim();if(!text){status('Cole o JSON completo no campo antes de continuar.');return;}
  if(text.length>120000){status('O texto é muito grande. Cole somente o JSON da configuração.');return;}
  const fence=text.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);if(fence)text=fence[1].trim();
  let build;try{build=normalize(JSON.parse(text));}catch(e){status('Não foi possível importar: '+(e instanceof SyntaxError?'o texto não está em formato JSON válido.':e.message));return;}
  if(!window.confirm(`Abrir “${build.name}” no montador?\n\nA montagem atualmente aberta será substituída por esta cópia. Os perfis que você já salvou continuarão guardados. Nada será comprado.`)){status('Importação cancelada. A montagem atual não foi alterada.');return;}
  $('#json-assistant-dialog').close();window.dispatchEvent(new CustomEvent('estacao:open-custom-build',{detail:{build}}));
 }
 if(window.__ESTACAO_RAW_READY)DATA=window.__ESTACAO_RAW_READY;else window.addEventListener('estacao:data-ready',e=>{DATA=e.detail.data;},{once:true});
 window.addEventListener('estacao:show-json-assistant',e=>{if(DATA&&e.detail?.build)open(e.detail.build);});
 document.addEventListener('click',e=>{
  const profile=e.target.closest('[data-ai-json-profile]');if(profile){if(!DATA)return;try{open(byProfile(profile.dataset.aiJsonProfile));}catch(err){console.error(err);}return;}
  const button=e.target.closest('[data-json-action]');if(!button)return;
  const action=button.dataset.jsonAction;
  if(action==='close'){$('#json-assistant-dialog').close();return;}
  if(action==='copy-json'&&current){copy(JSON.stringify(current,null,2));return;}
  if(action==='copy-prompt'&&current){copy(promptFor(current));return;}
  if(action==='download-prompt'&&current){downloadPrompt();return;}
  if(action==='import')importPasted();
 });
 $('#json-assistant-dialog')?.addEventListener('click',e=>{if(e.target.id==='json-assistant-dialog')e.target.close();});
})();