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
  // à chaque projet il crée une figure dans .gallery

  function showAllWorks(works){
    let gallery = document.querySelector(".gallery")

    // for (i=0;i<works.length;i++){
    //     let work = document.createElement("figure")
    //     gallery.dataset.id = works[i].id;
    // }

    for (let work of works){
        let worksFigure = document.createElement("figure")
        let worksImg = document.createElement("img")
        gallery.dataset.id = work.id
        gallery.dataset.imageUrl = work.imageUrl
        console.log(work.imageUrl);

        //récupérer les infos, créer l'élement, lui coller l'image et les infos, 
        // append
    }

  }