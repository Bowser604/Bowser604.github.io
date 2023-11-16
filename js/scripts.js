let pokemonRepository = (function () {
    let pokemonList = [
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

    return {
        add: function (pokemon) {
            pokemonList.push(pokemon);
        },
        getAll: function () {
            return pokemonList;
        }
    };
})();

let pokemonListContainer = document.querySelector('.pokemon-list');

// Using forEach to iterate over the pokemonList from the pokemonRepository  
pokemonRepository.getAll().forEach((pokemon) => {
 
});
