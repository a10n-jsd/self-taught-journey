/*
  see full url path list: https://supersimplebackend.dev/documentation
  backend API = Application Programming Interface
    interface means: how we interact with something
*/

const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(JSON.parse(xhr.response));
})

xhr.open('GET', 'https://supersimplebackend.dev/products/first');

xhr.send(); // async code

// xhr.response // undefined
// it takes time for the request to travel across the internet
// so we put it at top in .addEventListener()  

