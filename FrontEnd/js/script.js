let gallery = document.querySelector(".gallery");

fetch('.gallery figure')
  .then(res => res.json())
  .then(projet => document.createElement(""))