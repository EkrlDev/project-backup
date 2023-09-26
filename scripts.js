let data;
const getData = async () => {
   const response = await fetch('https://ekrldev.github.io/Data/data.json');
    data = await response.json();
};
getData();

let myFavorites = {};

//Query Selectors
const main = document.querySelector('main');
const collageContainer = document.querySelector('#collage-container');
const toggleIcon = document.querySelector('#toggle-icon');
const homeIcon = document.querySelector('#home-icon');
const peopleBtn = document.querySelector('#people');
const speciesBtn = document.querySelector('#species');
const starshipsBtn = document.querySelector('#starships');
const vehiclesBtn = document.querySelector('#vehicles');
const favoritesBtn = document.querySelector('#favorites');
const bar = document.querySelectorAll("span")
const searchInput = document.getElementById('search-input');


homeIcon.addEventListener("click", () =>{
    console.log("homeIcon clicked");
    collageContainer.className = 'collage-container';
    const collectionSection = document.querySelector('#collection-container');
    collectionSection.className = "collection-container-hidden";
})

// toggleIcon.addEventListener('click', () =>{
//     console.log('clicked',);
//     bar.forEach((e) => {
//         e.className = 'toggled-icon';
//     })
// })

//Search Functions
const searchHandler = () => {
    const collectionSection = document.querySelector('#collection-container');
    if(collageContainer.className === 'collage-container') { 
        collageContainer.className = 'collage-container-hidden';
    } else if(collectionSection) {
        collectionSection.remove();
    }
    const searchText = searchInput.value.toLowerCase()
    const newSection = document.createElement('section')
    newSection.id = 'collection-container';
    newSection.className = 'collection-container';
    Object.keys(data).map(key => {
        data[key].map(item => {
            if (searchText && item.name.toLowerCase().includes(searchText)) {
                console.log(item.name);
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
            } else if (searchText && !item.name.toLowerCase().includes(searchText)){
                if(collectionSection) {
                    collectionSection.remove();
                }
            }else {
                collectionSection.remove();
                collageContainer.className = 'collage-container';
            }
        })
        })
    } 
const clearSearchInput = () => {
    searchInput.value = '';
    searchHandler();
}

//Favorites Functions

const addToFavorites = (e) => {
    const name = e.target.parentElement.lastChild.textContent;
    // Check if the name is already in myFavorites
    let isAdded = false;

    Object.keys(data).forEach(key => {
        data[key].forEach(item => {
            if (name === item.name) {
                if (myFavorites[key]) {
                    // Category key already exists in myFavorites, so append to the array
                    myFavorites[key].push({favName:item.name, favSrc:item.src});
                } else {
                    // Category key does not exist in myFavorites, create a new array
                    myFavorites[key] = [{favName:item.name, favSrc:item.src}];
                }
                isAdded = true;
            }
        });
    })
    const collection = e.target.parentNode.parentNode.dataset.key
    collectionRender(collection)
}

const deleteFromFavorites = (e) => {
    const name = e.target.parentElement.lastChild.textContent;

    Object.keys(myFavorites).forEach(key => {
        myFavorites[key].forEach(item => {
            if(myFavorites[key] && item.favName === name) {
                myFavorites[key] = myFavorites[key].filter(item => item.favName !== name);
                if (myFavorites[key].length === 0) {
                    delete myFavorites[key];
                }
    }})
    });
    favoritesRenderHandler();
}


//Render Functon
const collectionRender = (collection) => {
    collageContainer.className = 'collage-container-hidden';
    const collectionSection = document.querySelector('#collection-container');
    if(collectionSection) {
        collectionSection.remove();
    }
    const newSection = document.createElement('section')
    newSection.id = 'collection-container';
    newSection.className = 'collection-container';
    newSection.setAttribute('data-key', collection)
    data[collection].map(collectionItem => {
        const newDiv = document.createElement('div');
        newDiv.className = 'card';
        const newImg = document.createElement('img');
        newImg.src = collectionItem.src;
        newImg.alt = `${collectionItem.name} photo`
        newDiv.appendChild(newImg);
        const favIcon = document.createElement('i');
        favIcon.className = 'fas fa-solid fa-check icon';
        favIcon.addEventListener('click', addToFavorites)
        favIcon.title = 'Add to Favorites';
        Object.keys(myFavorites).forEach(key => {
            myFavorites[key].forEach(item => {
                if(item.favName === collectionItem.name){
                    favIcon.className = 'fas fa-solid fa-heart icon inFav';
                    favIcon.removeEventListener('click',addToFavorites)
                    favIcon.title = '';
                } 
            })});
        newDiv.appendChild(favIcon);
        const newP = document.createElement('p');
        const newText = document.createTextNode(collectionItem.name)
        newP.appendChild(newText);
        newDiv.appendChild(newP);
        newSection.appendChild(newDiv);
    })
    main.appendChild(newSection);
}

//Navigating Functons
const collectionRenderHandler = (e) => {
    let collection = e.target.id;
    collectionRender(collection)
}

const favoritesRenderHandler = () => {
    collageContainer.className = 'collage-container-hidden';
    const collectionSection = document.querySelector('#collection-container');
    if(collectionSection) {
        collectionSection.remove();
    }
    const newSection = document.createElement('section')
    newSection.id = 'collection-container';
    newSection.className = 'collection-container';
    Object.keys(myFavorites).forEach(key => {
        myFavorites[key].forEach(item => {
        const newDiv = document.createElement('div');
        newDiv.className = 'card';
        const newImg = document.createElement('img');
        newImg.src = item.favSrc;
        newImg.alt = `${item.favName} photo`
        newDiv.appendChild(newImg);
        const removeIcon = document.createElement('i');
        removeIcon.className = 'fas fa-solid fa-trash icon deleteFav';
        removeIcon.addEventListener('click', deleteFromFavorites)
        removeIcon.title = 'Remove';
        newDiv.appendChild(removeIcon);
        const newP = document.createElement('p');
        const newText = document.createTextNode(item.favName)
        newP.appendChild(newText);
        newDiv.appendChild(newP);
        newSection.appendChild(newDiv);
        });
        main.appendChild(newSection);
    })
    console.log(myFavorites)
}

//Event Listeners
searchInput.addEventListener('focus', clearSearchInput)
searchInput.addEventListener('input', searchHandler)
peopleBtn.addEventListener('click', collectionRenderHandler );
speciesBtn.addEventListener('click', collectionRenderHandler );
starshipsBtn.addEventListener('click', collectionRenderHandler );
vehiclesBtn.addEventListener('click', collectionRenderHandler );
favoritesBtn.addEventListener('click', favoritesRenderHandler );






