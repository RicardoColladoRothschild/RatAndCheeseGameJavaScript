const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); // nos referimos a que van a haber 2 ejes, eje x y eje y.

window.addEventListener('load', startGame);
//esta funcion es que va a cargar todo lo que vayamos a usar. 
function startGame(){

    // const canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.8;

    // canvas.setAttribute('width', canvasSize);
    // canvas.setAttribute('height', canvasSize);

    //Esta es la forma que yo use, para el responsive dle canvas:
    window.addEventListener('resize', resizeCanvas)

    

   
}

//en esta solucion este metodo, resizeCanbas, nos ayuda a crear un canvas responsive.
//Lo que hacemos aqui es que tomamos los innerWidth y innerHeight, calculamos usando Math.min\
//cual de estos es mas pequeño, y luego damos a nuestro canvas un cuadro perfecto, tomando el
//80% (al multiplicar por 0.8), de ese valor minimo, como referencia para dar el size a nuestro canvas
function resizeCanvas(){
    //La razon de que esto funcione, como el ancho o el alto pueden variar, y no ser proporcionales, sino que uno
    //puede ser mayor o menor que el otro, usaremos el metodo Math.min, que calcula cual es el mas
    //pequeño, y ese valor lo multiplicamos por el porcentaje que deseamos usar
    const canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.8;

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
}

