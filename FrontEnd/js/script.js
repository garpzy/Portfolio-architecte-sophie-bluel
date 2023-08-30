// fetch pour récupérer tous les works dans le backend, via Swagger
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(works => {
    showAllWorks(works)
  })

  .catch(function(error) {
    alert(error);
    })

// À chaque projet il crée une figure dans .gallery
function showAllWorks(works){
    let gallery = document.querySelector(".gallery")
    // je créé un work pour tous les works présents dans works 
    for (let work of works){
        // créer les nouveaux éléments
        let workFigure = document.createElement("figure")
        let workImg = document.createElement("img")
        let workFigCaption = document.createElement("figcaption")

        // inject the API data in the elements
        workImg.src = work.imageUrl
        workImg.alt = work.title
        workFigCaption.innerText = work.title
        workFigure.id = work.id

        // construct the nodes of the elements / lier au DOM
        gallery.appendChild(workFigure)
        workFigure.appendChild(workImg)
        workFigure.appendChild(workFigCaption)

        // leur donner le categoryId dans un data-id
        workFigure.dataset.id = work.category.id
    }
}

//fetch les categories
fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(categories => {
    afficherFiltres(categories)
    filtrer(categories)
  })

  .catch(function(error) {
    alert(error);
})

// Afficher les filtres selon les catégories
function afficherFiltres(categories){
    let filtres = document.querySelector(".filtres") 
    for (let category of categories){
        //créer les nouveaux élements : les filtres et leur data-set
        let filtre = document.createElement("div")
        //injecter l'API
        filtre.innerText = category.name
        filtre.dataset.id = category.id
        filtre.classList.add("filtre")
        //injecter dans le DOM
        filtres.appendChild(filtre)
    }
}

//filtrer selon  le filtre actif ou Tout
function filtrer(){
    let filtres = document.querySelectorAll(".filtres div")
    let gallery = document.querySelector(".gallery")
    let works = gallery.querySelectorAll("figure")
    // par défaut Tout est sélectionné
    let tout = document.getElementById("Tout") 
    tout.classList.add("clicked")
    for (let filtre of filtres){
        filtre.addEventListener("click", function(){
            //ma fonction pour chercker si le filtre est actif ou pas
            checkIfActive()
            
            // je récupère le categoryId du filtre où je clic 
            let filtreActiveId = this.dataset.id
            // je récupère aussi l'id (il n'y que "tout" qui fonctionne comme ça)
            let id = this.id
            // je vais comparer les categoryId des works avec celui du filtre actif
            // je change la class des works selon si l'id est le même ou pas
            // et j'ajoute la class clicked au filtre si c'est le cas
            for (let work of works){
                work.style.display = "none";
                filtre.classList.add("clicked")
                if(filtreActiveId === work.dataset.id){
                    work.style.display = null;
                } 
                if(id==="Tout"){
                    work.style.display = null;
                }
            }            
        })
    }
}

function checkIfActive(){
    let filtres = document.querySelectorAll(".filtres div")
    for(let filtre of filtres){
        if(filtre.classList.contains("clicked")){
            filtre.classList.remove("clicked")
        }
    }
}

//Récupérer le token et afficher les éléments ".js-edition" en fonction
let token = sessionStorage.getItem("token") 
let editions = document.querySelectorAll(".js-edition")
let login = document.getElementById("login")
let filtres = document.querySelector(".filtres")

for (let edition of editions){
    if(token !== null && token !== ""){
        edition.style.display = null
        login.style.display = "none"
        filtres.style.display = "none"
    }
}

//LOG OUT
let btnLogout = document.getElementById("logout")
btnLogout.addEventListener("click", () =>{
    sessionStorage.removeItem("token")
    login.style.display = null;
    for (let edition of editions){
        edition.style.display = "none"
    }
})
