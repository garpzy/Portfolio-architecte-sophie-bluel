// fetch pour récupérer tous les works dans le backend, via Swagger
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(works => {
    // console.table(works)
    showAllWorks(works)
  })

  .catch(function(error) {
    alert(error);
    })

// GOAL : à chaque projet il crée une figure dans .gallery
function showAllWorks(works){
    let gallery = document.querySelector(".gallery")
    // je créé un work pour tous les works présents dans works 
    for (let work of works){
        // créer les nouveaux éléments
        let workFigure = document.createElement("figure")
        let workImg = document.createElement("img")
        let workFigCaption = document.createElement("figcaption")
        let workCategoryId = document.createElement("dataset")
        
        // inject the API data in the elements
        workImg.src = work.imageUrl
        workImg.alt = work.title
        workFigCaption.innerText = work.title
        //celui-ci me sert pour les filtres
        workCategoryId = work.categoryId

        // construct the nodes of the elements / lier au DOM
        gallery.appendChild(workFigure)
        workFigure.appendChild(workImg)
        workFigure.appendChild(workFigCaption)
        // leur donner le categoryId dans un data-id
        workFigure.dataset.id = workCategoryId
        //je les rends par défaut active
        workFigure.classList.add('active')
    }
}

//fetch les categories
fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(categories => {
    // console.table(categories)
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
        let filtreCategoryId = document.createElement("dataset")
        //injecter l'API
        filtreCategoryId = category.id
        console.log(filtreCategoryId);
        filtre.innerText = category.name
        filtre.classList.add("filtre")
        //injecter dans le DOM
        filtres.appendChild(filtre)
        filtre.dataset.id = filtreCategoryId
    }

}

//filtrer selon  le filtre actif ou Tout
function filtrer(filtreActive){
    let filtres = document.querySelectorAll(".filtres div")
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
            let tout = this.id
            let works = document.querySelectorAll("figure")
            // je vais comparer les categoryId des works avec celui du filtre actif
            // je change la class des works selon si l'id est le même ou pas
            // et j'ajoute la class clicked au filtre si c'est le cas
            for (let work of works){
                work.classList.replace("active", "inactive")
                if(filtreActive === work.dataset.id){
                    work.classList.replace("inactive", "active")
                    filtre.classList.add("clicked")
                } 
                if(tout==="Tout"){
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