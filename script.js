document.addEventListener("DOMContentLoaded", () => {
  const linkTrabalhe = document.querySelector('a[href="#trabalhe_conosco"]');
  const secaoTrabalhe = document.getElementById("trabalhe_conosco");
  const conteudoPrincipal = document.getElementById("conteudo-principal");
  const logo = document.querySelector(".logo");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("#nav-menu ul");

  // "Trabalhe Conosco"
  if (linkTrabalhe && secaoTrabalhe && conteudoPrincipal) {
    linkTrabalhe.addEventListener("click", (e) => {
      e.preventDefault();
      conteudoPrincipal.classList.add("hidden");
      secaoTrabalhe.classList.remove("hidden");
      secaoTrabalhe.scrollIntoView({ behavior: "smooth" });
      if (navMenu && navMenu.classList.contains("active")) navMenu.classList.remove("active");
    });
  }

  // Outros links voltam pro conteúdo principal
  document.querySelectorAll('nav a:not([href="#trabalhe_conosco"])').forEach((link) => {
    link.addEventListener("click", () => {
      if (!conteudoPrincipal || !secaoTrabalhe) return;
      conteudoPrincipal.classList.remove("hidden");
      secaoTrabalhe.classList.add("hidden");
      if (navMenu && navMenu.classList.contains("active")) navMenu.classList.remove("active");
    });
  });

  // Logo -> home
  if (logo && secaoTrabalhe && conteudoPrincipal) {
    logo.addEventListener("click", () => {
      conteudoPrincipal.classList.remove("hidden");
      secaoTrabalhe.classList.add("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (navMenu && navMenu.classList.contains("active")) navMenu.classList.remove("active");
    });
  }

  // Menu mobile
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Animação ao rolar
  function revealOnScroll() {
    document.querySelectorAll(".mvv-section").forEach((section) => {
      const windowHeight = window.innerHeight;
      const elementTop = section.getBoundingClientRect().top;
      const visibilityThreshold = 100;
      if (elementTop < windowHeight - visibilityThreshold) section.classList.add("active");
    });
  }
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // === EXPANDER "SABER MAIS" ===
  document.querySelectorAll(".card .read-more").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.currentTarget.closest(".card");
      if (!card) return;
      const expanded = card.classList.toggle("expanded");
      e.currentTarget.setAttribute("aria-expanded", expanded ? "true" : "false");
      e.currentTarget.textContent = expanded ? "Mostrar menos" : "Saber mais";
    });
  });
});
