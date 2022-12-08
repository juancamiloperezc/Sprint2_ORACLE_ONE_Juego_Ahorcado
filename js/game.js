const canvas = document.getElementById("canvas")
const canvas2d = document.getElementById("canvas").getContext("2d");
const btnGameNewGame = document.getElementById("btn-game-new-game")
const btnGameCancel = document.getElementById("btn-game-cancel")

let repeatsLetters = [];
let wordSelected = "";
let numWordsIncorrect = 0;
let numwordsCorrect = 0;

// función para retornar la palabra escogida aleatoriamente
const selectWord  = (wordsStorage) => {
   if (wordsStorage == null){ // en caso de que no se enecuentren los datos
     return "ALURA";
   }

   let wordRandom = Math.floor(Math.random() * wordsStorage.length);
   return wordsStorage[wordRandom];
}

// función para crear un nuevo juego
const createGame = () => {
 
 let wordsStorage = localStorage.getItem("data")
 let listWords = JSON.parse(wordsStorage);
 wordSelected = selectWord(listWords);
 repeatsLetters = [];
 numWordsIncorrect = 0;
 numwordsCorrect = 0;

 console.log(wordSelected)
   
   // se dibujan las lineas en el canvas
   canvas2d.lineWidth = 8;
   canvas2d.lineCap = "round";
   canvas2d.lineJoin = "round";
   canvas2d.fillStyle = "#90CBFF";
   canvas2d.strokeStyle = "#0A3871";

   canvas2d.fillRect(0,0,canvas.width,canvas.height);

   // base de la horca
   canvas2d.beginPath();
   canvas2d.moveTo(canvas.width * 1 / 4, canvas.height * 5 / 8);
   canvas2d.lineTo(canvas.width * 3 / 4, canvas.height * 5 / 8)
   canvas2d.closePath();
   canvas2d.stroke();

   canvas2d.lineWidth = 8;
   canvas2d.lineCap = "round";
   canvas2d.lineJoin = "round";
   canvas2d.fillStyle = "#90CBFF";
   canvas2d.strokeStyle = "#0A3871";
   canvas2d.beginPath();

   // se dibujan las lineas para las letras
   let spacingBetweenLetters = (canvas.width / wordSelected.length) * 0.2;
   let lettersSpacing = canvas.width / wordSelected.length;
   
   
   for (let i = 0; i < wordSelected.length; i++){
      canvas2d.moveTo((i*lettersSpacing) + spacingBetweenLetters, canvas.height * 7 / 8);
      canvas2d.lineTo(((i+1) * lettersSpacing), canvas.height * 7 / 8);
   }

   canvas2d.closePath();
   canvas2d.stroke();

   document.addEventListener("keyup", verifyInputLetter);  
}


// función para validar la letra pulsada
const verifyInputLetter = (event) => {
 let key = event.key.toUpperCase();  
  
  // se valida el ingreso de una letra correcta
  if (key >= 'A' && key <= 'Z' && key.length == 1){
     if (validateRepeatLetter(key)){ // en caso de que la letra sea repetida
        return;
     }

     if (validLetter(key)){ // en caso de que la letra ingresada sea valida
       for (let i = 0; i< wordSelected.length; i++){
        if (wordSelected[i] == key){
         drawValidLetter(i);
         numwordsCorrect++;
        }
       }

       if(numwordsCorrect == wordSelected.length) alert("ganaste");

       return;

     }

     // si la letra es invalida
     numWordsIncorrect ++;
     drawHorca();
     drawLettersIncorrects(key);
  }
 }

// función para verificar si existe letra repetida
const validateRepeatLetter = (letter) => {
   if (repeatsLetters.indexOf(letter) > 0){ // si existe letra repetida
      return true;
   }

   // en caso de que no exista letra repetida
   repeatsLetters.push(letter);
   return false;
}  

// función para validar si la letra es valida
const validLetter = (letter) => {
  if (wordSelected.indexOf(letter) < 0){
     return false;
  }

  // en caso de que la letra sea valida
  return true;
}

// función para pintar las letras validas
// por su indice
 const drawValidLetter = (index) => {
  let lettersSpacing = canvas.width / wordSelected.length;
  
  canvas2d.lineWidth=6
  canvas2d.font = `bold 40px Inter`;
  canvas2d.lineCap="round"
  canvas2d.lineJoin="round"
  canvas2d.fillStyle="#0A3871"
  canvas2d.fillText(` ${wordSelected[index]} `, (index * lettersSpacing) + (0.05*canvas.width), canvas.height * 6.9 / 8)
} 

// función para dibujar una parte de la horca
const drawHorca = () => {
  canvas2d.lineWidth = 8;
  canvas2d.lineCap = "round";
  canvas2d.lineJoin = "round";
  canvas2d.fillStyle = "#90CBFF";
  canvas2d.strokeStyle = "#0A3871";


  if (numWordsIncorrect == 1){ // se dibuja la base
   canvas2d.moveTo(canvas.width / 2,  canvas.height * 5 / 8);
   canvas2d.lineTo(canvas.width / 2,  canvas.height * 1 / 8);
  }else if (numWordsIncorrect == 2){ // se dibuja la soga
   canvas2d.moveTo(canvas.width / 2,  canvas.height * 1 / 8);
   canvas2d.lineTo(canvas.width * 3 / 4,  canvas.height * 1 / 8);
   canvas2d.moveTo(canvas.width * 3 / 4,  canvas.height * 1 / 8);
   canvas2d.lineTo(canvas.width * 3 / 4,  canvas.height * 1 / 7);
  }else if(numWordsIncorrect == 3){ // se dibuja lacabeza
   canvas2d.arc(canvas.width * 3 / 4,  canvas.height * 1 / 7 + canvas.height * 0.05, canvas.height * 0.05, -Math.PI / 4, 2*Math.PI)
  }else if(numWordsIncorrect == 4){ // se dibujan el torzo
   canvas2d.moveTo(canvas.width * 3 / 4,  canvas.height * 1 / 7 + canvas.height * 0.1);
   canvas2d.lineTo(canvas.width * 3 / 4,  canvas.height * 3 / 8);
  }else if(numWordsIncorrect == 5){// se dibujan las manos
   canvas2d.moveTo(canvas.width * 3 / 4,  canvas.height * 2 / 8);
   canvas2d.lineTo(canvas.width * 13 / 16,  canvas.height * 2.5 / 8);
   canvas2d.moveTo(canvas.width * 3 / 4,  canvas.height * 2 / 8);
   canvas2d.lineTo(canvas.width * 11 / 16,  canvas.height * 2.5 / 8);
  }else if(numWordsIncorrect == 6){ // se dibujan las piernas
   canvas2d.moveTo(canvas.width * 3 / 4,  canvas.height * 3 / 8);
   canvas2d.lineTo(canvas.width * 13 / 16,  canvas.height * 3.5 / 8);
   canvas2d.moveTo(canvas.width * 3 / 4,  canvas.height * 3 / 8);
   canvas2d.lineTo(canvas.width * 11 / 16,  canvas.height * 3.5 / 8);

    // se inhabilitan los eventos
    btnGameNewGame.removeEventListener("click",  createGame);
    document.removeEventListener("keyup", verifyInputLetter);

    alert("perdiste");
  }

  canvas2d.stroke()
  canvas2d.closePath()
}

// función que pinta en pantalla las letras incorrectas
const drawLettersIncorrects = (letter) => {
 canvas2d.lineWidth=6
 canvas2d.font = `bold 20px Inter`;
 canvas2d.lineCap="round"
 canvas2d.lineJoin="round"
 canvas2d.fillStyle="#0A3871"
 canvas2d.fillText(` ${letter} `, canvas.width * 0.5 / 6 * numWordsIncorrect, canvas.height * 7.8 / 8)
}

// se configuran los eventos para los botones
btnGameNewGame.addEventListener("click", () => createGame());
btnGameCancel.addEventListener("click", () => {
    repeatsLetters = [];
    wordSelected = "";
    numWordsIncorrect = 0;
    numwordsCorrect = 0;

    viewMain.style.display = "block";
    viewNewWord.style.display = "none";
    viewNewGame.style.display = "none";

    btnGameNewGame.removeEventListener("click",  createGame);
    document.removeEventListener("keyup", verifyInputLetter);
});