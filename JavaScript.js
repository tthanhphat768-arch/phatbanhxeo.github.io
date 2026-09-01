// Đăng nhập / Đăng xuất tạm thời
(function(){
  const authLink = document.getElementById('nav-auth-link');
  const logoutLink = document.getElementById('nav-logout-link');
  if(!authLink || !logoutLink) return;
  const saved = localStorage.getItem('quanCoSauUser');
  if(saved){
    try{
      const user = JSON.parse(saved);
      if(user && user.name){
        authLink.textContent = 'Xin chào, ' + user.name;
        authLink.removeAttribute('href');
        authLink.style.color = 'var(--chili)';
        authLink.style.fontWeight = '700';
        authLink.style.cursor = 'default';

        logoutLink.style.display = 'inline';
        logoutLink.addEventListener('click', function(e){
          e.preventDefault();
          localStorage.removeItem('quanCoSauUser');
          window.location.reload();
        });
      }
    }catch(err){}
  }
})();

// Hiệu ứng xuất hiện mượt khi cuộn trang
(function(){
  const targets = document.querySelectorAll(
    '.section-head, .dish-card, .testi-card, .about-visual, .about-copy, .board, .map-box, .hours-list, .stat-row'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
})();

// Thanh menu đổ bóng khi cuộn
(function(){
  const header = document.querySelector('header');
  if(!header) return;
  function onScroll(){
    header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
})();

// Nút menu (hamburger) trên điện thoại
(function(){
  const toggleBtn = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if(!toggleBtn || !navLinks) return;
  toggleBtn.addEventListener('click', ()=>{
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link=>{
    link.addEventListener('click', ()=> navLinks.classList.remove('open'));
  });
})();
// Cuộn mượt khi nhấn vào các liên kết điều hướng (Anchor links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});