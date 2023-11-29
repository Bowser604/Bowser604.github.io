let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector(".modal-container");

    
  // modal container
function showMadal(title, text) {
  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);
    
  modalContainer.classList.add('is-visible');
 }

let dialogPromiseReject; // This can be set later, by showDialog

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');

  if (dialogPromiseReject) {
    dialogPromiseReject();
    dialogPromiseReject = null;
  }
}

function showDialog(title, text) {
  showModal(title, text);

  // We have defined modalContainer here
  let modalContainer = document.querySelector('#modal-container');

  // We want to add a confirm and cancel button to the modal
  let modal = modalContainer.querySelector('.modal');

  let confirmButton = document.createElement('button');
  confirmButton.classList.add('modal-confirm');
  confirmButton.innerText = 'Confirm';

  let cancelButton = document.createElement('button');
  cancelButton.classList.add('modal-cancel');
  cancelButton.innerText = 'Cancel';

  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);

  // We want to focus the confirmButton so that the user can simply press Enter
  confirmButton.focus();
  // Return a promise that resolves when confirmed, else rejects
  return new Promise((resolve, reject) => {
  cancelButton.addEventListener('click', hideModal);
  confirmButton.addEventListener('click', () => {
    dialogPromiseReject = null; // Reset this
    hideModal();
    resolve();
  });
    // This can be used to reject from other functions
  dialogPromiseReject = reject;
});
}

document.querySelector('#show-dialog').addEventListener('click', () => {
  showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
    alert('confirmed!');
  }, () => {
    alert('not confirmed');
  });
});
  

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
  
  document.querySelecter('#show-modal').addEventListener('click',()=> {
      showModal('Modal title', 'This is the modal content!');
  });

})();

    
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
