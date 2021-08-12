const boton = document.querySelector('.boton');
const miDiv = document.querySelector('.js');

boton.addEventListener('click', submitForm)

function submitForm(e){
  e.preventDefault()

  const parrafo = document.createElement('p');
  parrafo.textContent = 'Felicidades'
  miDiv.classList.add('msj')
  miDiv.appendChild(parrafo)

}