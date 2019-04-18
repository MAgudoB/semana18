<?php

require_once('websockets.php');
class echoServer extends WebSocketServer {
    public $usuarios;
    
    public function process ($user, $message) {
        
        $this->usuarios[$user->id]['utc'] = date('U');
        
        $this->usuarios[$user->id]['mensaje'] = $message;
        
        $messages = [];
        foreach ($this->usuarios as &$val) {
            if($val['utc'] > date('U') - 10){
    			array_push($messages,$val[mensaje]);
    		}
        }
        
		$this->send($user, json_encode($messages));
    }
    
    protected function connected ($user) {
      	$this->send($user, $user->id);
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
