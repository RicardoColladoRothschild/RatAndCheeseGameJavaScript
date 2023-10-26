const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');
const btnUp = document.querySelector('#arriba');
const btnLeft = document.querySelector('#izquierda');
const btnRight = document.querySelector('#derecha');
const btnDown = document.querySelector('#abajo');


 // Will use the measure of the current windows to adjust canvasSize. Elementsize will be my elements inside the canvas,
 //which i will mesuare depending on canvassize (which will resize if the windows resize.)
let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

//Handling time information, new record, and old record information. Everytime a player beat an old record it will be save on a
//localStorage.
let timeStart;
let timePlayer;
let timeInterval;

//palyer position for a 2d dimension game, using x and y axis. 
const playerPosition = {
  x:undefined,
  y:undefined
};

//this is the goal, every time a new map is load it it needs to be change, positions are also given by a 3 dimension 
const giftPosition = {
  x:undefined,
  y:undefined
};

let enemyPositions = [];

//getting btns from DOM

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize',setCanvasSize);

function setCanvasSize(){
  
  /*My solution:
  canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.7;*/ 

  /**Platzi solutin:*/
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }

    canvasSize = Number(canvasSize.toFixed(0));

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    elementsSize = canvasSize / 10.4;

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function startGame(){

  

    //Providing size for the elements inside the canvas, again, base on canvas size we get the elementsSize, which came as a result from the windows size
    game.font = elementsSize +'px Arial';
    game.textAlign = 'center';
    console.log(level);

    //Check if there are not more maps, because if player got to the last level, we should avoid any possible bug for trying to continue leveling.
    const map = maps[level];
    if(!map){
    
      gameWin();
    }

    /**The function startGame() is execute several times during the game, because of it, we must prevent timestart to be restart it eveytime it happen
     * way to do it was confirming 1 time, if it was empty, if it is not, this code should not be execute, otherwise, we save the start point time and then
     * we use it to mark how long did it take to the player to get to the last level.
     */
    if(!timeStart){
      timeStart = Date.now();
      timeInterval = setInterval(showTime, 100);
      //this showRecord() function call, is to write on the DOM to a span, the timestart information or 
      showRecord();
    }

    /*Map object is build as an string, to become in a multidimension array we must go throught the following code, so we can handle an x and y axis positions for elements
    on the map */
    const mapRows = map.trim().split('\n');    
    const mapRowCols = mapRows.map(row=>row.trim().split(''));    
    showLives();
  //we need to remove every element from the enemies arrays, to reaload it.
    enemyPositions = [];
    game.clearRect(0,0,canvasSize,canvasSize);

    //Following forEach is load to fullfill map with elements positions in canvas.
    mapRowCols.forEach((rows, rowIndx)=>{
       rows.forEach((col, colIndx)=>{
        const emoji = emojis[col];
        const posX = elementsSize * (colIndx + 1);
        const posY = elementsSize * (rowIndx + 1);

        //O represents a door emoji, its the starting point for our player on every level
        if(col=='O' && (playerPosition.x===undefined && playerPosition.y===undefined)){
          playerPosition.x = posX;
          playerPosition.y = posY;
            //I -> this represents the gift or goal the player must achieve to complete the current level        
          }else if(col==='I'){
          giftPosition.x = posX;
          giftPosition.y = posY;         
          /*console.log('QUESO EN POSICION:');
          console.log(giftPosition.x);
          console.log(giftPosition.y);*/
          
          //Evey x, on the map, is a poison, which will cause the player to go back to O position, and lose a live.
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
  
  console.log('Interval should stop here');
  clearInterval(timeInterval);
  const playerTime = Date.now() - timeStart;
  const recordTime = localStorage.getItem('record_time');
    if(recordTime){
      
      
        if(recordTime < playerTime){
          localStorage.setItem('record_time',playerTime);
          pResult.innerHTML = 'Superaste el record, felicidades';
          screenAfterWin();
        }else{
          pResult.innerHTML = 'Lo siento, no superaste el record';
        }
    }else{
      localStorage.setItem('record_time',playerTime);
      pResult.innerHTML = '¿Primera VEZ? Ahora superate!';
    }

  console.log(recordTime, playerTime);
}

function screenAfterWin(){
  game.clearRect(0,0,canvasSize,canvasSize);
  canvas.classList.add('canvas-winner');
    btnUp.classList.add('inactive');
    btnRight.classList.add('inactive');
    btnLeft.classList.add('inactive');
    btnDown.classList.add('inactive');

      //creting congrats text
      game.font = '16px Verdana';
      game.fillStyle = 'red';
        game.fillText('🎉🎉🎉Felicidades! has batido un record🎉🎉🎉',(canvasSize/2),(canvasSize/2));
        const btnContinuar = document.createElement('button');
        btnContinuar.innerHTML = 'Continuar';
        
        const btnsDivs = document.querySelector('.btns');
        btnsDivs.append(btnContinuar);
        
        


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

function showRecord(){
  spanRecord.innerHTML = localStorage.getItem('record_time');
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
  
  /**My solution 
      if((playerPosition.y - elementsSize) < elementsSize){
      console.log('OUT');
      
    }else{
      
      playerPosition.y -= elementsSize;
      
    }*/
    /**Platzi solution: */
    console.log('Me quiero mover hacia arriba');

  if ((playerPosition.y - elementsSize) < elementsSize) {
    console.log('OUT');
  } else {
    playerPosition.y -= elementsSize;
    startGame();
  }
    
    movePlayer();
    //setCanvasSize();
    
    
  
}
function moveLeft(){
  
    

      /* Platzi Solution:*/
      if((playerPosition.x - Math.floor(elementsSize)) < Math.floor(elementsSize)){
        console.log('OUT');
        
      }else{
        
        playerPosition.x -= elementsSize;
        startGame();
      }
    
    
    movePlayer();
    //setCanvasSize();
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
      startGame();
    }
    
    
    movePlayer();
    //setCanvasSize();
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
        startGame();
      }      
    
    
    movePlayer();
    //setCanvasSize();
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