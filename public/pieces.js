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

const boutonPiecesD=document.querySelector('.btn-map');
boutonPiecesD.addEventListener('click',()=>{
    const piecesDetail=pieces.map((piece)=>piece.nom)
    console.log(piecesDetail);
})