System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "@angular/common": "npm:@angular/common@2.0.0-rc.0",
    "@angular/compiler": "npm:@angular/compiler@2.0.0-rc.0",
    "@angular/core": "npm:@angular/core@2.0.0-rc.0",
    "@angular/http": "npm:@angular/http@2.0.0-rc.0",
    "@angular/platform-browser": "npm:@angular/platform-browser@2.0.0-rc.0",
    "@angular/platform-browser-dynamic": "npm:@angular/platform-browser-dynamic@2.0.0-rc.0",
    "@angular/router-deprecated": "npm:@angular/router-deprecated@2.0.0-rc.0",
    "bootstrap": "npm:bootstrap@3.3.6",
    "es6-promise": "npm:es6-promise@3.1.2",
    "es6-shim": "npm:es6-shim@0.35.0",
    "reflect-metadata": "npm:reflect-metadata@0.1.2",
    "rxjs": "npm:rxjs@5.0.0-beta.6",
    "systemjs": "npm:systemjs@0.19.26",
    "typescript": "npm:typescript@1.8.10",
    "zone.js": "npm:zone.js@0.6.12",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:@angular/common@2.0.0-rc.0": {
      "@angular/core": "npm:@angular/core@2.0.0-rc.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:@angular/compiler@2.0.0-rc.0": {
      "@angular/core": "npm:@angular/core@2.0.0-rc.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:@angular/core@2.0.0-rc.0": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "rxjs": "npm:rxjs@5.0.0-beta.6",
      "zone.js": "npm:zone.js@0.6.12"
    },
    "npm:@angular/http@2.0.0-rc.0": {
      "@angular/core": "npm:@angular/core@2.0.0-rc.0",
      "rxjs": "npm:rxjs@5.0.0-beta.6"
    },
    "npm:@angular/platform-browser-dynamic@2.0.0-rc.0": {
      "@angular/common": "npm:@angular/common@2.0.0-rc.0",
      "@angular/compiler": "npm:@angular/compiler@2.0.0-rc.0",
      "@angular/core": "npm:@angular/core@2.0.0-rc.0",
      "@angular/platform-browser": "npm:@angular/platform-browser@2.0.0-rc.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:@angular/platform-browser@2.0.0-rc.0": {
      "@angular/common": "npm:@angular/common@2.0.0-rc.0",
      "@angular/compiler": "npm:@angular/compiler@2.0.0-rc.0",
      "@angular/core": "npm:@angular/core@2.0.0-rc.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:@angular/router-deprecated@2.0.0-rc.0": {
      "@angular/common": "npm:@angular/common@2.0.0-rc.0",
      "@angular/core": "npm:@angular/core@2.0.0-rc.0",
      "@angular/platform-browser": "npm:@angular/platform-browser@2.0.0-rc.0"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:bootstrap@3.3.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:es6-promise@3.1.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:es6-shim@0.35.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:reflect-metadata@0.1.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:rxjs@5.0.0-beta.6": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:systemjs@0.19.26": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "when": "npm:when@3.7.7"
    },
    "npm:typescript@1.8.10": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:when@3.7.7": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:zone.js@0.6.12": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
