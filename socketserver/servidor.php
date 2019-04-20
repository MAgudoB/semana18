<?php
require_once('websockets.php');

// class workerThread extends Thread {
//     public function run(){
//         while(true){
//             echo "hola";
//             sleep(1);
//         }
//     }
// }
    
class echoServer extends WebSocketServer {
    public $usuarios = array();
    public $response;
    public function process ($user, $message) {
        $decodedMessage = json_decode($message);
        $this->messageHandler($user, $decodedMessage);
        
        $users = array();
        $bullets = array();
        $this->response;
        foreach($this->usuarios as $ui) {
            $users[$ui->id] = $ui->userInfo;
            $bullets[$ui->id] = $ui->bullets;
        }
        foreach($this->usuarios as $u) {
            echo "Usuario: ".$u->name." x: ".$u->userInfo->x." y: ".$u->userInfo->y."\n";
            $this->response->type = 1; //Usar constante
            $this->response->users = $users;
            $this->send($u, json_encode($this->response));
        }
        foreach($this->usuarios as $u) {
            $this->response->type = 2; //Usar constante
            $this->response->bullets = $bullets;
            $this->send($u, json_encode($this->response));
        }
    }

    protected function connected ($user) {

    }
    
    protected function closed ($user) {
        
    }
    
    function messageHandler($user, $message) {
        switch ($message->type) {
            case 0:             // Se asigna un id al usuario y se añade el mismo a la lista de usuarios.
                $user->name = $message->name;
                $this->usuarios[$user->id] = $user;
                echo $user->name." recibe el id ".($user->id)."\n";
                $this->response->type = 0;  // Aqui usar constante
                $this->response->id = $user->id;
                $this->send($user, json_encode($this->response));
                break;
            case 1:
                $this->usuarios[$user->id]->userInfo->x = $message->x;
                $this->usuarios[$user->id]->userInfo->y = $message->y;
                $this->usuarios[$user->id]->userInfo->angle = $message->angle;
                $this->usuarios[$user->id]->userInfo->imageInd = $message->imageInd;
                break;
            case 2:
                $this->usuarios[$user->id]->bullets->x = $message->x;
                $this->usuarios[$user->id]->bullets->y = $message->y;
                $this->usuarios[$user->id]->bullets->angle = $message->angle;
                $this->usuarios[$user->id]->bullets->playerId = $message->playerId;
                $this->usuarios[$user->id]->bullets->id = $message->id;
                break;
        }
    }
}
$echo = new echoServer("0.0.0.0","8082");
// $playersThread = new workerThread();

try {
    $echo->run();
    // $playersThread = new workerThread();
}
catch (Exception $e) {
    $echo->stdout($e->getMessage());
}
?>