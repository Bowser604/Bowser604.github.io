let pokemonList = [{
    name: 'Charizard', height: 1.7, types: ['Fire'], 
    abilities: ['blaze', 'solar-power']
},
{
    name: 'Pikachu', height: 0.4, types: ['Electric'], 
    abilities: ['static', 'lighting-rod']
},
{
    name: 'Abra', height: 0.9, types: ['Psychic'], 
    abilities: ['synchronize', 'inner-focus']
}
];

for (let i = 0; i < pokemonList.height; i++) {
    if (pokemonList[i].height > 1)
    {document.write(pokemonList[i].name = " " + "(height:"+ " " + pokemonList [i].height + " ) " + "-Wow. That's big!"+"<br>");
    }     //pokemon with height >1
}
