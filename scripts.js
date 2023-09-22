let data;
const getData = async () => {
   const response = await fetch('https://ekrldev.github.io/Data/data.json');
    data = await response.json();
};
getData();

const main = document.querySelector('main');
const collageContainer = document.querySelector('#collage-container');
const toggleIcon = document.querySelector('#toggle-icon');
const homeIcon = document.querySelector('#home-icon');
const peopleBtn = document.querySelector('#people');
const speciesBtn = document.querySelector('#species');
const starshipsBtn = document.querySelector('#starships');
const vehiclesBtn = document.querySelector('#vehicles');
const bar = document.querySelectorAll("span")

homeIcon.addEventListener("click", () =>{
    console.log("homeIcon clicked");
    collageContainer.className = 'collage-container';
})

toggleIcon.addEventListener('click', () =>{
    console.log('clicked',);
    bar.forEach((e) => {
        e.className = 'toggled-icon';
    })
})

const clickHandler = (e) => {
    collageContainer.className = 'collage-container-hidden';
    let collection = e.target.id;
    const collectionSection = document.querySelector('#collection-container');
    collectionSection.remove();
    const newSection = document.createElement('section')
        newSection.id = 'collection-container';
        newSection.className = 'collection-container';
    data[collection].map(item => {
        const newDiv = document.createElement('div');
        newDiv.className = 'card';
        const newImg = document.createElement('img');
        newImg.src = item.src;
        newDiv.appendChild(newImg);
        const newP = document.createElement('p');
        const newText = document.createTextNode(item.name)
        newP.appendChild(newText);
        newDiv.appendChild(newP);
        newSection.appendChild(newDiv);
        main.appendChild(newSection);
    })
}

peopleBtn.addEventListener('click', clickHandler );
speciesBtn.addEventListener('click', clickHandler );
starshipsBtn.addEventListener('click', clickHandler );
vehiclesBtn.addEventListener('click', clickHandler );

// speciesBtn.addEventListener('click', () => {
//     data.species.map(person => {
//     const collectionSection = document.querySelector('#collection-container');
//     const newDiv = document.createElement('div');
//     newDiv.className = 'card';
//     const newImg = document.createElement('img');
//     newImg.src = person.src;
//     newDiv.appendChild(newImg);
//     const newP = document.createElement('p');
//     const newText = document.createTextNode(person.name)
//     newP.appendChild(newText);
//     newDiv.appendChild(newP);
//     collectionSection.appendChild(newDiv);
        
//     })
// });




