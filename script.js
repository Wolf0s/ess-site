// ESS Serviços — comportamento da página
// Número do WhatsApp em um lugar só para o formulário (os links fixos estão no HTML).
const WHATSAPP = "5511945454335";

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Menu mobile ----------
  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.getElementById("menu");

  const fecharMenu = () => {
    menu.classList.remove("aberto");
    menuBtn.setAttribute("aria-expanded", "false");
  };

  menuBtn.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    menuBtn.setAttribute("aria-expanded", String(aberto));
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", fecharMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("aberto")) {
      fecharMenu();
      menuBtn.focus();
    }
  });

  // ---------- Formulário de orçamento -> WhatsApp ----------
  const form = document.getElementById("orcamento");
  const erro = document.getElementById("orcamento-erro");
  const nome = form.elements.nome;

  const mostrarErro = (msg) => {
    erro.textContent = msg;
    erro.hidden = false;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    erro.hidden = true;
    nome.removeAttribute("aria-invalid");

    const servicos = [...form.querySelectorAll('input[name="servico"]:checked')].map((i) => i.value);
    const nomeVal = nome.value.trim();
    const local = form.elements.local.value.trim();
    const detalhes = form.elements.detalhes.value.trim();

    if (!nomeVal) {
      nome.setAttribute("aria-invalid", "true");
      mostrarErro("Escreva seu nome para enviarmos o pedido.");
      nome.focus();
      return;
    }
    if (servicos.length === 0) {
      mostrarErro("Escolha pelo menos um serviço.");
      form.querySelector('input[name="servico"]').focus();
      return;
    }

    const linhas = [
      `Olá! Meu nome é ${nomeVal} e gostaria de um orçamento.`,
      `Serviço: ${servicos.join(", ")}`,
    ];
    if (local) linhas.push(`Local: ${local}`);
    if (detalhes) linhas.push(`Detalhes: ${detalhes}`);

    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(linhas.join("\n"))}`;
    const janela = window.open(url, "_blank");
    if (janela) janela.opener = null;
    else window.location.href = url; // bloqueador de pop-up: abre na mesma aba
  });

  // ---------- "Pedir orçamento de X" nos serviços ----------
  document.querySelectorAll(".servico__link").forEach((btn) => {
    btn.addEventListener("click", () => {
      const valor = btn.dataset.servico;
      form.querySelectorAll('input[name="servico"]').forEach((i) => {
        if (i.value === valor) i.checked = true;
      });
      form.scrollIntoView({ behavior: "smooth", block: "center" });
      form.classList.remove("pulsar");
      void form.offsetWidth; // reinicia a animação
      form.classList.add("pulsar");
      setTimeout(() => nome.focus({ preventScroll: true }), 500);
    });
  });

  // ---------- Esconde o botão flutuante enquanto o formulário está na tela ----------
  const flutuante = document.querySelector(".whats-flutuante");
  if (flutuante && "IntersectionObserver" in window) {
    new IntersectionObserver(([entrada]) => {
      flutuante.classList.toggle("escondido", entrada.isIntersecting);
    }, { threshold: 0.15 }).observe(form);
  }

  // ---------- Sombra no topo ao rolar ----------
  const topo = document.querySelector(".topo");
  const marcarTopo = () => topo.classList.toggle("rolou", window.scrollY > 8);
  marcarTopo();
  window.addEventListener("scroll", marcarTopo, { passive: true });

  // ---------- Revelar elementos conforme a página rola ----------
  const reduzMovimento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduzMovimento && "IntersectionObserver" in window) {
    const alvos = document.querySelectorAll(
      ".secao__titulo, .servico, .sobre__intro p, .mvv__item, .trabalhe__inner > *, .rodape__inner > *"
    );
    document.documentElement.classList.add("js-reveal");

    alvos.forEach((el) => {
      el.classList.add("reveal");
      // Itens lado a lado entram em cascata
      const irmaos = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
      const ordem = Math.min(irmaos.indexOf(el), 4);
      if (ordem > 0) el.style.transitionDelay = `${ordem * 0.12}s`;
    });

    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        const el = entrada.target;
        el.classList.add("is-in");
        observador.unobserve(el);
        setTimeout(() => { el.style.transitionDelay = ""; }, 1400);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    alvos.forEach((el) => observador.observe(el));
  }

  // ---------- Ano no rodapé ----------
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
});
