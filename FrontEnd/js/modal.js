// let modalProjet = document.getElementById("modalProjet")
// let btnModifierProjet = document.getElementById("btnModifierProjet")
// let btnClose = document.querySelector(".close")
// let modales = document.querySelector(".dialog")
// let gallerieModale = document.querySelector(".galleryPhoto")

// function stopPropagation(e) {
//     e.stopPropagation()
// }

// document.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)

// btnModifierProjet.addEventListener("click", () => {
//     modalProjet.showModal()
//   });

// btnClose.addEventListener("click", (event) => {
//     event.preventDefault(); 
//     modales.close();
//   });

// modalProjet.addEventListener("click", (event) => {
//     event.preventDefault(); 
//     modales.close();
//   });

// fetch('http://localhost:5678/api/works')
// .then(response => response.json())
// .then(works => {
// // console.table(works)
// showAllWorksModal(works)
// })

// .catch(function(error) {
// alert(error);
// })

// function showAllWorksModal(works){
//     for (let work of works){
//         let workFigureModale = document.createElement("figure")
//         let workImgModale = document.createElement("img") 
//         let btnIcons = document.createElement("div") 
//         let trash = document.createElement("button")
//         let move = document.createElement("button")

//         workImgModale.src = work.imageUrl
//         workImgModale.alt = work.title
//         btnIcons.classList.add("btnIcons")
//         trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
//         trash.classList.add("trash")
//         move.innerHTML = '<i class="fa-solid fa-up-down-left-right"></i>'
//         move.classList.add("move")
 

//         gallerieModale.appendChild(workFigureModale)
//         workFigureModale.appendChild(workImgModale)
//         workFigureModale.appendChild(btnIcons)
//         btnIcons.appendChild(move)
//         btnIcons.appendChild(trash)

//         trash.addEventListener("click", deleteWork)

//     } 
// }

// function deleteWork(e) {
//     // let target = e.currentTarget.parentElement.parentElement
//     let toDeleteElement = e.target.closest('figure')
//     console.log(toDeleteElement);
// }