# Reto del modulo "Array Bidimencional
Task:
Los mapas son 10x19, un arreglo bidimencional de 10 elementos cada uno con 10 elementos. 
Cada mapa va a ser un arreglo de filas. 
Ten en cuenta, te entregan un array, normal, que contiene, un string largo... pro elemento, 
lo que vamos a hacer es, tomar una posicion x, luego convertir esa poscion (Que seria un mapa)
y convertirlo a un arreglo bidimencional, por columnas:
    0 1 2 3 4 5 6 7 8 9 ...
0 | x x x x x x x x x x
1 | x x x x x x x x x x
2 | x x x x x x x x x x 
3 | x x x x x x x x x x 
4 | x x x x x x x x x x
5 | x x x x x x x x x x 

Como puedes ver esto dereria ser el resultado, de tu arreglo, al final, claro tendras varios mapas, 
donde x estara en un lugar distinto y etc...etc...etc..
Recordando que x, dentro de un objeto de emojis, representa una emonji, y asi
sucesivamente cada uno de los otros caracteres. 
El reto es llenar de emojis el canvas
clave: usando 2 cilos gfor de complejidad o(n^2).

//para completar este ejercicio, hemos multiplicado las coordenadas por el elementsize, para
    //de esta forma ir obteniendo la nueva posicion del elemento.
    for(let row = 1; row < 10; row++){
      for(let col = 1; col < 10; col++){
        game.fillText(emojis['X'],elementsSize * col, elementsSize * row);
      }
      
    } 