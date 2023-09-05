let fetchCategories = await fetch("http://localhost:5678/api/categories");
let categories = await fetchCategories.json();
let fetchWorks = await fetch("http://localhost:5678/api/works");
let works = await fetchWorks.json();

let token = sessionStorage.getItem("token");
let gallery = document.querySelector(".gallery")

import { showAllWorks } from "./script.js";

// MODALE MODIFIER LES PROJETS

let modalProjet = document.getElementById("modalProjet");
let btnModifierProjet = document.getElementById("btnModifierProjet");
let close1 = document.querySelector(".close");
let gallerieModale = document.querySelector(".gallerieModale");

// stop propagation pour pouvoir cliquer en dehors de la modale pour la fermer

function stopPropagation(e) {
    e.stopPropagation();
};

document.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
document.querySelector(".js-modal2-stop").addEventListener("click", stopPropagation);

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
        let workFigureModale = document.createElement("figure");
        let workImgModale = document.createElement("img");
        let btnIcons = document.createElement("div");
        let trash = document.createElement("button");
        let move = document.createElement("button");

        workFigureModale.id = work.id;
        workImgModale.src = work.imageUrl;
        workImgModale.alt = work.title;
        btnIcons.classList.add("btnIcons");
        trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        trash.classList.add("trash");
        move.innerHTML = '<i class="fa-solid fa-up-down-left-right"></i>';
        move.classList.add("move");
 

        gallerieModale.appendChild(workFigureModale);
        workFigureModale.appendChild(workImgModale);
        workFigureModale.appendChild(btnIcons);
        btnIcons.appendChild(move);
        btnIcons.appendChild(trash);

        trash.addEventListener("click", deleteWork);
    };
};

showAllWorksModal(works)

// fonction pour supprimer un projet

async function deleteWork(e) {
    e.preventDefault();
    e.stopPropagation();
    let toDeleteFigureModal = e.target.closest('figure');
    let toDeleteFigurePage = document.getElementById(toDeleteFigureModal.id)

    let response = await fetch(`http://localhost:5678/api/works/${toDeleteFigureModal.id}`, 
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
        toDeleteFigureModal.remove();
        toDeleteFigurePage.remove()
    };
};



// MODALE 2 - AJOUTER PROJET

let btnAjouterProjet = document.getElementById("btnAjouterProjet");
let modalProjetAjout = document.getElementById("modalProjetAjout");
let retour = document.querySelector(".js-modal-retour");
let close2 = document.querySelector(".js-close2");

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

// fonction pour generer les options de categories sur la modal d'ajout de nouveau projet

function genererCategorieModal2() {
  for (let categorie of categories) {
    const categorieSelect = document.getElementById("categorieSelect");
    const categorieOption = document.createElement("option");
    categorieOption.innerHTML = categorie.name;
    categorieOption.value = categorie.name;
    categorieOption.setAttribute("id", categorie.id);
    categorieSelect.appendChild(categorieOption);
  }
};

genererCategorieModal2();

// fonction pour faire un apercu de l'image à uploader et controler la taille du fichier

const imgFile = document.getElementById("imgFile");
const imgPreview = document.querySelector(".imgPreview");
const infoFile = document.querySelector(".infoFile");
const btnAjouterPhoto = document.getElementById("btnAjouterPhoto");
const logoImg = document.querySelector(".fa-image");

imgFile.addEventListener("change", function () {
  if (this.files[0].size > 4200000) {
    alert("La taille de l'image est supérieure à 4 mo");
    this.value = "";
  } else {
    getImgData();
  }
});

function getImgData() {
  const file = imgFile.files[0];
  if (file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    //quand il load le fichier on écoute "load" qui est lié au chargement d'une page
    fileReader.addEventListener("load", function () {
      imgPreview.style.display = "block";
      imgPreview.innerHTML = `<img src="` + this.result + `"/>`;
      btnAjouterPhoto.style.display = "none";
      infoFile.style.display = "none";
      logoImg.style.display = "none";
      imgFile.style.display = "none";
    });
  };
};

imgPreview.addEventListener("click", function () {
  const imageUniquement = document.querySelector(".imgPreview img");
  btnAjouterPhoto.style.display = null;
  infoFile.style.display = null;
  logoImg.style.display = null;
  imageUniquement.style.display = "none";
});

// fonction pour activer et modifier le bouton Valider de l'envoi de formulaire

const bntValiderForm = document.getElementById("bntValiderForm");
const inputImgForm = document.getElementById("imgFile");
const inputTitreForm = document.getElementById("titre");
const inputCategorieForm = document.getElementById("categorieSelect");

function activerBtnValiderForm() {
  if (
    inputImgForm.files.length > 0 &&
    inputTitreForm.value !== "" &&
    inputCategorieForm.value !== ""
  ) {
    bntValiderForm.style.backgroundColor = "#1D6154";
    bntValiderForm.style.borderColor = "#1D6154";
    bntValiderForm.disabled = false;
  } else {
    bntValiderForm.style.backgroundColor = "#a7a7a7";
    bntValiderForm.style.borderColor = "#a7a7a7";
    bntValiderForm.disabled = true;
  }
};
// dès qu'on rentre une info le code essaie d'activer le bouton valider, mais il faut que les trois conditions soient remplies
inputImgForm.addEventListener("input", activerBtnValiderForm);
inputTitreForm.addEventListener("input", activerBtnValiderForm);
inputCategorieForm.addEventListener("input", activerBtnValiderForm);


// fonction pour controler le remplissage du formulaire d'envoi, le creer et l'envoyer

function genererNewProjet() {
    const formAjouterProjet = document.querySelector(".formAjouterProjet");
    formAjouterProjet.addEventListener("submit", async function (e) {
      e.preventDefault();
      const imageFormulaire = document.getElementById("imgFile").files[0];
      const titreFormulaire = document.getElementById("titre").value;
      const categorieFormulaire = document.getElementById("categorieSelect");
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
          gallerieModale.innerHTML = "";
          // gallery.innerHTML = "";
          // showAllWorks(works);
          // je refais ma fonction mais seulement sur le dernier élément, pour l'append à la gallery sans avoir à la régénérer
          // ou bien je vide la gallery et relance la fonction, ça recharge pas la page et ça ajoute aussi la dernière figure
          let worksFetch = await fetch("http://localhost:5678/api/works");
          let works = await worksFetch.json();
          let lastwork = works[works.length - 1];
          
          let workFigureNew = document.createElement("figure");
          let workImg = document.createElement("img");
          let workFigCaption = document.createElement("figcaption");

          workImg.src = lastwork.imageUrl;
          workImg.alt = lastwork.title;
          workFigCaption.innerText = lastwork.title;
          workFigureNew.id = lastwork.id;

          gallery.appendChild(workFigureNew);
          workFigureNew.appendChild(workImg);
          workFigureNew.appendChild(workFigCaption);

          workFigureNew.dataset.id = lastwork.category.id;

          showAllWorksModal(works);
          modalProjet.showModal();
          modalProjetAjout.close();
        } else {
          alert("Echec de l'ajout du projet");
        };
      };
    });
  };
  
genererNewProjet();


