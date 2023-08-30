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
export function showAllWorks(works){
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
        //je les rends par défaut active
        workFigure.classList.add('active')
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
    let toutDefaut = document.getElementById("Tout") 
    toutDefaut.classList.add("clicked")
    for (let filtre of filtres){
        filtre.addEventListener("click", function(){
            //ma fonction pour chercker si le filtre est actif ou pas
            checkIfActive()
            
            // je récupère le categoryId du filtre où je clic 
            let filtreActive = this.dataset.id
            // je récupère aussi l'id (il n'y que "tout" qui fonctionne comme ça)
            let id = this.id
            // je vais comparer les categoryId des works avec celui du filtre actif
            // je change la class des works selon si l'id est le même ou pas
            // et j'ajoute la class clicked au filtre si c'est le cas
            for (let work of works){
                work.classList.replace("active", "inactive")
                if(filtreActive === work.dataset.id){
                    work.classList.replace("inactive", "active")
                    filtre.classList.add("clicked")
                } 
                if(id==="Tout"){
                    work.classList.replace("inactive", "active")
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
for (let edition of editions){
    if(token !== null && token !== ""){
        edition.classList.remove("inactive")
        login.classList.add("inactive")
        document.querySelector(".filtres").classList.add("inactive")
    }
}

//LOG OUT
let btnLogout = document.getElementById("logout")
btnLogout.addEventListener("click", () =>{
    sessionStorage.removeItem("token")
    login.classList.remove("inactive")
    console.log(sessionStorage);
    for (let edition of editions){
        edition.classList.toggle("inactive")
    }
})
