const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); // nos referimos a que van a haber 2 ejes, eje x y eje y.
let canvasSize;
let elementsSize;

//getting btns from DOM
const btnUp = document.querySelector('#arriba');
const btnLeft = document.querySelector('#izquierda');
const btnRight = document.querySelector('#derecha');
const btnDown = document.querySelector('#abajo');


window.addEventListener('load', setCanvasSize);


window.addEventListener('resize',setCanvasSize);

function setCanvasSize(){
  canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.8;

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    elementsSize = canvasSize / 10.5;

    startGame();
}

function startGame(){

  //setCanvasSize();
  
   
    game.font = elementsSize +'px Arial';
    game.textAlign = 'center';
    
    const map = maps[0];
    console.log(maps[0]);
    const mapRows = maps[0].trim().split('\n'); 
    console.log(mapRows);

    const mapRowCols = mapRows.map(row=>row.trim().split(''));
    console.log(mapRowCols);

    mapRowCols.forEach((rows, rowIndx)=>{
       rows.forEach((col, colIndx)=>{
        const emoji = emojis[col];
        const posX = elementsSize * (colIndx + 1);
        const posY = elementsSize * (rowIndx + 1);

        game.fillText(emoji, posX, posY);
      });
    });

    //para completar este ejercicio, hemos multiplicado las coordenadas por el elementsize, para
    //de esta forma ir obteniendo la nueva posicion del elemento.
    // for(let row = 1; row <= 10; row++){
    //   for(let col = 1; col <= 10; col++){
        
    //       game.fillText(emojis[mapRowCols[row-1][col-1]],elementsSize * col, elementsSize * row);
              
    //   }
      
    // }   
}