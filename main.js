// LOADER
window.addEventListener('load',()=>{
  setTimeout(()=>{ document.getElementById('loader').classList.add('hidden'); },2200);
});

// CURSOR
const cursor=document.getElementById('cursor');
const follower=document.getElementById('cursor-follower');
let mx=0,my=0,fx=0,fy=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  cursor.style.left=mx+'px'; cursor.style.top=my+'px';
});
function animFollower(){
  fx+=(mx-fx)*.12; fy+=(my-fy)*.12;
  follower.style.left=fx+'px'; follower.style.top=fy+'px';
  requestAnimationFrame(animFollower);
}
animFollower();
document.querySelectorAll('a,button,.portfolio-card,.skill-card,.service-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ cursor.style.width='20px'; cursor.style.height='20px'; follower.style.width='50px'; follower.style.height='50px'; });
  el.addEventListener('mouseleave',()=>{ cursor.style.width='12px'; cursor.style.height='12px'; follower.style.width='36px'; follower.style.height='36px'; });
});

// SCROLL PROGRESS
window.addEventListener('scroll',()=>{
  const pct=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight))*100;
  document.getElementById('progress-bar').style.width=pct+'%';
  updateNav();
});

// ACTIVE NAV
function updateNav(){
  const sections=document.querySelectorAll('section[id]');
  sections.forEach(s=>{
    const top=s.getBoundingClientRect().top;
    if(top<=200&&top>-s.offsetHeight+200){
      document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
      document.querySelectorAll('.mobile-nav-item').forEach(l=>l.classList.remove('active'));
      const id=s.getAttribute('id');
      document.querySelectorAll(`[data-section="${id}"],.mobile-nav-item[href="#${id}"]`).forEach(l=>l.classList.add('active'));
    }
  });
}

// PARTICLES
const pContainer=document.getElementById('particles');
for(let i=0;i<25;i++){
  const p=document.createElement('div');
  p.className='particle';
  p.style.left=Math.random()*100+'%';
  p.style.animationDuration=(Math.random()*15+10)+'s';
  p.style.animationDelay=(-Math.random()*20)+'s';
  p.style.width=p.style.height=(Math.random()*2+1)+'px';
  pContainer.appendChild(p);
}

// TYPING ANIMATION
const phrases=['Brand Identity Design','UI/UX Experiences','Motion Graphics','Visual Storytelling','Creative Direction'];
let pi=0,ci=0,del=false;
const typEl=document.getElementById('typing');
function type(){
  const word=phrases[pi];
  if(!del){
    typEl.textContent=word.slice(0,++ci);
    if(ci===word.length){ del=true; setTimeout(type,2000); return; }
  } else {
    typEl.textContent=word.slice(0,--ci);
    if(ci===0){ del=false; pi=(pi+1)%phrases.length; }
  }
  setTimeout(type,del?60:90);
}
setTimeout(type,2500);

// PORTFOLIO DATA
const projects=[
  {cat:'branding',title:'Acadmy lomi',desc:'Complete brand identity for a luxury French cosmetics brand — logomark, packaging, and brand guidelines.',img:'photo/heros.jpeg'},
  {cat:'ui',title:'car design',desc:'Mobile UI/UX design for a wellness and meditation app with fluid micro-interactions.',img:'photo/car.jpeg'},
  {cat:'poster',title:'Dental clinic',desc:'Event poster series for a contemporary art festival — bold typography meets ethereal photography.',img:'photo/clinic3.jpeg'},
  {cat:'social',title:'Hajj and Umrah Company',desc:'Social media campaign for a boutique fashion brand — 60+ assets across Instagram, TikTok, Pinterest.',img:'photo/hajj.jpeg'},
  {cat:'3d',title:'Dental clinic 3d',desc:'3D typographic explorations rendered in Blender — exploring form, light, and materiality.',img:'photo/clinic2.jpeg'},
  {cat:'motion',title:'design for Eid Al-Adha',desc:'Animated brand logo and intro sequence for a luxury lifestyle YouTube channel.',img:'photo/cheep2.jpeg'},
  {cat:'branding',title:'Dental clinic',desc:'Minimal luxury brand identity for a Parisian interior design studio.',img:'photo/clinic1.jpeg'},
  {cat:'ui',title:'Dental clinic',desc:'Editorial analytics dashboard — clean, data-rich UI designed for a digital media company.',img:'photo/clinic4.jpeg'},
  {cat:'poster',title:'Car repair Company',desc:'Limited edition art prints exploring celestial themes through abstract illustration.',img:'photo/soo.jpeg'},
];
const colors=['rgba(211,126,145,0.08)','rgba(180,100,120,0.1)','rgba(150,80,100,0.07)'];
const grid=document.getElementById('portfolio-grid');
function renderPortfolio(filter){
  grid.innerHTML='';
  projects.filter(p=>filter==='all'||p.cat===filter).forEach((p,i)=>{
    const card=document.createElement('div');
    card.className='portfolio-card reveal';
    card.innerHTML=`
      <div class="portfolio-thumb">
        <img src="${p.img}" alt="${p.title}" class="portfolio-img">
      </div>
      <div class="portfolio-overlay">
        <div class="p-category">${p.cat}</div>
        <div class="p-title">${p.title}</div>
        <div class="p-desc">${p.desc.slice(0,60)}...</div>
      </div>`;
    card.addEventListener('click',()=>openModal(p));
    grid.appendChild(card);
    setTimeout(()=>card.classList.add('visible'),50+i*80);
  });
}
renderPortfolio('all');
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderPortfolio(btn.dataset.filter);
  });
});

// MODAL
function openModal(p){
  document.getElementById('modal-cat').textContent=p.cat.toUpperCase();
  document.getElementById('modal-title').textContent=p.title;
  document.getElementById('modal-desc').textContent=p.desc;
  document.getElementById('modal-thumb').innerHTML = `<img src="${p.img}" alt="${p.title}" class="modal-img">`;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow='hidden';
}
document.getElementById('modal-close').addEventListener('click',()=>{
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow='';
});
document.getElementById('modal').addEventListener('click',e=>{
  if(e.target===document.getElementById('modal')){
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow='';
  }
});

// TESTIMONIALS
const testimonials=[
  {text:'Aria transformed our brand completely. The new identity feels luxurious, modern, and deeply authentic to who we are.',stars:'★★★★★',name:'Sophie Laurent',role:'Founder, Lumière Beauty',init:'SL'},
  {text:'Working with Aria was an absolute dream. Her attention to detail, creative vision, and communication made everything seamless.',stars:'★★★★★',name:'Marc Dupont',role:'Creative Director, Atelier Noir',init:'MD'},
  {text:'Our social media engagement doubled after Aria designed our campaign assets. Absolutely stunning work, every single time.',stars:'★★★★★',name:'Isabelle Chen',role:'Marketing Director, La Maison',init:'IC'},
  {text:'The UI she designed for our app got featured in several design publications. Users love it and so do we.',stars:'★★★★★',name:'James Okafor',role:'CEO, Élan Technologies',init:'JO'},
  {text:'Aria has a rare gift — she understands both the business objectives and the aesthetic vision simultaneously.',stars:'★★★★★',name:'Claire Beaumont',role:'Brand Strategist',init:'CB'},
  {text:'The packaging design she created for our product line elevated our entire brand perception overnight.',stars:'★★★★★',name:'Yuki Tanaka',role:'Product Lead, Bloom Co.',init:'YT'},
];
const track=document.getElementById('testi-track');
[...testimonials,...testimonials].forEach(t=>{
  const card=document.createElement('div');
  card.className='testi-card';
  card.innerHTML=`<div class="testi-stars">${t.stars}</div><div class="testi-text">"${t.text}"</div><div class="testi-author"><div class="testi-avatar">${t.init}</div><div><div class="testi-name">${t.name}</div><div class="testi-role">${t.role}</div></div></div>`;
  track.appendChild(card);
});

// REVEAL ON SCROLL
const revealEls=document.querySelectorAll('.reveal');
const revealObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); }
  });
},{threshold:0.1});
revealEls.forEach(el=>revealObs.observe(el));

// SKILL BAR ANIMATION
const skillObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar=>bar.classList.add('animated'));
    }
  });
},{threshold:0.3});
document.querySelectorAll('.skill-card').forEach(c=>skillObs.observe(c));

// COUNTER ANIMATION
function animateCounter(el,target){
  let cur=0; const step=Math.ceil(target/60);
  const timer=setInterval(()=>{
    cur=Math.min(cur+step,target);
    el.textContent=cur+(target>=100?'+':'');
    if(cur>=target)clearInterval(timer);
  },20);
}
const counterObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('[data-count]').forEach(el=>{
        animateCounter(el,parseInt(el.dataset.count));
      });
      counterObs.unobserve(e.target);
    }
  });
},{threshold:0.5});
document.querySelectorAll('.stats-row').forEach(r=>counterObs.observe(r));

// CONTACT SUBMIT (WhatsApp Integration)
function handleSubmit() {
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const subject = document.getElementById('f-subject').value.trim();
  const message = document.getElementById('f-message').value.trim();
  const btn = document.querySelector('.submit-btn');

  // Basic Validation
  if (!name || !email || !subject || !message) {
    alert('الرجاء ملء جميع الحقول المطلوبة.');
    return;
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('الرجاء إدخال بريد إلكتروني صحيح.');
    return;
  }

  // Your WhatsApp Number (Include Country Code, e.g., 20 for Egypt)
  const phoneNumber = "201016335453"; // استبدل هذا برقمك الخاص

  // Formatting the message
  const whatsappMessage = `*رسالة جديدة من الموقع الشخصي*%0A%0A` +
    `*الاسم:* ${name}%0A` +
    `*البريد الإلكتروني:* ${email}%0A` +
    `*نوع المشروع:* ${subject}%0A%0A` +
    `*الرسالة:*%0A${message}`;

  // WhatsApp Link
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

  // Visual Feedback
  btn.textContent = 'جاري التحويل... ✦';
  btn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)'; // WhatsApp Green

  setTimeout(() => {
    window.open(whatsappURL, '_blank');
    btn.textContent = 'تم الإرسال ✦';
    
    // Reset button after a while
    setTimeout(() => {
      btn.textContent = 'Send Message ✦';
      btn.style.background = '';
    }, 3000);
  }, 1000);
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const target=document.querySelector(a.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth'});
  });
});

// THEME TOGGLE
const themeToggles = document.querySelectorAll('.theme-toggle-btn');
const themeTexts = document.querySelectorAll('.theme-text');

function updateThemeUI(isLight) {
  themeTexts.forEach(el => {
    el.textContent = isLight ? 'Dark Mode' : 'Light Mode';
  });
}

if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  updateThemeUI(true);
}

themeToggles.forEach(btn => {
  btn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeUI(isLight);
  });
});
