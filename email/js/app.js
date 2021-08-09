//VARIABLES
const btnEnviar = document.querySelector('#enviar')
const btnReset = document.querySelector('#resetBtn')
const email = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')
const formulario = document.querySelector('#enviar-mail')
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//listener
eventListeners();
function eventListeners(){
  document.addEventListener('DOMContentLoaded',iniciarApp)
  //campos formulario
  email.addEventListener('blur', validarFormCorreo)
  asunto.addEventListener('blur', validarForm)
  mensaje.addEventListener('blur', validarForm)

  btnReset.addEventListener('click', resetearForm)

  formulario.addEventListener('submit',enviarEmail)
}

//FUNCIONES
function iniciarApp(){
 btnEnviar.disabled =true;
 btnEnviar.classList.add('cursor-not-allowed','opacity-50')
}
function validarForm(e){

  const error = document.querySelector('p.error');
  if(error){
    error.remove()
  }

  if (e.target.value.length>0){
    e.target.classList.remove('border', 'border-red-500')
    e.target.classList.add('border', 'border-green-500')
  } else {
   // e.target.style.borderBottomColor = 'red';
    e.target.classList.remove('border','border-green-500')
    e.target.classList.add('border','border-red-500')
    mostrarMsj('todos los campos son obligatorios')
  }

  if (er.test(email.value) !=='' & asunto.value !=='' & mensaje.value !==''){
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
  }
}
function validarFormCorreo(e){
  const error = document.querySelector('p.error');
  if (error) {
    error.remove()
  }

  if(e.target.type === 'email'){

    if(er.test(e.target.value)){
      e.target.classList.remove('border', 'border-red-500')
      e.target.classList.add('border', 'border-green-500')
    } else {
      e.target.classList.remove('border', 'border-green-500')
      e.target.classList.add('border', 'border-red-500')
      mostrarMsj('direccion no valida')
    }
  }
}


function mostrarMsj(mensaje){//tailwind
  const pError = document.createElement('p');
  pError.textContent = mensaje;
  pError.classList.add('error','border','border-red-500','background-red-100','text-red-500','p-3','mt-5','text-center')

  const errores = document.querySelectorAll('.error');//regresa una coleccion por tanto tienes acceso a la propiedad length
  if(errores.length===0){
    formulario.appendChild(pError)
  }
}
function enviarEmail(e){
   e.preventDefault();
   const spinner = document.querySelector('#spinner');
   spinner.style.display = 'flex';

   setTimeout(() => {
     spinner.style.display = 'none';
     const parrafo = document.createElement('p');
     parrafo.textContent = 'el mensaje se envio correctamente';
     parrafo.classList.add('text-center','bg-green-500','my-10','p-2','text-white','font-bold','uppercase')
     formulario.insertBefore(parrafo, spinner);

     setTimeout(() => {
       parrafo.remove();
       formulario.reset();
       quitarVerde();
       iniciarApp();
      }, 2000);
    }, 3000);

  }
  function resetearForm (e) {
  e.preventDefault()
    if (e.target.classList.contains('resetBtn')){
      formulario.reset();
      quitarVerde();
      iniciarApp();
    }

  }
function quitarVerde(){
  mensaje.classList.remove('border', 'border-green-500')
  email.classList.remove('border', 'border-green-500')
  asunto.classList.remove('border', 'border-green-500')

}