const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();


for(let i=0 ;i<pieces.length;i+=1)
{
    const article=pieces[i];

    const sectionFiches=document.querySelector(".fiches");
    const pieceElement=document.createElement("article")


    const imageElement=document.createElement("img");
    imageElement.src=article.image;

    const nomElement=document.createElement("h2");
    nomElement.innerText = article.nom;

    const prixElement=document.createElement("p")
    prixElement.innerText=`Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

    document.body.appendChild(prixElement)

    const categorieElement=document.createElement("p");
    categorieElement.innerText=article.categorie ?? "non disponible";


    const descriptionArticle=document.createElement("p");
    descriptionArticle.innerText=article.description ?? "(pas de description pour le moment)";

    const stockElement=document.createElement("p");
    stockElement.innerText=article.disponibilite ? "en stock" : "rupture de stock";

    sectionFiches.appendChild(pieceElement)

    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionArticle);
    pieceElement.appendChild(stockElement);
}

const bouttonTrier=document.querySelector(".btn-trier");
bouttonTrier.addEventListener("click", function(){
    const piecesOrdonee = Array.from(pieces);
    piecesOrdonee.sort(function(a,b){
        return a.prix - b.prix;
    });
    console.log(piecesOrdonee);
});


const boutonFilter=document.querySelector(".btn-filtrer");
boutonFilter.addEventListener("click", function(){
    const piecefilter=pieces.filter(function(piece){
        return piece.prix <=35;
    });
    console.log(piecefilter);
});

const trierDecroissant=document.querySelector(".btn-triero")
trierDecroissant.addEventListener("click",function(){
    const trie=Array.from(pieces);
    trie.sort(function(a,b){
        return b.prix - a.prix;
    });
    console.log(trie);
});

const trierNonDescrip=document.querySelector(".btn-undes")
trierNonDescrip.addEventListener("click",()=>{
    const trierd=pieces.filter(function(p){
        return p.description;
    })
    console.log(trierd);
});

