 <?php
  require_once("../conf.php");
  require_once(OTHER_PATH . "sessions.php");
  require_once(OTHER_PATH . "pgdata.php");
  $data = new DataStore();
  $ses = new MySession($data);
  $ses->startSession();
  if(!$ses->loggedIn()) {
    header('Location: index.php');
    exit;
  }
  $ses->logout();
?>
