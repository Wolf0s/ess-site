document.addEventListener("DOMContentLoaded", () => {
    const linkTrabalhe = document.querySelector('a[href="#trabalhe_conosco"]');
    const secaoTrabalhe = document.getElementById('trabalhe_conosco');
    const conteudoPrincipal = document.getElementById('conteudo-principal');
  
    // Ao clicar em "Trabalhe Conosco"
    linkTrabalhe.addEventListener('click', (e) => {
      e.preventDefault();
      conteudoPrincipal.classList.add('hidden'); // esconde tudo
      secaoTrabalhe.classList.remove('hidden'); // mostra apenas trabalhe_conosco
      secaoTrabalhe.scrollIntoView({ behavior: 'smooth' });
    });
  
    // Quando clicar em qualquer outro link (menos o Trabalhe Conosco)
    const outrosLinks = document.querySelectorAll('nav a:not([href="#trabalhe_conosco"])');
    outrosLinks.forEach(link => {
      link.addEventListener('click', () => {
        conteudoPrincipal.classList.remove('hidden'); // mostra conteúdo normal
        secaoTrabalhe.classList.add('hidden'); // esconde Trabalhe Conosco
      });
    });
  });
  
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
  