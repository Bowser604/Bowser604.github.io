alert('Hello world');

let pokemonlist = (function () {
    let repository = [
        {name: 'Charizard', height: 17, types: ['Fire'],
         abilities: ['blaze', 'solar-power']},
        {name: 'Pikachu', height: 4, types: ['Electric'], 
         abilities: ['static', 'lighting-rod']},
        {name: 'Abra', height: 9, types: ['Psychic'], 
         abilities: ['synchronize', 'inner-focus']}
    ];

for (let i = 0; i < pokemonlist.length; i++) {
  if (pokemonlist[i].height > 1)
   {document.write(pokemonlist[i].name + "  " + "(height:"+ "  " +  pokemonlist[i].height + " ) " + "<br>");
document.write(pokemonlist[i].name + "  " + "(height:"+ "  " +  pokemonlist[i].height + " ) " + "<br>");}
}
  
