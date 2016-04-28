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
?>

<html>
  <head>
    <base href="/">
    <title>Item Tracker</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script   src="https://code.jquery.com/jquery-1.12.3.min.js"   integrity="sha256-aaODHAgvwQW1bFOGXMeX+pC4PZIPsvn2h1sArYOhgXQ="   crossorigin="anonymous"></script>    
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

<!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/forms.css">
    <!-- 1. Load libraries -->
    <!-- IE required polyfills, in this exact order -->
<!--    <script src="node_modules/es6-shim/es6-shim.min.js"></script>
    <script src="node_modules/systemjs/dist/system-polyfills.js"></script>
    <script src="node_modules/angular2/es6/dev/src/testing/shims_for_IE.js"></script>   

    <script src="node_modules/angular2/bundles/angular2-polyfills.js"></script>
    <script src="node_modules/systemjs/dist/system.src.js"></script>
    <script src="node_modules/rxjs/bundles/Rx.js"></script>
    <script src="node_modules/angular2/bundles/angular2.dev.js"></script>
    <script src="node_modules/angular2/bundles/router.dev.js"></script>
    <script src="node_modules/angular2/bundles/http.dev.js"></script>
-->
    <script src="lib/es6-shim.min.js"></script>
    <script src="lib/system-polyfills.js"></script>
    <script src="lib/shims_for_IE.js"></script>   

    <script src="lib/angular2-polyfills.js"></script>
    <script src="lib/system.src.js"></script>
    <script src="lib/Rx.js"></script>
    <script src="lib/angular2.dev.js"></script>
    <script src="lib/router.dev.js"></script>
    <script src="lib/http.dev.js"></script>
    <!-- 2. Configure SystemJS -->
    <script>
      System.config({
        packages: {
          src: {        
              app: {
                format: 'register',
                defaultExtension: 'js'
              }
          }
        }
      });
      System.import('src/app/main')
            .then(null, console.error.bind(console));
    </script>
  </head>

  <!-- 3. Display the application -->
  <body>
    <my-app>Loading...</my-app>
  </body>
</html>