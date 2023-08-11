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
        filtre.dataset.id = filtreCategoryId
        filtres.appendChild(filtre)
    }

}

function filtrer(filtreActive){
    let filtres = document.querySelectorAll(".filtres div") 
    for (let filtre of filtres){
        filtre.addEventListener("click", function(){
            let filtreActive = this.dataset.id
            let works = document.querySelectorAll("figure")
            for (let work of works){
                work.classList.replace("active", "inactive")
                if(filtreActive === work.dataset.id){
                    work.classList.replace("inactive", "active")
                }
            }
        })
    }
}

