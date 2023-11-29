  let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // modal container
  function showMadal() {
    let modalContainer = document.querySelector(".modal-container");
    modalContainer.classList.add('is-visible');
  }
  document.querySelecter('#show-modal').addEventListener('click',()=> {
      showModal();
  });
    
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

  function loadList() {
    return fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            addListItem(pokemon); // Fixed function name
          });
        })
        .catch(function (e) {
          console.error(e);
        })
  }
    
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
        // Added the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
         })
         .catch(function (e) {
           console.error(e);
         });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }  
    
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
