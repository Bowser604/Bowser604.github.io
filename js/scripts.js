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

// Using forEach to iterate over the pokemonList from the pokemonRepository
document.write('ul class="pokemon-listlist">');   // orderList
pokemonRepository.getAll().forEach((pokemon) => {
    document.write('<li>');
    if (pokemon.height > 1) {
        document.write(
            `${pokemon.name} (height: ${pokemon.height}) - Wow. That's Big!<br>`
        );
    } else {
        document.write(`${pokemon.name} (height: ${pokemon.height})<br>`);
    }
    document.write('</li>')
});
document.write('</ul>');
