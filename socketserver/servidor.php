<?php

require_once('websockets.php');
class echoServer extends WebSocketServer {
    public $usuarios;
    
    public function process ($user, $message) {
        
        
        // Creamos la columna utc para guardarnos la fecha
        $this->usuarios[$user->id]['utc'] = date('U');
        
        // Creamos la columna mensaje que contiene el mensaje completo a reenviar
        $this->usuarios[$user->id]['mensaje'] = $message;
		
       $longanizassj3 = "";
        foreach ($this->usuarios as &$valor) {
            //Comprobamos si se ha desconectado
            if($valor['utc'] > date('U') - 10){
    		
    			$longanizassj3 .= $valor[mensaje]."|";
    		}
        }
		$this->send($user,$longanizassj3);
		
    }
    
    protected function connected ($user) {
       
    }
    
    protected function closed ($user) {
        
    }
}

$echo = new echoServer("0.0.0.0","8082");

try {
    $echo->run();
}
catch (Exception $e) {
    $echo->stdout($e->getMessage());
}
