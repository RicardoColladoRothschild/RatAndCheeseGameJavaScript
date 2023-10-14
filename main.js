const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); // nos referimos a que van a haber 2 ejes, eje x y eje y.
let canvasSize;
let elementsSize;
window.addEventListener('load', startGame);

//there was a problem when loading the website,if it resize, it did not respond responsive to the change, had to be reload it to it
window.addEventListener('resize',setCanvasSize);

//esta funcion es que va a cargar todo lo que vayamos a usar. 


function setCanvasSize(){
  canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.8;

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    elementsSize = canvasSize / 10;

    startGame();
}

function startGame(){

  //setCanvasSize();

   
    //console.log(`canvasSize: ${canvasSize} | elements size: ${elementsSize}`);
    game.font = elementsSize +'px Arial';
    game.textAlign = 'center';
   for(let i = 1; i < 10; i++){
     game.fillText(emojis['X'],elementsSize * i, elementsSize);
   }   
}