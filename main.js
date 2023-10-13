const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); // nos referimos a que van a haber 2 ejes, eje x y eje y.
let canvasSize;
window.addEventListener('load', startGame);
//esta funcion es que va a cargar todo lo que vayamos a usar. 
function startGame(){

    canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.8;

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

   
    const elementsSize = canvasSize / 10;
    console.log(`canvasSize: ${canvasSize} | elements size: ${elementsSize}`);
    game.font = elementsSize +'px Arial';
    game.textAlign = 'center';
   for(let i = 1; i < 10; i++){
     game.fillText(emojis['X'],elementsSize * i, elementsSize);
   }

   
}
