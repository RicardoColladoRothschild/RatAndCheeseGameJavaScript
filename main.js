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
let level = 0;
let lives = 3;

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
    elementsSize = canvasSize / 10.4;

    
    startGame();
}

function startGame(){
  
   
    game.font = elementsSize +'px Arial';
    game.textAlign = 'center';
    console.log(level);

    const map = maps[level];
    if(!map){
      console.log('Won::::::::');
      console.log(map);
      console.log(`level: ${level}`);
      gameWin();
    }

    const mapRows = map.trim().split('\n');    
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
      

}

function gameWin(){
  game.clearRect(0,0,canvasSize,canvasSize);
  game.font = '29px Verdana';
  game.fillText('You did it',250,250);
}

function levelLoseRestart(){
  lives--;
    if(lives <= 0){
      level = 0;
      lives = 3;
      
    }
       playerPosition.x = undefined;
      playerPosition.y = undefined;
      startGame();

  
}

function movePlayer(){
  //compare if player and gift are on same position
  const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY = playerPosition.y.toFixed(3)== giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;
  console.log(giftCollision);
  console.log(`${playerPosition.x.toFixed(3)} ${giftPosition.x.toFixed(3)}`);
  console.log(`${playerPosition.y.toFixed(3)} ${giftPosition.y.toFixed(3)}`);
  if(giftCollision){
    levelWin();
  }  

  const enemyCollision = enemyPositions.find(enemy=>{
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
      return enemyCollisionX && enemyCollisionY;
  });

    if(enemyCollision){
      levelLoseRestart();
      
    }else{
      const player = emojis['PLAYER'];  
      game.fillText(player,playerPosition.x,playerPosition.y);
  
    }
    
    
}

function levelWin(){
  console.log('Subiste de nivel');
  level++;
  startGame();
}

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click',moveDown);

function moveUp(){
  
      if((playerPosition.y - elementsSize) < elementsSize){
      console.log('OUT');
      
    }else{
      
      playerPosition.y -= elementsSize;
      
    }

    
    movePlayer();
    setCanvasSize();
    
    
  
}
function moveLeft(){
  
    

      /* Platzi Solution:*/
      if((playerPosition.x - elementsSize) < elementsSize){
        console.log('OUT');
        
      }else{
        
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