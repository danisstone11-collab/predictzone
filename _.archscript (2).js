const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const filters = document.querySelectorAll(".filter");
const cards = [...document.querySelectorAll(".product-card")];
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
let activeFilter = "all";

function updateProducts() {
  const query = (searchInput?.value || "").trim().toLowerCase();
  let visible = 0;

  cards.forEach(card => {
    const category = card.dataset.category || "";
    const name = card.dataset.name || "";
    const text = card.textContent.toLowerCase();
    const categoryOK = activeFilter === "all" || category === activeFilter;
    const searchOK = !query || name.includes(query) || text.includes(query);
    const show = categoryOK && searchOK;

    card.style.display = show ? "" : "none";
    if (show) visible++;
  });

  emptyState.hidden = visible !== 0;
}

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    filter.classList.add("active");
    activeFilter = filter.dataset.filter;
    updateProducts();
  });
});

searchInput?.addEventListener("input", updateProducts);

document.querySelectorAll("[data-category-link]").forEach(link => {
  link.addEventListener("click", () => {
    const category = link.dataset.categoryLink;
    const filter = document.querySelector(`.filter[data-filter="${category}"]`);
    filter?.click();
  });
});

const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const descriptions = {
  "Mon application": "Remplacez ce texte par la présentation de votre application : fonctionnalités, public cible, plateforme et conditions d'utilisation.",
  "Mon outil digital": "Remplacez ce texte par la présentation de votre outil numérique, ses avantages et ce que le client reçoit après l'achat.",
  "Mon projet": "Remplacez ce texte par l'histoire de votre projet, son objectif, son état d'avancement et la manière de participer ou de l'obtenir."
};

document.querySelectorAll(".product-more").forEach(button => {
  button.addEventListener("click", () => {
    const product = button.dataset.product || "Produit";
    modalTitle.textContent = product;
    modalText.textContent = descriptions[product] || "Ajoutez ici la description détaillée de ce produit.";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll("[data-close-modal]").forEach(el => {
  el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

document.getElementById("year").textContent = new Date().getFullYear();
