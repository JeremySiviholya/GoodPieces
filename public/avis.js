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
      formulaireAvis.addEventListener("submit",function (event) {
        event.preventDefault();

        // Création de l’objet du nouvel avis.
      const avis = {
      pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
      utilisateur: event.target.querySelector("[name=utilisateur").value,
      commentaire: event.target.querySelector("[name=commentaire]").value,
      nbEtoiles:event.target.querySelector("[name=nbEtoiles]").value,
      };

      // Création de la charge utile au format JSON
      const chargeUtile = JSON.stringify(avis);

      // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://localhost:8081/avis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
      });

  });
}

