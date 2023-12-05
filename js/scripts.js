 let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector(".modal-container");

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = Object.keys(details.types);
        item.weight = details.weight;
    }).catch(function (e) {
        console.error(e);
    });
}

function add(pokemon) {
  pokemonList.push(pokemon);
}

function getAll() {
  return pokemonList;
}

function addListItem(pokemon){
  let pokemonListElement = document.querySelector(".pokemon-list");
  let listPokemon = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class")
  listPokemon.appendChild(button);
  pokemonListElement.appendChild(listPokemon); // fixed typo
  button.addEventListener("click", function (event) {   // click event handling logic 
    showDetails(pokemon) //  Updated to show datails 
 });
}

function addListItem(pokemon) {
  const $pokemonList = document.querySelector('.pokemon-list');
  const $listItem = document.createElement('li')
  const $button = document.createElement('button');
  $button.innerHTML = pokemon.name

  $pokemonList.appendChild($listItem);
  $listItem.appendChild($button);
  $button.classList.add('button-class');
  // event listener within function
  // $button.addEventListener('click', function (e) {
  //     showDetails(pokemon);
  // })
  clickPokemonButtonHandler($button, pokemon);

}
// Optional bonus
function clickPokemonButtonHandler(button, pokemonObject) {
  button.addEventListener('click', function () {
      showDetails(pokemonObject)
  })
}

function showDetails(pokemon) {
  pokemonRepository.loadDetails(pokemon).then(function () {
      console.log('show details ', pokemon);
      showModal(pokemon);
  });
}

function loadList() {
  return fetch(apiUrl).then(function (response) {
      return response.json();
  }).then(function (json) {
      json.results.forEach(function (item) {
          var pokemon = {
              name: item.name,
              detailsUrl: item.url
          };
          add(pokemon);
      });
  }).catch(function (e) {
      console.error(e);
  })
}


  // modal container
function showModal(pokemon) {
  console.log('modal fire', pokemon)
  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = 'Pokemon name' + ': ' + pokemon.name;

  let contentElement = document.createElement('p');
  contentElement.innerText = 'Pokemon height' + ': ' + pokemon.height;

  let myImage = document.createElement('img');
  myImage.src = pokemon.imageUrl; 
  modal.appendChild(myImage);

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');
 }
 function hideModal() {
  modalContainer.classList.remove('is-visible');
}



window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();  
  }
});

modalContainer.addEventListener('click', (e) => {
  // Since this is also triggered when clicking INSIDE the modal
  // We only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});






  return {
    addListItem: addListItem,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon) 
  });
});


