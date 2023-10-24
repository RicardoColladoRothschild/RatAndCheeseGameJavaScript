const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const btnUp = document.querySelector('#arriba');
const btnLeft = document.querySelector('#izquierda');
const btnRight = document.querySelector('#derecha');
const btnDown = document.querySelector('#abajo');


 // nos referimos a que van a haber 2 ejes, eje x y eje y.
let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

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

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize',setCanvasSize);

function setCanvasSize(){
  
  canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.7;

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
    
      gameWin();
    }

    if(!timeStart){
      timeStart = Date.now();
      timeInterval = setInterval(showTime, 100);
    }


    const mapRows = map.trim().split('\n');    
    const mapRowCols = mapRows.map(row=>row.trim().split(''));    
    showLives();
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
          console.log('QUESO EN POSICION:');
          console.log(giftPosition.x);
          console.log(giftPosition.y);
          
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
  console.log('Game finished');
  clearInterval(timeInterval);
  const playerTime = Date.now() - timeStart;
  const recordTime = localStorage.getItem('record_time');
    if(recordTime){
      
        if(recordTime > playerTime){
          localStorage.setItem('record_time',playerTime);
          console.log('Superaste el record, felicidades');
        }else{
          console.log('Lo siento, no superaste el record');
        }
    }else{
      localStorage.setItem('record_time',playerTime);
    }

  console.log(recordTime, playerTime);
}

//this functions add the hearts to the p element to show how many lives has teh user left
function showLives(){


  const heartArrays = Array(lives).fill(emojis['HEART']);
  spanLives.innerHTML = '';
  heartArrays.forEach(heart=>{
    spanLives.append(heart);
  });
  
  

}

function showTime(){

  spanTime.innerHTML =  Date.now() - timeStart;
 // timeStart = Date.now();
}

function levelLoseRestart(){
  lives--;

    
    if(lives <= 0){
      level = 0;
      lives = 3;
      timeStart = undefined;
      
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
      if((playerPosition.x - Math.floor(elementsSize)) < Math.floor(elementsSize)){
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