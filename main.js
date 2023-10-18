const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); // nos referimos a que van a haber 2 ejes, eje x y eje y.
let canvasSize;
let elementsSize;

const playerPosition = {
  x:undefined,
  y:undefined
};

const giftPosition = {
  x:undefined,
  y:undefined
};

let enemyPositions = [];


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
  
   
    game.font = elementsSize +'px Arial';
    game.textAlign = 'center';
    
    const map = maps[0];    
    const mapRows = maps[0].trim().split('\n');    
    const mapRowCols = mapRows.map(row=>row.trim().split(''));    
    
  //we need to remove every element from the enemies arrays, to reaload it.
    enemyPositions = [];
    game.clearRect(0,0,canvasSize,canvasSize);
    mapRowCols.forEach((rows, rowIndx)=>{
       rows.forEach((col, colIndx)=>{
        const emoji = emojis[col];
        const posX = elementsSize * (colIndx + 1);
        const posY = elementsSize * (rowIndx + 1);

        if(col=='O' && (playerPosition.x===undefined && playerPosition.y===undefined)){
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log(playerPosition);
        }else if(col==='I'){
          giftPosition.x = posX;
          giftPosition.y = posY;         
          
        }else if(col == 'X'){
          enemyPositions.push({
            x: posX,
            y: posY
          });
        }
        

       game.fillText(emoji, posX, posY);
      });
      
    });

    
    
    movePlayer();
    console.log(playerPosition);
    console.log(enemyPositions);
   

}

function movePlayer(){
  //compare if player and gift are on same position
  const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY = playerPosition.y.toFixed(3)== giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;

  if(giftCollision){
    console.log('level up');
  }  

    const player = emojis['PLAYER'];  
    game.fillText(player,playerPosition.x,playerPosition.y);
  
    
}

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click',moveDown);

function moveUp(){
  
    /*MY SOLUTION FOR NOT GOING OUT OF MAP
    if(playerPosition.y > (4 + elementsSize)){
      console.log(canvasSize);
      playerPosition.y -= elementsSize;
    
    }*/

    if((playerPosition.y - elementsSize) < elementsSize){
      console.log('OUT');
      
    }else{
      console.log(canvasSize);
      playerPosition.y -= elementsSize;
    }

    
    movePlayer();
    setCanvasSize();
    
    
  
}
function moveLeft(){
  
    //MY SOLUTION:
    /*if(playerPosition.x > 1.5){
      playerPosition.x -= elementsSize;
    }*/

      /* Platzi Solution:*/
      if((playerPosition.x - elementsSize) < elementsSize){
        console.log('OUT');
        
      }else{
        console.log(canvasSize);
        playerPosition.x -= elementsSize;
      }
    
    
    movePlayer();
    setCanvasSize();
}
function moveRight(){
  
    /*My solution
    if(playerPosition.x < (canvasSize- elementsSize)){
      playerPosition.x += elementsSize;
    }*/

    /**Platzi Solution */
    if((playerPosition.x + elementsSize) > canvasSize){
      console.log('OUT');
      
    }else{
      console.log(canvasSize);
      playerPosition.x += elementsSize;
    }
    
    
    movePlayer();
    setCanvasSize();
}
function moveDown(){
  
      /*Mi solucion:
      if(playerPosition.y <= (canvasSize - elementsSize)){
        playerPosition.y += elementsSize;
      }*/
              
      /**Platzi solution */
      if((playerPosition.y + elementsSize) > canvasSize){
        console.log('OUT');
        
      }else{
        console.log(canvasSize);
        playerPosition.y += elementsSize;
      }      
    
    
    movePlayer();
    setCanvasSize();
}

window.addEventListener('keydown', moveByKeys);

function moveByKeys(event){
  if(event.key == 'ArrowUp'){
    moveUp();
  }else if(event.key == 'ArrowDown'){
    moveDown();
  }else if(event.key == 'ArrowRight'){
    moveRight();
  }else if(event.key == 'ArrowLeft'){
    moveLeft();
  }
}