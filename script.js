if(window.location.search){window.history.replaceState(null,'',window.location.pathname+window.location.hash)}

const emailAddress='omaromarabdelbaki@gmail.com';
const emailLink=document.getElementById('emailLink');
if(emailLink){
  emailLink.href=`mailto:${emailAddress}?subject=Portfolio%20Contact`;
  emailLink.removeAttribute('target');
}

(function fixProjectScreenshots(){
  const version='20260916-4';
  const shots=[
    {
      src:`/assets/projects/network-topology.png?v=${version}`,
      alt:'Three-building Cisco Packet Tracer enterprise network topology',
      caption:'Enterprise topology'
    },
    {
      src:`/assets/projects/ospf-routing-table.png?v=${version}`,
      alt:'Cisco router routing table showing OSPF learned routes',
      caption:'OSPF routing verification'
    },
    {
      src:`/assets/projects/vlan-configuration.png?v=${version}`,
      alt:'Cisco show vlan brief output with VLANs 10, 20, and 30',
      caption:'VLAN verification'
    }
  ];

  const css=document.createElement('style');
  css.id='project-screenshot-hard-fix';
  css.textContent=`
    .fixed-project-gallery{display:block!important;width:100%!important;height:auto!important;min-height:0!important;overflow:visible!important;padding:16px!important;background:#07100f!important;border-right:1px solid var(--line)!important;}
    .fixed-shot{display:block!important;width:100%!important;height:auto!important;margin:0 0 14px!important;overflow:visible!important;background:#ffffff!important;border:1px solid var(--line)!important;border-radius:8px!important;}
    .fixed-shot a{display:block!important;width:100%!important;height:auto!important;text-decoration:none!important;background:#ffffff!important;}
    .fixed-shot img{display:block!important;width:100%!important;max-width:100%!important;height:auto!important;min-height:0!important;max-height:none!important;object-fit:contain!important;visibility:visible!important;opacity:1!important;background:#ffffff!important;position:static!important;}
    .fixed-shot figcaption{display:block!important;padding:8px 10px!important;color:var(--muted)!important;font:700 10px/1.25 Inter,sans-serif!important;letter-spacing:.06em!important;text-transform:uppercase!important;background:#07100f!important;border-top:1px solid var(--line)!important;}
    @media(max-width:900px){.project.featured{display:block!important;grid-template-columns:none!important;min-height:0!important}.fixed-project-gallery{border-right:0!important;border-bottom:1px solid var(--line)!important}}
    @media(max-width:700px){.project-grid{display:block!important}.project{width:100%!important}.fixed-project-gallery{padding:12px!important}.fixed-shot{margin-bottom:12px!important}.fixed-shot img{width:100%!important;height:auto!important}}
  `;
  document.head.appendChild(css);

  function apply(){
    const gallery=document.querySelector('.project-gallery, .fixed-project-gallery');
    if(!gallery)return;
    gallery.className='fixed-project-gallery';
    gallery.setAttribute('aria-label','Cisco Packet Tracer project screenshots');
    gallery.innerHTML=shots.map((shot)=>`
      <figure class="fixed-shot">
        <a href="${shot.src}" target="_blank" rel="noopener noreferrer" aria-label="Open ${shot.caption}">
          <img src="${shot.src}" alt="${shot.alt}" loading="eager" decoding="sync" fetchpriority="high">
        </a>
        <figcaption>${shot.caption}</figcaption>
      </figure>
    `).join('');
    gallery.querySelectorAll('img').forEach(img=>{
      img.style.display='block';
      img.style.width='100%';
      img.style.maxWidth='100%';
      img.style.height='auto';
      img.style.objectFit='contain';
      img.style.visibility='visible';
      img.style.opacity='1';
      img.onerror=()=>{
        const note=document.createElement('p');
        note.textContent='Screenshot failed to load. Tap this card to open it directly.';
        note.style.cssText='margin:10px;color:#9bb0aa;font-size:12px;background:#07100f;padding:10px;border:1px solid rgba(238,247,243,.12)';
        img.after(note);
      };
    });
  }

  apply();
  window.addEventListener('load',apply);
  setTimeout(apply,500);
})();

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
