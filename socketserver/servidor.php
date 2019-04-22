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
    }

    protected function connected ($user) {

    }
    
    protected function closed ($user) {
        $this->response->type = 6;  
        $this->response->id = $user->id;
        //Remove the user from the array
        $numeric_indexed_array = array_values($this->usuarios);
        for($i = 0, $l = count($this->usuarios); $i < $l; ++$i) {
            if($numeric_indexed_array[$i]->id == $user->id){
                array_splice($this->usuarios, $i, 1);
            }
        }
        //send that the user has been removed from the game
        foreach($this->usuarios as $u) {
            $this->send($u, json_encode($this->response));
        }
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
                
                $users = array();
                foreach($this->usuarios as $ui) {
                    $users[$ui->id] = $ui->userInfo;
                }
                foreach($this->usuarios as $u) {
                    $this->response->type = 1; //Usar constante
                    $this->response->users = $users;
                    $this->send($u, json_encode($this->response));
                }
                break;
            case 2:
                $this->usuarios[$user->id]->bullets = $message->bullets;
                foreach($this->usuarios[$user->id]->bullets as $bul) {
                    foreach($this->usuarios as $usu) {
                        if($bul->removed != 1 && $bul->collided != 1 && $bul->playerId != $usu->id) {
                            $col = $this->squareCollision($usu->userInfo->x,$usu->userInfo->y,113,66, $bul->x,$bul->y,10,10);
                            //create a response to remove the player and bullet
                            if ($col) {
                                $bul->collided = 1;
                                $bul->target = $usu->id;
                            } 
                        }
                    }
                }
                foreach($this->usuarios as $u) {
                    $this->response->type = 2;
                    $this->response->bullets = $this->usuarios[$user->id]->bullets;
                    $this->send($u, json_encode($this->response));
                }
                break;
        }
    }
    
   function squareCollision($x1, $y1, $w1, $h1, $x2, $y2, $w2, $h2) {
       $collision = false;
       if($x1 < $x2 + $w2 &&
        $x1 + $w1 > $x2 &&
        $y1 < $y2 + $h2 &&
        $y1 + $h1 > $y2){
            $collision = true;
        }
       return $collision;
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