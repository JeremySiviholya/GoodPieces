export function ajoutListenersAvis() {
    const piecesElement=document.querySelectorAll('.fiches article button');

    for(let i=0;i<piecesElement.length;i+=1)
    {
      piecesElement[i].addEventListener('click', async (event)=>
      {
        const id=event.target.dataset.id;
        const reponse=await fetch(`http://localhost:8081/pieces/${id}/avis`);
        const avis=await reponse.json();

        const piecesel=event.target.parentElement;

        const avisElement=document.createElement('p');

        for(let i=0;i<avis.length;i+=1)
        {
          avisElement.innerHTML += `${avis[i].utilisateur} : ${avis[i].commentaire}`;
        }
        piecesel.appendChild(avisElement);
      })
    }
}

export function ajoutListenerEnvoyerAvis() {
  const formulaireAvis = document.querySelector(".formulaire-avis");
  formulaireAvis.addEventListener("submit", async function (event) {
   
    // Récupération des pièces depuis le fichier JSON
    const reponse = await fetch('http://localhost:8081/pieces/');
    const pieces = await reponse.json();
    // on appelle la fonction pour ajouter le listener au formulaire
   
  });
}

ajoutListenerEnvoyerAvis();
