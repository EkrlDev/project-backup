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
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');


homeIcon.addEventListener("click", () =>{
    console.log("homeIcon clicked");
    collageContainer.className = 'collage-container';
    const collectionSection = document.querySelector('#collection-container');
    collectionSection.className = "collection-container-hidden";
})

toggleIcon.addEventListener('click', () =>{
    console.log('clicked',);
    bar.forEach((e) => {
        e.className = 'toggled-icon';
    })
})

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
    console.log('clearSearchInput')
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
                    myFavorites[key].push(item.name);
                } else {
                    // Category key does not exist in myFavorites, create a new array
                    myFavorites[key] = [item.name];
                }
                isAdded = true;
            }
        });
    })
}

const deleteFromFavorites = (e) => {
    const name = e.target.parentElement.lastChild.textContent;

    Object.keys(myFavorites).forEach(key => {
        if (myFavorites[key] && myFavorites[key].includes(name)) {
            // Use Array.filter to create a new array without the specified name
            myFavorites[key] = myFavorites[key].filter(item => item !== name);
            
            // If the resulting array is empty, you can delete the category key
            if (myFavorites[key].length === 0) {
                delete myFavorites[key];
            }
        }
    });
}

const favoritesRenderHandler = () => {
    console.log(myFavorites)
}


//Navigating Functon
const collectionRenderHandler = (e) => {
    collageContainer.className = 'collage-container-hidden';
    let collection = e.target.id;
    const collectionSection = document.querySelector('#collection-container');
    if(collectionSection) {
        collectionSection.remove();
    }
    const newSection = document.createElement('section')
    newSection.id = 'collection-container';
        newSection.className = 'collection-container';
    data[collection].map(item => {
        const newDiv = document.createElement('div');
        newDiv.className = 'card';
        const newImg = document.createElement('img');
        newImg.src = item.src;
        newDiv.appendChild(newImg);
        const addButton = document.createElement('button');
        addButton.textContent = 'Add';
        addButton.className = 'addToFav-icon';
        addButton.addEventListener('click', addToFavorites)
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteFromFav-icon';
        deleteButton.addEventListener('click', deleteFromFavorites)
        newDiv.appendChild(addButton);
        newDiv.appendChild(deleteButton);
        const newP = document.createElement('p');
        const newText = document.createTextNode(item.name)
        newP.appendChild(newText);
        newDiv.appendChild(newP);
        newSection.appendChild(newDiv);
        main.appendChild(newSection);
    })
}

//Event Listeners
searchInput.addEventListener('focus', clearSearchInput)
searchInput.addEventListener('input', searchHandler)
searchButton.addEventListener("click", searchHandler)
peopleBtn.addEventListener('click', collectionRenderHandler );
speciesBtn.addEventListener('click', collectionRenderHandler );
starshipsBtn.addEventListener('click', collectionRenderHandler );
vehiclesBtn.addEventListener('click', collectionRenderHandler );
favoritesBtn.addEventListener('click', favoritesRenderHandler );






