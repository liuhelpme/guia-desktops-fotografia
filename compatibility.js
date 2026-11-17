'use strict';
/* Compatibilidade preliminar de hardware, não substitui BIOS/QVL/especificações do fabricante. */
(()=>{
 const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const categoryFor={'Processador':'Processador','Placa-mãe':'Placa-mãe','Memória RAM':'Memória RAM','SSD / armazenamento':'Armazenamento','Placa de vídeo':'Placa de vídeo','Fonte':'Fonte','Cooler':'Cooler','Gabinete':'Gabinete','Ventoinhas extras do gabinete':'Ventoinhas do gabinete','Pasta térmica':'Pasta térmica'};
 const baseLabels=Object.keys(categoryFor).filter(x=>!['Ventoinhas extras do gabinete','Pasta térmica'].includes(x));
 const allLabels=Object.keys(categoryFor);
 const optionalFan=()=>({label:'Ventoinhas extras do gabinete',name:'Nenhuma ventoinha extra — verificar as que já acompanham o gabinete',qty:0,unitPrice:0,source:'Opcional: nenhum custo adicional',url:'',date:'',productId:'custom',manual:false,kind:'opcional'});
 const optionalPaste=()=>({label:'Pasta térmica',name:'Verificar pasta já aplicada no cooler — nenhuma compra extra',qty:0,unitPrice:0,source:'Opcional: confira se já acompanha o cooler',url:'',date:'',productId:'custom',manual:false,kind:'opcional'});
 function cpuSocket(s){const t=norm(s);if(/core\s*ultra|\b[234]\d{2}k(?:f)?\b|lga.?1851/.test(t))return 'LGA1851';const intel=t.match(/\bi[3579][ -]?(\d{4,5})(?:f|kf|k|t)?\b/);if(intel){const x=Number(intel[1]);return x>=12000?'LGA1700':'LGA1200';}const ryzen=t.match(/ryzen\s*[3579]\s*([35789]\d{3})(?:x3d|gt|g|x|f)?\b/);if(ryzen)return Number(ryzen[1])>=7000?'AM5':'AM4';const q=t.match(/\b(am4|am5|lga\s*1851|lga\s*1700|lga\s*1200)\b/);return q?q[1].replace(/\s/g,'').toUpperCase():null;}
 function boardSocket(s){const t=norm(s);if(/\b(a520|b450|b550|x570)[a-z0-9-]*\b/.test(t))return 'AM4';if(/\b(a620|b650|b850|x670|x870)[a-z0-9-]*\b/.test(t))return 'AM5';if(/\b(b560|z590|h510)[a-z0-9-]*\b/.test(t))return 'LGA1200';if(/\b(b760|z790|h610|b660|z690)[a-z0-9-]*\b/.test(t))return 'LGA1700';if(/\b(b860|z890|h810)[a-z0-9-]*\b/.test(t))return 'LGA1851';const q=t.match(/\b(am4|am5|lga.?1851|lga.?1700|lga.?1200)\b/);return q?q[1].replace(/\s/g,'').toUpperCase():null;}
 function boardDDR(s){const sock=boardSocket(s);if(['AM4','LGA1200'].includes(sock))return 'DDR4';if(['AM5','LGA1851'].includes(sock))return 'DDR5';if(/ddr\s*4/i.test(s))return 'DDR4';if(/ddr\s*5/i.test(s))return 'DDR5';return null;}
 function cpuGraphics(s){const t=norm(s);
  // Em Intel, sufixos F/KF são CPUs sem iGPU, mesmo se a placa-mãe tiver HDMI.
  if(/core\s*ultra\s*[3579]\s*\d{3}kf\b|\bi[3579][ -]?\d{4,5}(?:kf|f)\b/.test(t))return false;
  // Processadores Ryzen 5000 sem final G/GT não têm vídeo integrado; exceções futuras exigem revisão.
  const m=t.match(/ryzen\s*[3579]\s*(\d{4})(x3d|gt|g|x|f)?\b/);
  if(m){const n=Number(m[1]);if(/f$/.test(m[2]||''))return false;if(n<7000)return /^(g|gt)$/.test(m[2]||'');return true;}
  if(/\bryzen\s*[3579]\s*(5500|5600|5700|5800)\b/.test(t)&&!/\b(5600g|5600gt|5700g)\b/.test(t))return false;
  if(/\bcore\s*ultra\s*[3579]\s*\d{3}k\b|\bi[3579][ -]?\d{4,5}\b/.test(t))return true;
  return null;
 }
 function dedicated(r){return !!(r&&r.qty>0&&r.name&&!/^\s*(integrado|nenhuma|sem placa|pesquisar|peça a escolher|placa de v[ií]deo obrigat[oó]ria|selecione)\b/i.test(r.name));}
 function wrongManualCategory(label,name){const t=norm(name);if(!t||/pesquisar|nenhuma|peça a escolher/.test(t))return false;
  if(label==='Cooler'&&/\b(gabinete|mid[- ]?tower|full[- ]?tower|mini[- ]?tower|case gamer|kit \d+ ventoinhas|fan de gabinete|pasta termica|mastergel|cryofuze)\b/.test(t))return true;
  if(label==='Gabinete'&&/\b(cooler de processador|air cooler|ag400|ag620|ak400|ak620|sickleflow|ventoinha avulsa|kit \d+ ventoinhas)\b/.test(t))return true;
  if(label==='Ventoinhas extras do gabinete'&&/\b(gabinete|mid[- ]?tower|air cooler|cooler de processador|ag400|ag620|ak400|ak620|sistema de refrigeracao liquida|pasta termica)\b/.test(t))return true;
  if(label==='Pasta térmica'&&/\b(gabinete|mid[- ]?tower|air cooler|ventoinha|fan de gabinete|ag400|ag620|ak400|ak620|memoria ram)\b/.test(t))return true;
  return false;
 }
 function eligible(row,rows,products){const desired=categoryFor[row.label];if(!desired)return [];
  const cpu=rows.find(r=>r.label==='Processador'),mb=rows.find(r=>r.label==='Placa-mãe'),ram=rows.find(r=>r.label==='Memória RAM');
  const socket=cpuSocket(cpu?.name),board=boardSocket(mb?.name),ddr=boardDDR(mb?.name);
  return products.filter(p=>{if(p.category!==desired)return false;
   if(row.label==='Processador'&&board){const cs=cpuSocket(p.name);return cs===board;}
   if(row.label==='Placa-mãe'&&socket){const bs=boardSocket(p.name);return bs===socket;}
   if(row.label==='Memória RAM'&&ddr)return new RegExp(ddr,'i').test(p.name);
   if(row.label==='Cooler'&&p.id==='cooler-amd-wraith-stealth-box')return /ryzen\s*[357]\s*(5600|5600g|5600gt|5700g)\b/i.test(cpu?.name||'')&&!/5700x|5800x/i.test(cpu?.name||'');
   if(row.label==='Cooler'&&socket==='LGA1851')return /\bag400\s*g2\b/i.test(p.name)||/lga.?1851/i.test(p.name); // Apenas modelos declarados para LGA1851.
   if(row.label==='SSD / armazenamento'){const k=/\b(sata|2[.,]5)\b/i.test(row.name)?'SATA':/\b(nvme|m[.]?2|sn580|sn770|nv3|nv2|legend|nm790)\b/i.test(row.name)?'NVME':null;if(k==='SATA'&&!/\b(sata|2[.,]5)\b/i.test(p.name))return false;if(k==='NVME'&&!/\b(nvme|m[.]?2|sn580|sn770|nv3|nv2|legend|nm790)\b/i.test(p.name))return false;} 
   return true;
  });
 }
 function qtyUnits(r){return Number(r?.qty)||0;}
 function review(rows){const heads=Object.fromEntries(rows.map(r=>[r.label,r]));const cpu=heads['Processador'],mb=heads['Placa-mãe'],ram=heads['Memória RAM'],gpu=heads['Placa de vídeo'],fan=heads['Ventoinhas extras do gabinete'];const hard=[],notes=[];
  const cg=cpuGraphics(cpu?.name),cs=cpuSocket(cpu?.name),bs=boardSocket(mb?.name),ddr=boardDDR(mb?.name);if(cs&&bs&&cs!==bs)hard.push(`O processador usa ${cs}, mas a placa-mãe usa ${bs}. Essas peças não se encaixam.`);
  if(cs===null||bs===null)notes.push('Encaixe do processador ou da placa-mãe não identificado: confirme o soquete exato na loja.');
  const ramType=ram?.name.match(/DDR\s*([45])/i)?.[1];if(ddr&&ramType&&`DDR${ramType}`!==ddr)hard.push(`A memória é DDR${ramType}, mas a placa-mãe usa ${ddr}. Essa memória não encaixa.`);
  else if(!ddr||!ramType)notes.push('Confirme DDR4/DDR5, capacidade máxima e lista QVL da placa-mãe.');
  if(!cpu||cpu.qty!==1||!mb||mb.qty!==1)hard.push('É necessário escolher exatamente um processador e uma placa-mãe.');
  if(!ram||ram.qty<1||!ram.name||/pesquisar|peça a escolher/i.test(ram.name))hard.push('Escolha uma memória RAM válida antes de concluir a montagem.');
  if(cg===false&&!dedicated(gpu))hard.push('PLACA DE VÍDEO OBRIGATÓRIA: este processador não produz imagem sozinho. Mesmo que a placa-mãe tenha HDMI ou DisplayPort, o monitor não receberá sinal sem uma placa de vídeo dedicada.');
  if(cg===null&&!dedicated(gpu))notes.push('Não foi possível confirmar se este processador produz imagem: confirme no fabricante ANTES de retirar a placa de vídeo.');
  if(gpu&&gpu.qty>0&&/pesquisar|peça a escolher/i.test(gpu.name))hard.push('Escolha um modelo de placa de vídeo válido.');
  if(gpu&&gpu.qty>0&&!/^\s*integrado/i.test(gpu.name))notes.push('Confirme fonte, conectores elétricos e espaço físico para a placa de vídeo escolhida.');
  const paste=heads['Pasta térmica'];if(paste?.qty===0)notes.push('Pasta térmica: confirme se já vem aplicada no cooler ou incluída na embalagem. Se não vier, compre uma seringa adequada; não aplique duas camadas.');
  const cooler=heads['Cooler'];if(cooler?.productId==='cooler-amd-wraith-stealth-box'&&!/ryzen\s*[357]\s*(5600|5600g|5600gt|5700g)\b/i.test(cpu?.name||''))hard.push('Cooler BOX Wraith Stealth só pode ser considerado sem custo se acompanhar esse processador. Verifique o conteúdo real da caixa.');
  if(fan?.qty>0)notes.push('Ventoinhas extras: confira quantas o gabinete já inclui, posições 120/140 mm, conectores PWM e, se houver luzes, ARGB 5 V vs RGB 12 V. Kits 3x contam como UM kit no orçamento.');
  for(const r of rows)if(wrongManualCategory(r.label,r.name))hard.push(`A peça “${r.name}” parece estar na categoria errada: ${r.label}. Escolha uma peça adequada a esse campo.`);
  return {hard,notes,cpuHasGraphics:cg,gpuRequired:cg===false};
 }
 function capacityGB(name){const t=norm(name),m=t.match(/\b(\d+(?:[.,]\d+)?)\s*(tb|gb)\b/);return m?Number(m[1].replace(',','.'))*(m[2]==='tb'?1024:1):null;}
 function watts(name){const m=norm(name).match(/\b(\d{3,4})\s*w\b/);return m?Number(m[1]):null;}
 function gpuMemoryGB(name){const t=norm(name).replace(/\b(?:gddr|ddr)\s*[4567]\b/g,'');const m=t.match(/\b(\d{1,2})\s*gb\b/);return m?Number(m[1]):null;}
 function cpuTier(name){const t=norm(name),m=t.match(/(?:ryzen|core(?:\s+ultra)?)\s*[i ]?([3579])\b/);return m?Number(m[1]):null;}
 function recommendation(row,rows,products){let list=eligible(row,rows,products).filter(p=>Number.isFinite(p.bestPrice)&&p.bestPrice>=0&&p.name!==row.name);
  // Alternativas de VALOR: não reduzir automaticamente capacidade, VRAM, potência da fonte ou segmento do processador.
  if(row.label==='Memória RAM'){const c=capacityGB(row.name),min=c?Math.max(c,32):32;list=list.filter(p=>(capacityGB(p.name)||0)>=min);}
  if(row.label==='SSD / armazenamento'){const c=capacityGB(row.name);if(c)list=list.filter(p=>(capacityGB(p.name)||0)>=c);}
  if(row.label==='Placa de vídeo'){const c=gpuMemoryGB(row.name);if(c)list=list.filter(p=>(gpuMemoryGB(p.name)||0)>=c);}
  if(row.label==='Fonte'){const w=watts(row.name);if(w)list=list.filter(p=>watts(p.name)!==null&&watts(p.name)>=w);}
  if(row.label==='Processador'){
   const tier=cpuTier(row.name),gpu=rows.find(r=>r.label==='Placa de vídeo');
   if(tier)list=list.filter(p=>cpuTier(p.name)!==null&&cpuTier(p.name)>=tier);
   if(!dedicated(gpu))list=list.filter(p=>cpuGraphics(p.name)!==false);
  }
  if(row.label==='Placa-mãe'){const t=norm(row.name);if(/\b(b650|b850|b550|b760|b860|z690|z790|z890)/.test(t))list=list.filter(p=>!/\b(a520|a620|h610|h810)/i.test(p.name));}
  if(row.label==='Cooler'&&/inclu[ií]do|box/i.test(row.name))list=[];
  const weighted=x=>x.bestPrice*(x.lastResearchDate==='2026-11-17'?1:x.lastResearchDate==='2026-11-16'?1.06:1.14);
  return list.sort((a,b)=>weighted(a)-weighted(b)||(b.lastResearchDate||'').localeCompare(a.lastResearchDate||'')).slice(0,3);
 }
 window.EstacaoCompat=Object.freeze({norm,categoryFor,baseLabels,allLabels,optionalFan,optionalPaste,cpuSocket,boardSocket,boardDDR,cpuGraphics,dedicated,eligible,review,wrongManualCategory,recommendation});
})();