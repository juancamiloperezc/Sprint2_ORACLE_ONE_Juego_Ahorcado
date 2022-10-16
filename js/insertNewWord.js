const validLetters = /^[A-Z\s]+$/;

// enlace a las vistas
const alertText = document.getElementById("alert-input-text");
const inputText = document.getElementById("input-text");

const validNewWord = () => {
   let word = inputText.value;
   
   if (word == "" || word.length > 8){ // si la entrada es vacía
     alertText.style.color = "black";
     return false;
   }

   if(!(validLetters.test(word)) || word.length > 8){ // si la palabra no es valida
     alertText.style.color = "red";
     return false;
   }
   
   //TODO lIST : guardar la nueva palabra

   return false; // en caso contrario no se 
};

// callbacks a las funciones
inputText.addEventListener("keyup", validNewWord);