const fetchCategories = await fetch("http://localhost:5678/api/categories");
const categories = await fetchCategories.json();
const fetchWorks = await fetch("http://localhost:5678/api/works");
const works = await fetchWorks.json();

let token = sessionStorage.getItem("token");


// MODALE MODIFIER LES PROJETS

let modalProjet = document.getElementById("modalProjet")
let btnModifierProjet = document.getElementById("btnModifierProjet")
let close1 = document.querySelector(".close")
let gallerieModale = document.querySelector(".gallerieModale")

// stop propagation pour pouvoir cliquer en dehors de la modale pour la fermer

function stopPropagation(e) {
    e.stopPropagation();
}

document.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
document.querySelector(".js-modal2-stop").addEventListener("click", stopPropagation)

// ouverture et fermeture de la modale 1

btnModifierProjet.addEventListener("click", () => {
    modalProjet.showModal()
  });

close1.addEventListener("click", (event) => {
    event.preventDefault(); 
    modalProjet.close();
  });

modalProjet.addEventListener("click", (event) => {
    event.preventDefault(); 
    modalProjet.close();
  });

// Générer les imgages de la modale
// tester ici de refaire le fecth

export function showAllWorksModal(works){
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

showAllWorksModal(works)

// fonction pour supprimer un projet

async function deleteWork(e) {
    e.preventDefault();
    e.stopPropagation();
    let toDeleteFigure = e.target.closest('figure');

    let response = await fetch(`http://localhost:5678/api/works/${toDeleteFigure.id}`, 
        {
            method: "DELETE",
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
                },
        }
    )
    if(response.ok){
        alert("Projet supprimé avec succés");
        // workFigureModale.remove();
        // works = await fetch("http://localhost:5678/api/works");
        // showAllWorks(works)
    }
}

// MODALE 2 - AJOUTER PROJET

let btnAjouterProjet = document.getElementById("btnAjouterProjet")
let modalProjetAjout = document.getElementById("modalProjetAjout")
let retour = document.querySelector(".js-modal-retour")
let close2 = document.querySelector(".js-close2")

btnAjouterProjet.addEventListener("click", () => {
    modalProjetAjout.showModal();
    modalProjet.close();
  });

close2.addEventListener("click", (event) => {
    event.preventDefault(); 
    modalProjetAjout.close();
  });

modalProjetAjout.addEventListener("click", (event) => {
    event.preventDefault(); 
    modalProjetAjout.close();
  });

retour.addEventListener("click", (event) => {
    event.preventDefault();
    modalProjetAjout.close();
    modalProjet.showModal();
  })

// fonction pour generer les categories sur la modal d'ajout de nouveau projet

function genererCategorieModal2() {
    for (let categorie of categories) {
      const sectionCategorie = document.getElementById("categorie");
      const typeCategorie = document.createElement("option");
      typeCategorie.innerHTML = categorie.name;
      typeCategorie.value = categorie.name;
      typeCategorie.setAttribute("id", categorie.id);
      sectionCategorie.appendChild(typeCategorie);
    }
  }
  
  genererCategorieModal2();

// fonction pour faire un apercu de l'image à uploader et controler la taille du fichier

const choixImg = document.getElementById("imgFile");
const imgPreview = document.querySelector(".photoAjoutee");
const pFile = document.querySelector(".pFile");
const labelFile = document.querySelector(".labelFile");
const logoImg = document.querySelector(".fa-image");

choixImg.addEventListener("change", function () {
  if (this.files[0].size > 4200000) {
    alert("La taille de l'image est supérieure à 4 mo");
    this.value = "";
  } else {
    getImgData();
  }
});

imgPreview.addEventListener("click", function () {
  const imageUniquement = document.querySelector(".photoAjouter img");
  labelFile.style.display = null;
  pFile.style.display = null;
  logoImg.style.display = null;
  imageUniquement.style.display = "none";
});

function getImgData() {
  const files = choixImg.files[0];

  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      imgPreview.style.display = "block";
      imgPreview.innerHTML = `<img src="` + this.result + `"/>`;
      labelFile.style.display = "none";
      pFile.style.display = "none";
      logoImg.style.display = "none";
    });
  }
}

// fonction pour activer et modifier le submit de l'envoi de formulaire

const valider = document.getElementById("valider");
const inputImgForm = document.getElementById("imgFile");
const inputTitreForm = document.getElementById("titre");
const inputCategorieForm = document.getElementById("categorie");

function activateSubmitForm() {
  if (
    inputImgForm.files.length > 0 &&
    inputTitreForm.value !== "" &&
    inputCategorieForm.value !== ""
  ) {
    valider.style.backgroundColor = "#1D6154";
    valider.style.borderColor = "#1D6154";
    valider.disabled = false;
  } 
}

inputImgForm.addEventListener("input", activateSubmitForm);
inputTitreForm.addEventListener("input", activateSubmitForm);
inputCategorieForm.addEventListener("input", activateSubmitForm);



  // fonction pour controler le remplissage du formulaire d'envoi, le creer et l'envoyer

function genererNewProjet() {
    const submitNewProjet = document.querySelector(".ajoutPhoto");
    submitNewProjet.addEventListener("submit", async function (e) {
      e.preventDefault();
      const imageFormulaire = document.getElementById("imgFile").files[0];
      const titreFormulaire = document.getElementById("titre").value;
      const categorieFormulaire = document.getElementById("categorie");
      const categorieId =
        categorieFormulaire.options[categorieFormulaire.selectedIndex].id;
  
      if (
        imageFormulaire === null ||
        titreFormulaire === "" ||
        categorieFormulaire === ""
      ) {
        alert("formulaire incorrect");
      } else {
        const formData = new FormData();
        formData.append("image", imageFormulaire);
        formData.append("title", titreFormulaire);
        formData.append("category", categorieId);
    
        const reponse = await fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        if (reponse.ok) {
          alert("Projet ajouté avec succés ");
        } else {
          alert("Echec de l'ajout du projet");
        }
      }
    });
  }
  
  genererNewProjet();