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
  // à chaque projet il crée une figure dans .gallery

  function showAllWorks(works){
    let gallery = document.querySelector(".gallery")

    // for (i=0;i<works.length;i++){
    //     let work = document.createElement("figure")
    //     gallery.dataset.id = works[i].id;
    // }

    for (let work of works){
        // créer les nouveaux éléments
        let workFigure = document.createElement("figure")
        let workImg = document.createElement("img")
        let workFigCaption = document.createElement("figcaption")
        
        // inject the API data in the elements
        gallery.dataset.id = work.id
        // gallery.dataset.imageUrl = work.imageUrl
        gallery.dataset.title = work.title
        workImg.src = work.imageUrl
        workImg.alt = work.title
        workFigCaption.innerText = work.title

        // construct the nodes of the elemnts / lier au DOM

        gallery.appendChild(workFigure)
        workFigure.appendChild(workImg)
        workFigure.appendChild(workFigCaption)

        //récupérer les infos, créer l'élement, lui coller l'image et les infos, 
        // append
    }

  }