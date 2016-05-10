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
    <script src="lib/jquery-1.12.3.min.js"></script>    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cerulean/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/forms.css">
    <script src="lib/es6-shim.min.js"></script>
    <script src="lib/system-polyfills.js"></script>
    <script src="lib/shims_for_IE.js"></script>   

    <script src="lib/angular2-polyfills.js"></script>
    <script src="lib/system.src.js"></script>
    <script src="lib/Rx.js"></script>
<!--    <script src="lib/angular2.dev.js"></script> -->
<!--    <script src="lib/router.dev.js"></script>
    <script src="lib/http.dev.js"></script> -->
    <!-- 2. Configure SystemJS -->
<!--    <script>
      System.config({
        map: {
          '@angular': '/lib/@angular',
        },
        packages: { 
              dist: {
                app: {
                    format: 'register',
                    defaultExtension: 'js'
                }
              },
              '@angular/core': {
                 main: 'index.js',
                defaultExtension: 'js'
              },
    '@angular/compiler': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/common': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser-dynamic': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/router-deprecated': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/http': {
      main: 'index.js',
      defaultExtension: 'js'
    }
        }
      });
    </script>
    -->
<script src="jspm_packages/system.js"></script>
<script src="config.js"></script>
<script>
      System.import('dist/app/main')
            .then(null, console.error.bind(console));
</script>
  </head>

  <!-- 3. Display the application -->
  <body>
    <my-app>Loading...</my-app>
  </body>
</html>