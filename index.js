var arreglo = []; //Inicializa arreglo de datos
var consecutivo = 0; // Inicializa consecutivo de los registros de datos
var banderaUpdate = false;

/* Genera constructor de objetos */
function Clientes(folio, nombre, telefono, fecha) {
  this.folio = folio;
  this.nombre = nombre;
  this.telefono = telefono;
  this.fecha = fecha;
}
/* Lee valores de los campos de entrada de datos */
var nameValor = document.getElementById("nombre");
var telValor = document.getElementById("telefono");
var dateValor = document.getElementById("fecha");

function guardarEditar() {
  if (banderaUpdate) {
    guardarEdicion();
  } else {
    guardar();
  }
}

/* Crea un objeto y Guarda los datos él y Guarda el Objeto en un Arreglo de datos */
function guardar() {
  if (nameValor.value && telValor.value && dateValor.value !== "") {
    /*Crea un objeto nuevo y guarda los datos en él */
    var Clientes1 = new Clientes(
      consecutivo,
      nameValor.value,
      telValor.value,
      dateValor.value
    );

    /* Guarda el objeto en un arreglo */
    arreglo.push(Clientes1);

    /* Imprime en Pantalla los registros contenidos en una tabla */
    let indice = arreglo.length - 1;

    let tabla = document.getElementById("tabla");

    let cuerpoTabla = document.getElementById("cuerpoTable");

    let fila = document.createElement("tr");

    let celda1 = document.createElement("td");
    celda1.innerText = Clientes1.folio;
    fila.appendChild(celda1);

    let celda2 = document.createElement("td");
    celda2.innerText = Clientes1.nombre;
    fila.appendChild(celda2);

    let celda3 = document.createElement("td");
    celda3.innerText = Clientes1.telefono;
    fila.appendChild(celda3);

    let celda4 = document.createElement("td");
    celda4.innerText = Clientes1.fecha;
    fila.appendChild(celda4);

    /* Imprime en Pantalla los botones y llama la funcion correspondiente cuando es oprimido, pasando el numero de consecutivo del registro */
    let celda5 = document.createElement("td");
    celda5.innerHTML =
      '<button class="boton" onclick="editar(' +
      consecutivo +
      ')">Editar</button>';
    fila.appendChild(celda5);

    let celda6 = document.createElement("td");
    celda6.innerHTML =
      '<button class="boton" onclick="borrar(' +
      consecutivo +
      ')">Borrar</button>';
    fila.appendChild(celda6);

    cuerpoTabla.appendChild(fila);

    /* Limpia el Formulario */
    nameValor.value = "";
    telValor.value = "";
    dateValor.value = "";
    /* Incrementa el consecutivo */
    consecutivo = consecutivo + 1;
  }
}
/* Inicia Proceso de Edicion, leyendo el objeto a Modificar del arreglo y colocandolos en los campos de edicion */
function editar(parametro) {
  banderaUpdate = true;
  consecutivo = parametro;
  var objetoUpdate = arreglo[parametro];
  document.getElementById("nombre").value = objetoUpdate.nombre;
  document.getElementById("telefono").value = objetoUpdate.telefono;
  document.getElementById("fecha").value = objetoUpdate.fecha;
  uno = document.getElementById("botonP");
  uno.innerText = "Actualizar";
  return objetoUpdate;
}
/* Una vez modificados los campos a cambiar, se leen y guardan el objeto y este objeto en la misma posicion dentro del arreglo*/
function guardarEdicion() {
  var nameValor = document.getElementById("nombre");
  var telValor = document.getElementById("telefono");
  var dateValor = document.getElementById("fecha");
  if (nameValor.value && telValor.value && dateValor.value !== "") {
    objetoUpdate = arreglo[consecutivo];
    objetoUpdate.folio = consecutivo;
    objetoUpdate.nombre = nameValor.value;
    objetoUpdate.telefono = telValor.value;
    objetoUpdate.fecha = dateValor.value;
    arreglo[consecutivo] = objetoUpdate;
    nameValor.value = "";
    telValor.value = "";
    dateValor.value = "";
    banderaUpdate = false;
    uno = document.getElementById("botonP");
    uno.innerText = "Guardar";

    borrarTabla(); //Borra Tabla Existente antes de los cambios de edificion.
    console.log(arreglo);

    imprimirTabla(); // Imprime en pantalla la tabla con los datos modificados
  }
}

/* Funcion que borra el registro seleccionado */

function borrar(item) {
  arreglo.splice(item, 1); //Borra registro del arreglo de objetos

  borrarTabla(); // Llama funcion que borra la tabla de la pantalla

  imprimirTabla(); // Llama  a la funcion que imprime en pantalla la tabla con los datos que quedan despues del borrado
}

/* Funcion que Borra la tabla de datos de la pantalla  */
function borrarTabla() {
  var node = document.getElementById("cuerpoTable");
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

/* Funcion que imprime en Pantalla en una Tabla los datos del arreglo de objetos */
function imprimirTabla() {
  consecutivo = 0;
  arreglo.forEach((objeto) => {
    objeto.folio = consecutivo;
    let tabla = document.getElementById("tabla");

    let cuerpoTabla = document.getElementById("cuerpoTable");

    let fila = document.createElement("tr");

    let celda1 = document.createElement("td");
    celda1.innerText = objeto.folio;
    fila.appendChild(celda1);

    let celda2 = document.createElement("td");
    celda2.innerText = objeto.nombre;
    fila.appendChild(celda2);

    let celda3 = document.createElement("td");
    celda3.innerText = objeto.telefono;
    fila.appendChild(celda3);

    let celda4 = document.createElement("td");
    celda4.innerText = objeto.fecha;
    fila.appendChild(celda4);

    let celda5 = document.createElement("td");
    celda5.innerHTML =
      '<button class="boton" onclick="editar(' +
      consecutivo +
      ')">Editar</button>';
    fila.appendChild(celda5);

    let celda6 = document.createElement("td");
    celda6.innerHTML =
      '<button class="boton" onclick="borrar(' +
      consecutivo +
      ')">Borrar</button>';
    fila.appendChild(celda6);

    cuerpoTabla.appendChild(fila);
    consecutivo = consecutivo + 1;
  });
}
