// Tun on full stack traces in errors to help debugging
Error.stackTraceLimit=Infinity;


jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// // Cancel Karma's synchronous start,
// // we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};

function isJsFile(path) {
  return path.slice(-3) == '.js';
}

function isSpecFile(path) {
  return path.slice(-8) == '_test.js';
}

function isBuiltFile(path) {
  var builtPath = '/base/public/dist/';
  return isJsFile(path) && (path.substr(0, builtPath.length) == builtPath);
}

System.config(
{
  baseURL: "/base/",
  map: {
    'rxjs': 'node_modules/rxjs',
    '@angular': 'public/lib/@angular',
    'src': 'dist'
  },
  packages: {
    'app': {
      main: 'main.js',
      defaultExtension: 'js'
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
    'rxjs': {
      defaultExtension: 'js'
    }
  }
});
//System.config({
//  packages: {
//    'base/public/dist/app': {
//      defaultExtension: false,
//      format: 'register',
//      map: Object.keys(window.__karma__.files).
//            filter(onlyAppFiles).
//           reduce(function createPathRecords(pathsMapping, appPath) {
              // creates local module name mapping to global path with karma's fingerprint in path, e.g.:
              // './hero.service': '/base/src/app/hero.service.js?f4523daf879cfb7310ef6242682ccf10b2041b3e'
//              var moduleName = appPath.replace(/^\/public\/dist\/app\//, './').replace(/\.js$/, '');
//              pathsMapping[moduleName] = appPath + '?' + window.__karma__.files[appPath]
//              return pathsMapping;
//            }, {})

//      }
//    }
//});
/*
System.import('angular2/src/platform/browser/browser_adapter').then(function(browser_adapter) {
  browser_adapter.BrowserDomAdapter.makeCurrent();
})
.then(function() {
  return Promise.all(
    Object.keys(window.__karma__.files) // All files served by Karma.
    .filter(onlySpecFiles)
    // .map(filePath2moduleName)        // Normalize paths to module names.
    .map(function(moduleName) {
      // loads all spec files via their global module names (e.g. 'base/src/app/hero.service.spec')
      return System.import(moduleName);
    }));
})
.then(function() {
  __karma__.start();
}, function(error) {
  __karma__.error(error.stack || error);
});


function filePath2moduleName(filePath) {
  return filePath.
           replace(/^\//, '').              // remove / prefix
           replace(/\.\w+$/, '');           // remove suffix
}


function onlyAppFiles(filePath) {
//  return /^\/base\/src\/app\/.*\.js$/.test(filePath);
  return /^\/base\/public\/dist\/app\/.*\.js$/.test(filePath);
}


function onlySpecFiles(path) {
  return /\.spec\.js$/.test(path);
}
*/
Promise.all([
  System.import('@angular/core/testing'),
  System.import('@angular/platform-browser-dynamic/testing')
]).then(function (providers) {
  var testing = providers[0];
  var testingBrowser = providers[1];

  testing.setBaseTestProviders(testingBrowser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
    testingBrowser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

}).then(function() {
  // Finally, load all spec files.
  // This will run the tests directly.
  return Promise.all(
    allSpecFiles.map(function (moduleName) {
      return System.import(moduleName);
    }));
}).then(__karma__.start, __karma__.error);