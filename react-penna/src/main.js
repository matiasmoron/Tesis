console.log('Hello World1sdsdsd1!');
import React from 'react';
import ReactDOM from 'react-dom';
import Fetch from 'react-fetch';
import axios from 'axios';
import Counter from './Counter';

axios.get('http://localhost:8000/api/servicios').then(function(response){
    console.log(response.data);
});


// fetch('http://localhost:8000/api/servicios',{method: 'GET',
//   mode: 'cors',
//   headers: {
//     Accept: 'application/json',
//     //'content-type':'application/json',
//   }}).then(function(res) {
//         return res.json();
//     }).then(function(json) {
//         console.log(json);
//     });

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Counter),
    document.getElementById('mount')
  );
});
