// enlace a vistas
const btnNewGame = document.getElementById("btn-new-game");
const btnNewWord = document.getElementById("btn-new-word");
const viewMain = document.getElementById("container-actions-main");
const viewNewWord = document.getElementById("container-actions-new-word");


// funciones para cargar las páginas del juego y de ingreso de nuevas palabras

const ShownewGame = () => {
};

const showInsertNewWord = () => {
   viewMain.style.display = "none";
   viewNewWord.style.display = "block";
};

// callbacks o listener para los elementos de la vista
btnNewGame.addEventListener("click", ShownewGame);
btnNewWord.addEventListener("click", showInsertNewWord);