$(document).keypress(function(event){
    // Esto es lo que pasa cuando pulso la W
    if ( event.which == 119 ) {arriba = -1;}
    // Esto es lo que pasa cuando pulso la S
    if ( event.which == 115 ) {arriba = 1;}
    // Esto es lo que pasa cuando pulso la A
    if ( event.which == 97 ) {derecha = -1;}
    // Esto es lo que pasa cuando pulso la D
    if ( event.which == 100 ) {derecha = 1;}
});
 $(document).keyup(function(event){
     // Esto es lo que pasa cuando pulso la W
    if ( event.which == 87 ) {arriba = 0;}
    // Esto es lo que pasa cuando pulso la S
    if ( event.which == 83 ) {arriba = 0;}
    // Esto es lo que pasa cuando pulso la A
    if ( event.which == 65 ) {derecha = 0;}
    // Esto es lo que pasa cuando pulso la D
    if ( event.which == 68 ) {derecha = 0;}
});