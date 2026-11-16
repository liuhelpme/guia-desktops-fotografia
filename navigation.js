(() => {
  'use strict';
  const button=document.getElementById('menu-toggle');
  const nav=document.getElementById('site-nav');
  const back=document.getElementById('back-to-top');
  if (!button || !nav || !back) return;
  const close=()=>{nav.classList.remove('is-open');button.classList.remove('is-open');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Abrir menu de navegação');};
  const open=()=>{nav.classList.add('is-open');button.classList.add('is-open');button.setAttribute('aria-expanded','true');button.setAttribute('aria-label','Fechar menu de navegação');};
  button.addEventListener('click',()=>nav.classList.contains('is-open')?close():open());
  nav.addEventListener('click',e=>{if(e.target.closest('a'))close()});
  document.addEventListener('click',e=>{if(nav.classList.contains('is-open')&&!nav.contains(e.target)&&!button.contains(e.target))close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('is-open')){close();button.focus()}});
  window.addEventListener('resize',()=>{if(window.innerWidth>850)close()});
  const updateTop=()=>{back.hidden=window.scrollY<500;};
  window.addEventListener('scroll',updateTop,{passive:true});updateTop();
  back.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
})();