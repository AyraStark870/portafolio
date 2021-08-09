
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
  listaCursos.addEventListener('click', agregarCursos);
  contenedorCarrito.addEventListener('click', eliminarCurso);
  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = [];
    limpiarHtml();
  })

}

function agregarCursos(e) {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {//DELEGATION
    const cursoSelec = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSelec);
  }
}

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('p span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }
  //revisa si el elemento existe
  const existe = articulosCarrito.some(x => x.id === infoCurso.id)
  if (existe) {
    articulosCarrito.map(x => {
      if (x.id === infoCurso.id) {
        x.cantidad++;
        return x
      } else {
        return x
      }
    })
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }


  carritoHTML();
}

function carritoHTML() {
  limpiarHtml()

  articulosCarrito.forEach(x => {
    const { cantidad, titulo, precio, imagen, id } = x;
    const row = document.createElement('tr');

    const img = document.createElement('img');
    img.src = imagen;
    img.setAttribute("width", "100")
    const celda1 = document.createElement('td');
    celda1.appendChild(img)
    row.appendChild(celda1)

    const celda2 = document.createElement('td');
    celda2.textContent = `${titulo} `
    row.appendChild(celda2)

    const celda3 = document.createElement('td');
    celda3.textContent = `${precio} `
    row.appendChild(celda3)

    const celda4 = document.createElement('td');
    celda4.textContent = `${cantidad} `
    celda4.classList.add('quantity');
    row.appendChild(celda4);

    const celda5 = document.createElement('td');
    const enlace = document.createElement('a')
    enlace.textContent = 'X'
    enlace.setAttribute("data-id", `${id}`)
    enlace.classList.add('borrar-curso')
    enlace.onclick = eliminarCurso;
    celda5.appendChild(enlace)
    row.appendChild(celda5);

    contenedorCarrito.appendChild(row)
  })
}
function limpiarHtml() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}



function eliminarCurso(e) {
  e.stopPropagation()

  const cursoId = e.target.getAttribute('data-id');
  let cantidad = e.target.parentElement.parentElement.querySelector('.quantity').textContent;

  if (cantidad > 1) {
    articulosCarrito = articulosCarrito.map(x => {
      if (x.id === cursoId) {
        x.cantidad--;
        console.log(x.cantidad);
        return x
      } else {
        return x
      }
    })
  } else {

    articulosCarrito = articulosCarrito.filter(x => x.id !== cursoId)
  }
  carritoHTML()
}
