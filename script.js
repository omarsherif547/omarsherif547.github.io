if(window.location.search){window.history.replaceState(null,'',window.location.pathname+window.location.hash)}

const mobileFixStyle=document.createElement('style');
mobileFixStyle.textContent=`
.project-gallery{overflow:visible}
.project-shot img{display:block!important;width:100%!important;height:auto!important;min-height:0!important;max-height:none!important;object-fit:contain!important;visibility:visible!important;opacity:1!important;background:#fff}
@media(max-width:900px){.project-gallery{min-height:auto!important;border-right:0;border-bottom:1px solid var(--line)}.project.featured{min-height:0!important}}
@media(max-width:700px){.project-gallery{padding:12px;display:flex;flex-direction:column;gap:12px}.project-shot,.main-shot,.project-shot-row .project-shot{min-height:0!important}.main-shot{flex:none}.main-shot img,.project-shot-row img,.project-shot img{width:100%!important;height:auto!important;min-height:0!important;max-height:none!important;display:block!important;object-fit:contain!important}.project-shot-row{display:flex!important;flex-direction:column;gap:12px}.project-shot figcaption{font-size:9px;padding:7px 9px}}
`;
document.head.appendChild(mobileFixStyle);

const emailAddress='omaromarabdelbaki@gmail.com';
const gmailWeb=`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}`;
document.querySelectorAll('a[href*="mail.google.com"],a[href^="mailto:"]').forEach(link=>{
  link.addEventListener('click',event=>{
    const ua=navigator.userAgent||'';
    const isMobile=/Android|iPhone|iPad|iPod/i.test(ua);
    if(!isMobile)return;
    event.preventDefault();
    const encoded=encodeURIComponent(emailAddress);
    const mailto=`mailto:${emailAddress}`;
    let opened=false;
    const fallback=()=>{if(!opened)window.location.href=mailto};
    window.addEventListener('pagehide',()=>{opened=true},{once:true});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)opened=true},{once:true});
    setTimeout(fallback,1200);
    if(/Android/i.test(ua)){
      window.location.href=`intent://compose?to=${encoded}#Intent;scheme=googlegmail;package=com.google.android.gm;S.browser_fallback_url=${encodeURIComponent(gmailWeb)};end`;
    }else{
      window.location.href=`googlegmail:///co?to=${encoded}`;
    }
  });
});

document.querySelectorAll('.project-gallery img').forEach(img=>{img.loading='eager';img.decoding='async';img.style.visibility='visible'});

const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
menuToggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const reveal=document.querySelectorAll('.section,.project,.cert,.timeline-item');
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});
  reveal.forEach(el=>{el.classList.add('reveal');io.observe(el)});
}else{
  reveal.forEach(el=>el.classList.add('visible'));
}
