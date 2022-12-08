// enlace a vistas
const btnNewGame = document.getElementById("btn-new-game");
const btnNewWord = document.getElementById("btn-new-word");
const viewMain = document.getElementById("container-actions-main");
const viewNewWord = document.getElementById("container-actions-new-word");
const viewNewGame = document.getElementById("container-game");


// no se muestran las vistas de nueva palabra o nuevo juego
viewNewWord.style.display = "none";
viewNewGame.style.display = "none";

// funciones para cargar las páginas del juego y de ingreso de nuevas palabras

const ShownewGame = () => {
   viewMain.style.display = "none";
   viewNewWord.style.display = "none";
   viewNewGame.style.display = "block";

   // se crea el nuevo juego y se definen los eventos
   createGame();
};

const showInsertNewWord = () => {
   viewMain.style.display = "none";
   viewNewWord.style.display = "block";
   viewNewGame.style.display = "none";
};

// callbacks o listener para los elementos de la vista
btnNewGame.addEventListener("click", ShownewGame);
btnNewWord.addEventListener("click", showInsertNewWord);