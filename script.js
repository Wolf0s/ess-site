document.addEventListener("DOMContentLoaded", () => {
  const linkTrabalhe = document.querySelector('a[href="#trabalhe_conosco"]');
  const secaoTrabalhe = document.getElementById('trabalhe_conosco');
  const conteudoPrincipal = document.getElementById('conteudo-principal');
  const logo = document.querySelector(".logo");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("#nav-menu ul");

  // Ao clicar em "Trabalhe Conosco"
  linkTrabalhe.addEventListener('click', (e) => {
    e.preventDefault();
    conteudoPrincipal.classList.add('hidden');
    secaoTrabalhe.classList.remove('hidden');
    secaoTrabalhe.scrollIntoView({ behavior: 'smooth' });
    if (navMenu.classList.contains("active")) navMenu.classList.remove("active");
  });

  // Ao clicar em outros links, volta ao conteúdo principal
  const outrosLinks = document.querySelectorAll('nav a:not([href="#trabalhe_conosco"])');
  outrosLinks.forEach(link => {
    link.addEventListener('click', () => {
      conteudoPrincipal.classList.remove('hidden');
      secaoTrabalhe.classList.add('hidden');
      if (navMenu.classList.contains("active")) navMenu.classList.remove("active");
    });
  });

  // Clique na logo leva à home
  logo.addEventListener('click', () => {
    conteudoPrincipal.classList.remove('hidden');
    secaoTrabalhe.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (navMenu.classList.contains("active")) navMenu.classList.remove("active");
  });

  // Menu responsivo mobile
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Animação ao rolar a página
  function revealOnScroll() {
    const sections = document.querySelectorAll(".mvv-section");

    sections.forEach((section) => {
      const windowHeight = window.innerHeight;
      const elementTop = section.getBoundingClientRect().top;
      const visibilityThreshold = 100;

      if (elementTop < windowHeight - visibilityThreshold) {
        section.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Garante animação se já estiver visível ao carregar
});
