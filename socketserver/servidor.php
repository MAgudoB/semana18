<?php

require_once('websockets.php');

class echoServer extends WebSocketServer {
    public $usuarios = array();
    public function process ($user, $message) {
        
        $decodedMessage = json_decode($message);
        $this->messageHandler($user, $decodedMessage);
//         $this->usuarios[$user->id]['utc'] = date('U');
        
//         $this->usuarios[$user->id]['mensaje'] = $message;
        
//         $messages = [];
//         foreach ($this->usuarios as &$val) {
//             if($val['utc'] > date('U') - 10){
//     			array_push($messages,$val[mensaje]);
//     		}
//         }
        
// 		$this->send($user, json_encode($messages));
    }
    
    protected function connected ($user) {

    }
    
    protected function closed ($user) {
        
    }
    
    function messageHandler($user, $message) {
        switch ($message->type) {
            case 0:             // Se asigna un id al usuario y se añade el mismo a la lista de usuarios.
                $user->name = $message->name;
                $usuarios[$user->id] = $user;
                echo $user->name." recibe el id ".($user->id);
                $response->type = 0;  // Aqui usar constante
                $response->id = $user->id;
                $this->send($user, json_encode($response));
                break;
            case 1:
                echo "El jugador ".$user->name." actualiza su posición.";
                $usuarios[$user->id]->x = $message->x;
                $usuarios[$user->id]->y = $message->y;
                $usuarios[$user->id]->angle = $message->angle;
                break;
            case 2:
                echo "i es igual a 2";
                break;
        }
    }
}
$echo = new echoServer("0.0.0.0","8082");

try {
    $echo->run();
}
catch (Exception $e) {
    $echo->stdout($e->getMessage());
}
?>