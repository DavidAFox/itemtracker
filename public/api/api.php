 <?php
  
  require_once("../../conf.php");
  require_once(OTHER_PATH . "sessions.php");
  require_once(OTHER_PATH . "pgdata.php");
  require_once(OTHER_PATH . "request.php");
  require_once(OTHER_PATH . "pgapi_data.php");
  $data = new DataStore();
  $ses = new MySession($data);
  $ses->startSession();
  if(!$ses->loggedIn()) {
    http_response_code(401);
    echo "{error: 'Unauthorized', success: false}";
    exit;
  }
  $req = new Request();
  if($req->getPath()[0] !== '' && $req->getPath()[1] !== 'api') {
      //something went wrong
      http_response_code(500);
      echo $_SERVER['REQUEST_URI'];
      echo "{error: 'invalid path', success: false}";
      exit;
  }
  function invalidUri() {
      http_response_code(404);
      exit;
  }
  if(!isset($req->getPath()[2])) {
     invalidUri();
  }
  switch ($req->getPath()[2]) {
      case 'items':
          items($req, $ses, new ApiData($ses->getUserId()));
          break;
      case 'sales':
          sales($req, $ses, new ApiData($ses->getUserId()));
          break;
      case 'stolen':
          stolen($req, $ses, new ApiData($ses->getUserId()));
          break;
      default:
          invalidUri();
          break;
  }
  function items($req, $ses, $data) {
      if(!isset($req->getPath()[3])) {
          invalidUri();
      }
      switch($req->getPath()[3]) {
          case 'list':
            try {
                $items = $data->getItems();
            }
            catch(Exception $e) {
                sendResult(false, $e->getMessage(), NULL);
            }            
            sendResult(true, "", $items);
            break;
          case 'new':
            $item = json_decode($req->getBody(), true);
            if (is_null($item)) {
                sendResult(false, "invalid item", NULL);
            }
            try {
                $item2 = $data->newItem($item);
            }
            catch(Exception $e) {
                sendResult(false, $e->getMessage(), NULL);
            }
            sendResult(true, "", $item2);
            break;
          case 'update':
            $item = json_decode($req->getBody(), true);
            if (is_null($item)) {
                sendResult(false, "invalid item");
            }
            try {
                $item2 = $data->updateItem($item);
            }
            catch(Exception $e) {
                sendResult(false, $e->getMessage(), NULL);
            }
            sendResult(true, "", $item2);
            break;
          case 'existingid':
            if(!isset($req->getPath()[4]) || preg_match("/[^0-9]+/", $req->getPath()[4]) === 1) {
                sendResult(false, "invalid id", NULL);
            }
            try {
                $valid = $data->existingItemId($req->getPath()[4]);
            }
            catch(Exception $e) {
                sendResult(false, $e->getMessage(), NULL);
            }
            sendResult(true, "", $valid);
            break;
          case 'nextid':
            try {
                $id = $data->nextItemId();
            } catch(Exception $e) {
                sendResult(false, $e->getMessage(), NULL);
            }
            sendResult(true, "", $id);
            break;
          default:
            if(!isset($req->getPath()[3]) || preg_match("/[^0-9]+/", $req->getPath()[3]) === 1) {
                sendResult(false, "invalid id", NULL);
            }
            try {
                $valid = $data->existingItemId($req->getPath()[3]);
            }
            catch(Exception $e) {
                sendResult(false, $e->getMessage(), NULL);
            }
            if(!$valid) {
                sendResult(false, "item not found", NULL);
            }
            try {
                $item = $data->getItem($req->getPath()[3]);
            }
            catch(Exception $e) {
                sendResult(false, $e->getMessage(), NULL);
            }
            sendResult(true, "", $item);
            break;
      }
  }
  function sales($req, $ses, $data) {
      if(!isset($req->getPath()[3])) {
          invalidUri();
      }
      switch ($req->getPath()[3]) {
          case 'list':
              try {
                $sales = $data->getSales($req);
              }
              catch(Exception $e) {
                  sendResult(false, $e->getMessage(), NULL);
              }
              sendResult(true, "", $sales);
              break;
          case 'new':
              $sale = json_decode($req->getBody(), true);
              if (is_null($sale)) {
                sendResult(false, "invalid sale", NULL);
              }
              try {
                $data->newSale($sale);
              }
              catch(Exception $e) {
                  sendResult(false, $e->getMessage(), NULL);
              }
              sendResult(true, "", NULL);
              break;
          case 'update':
              $sale = json_decode($req->getBody(), true);
              if (is_null($sale)) {
                  sendResult(false, "invalid sale");
              }
              try {
                $data->updateSale($sale);
              }
              catch(Exception $e) {
                  sendResult(false, $e->getMessage(), NULL);
              }
              sendResult(true, "", NULL);
              break;
          default:
              if(!isset($req->getPath()[3]) || preg_match("/[^0-9]+/", $req->getPath()[3]) === 1) {
                      sendResult(false, "invalid id", NULL);
              }
              try {
                  $sale = $data->getSale($req->getPath()[3]);
              }
              catch(Exception $e) {
                  sendResult(false, $e->getMessage(), NULL);
              }
              sendResult(true, "", $sale);
              break;
      }      
  }
  function stolen($req, $ses, $data){
      if(!isset($req->getPath()[3])) {
          invalidUri();
      }
      switch ($req->getPath()[3]) {
          case 'list':
              try {
                $stolens = $data->getStolens($req);
              }
              catch(Exception $e) {
                  sendResult(false, $e->getMessage(), NULL);
              }
              sendResult(true, "", $stolens);
              break;
          case 'new':
              $stolen = json_decode($req->getBody(), true);
              if (is_null($stolen)) {
                sendResult(false, "invalid stolen", NULL);
              }
              try {
                $data->newStolen($stolen);
              }
              catch(Exception $e) {
                  sendResult(false, $e->getMessage(), NULL);
              }
              sendResult(true, "", NULL);
              break;
          case 'update':
              $stolen = json_decode($req->getBody(), true);
              if (is_null($stolen)) {
                  sendResult(false, "invalid stolen");
              }
              try {
                $data->updateStolen($stolen);
              }
              catch(Exception $e) {
                  sendResult(false, $e->getMessage(), NULL);
              }
              sendResult(true, "", NULL);
              break;
          default:
              if(!isset($req->getPath()[3]) || preg_match("/[^0-9]+/", $req->getPath()[3]) === 1) {
                      sendResult(false, "invalid id", NULL);
              }
              try {
                  $stolen = $data->getStolen($req->getPath()[3]);
              }
              catch(Exception $e) {
                  sendResult(false, $e->getMessage(), NULL);
              }
              sendResult(true, "", $stolen);
              break;
      }      
      
  }
  function sendResult($success, $error, $data) {
    header('Content-type: application/json');
    $result = array();
    $result['success'] = $success;
    $result['error'] = $error;
    $result['data'] = $data;
    echo json_encode($result);
    exit();
  }
?>