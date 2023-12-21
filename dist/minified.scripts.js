let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector(".modal-container");
  console.log("modalContainer", modalContainer);

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        // Add this line to get back image
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.types = details.types.map((type) => type.type.name); // Extract type names
        item.abilities = details.abilities.map(
          (ability) => ability.ability.name
        ); // Extract ability names
        item.weight = details.weight;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    const pokemonList = document.querySelector(".pokemon-list");
    if (!pokemonList) {
      console.error("Pokemon list element not found");
      return;
    }

    const listItem = document.createElement("li");
    const button = document.createElement("button");
    button.innerHTML = pokemon.name;

    pokemonList.appendChild(listItem);
    listItem.appendChild(button);
    button.classList.add("btn", "btn-block");
    button.setAttribute("data-target", "#pokemonModal", "data-toggle", "modal");
    // event listener within function
    button.addEventListener("click", function (e) {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // modal container
  function showModal(item) {
    let modalBody = $(".modal-body");
    let imageElementFront = $('<img class="modal-img"style="width:50%">');
    imageElementFront.attr("src", item.imageUrl);
    let imageElementBack = $('<img class="modal-img"style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);
    let heightElement = $("<p>" + "height : " + item.height + "</p>");
    let weightElement = $("<p>" + "weight : " + item.weight + "</p>");
    let typesElement = $("<p>" + "types : " + item.types + "</p>");
    let abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");

    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    let nameElement = $("<h1>" + item.name + "</h1>");

    modalTitle.empty();
    modalBody.empty();

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);

    $("#pokemonModal").modal("toggle"); // this shows modal
  }

  return {
    addListItem: addListItem,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
