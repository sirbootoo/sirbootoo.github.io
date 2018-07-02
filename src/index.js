import '../assets/css/styles.css';
import '../assets/assets/css/cover.css';
import '../assets/assets/css/bootstrap.min.css';

import '../assets/assets/js/popper.js';
import '../assets/assets/js/script.js';
import '../assets/assets/js/indexdb.js';
import '../assets/assets/js/bootstrap.min.js';

import swURL from "file-loader?name=sw.js!babel-loader!./sw";

if ("serviceWorker" in navigator) {
  // Service worker registered
  navigator.serviceWorker.register(swURL).catch(err => {
    // Service worker registration failed
    console.log('it failed');
  })
  .then(registration => {
      console.log('it registered');
  }); 
} else {
  // Service worker is not supported
}

