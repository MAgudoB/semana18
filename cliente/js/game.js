function bucle(){
    $("#posx").val(parseInt($("#posx").val())+derecha);
    $("#posy").val(parseInt($("#posy").val())+arriba);
    socket.send($("#posx").val()+"|"+$("#posy").val()+"|"+$("#color").val());
    setTimeout("bucle()",10);
}