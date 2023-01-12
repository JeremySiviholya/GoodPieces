const reponse=await fetch('../data/pieces-autos.json');
const pieces=await reponse.json();


for(let i=0;i<pieces.length;i+=1){
    const article=pieces[i];

    const sectionFiches=document.querySelector('.fiches');
    const piecesElement=document.createElement('article');


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

    sectionFiches.appendChild(piecesElement);

    piecesElement.appendChild(imagePieces)
    piecesElement.appendChild(nomPieces);
    piecesElement.appendChild(prixPieces);
    piecesElement.appendChild(categorie);
    piecesElement.appendChild(disponibilite);
    
}

const boutonTrier=document.querySelector('.btn-trier');
boutonTrier.addEventListener('click',()=>{
    const elementTrier=Array.from(pieces);
    elementTrier.sort((a,b)=>a.prix - b.prix);
    console.log(elementTrier);
});

const boutonFilter=document.querySelector('.btn-filtrer');
boutonFilter.addEventListener('click',()=>{
    const piecesFilter=pieces.filter((piece)=>piece.prix);
    console.log(piecesFilter);
})

const boutonTried=document.querySelector('.btn-triero');
boutonTried.addEventListener('click',()=>{
    const elementDecroissant=Array.from(pieces);
    elementDecroissant.sort((a,b)=> b.prix -a.prix);
    console.log(elementDecroissant);
});


const boutonFilterD=document.querySelector('.btn-undes');
boutonFilterD.addEventListener('click',()=>{
    const piecesSansD=pieces.filter((piece)=>piece.prix);
    
    console.log(piecesSansD);
});

const boutonDetail=document.querySelector('.btn-map')
boutonDetail.addEventListener('click',()=>{
    const pieceDetail=pieces.map(piece=>piece.nom)
    console.log(pieceDetail);
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


document.querySelector('.fiches').innerHTML='';
