
const validLetters = /[^A-Z$]/;

// enlace a las vistas
const alertText = document.getElementById("alert-input-text");
const inputText = document.getElementById("input-text");
const btnSave = document.getElementById("btn-save");
const btnCancel = document.getElementById("btn-cancel");

let listWords = [
   "ALURA", 
   "AHORCADO",
   "HTML",
   "CSS",
   "LOGICA",
   "DESAFIO",
];


const validNewWord = () => {
   let word = inputText.value;
   
   if (word == ""){ // si la entrada es vacía
     alertText.style.color = "black";
     return false;
   }

   if(validLetters.test(word) || word.length > 8){ // si la palabra no es valida
     alertText.style.color = "red";
     return false;
   }

   alertText.style.color = "black";
   return true; // en caso contrario no se 
};

const cancel = () =>{
   // se redibuja la parte principal
   viewNewWord.style.display = "none";
   viewMain.style.display = "block";
}; 

const saveWord = () => {
   if (!validNewWord()){
      alert("palabra invalida");
      return;
   }

   let dataStorage = localStorage.getItem("data");

   if(dataStorage != null){ // si hay datos previamente almacenados
      listWords = JSON.parse(dataStorage);
   }

   if (!validNewWord()){ // se verifica la validez de los datos
      alert("palabra invalida");
   }

   if(listWords.indexOf(inputText.value) >= 0){ // se valida la existencia previa de la palabra
      alert("palabra ya existente");
      return;
   }

   // en caso de la validez completa
   listWords.push(inputText.value);
   localStorage.setItem("data", JSON.stringify(listWords));
   alert("palabra ingresada");
};

// callbacks a las funciones
inputText.addEventListener("keyup", validNewWord);
btnSave.addEventListener("click", saveWord);
btnCancel.addEventListener("click", cancel); 