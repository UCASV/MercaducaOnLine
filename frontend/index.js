// index.js (frontend)
import axios from 'axios';

axios.get('http://localhost:5173/usuarios')
  .then(response => {
    console.log('Datos obtenidos:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
});

async function getProductos() {
  
}