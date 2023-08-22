let modalProjet = document.getElementById("modalProjet")
let btnModifierProjet = document.getElementById("btnModifierProjet")
let btnClose = document.querySelector(".close")
let modales = document.querySelector(".dialog")

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