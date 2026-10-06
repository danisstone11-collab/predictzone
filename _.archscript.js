const products = [
  {id:1,name:"Game Analyzer",category:"Analyse",price:15000,description:"Outil de démonstration pour organiser des statistiques et analyser des données de jeu.",details:"Interface simple, filtres et tableau de statistiques. Les résultats dépendent des données fournies et ne constituent pas une garantie de résultat."},
  {id:2,name:"BotMaker Starter",category:"BotMaker",price:25000,description:"Base de travail pour créer et organiser tes propres automatisations.",details:"Projet de départ avec structure claire, paramètres et documentation. À adapter aux conditions et règles du service utilisé."},
  {id:3,name:"Game Tools Pack",category:"Jeux",price:20000,description:"Collection d'utilitaires pour centraliser tes outils liés aux jeux.",details:"Pack de démonstration destiné à regrouper plusieurs petits utilitaires dans une seule interface."},
  {id:4,name:"Auto Utility",category:"Productivité",price:10000,description:"Petit outil d'automatisation pour accélérer des tâches répétitives.",details:"Utilitaire générique. Vérifie toujours les règles des plateformes avant d'automatiser une action."},
  {id:5,name:"Stats Dashboard",category:"Analyse",price:18000,description:"Tableau de bord moderne pour visualiser des statistiques.",details:"Graphiques et indicateurs présentés dans une interface mobile-friendly."},
  {id:6,name:"BotMaker Pro",category:"BotMaker",price:45000,description:"Version avancée destinée aux utilisateurs qui veulent aller plus loin.",details:"Produit exemple à remplacer par ton véritable logiciel, sa licence et ses conditions d'utilisation."}
];

let cart = JSON.parse(localStorage.getItem("zp_cart") || "[]");
const productsEl=document.getElementById("products"), searchEl=document.getElementById("search"), filterEl=document.getElementById("filter"), emptyEl=document.getElementById("emptyState");
const modalBackdrop=document.getElementById("modalBackdrop"), modalContent=document.getElementById("modalContent");
const cartDrawer=document.getElementById("cartDrawer"), drawerBackdrop=document.getElementById("drawerBackdrop");

function money(n){return new Intl.NumberFormat("fr-FR").format(n)+" FCFA"}
function renderProducts(){
  const q=searchEl.value.trim().toLowerCase(), f=filterEl.value;
  const list=products.filter(p=>(f==="Tous"||p.category===f)&&(p.name+" "+p.description).toLowerCase().includes(q));
  productsEl.innerHTML=list.map(p=>`
    <article class="product">
      <div class="product-cover"><span>${p.category}</span></div>
      <div class="product-body">
        <h3>${p.name}</h3><p>${p.description}</p>
        <div class="product-meta"><strong class="price">${money(p.price)}</strong>
          <div class="product-actions">
            <button class="small-btn" onclick="showProduct(${p.id})">Détails</button>
            <button class="small-btn primary" onclick="addToCart(${p.id})">Ajouter</button>
          </div>
        </div>
      </div>
    </article>`).join("");
  emptyEl.classList.toggle("hidden",list.length>0);
}
function showProduct(id){
  const p=products.find(x=>x.id===id);
  modalContent.innerHTML=`<span class="eyebrow">${p.category}</span><h2>${p.name}</h2><p>${p.details}</p><p><strong>Prix :</strong> ${money(p.price)}</p><button class="btn primary" onclick="addToCart(${p.id});closeModal()">Ajouter au panier</button>`;
  modalBackdrop.classList.remove("hidden");
}
function closeModal(){modalBackdrop.classList.add("hidden")}
function addToCart(id){const p=products.find(x=>x.id===id);cart.push(p);saveCart();openCart()}
function removeFromCart(index){cart.splice(index,1);saveCart();renderCart()}
function saveCart(){localStorage.setItem("zp_cart",JSON.stringify(cart));renderCart()}
function renderCart(){
  document.getElementById("cartCount").textContent=cart.length;
  const items=document.getElementById("cartItems");
  items.innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-item"><div><b>${p.name}</b><small>${money(p.price)}</small></div><button onclick="removeFromCart(${i})">Retirer</button></div>`).join(""):"<p class='empty'>Ton panier est vide.</p>";
  document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0));
}
function openCart(){cartDrawer.classList.add("open");drawerBackdrop.classList.remove("hidden")}
function closeCart(){cartDrawer.classList.remove("open");drawerBackdrop.classList.add("hidden")}
searchEl.addEventListener("input",renderProducts);
filterEl.addEventListener("change",renderProducts);
document.querySelectorAll(".category-card").forEach(b=>b.addEventListener("click",()=>{filterEl.value=b.dataset.filter;document.getElementById("boutique").scrollIntoView();renderProducts()}));
document.getElementById("cartBtn").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
drawerBackdrop.addEventListener("click",closeCart);
document.getElementById("closeModal").addEventListener("click",closeModal);
modalBackdrop.addEventListener("click",e=>{if(e.target===modalBackdrop)closeModal()});
document.getElementById("checkoutBtn").addEventListener("click",()=>alert("Étape suivante : connecter un vrai moyen de paiement (par exemple Mobile Money ou carte) et une livraison sécurisée."));
renderProducts();renderCart();
