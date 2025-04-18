document.addEventListener("DOMContentLoaded", () => {
  const linkTrabalhe = document.querySelector('a[href="#trabalhe_conosco"]');
  const secaoTrabalhe = document.getElementById('trabalhe_conosco');
  const conteudoPrincipal = document.getElementById('conteudo-principal');
  const logo = document.querySelector(".logo");
  const nav = document.querySelector("nav");
  const menuToggle = document.getElementById("menu-toggle");
  const outrosLinks = document.querySelectorAll('nav a:not([href="#trabalhe_conosco"])');

  // Toggle do menu hambúrguer
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // Ao clicar em "Trabalhe Conosco"
  linkTrabalhe.addEventListener("click", (e) => {
    e.preventDefault();
    conteudoPrincipal.classList.add("hidden");
    secaoTrabalhe.classList.remove("hidden");
    secaoTrabalhe.scrollIntoView({ behavior: "smooth" });
    nav.classList.remove("open");
  });

  // Ao clicar em qualquer outro link
  outrosLinks.forEach((link) => {
    link.addEventListener("click", () => {
      conteudoPrincipal.classList.remove("hidden");
      secaoTrabalhe.classList.add("hidden");
      nav.classList.remove("open");
    });
  });

  // Ao clicar no logo, volta para o topo e mostra o conteúdo principal
  logo.addEventListener("click", () => {
    conteudoPrincipal.classList.remove("hidden");
    secaoTrabalhe.classList.add("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
    nav.classList.remove("open");
  });

  // Animações de rolagem
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
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.mvv-section').forEach(section => {
  observer.observe(section);
  });

