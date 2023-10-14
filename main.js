const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); // nos referimos a que van a haber 2 ejes, eje x y eje y.
let canvasSize;
let elementsSize;
window.addEventListener('load', setCanvasSize);


window.addEventListener('resize',setCanvasSize);

function setCanvasSize(){
  canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.8;

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    elementsSize = canvasSize / 10;

    startGame();
}

function startGame(){

  //setCanvasSize();
  
   
    game.font = elementsSize +'px Arial';
    game.textAlign = 'center';
    
    //para completar este ejercicio, hemos multiplicado las coordenadas por el elementsize, para
    //de esta forma ir obteniendo la nueva posicion del elemento.
    for(let row = 1; row < 10; row++){
      for(let col = 1; col < 10; col++){
        game.fillText(emojis['X'],elementsSize * col, elementsSize * row);
      }
      
    }   
}