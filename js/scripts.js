var pokemonRepository = (function () {
    let repository = [
        {
            name: 'Charizard',
            height: 1.7,
            types: ['Fire'],
            abilities: ['blaze', 'solar-power']
        },
        {
            name: 'Pikachu',
            height: 0.4,
            types: ['Electric'],
            abilities: ['static', 'lighting-rod']
        },
        {
            name: 'Abra',
            height: 0.9,
            types: ['Psychic'],
            abilities: ['synchronize', 'inner-focus']
        }
    ];

    function getAll() {
        return repository;
    }
    function showDetails(pokemon) {
        console.log(pokemon.target.innerText);
    }
    function addListItem(pokemon){
      let pokemonList = document.querySelector(".pokemon-list");
      let listPokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class")
      button.addEventListener('click', showDetail);
      listPokemon.appendChild(button);
      pokemonList.appendChild(listpokemon); 
    }
    return {
        add: function (pokemon) {
            pokemonList.push(pokemon);
        },
        getAll: function () {
            return pokemonList;
        }
        addListItem: addListItem
    };
})();

console.log(pokemonRepository.getAll());

// Using forEach to iterate over the pokemonList from the pokemonRepository  
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon)
   
});
