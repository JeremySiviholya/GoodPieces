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

export function ajoutListnerEnvoyerAvis()
{
  const formulaireAvis=document.querySelector('.formulaire-avis');
  formulaireAvis.addEventListener('submit',(event)=>{
    event.preventDefault();

    const avis={
      pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
      utilisateur: event.target.querySelector('[name=utilisateur]').value,
      commentaire:event.target.querySelector('[name=commentaire]').value,
    }

    const chargeUtile=JSON.stringify(avis);

    fetch('http://localhost:8081/avis',{
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body:chargeUtile
    })
  })
}


export async function afficherGraphiqueAvis(){
  // Votre code ici

   // Calcul du nombre total de commentaires par quantité d'étoiles attribuées
   const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
   const nb_commentaires = [0, 0, 0, 0, 0];
   for (let commentaire of avis) {
     nb_commentaires[commentaire.nbEtoiles - 1]++;
    
   }

   // Légende qui s'affichera sur la gauche à côté de la barre horizontale
   const labels = ["5", "4", "3", "2", "1"];

   // Données et personnalisation du graphique
   const data = {
     labels: labels,
     datasets: [{
     label: "Étoiles attribuées",
     data: nb_commentaires.reverse(),
       backgroundColor: "rgba(255, 230, 0, 1)", // couleur jaune
     }],
   };

   // Objet de configuration final
    const config = {
      type: "bar",
      data: data,
      options: {
        indexAxis: "y",
      },
    };

    // Rendu du graphique dans l'élément canvas
  const graphiqueAvis = new Chart(
  document.querySelector("#graphique-avis"),
  config,
);
}
 

  

