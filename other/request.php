<?php

class Request {
    private $path;
    private $query;
    private $body;
    private $method;
    public function __construct() {
        $session = $_SERVER;
        $q=$_GET;
        if(isset($session['REQUEST_URI'])) {
            $this->path = explode("/", strtok($session['REQUEST_URI'], '?'));
        }
        $this->query = $q;
        if(isset($session['REQUEST_METHOD']) && $session['REQUEST_METHOD']==='POST') {
            $this->body = file_get_contents('php://input');
        }
        if(isset($session['REQUEST_METHOD'])) {
            $this->method = $session['REQUEST_METHOD'];
        }
    }
    public function getPath() {
        return $this->path;
    }
    public function getBody() {
        return $this->body;
    }
    public function getQuery() {
        return $this->query;
    }
}

?>