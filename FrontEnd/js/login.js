
let btnConnecter = document.getElementById("connecter");

btnConnecter.addEventListener("click", function(){
    login()
});

async function login(){ 
    let users = {
        email: document.getElementById("email").value,
        password: document.getElementById("mdp").value,
    };
    let response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(users),
    })
    if (response.ok === true) {
        let result = await response.json()
        let token = result.token; // si l'email n'est le bon il m'envoie le token, ça marche sans, mais on aura besoin du token plus tard
        window.location.href = "index.html"; //redirection
        sessionStorage.setItem("token", token); //sessionStorage + persistant et globale que localStorage
        console.log("connecté");
      } else {
        alert("Email ou mot de passe incorrect")
        afficherMessageErreur();
      }
};

function afficherMessageErreur(){
    let msgErreur = document.createElement("div")
    let sectionLogin = document.querySelector(".login")
    
    msgErreur.innerHTML = `<p> Email ou mot de passe incorrect </p>`
    msgErreur.classList.add("msgErreur")

    sectionLogin.appendChild(msgErreur)
}

