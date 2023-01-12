// Récupération des pièces depuis le fichier JSON
const pieces = await fetch("../data/pieces-autos.json").then(pieces => pieces.json());


function genererPieces(pieces)
{
    for(let i=0;i<pieces.length;i+=1)
    {
        const article=pieces[i];
        const sectionFiches=document.querySelector('.fiches');
        const piecesElement=document.createElement('article');

        const imageElement=document.createElement('img');
        imageElement.src=article.image;

        const nomElement=document.querySelector('p');
        nomElement.innerText=article.nom;

        const prixElement=document.createElement('p');
        prixElement.innerText=`prix ${article.prix} € (${article.prix>35 ? '€':'€€€'})`;

        const categorieElement=document.createElement('p');
        categorieElement.innerText=article.categorie ?? 'aucune categorie';

        const description=document.createElement('p');
        description.innerText=article.description ?? 'pas de descrption';

        const disponibiliteElement=document.createElement('p');
        disponibiliteElement.innerText=article.disponibilite ? 'en stock':'rupture de stock';

        sectionFiches.appendChild(piecesElement);

        piecesElement.appendChild(imageElement);
        piecesElement.appendChild(nomElement);
        piecesElement.appendChild(prixElement);
        piecesElement.appendChild(categorieElement);
        //piecesElement.appendChild(description);
        piecesElement.appendChild(disponibiliteElement);
    }
}

genererPieces(pieces);


const boutonTrier=document.querySelector('.btn-trier');
boutonTrier.addEventListener('click',()=>{
    const pieceOrdonees=Array.from(pieces);
    pieceOrdonees.sort((a,b)=>a.prix - b.prix);
    
    genererPieces(pieceOrdonees);
});


const boutonFilter=document.querySelector('.btn-filtrer')
boutonFilter.addEventListener('click',()=>{
    const elementFilter=pieces.filter(piece=>piece.prix > 35);
    
    genererPieces(elementFilter);
})