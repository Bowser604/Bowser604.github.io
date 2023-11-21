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
            abilities: ['static', 'lightning-rod']
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
    function addListItem(pokemon){
      let pokemonList = document.querySelector(".pokemon-list");
      let listPokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class")
      button.addEventListener("click", function () {   // click event handling logic 
        console.log(pokemon.name + ' was clicked!');
    });
      listPokemon.appendChild(button);
      pokemonList.appendChild(listPokemon); // fixed typo
    }
    return {
        add: function (pokemon) {
            repository.push(pokemon); // fixed typo
        },
        getAll: function () {
            return repository;
        },
        addListItem: addListItem
    };
})();

console.log(pokemonRepository.getAll());

// Using forEach to iterate over the pokemonList from the pokemonRepository  
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon)
   
});
