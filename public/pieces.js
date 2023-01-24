import { ajoutListenersAvis, ajoutListnerEnvoyerAvis,afficherGraphiqueAvis } from "./avis.js";
// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('../data/pieces-autos.json');
const pieces = await reponse.json();

const valeursPieces=JSON.stringify(pieces)
window.localStorage.setItem("pieces",valeursPieces);
// on appelle la fonction pour ajouter le listener au formulaire
ajoutListnerEnvoyerAvis()

function genererPieces(pieces)
{
    for(let i=0;i<pieces.length;i+=1){
        const article=pieces[i];
        
        
    
        const sectionFiches=document.querySelector('.fiches');
        const piecesElement=document.createElement('article');
        piecesElement.classList.add('g')

        const imagePieces=document.createElement('img');
        imagePieces.src=article.image;
    
        const nomPieces=document.createElement('p');
        nomPieces.innerText=article.nom;
    
        const prixPieces=document.createElement('p');
        prixPieces.innerText=`prix: ${article.prix} € (${article.prix <35 ? "€" :"€€€"})`;
    
        const categorie=document.createElement('p');
        categorie.innerText=article.categorie ?? ('aucune categorie');
    
        const description=document.createElement('p');
        description.innerText=article.description;
    
        const disponibilite=document.createElement('p');
        disponibilite.innerText=article.disponibilite ? 'en stock' : 'rupture de stock';

        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";
        avisBouton.classList.add('f')
        
        const sectionImages=document.createElement('div');
        sectionImages.appendChild(imagePieces);
        sectionImages.classList.add('l')
        sectionFiches.appendChild(piecesElement);
    
        piecesElement.appendChild(sectionImages)
        piecesElement.appendChild(nomPieces);
        piecesElement.appendChild(prixPieces);
        piecesElement.appendChild(categorie);
        piecesElement.appendChild(disponibilite);
        piecesElement.appendChild(avisBouton);
        
    }
    ajoutListenersAvis();
    
}

genererPieces(pieces);




const boutonTrier=document.querySelector('.btn-trier');
boutonTrier.addEventListener('click',()=>{
    const elementTrier=Array.from(pieces);
    elementTrier.sort((a,b)=>a.prix - b.prix);
    document.querySelector('.fiches').innerHTML='';
    genererPieces(elementTrier);
});

const boutonFilter=document.querySelector('.btn-filtrer');
boutonFilter.addEventListener('click',()=>{
    const piecesFilter=pieces.filter((piece)=>piece.prix>=35);
    
    document.querySelector('.fiches').innerHTML='';
    genererPieces(piecesFilter);
    
})

const boutonTried=document.querySelector('.btn-triero');
boutonTried.addEventListener('click',()=>{
    const elementDecroissant=Array.from(pieces);
    elementDecroissant.sort((a,b)=> b.prix -a.prix);
    document.querySelector('.fiches').innerHTML='';
    genererPieces(elementDecroissant);
});


const boutonFilterD=document.querySelector('.btn-undes');
boutonFilterD.addEventListener('click',()=>{
    const piecesSansD=pieces.filter((piece)=>piece.prix);
    
    document.querySelector('.fiches').innerHTML='';
    genererPieces(piecesSansD);
});


const noms=pieces.map(piece=>piece.nom);
for(let i=pieces.length -1;i>=0;i-=1)
{
    if(pieces[i].prix>35)
    {
        noms.splice(i,1);
    }
}

const pieceAbordable=document.createElement('ul');


for(let i=0;i<noms.length;i+=1)
{
    const elementAb=document.createElement('li');
    elementAb.innerText=noms[i];
    pieceAbordable.appendChild(elementAb);
}

document.querySelector('.abordables').appendChild(pieceAbordable);


const nomsDisponible=pieces.map(piece=>piece.nom);
const prisDisponible=pieces.map(piece=>piece.prix);

for(let i=pieces.length -1;i>=0;i-=1)
{
    if(pieces[i].disponibilite == false)
    {
        nomsDisponible.splice(i,1);
        prisDisponible.splice(i,1);
    }
}


const pieceDisponible=document.createElement('ul');



for(let i=0;i<nomsDisponible.length;i+=1)
{
    const el=document.createElement('li');
    el.innerText=`${nomsDisponible[i]} - ${prisDisponible[i]} €`;
    pieceDisponible.appendChild(el);
}

document.querySelector('.disponible').appendChild(pieceDisponible);

const inputFilter=document.querySelector('#prix-max');
inputFilter.addEventListener('input',()=>{
    const piecesFilter=pieces.filter(piece=>piece.prix<=inputFilter.value);
    document.querySelector('.fiches').innerHTML='';
    genererPieces(piecesFilter);
})

await afficherGraphiqueAvis();

