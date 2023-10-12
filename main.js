const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); // nos referimos a que van a haber 2 ejes, eje x y eje y.

window.addEventListener('load', startGame);
//esta funcion es que va a cargar todo lo que vayamos a usar. 
function startGame(){
    //game.fillRect(0,50,100,100);
    //clearRect recibe: x,y width, height
   // game.clearRect(50,50,50,100);
    //game.clearRect(25,25,25,25);

    game.font = '25px Verdana';
    game.fillStyle = 'Purple';
    game.textAlign = 'center';
    game.fillText('Ricardo', 50, 50);
   
}

