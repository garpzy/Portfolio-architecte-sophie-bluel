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

//Récupérer le token et afficher les éléments "modifier" en fonction
let data = sessionStorage.getItem("token") 
let editions = document.querySelectorAll(".edition")
let login = document.getElementById("login")
for (let edition of editions){
    if (data = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5MjM0ODMxNSwiZXhwIjoxNjkyNDM0NzE1fQ.O8PsHUiRxVszfNiBq3WT7ED-VJsmazDZ0ThCRvosFJs'){
    console.log("connecté");
    edition.classList.remove("inactive")
    login.classList.add("inactive")
    document.querySelector(".filtres").classList.add("inactive")
    }
}

//LOG OUT
let btnLogout = document.getElementById("logout")
btnLogout.addEventListener("click", function(){
    sessionStorage.removeItem("token")
    console.log("sessionStorage vidé");
    for (let edition of editions){
        edition.classList.toggle("inactive")
        login.classList.remove("inactive")
    }
})

// MODALE MODIFIER LES PROJETS

let modalProjet = document.getElementById("modalProjet")
let btnModifierProjet = document.getElementById("btnModifierProjet")
let btnClose = document.querySelector(".close")
let modales = document.querySelector(".dialog")
let gallerieModale = document.querySelector(".gallerieModale")

function stopPropagation(e) {
    e.stopPropagation()
}

document.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)

btnModifierProjet.addEventListener("click", () => {
    modalProjet.showModal()
  });

btnClose.addEventListener("click", (event) => {
    event.preventDefault(); 
    modales.close();
  });

modalProjet.addEventListener("click", (event) => {
    event.preventDefault(); 
    modales.close();
  });

fetch('http://localhost:5678/api/works')
.then(response => response.json())
.then(works => {
// console.table(works)
showAllWorksModal(works)
})

.catch(function(error) {
alert(error);
})

function showAllWorksModal(works){
    for (let work of works){
        let workFigureModale = document.createElement("figure")
        let workImgModale = document.createElement("img") 
        let btnIcons = document.createElement("div") 
        let trash = document.createElement("button")
        let move = document.createElement("button")

        workFigureModale.id = work.id
        workImgModale.src = work.imageUrl
        workImgModale.alt = work.title
        btnIcons.classList.add("btnIcons")
        trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        trash.classList.add("trash")
        move.innerHTML = '<i class="fa-solid fa-up-down-left-right"></i>'
        move.classList.add("move")
 

        gallerieModale.appendChild(workFigureModale)
        workFigureModale.appendChild(workImgModale)
        workFigureModale.appendChild(btnIcons)
        btnIcons.appendChild(move)
        btnIcons.appendChild(trash)

        trash.addEventListener("click", deleteWork)

    } 
}

function deleteWork(e) {
    let toDeleteElement = e.target.closest('figure')
    let id = toDeleteElement.id
    console.log(toDeleteElement);
    fetch('http://localhost:5678/api/works/${id}', { 
        method: 'DELETE', 
        headers: {
            'Autorization' : 'Bearer ${data}'
        }
    })
    // .then(() => toDeleteElement.innerHTML = 'Delete successful');
    .then(() => console.log("delete successful"))
}

