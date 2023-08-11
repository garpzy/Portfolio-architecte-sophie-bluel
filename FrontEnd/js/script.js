// fetch pour récupérer tous les works dans le backend, via Swagger
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(works => {
    console.table(works)
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
        
        // inject the API data in the elements
        workImg.src = work.imageUrl
        workImg.alt = work.title
        workFigCaption.innerText = work.title

        // construct the nodes of the elements / lier au DOM
        gallery.appendChild(workFigure)
        workFigure.appendChild(workImg)
        workFigure.appendChild(workFigCaption)
        workFigure.classList.add('active')
    }
}

//fetch les categories
fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(categories => {
    console.table(categories)
    afficherFiltres(categories)
  })

  .catch(function(error) {
    alert(error);
    })


// Afficher les filtres selon les catégories
function afficherFiltres(categories){
    let filtres = document.querySelector(".filtres") 
    for (let category of categories){
        let filtre = document.createElement("div")
        filtre.classList.add("filtre")
        filtre.innerText = category.name

        filtres.appendChild(filtre)
    }

}