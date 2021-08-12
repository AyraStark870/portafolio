const boton = document.querySelector('.boton');
const formulario = document.querySelector('.form');

boton.addEventListener('click', submitForm)

function submitForm(e){
  e.preventDefault()
  const spinner = document.querySelector('.spinner');
  spinner.style.display = 'flex';
  formulario.reset()


  setTimeout(() => {
    spinner.style.display = 'none';
  }, 3000);



}