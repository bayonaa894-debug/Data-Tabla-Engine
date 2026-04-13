let datos = [];
let datosFiltrados = [];
let paginaActual = 1;
let filasPorPagina = 5;
let ascendente = true;


document.getElementById("fileInput").addEventListener("change", function(e) {
  const archivo = e.target.files[0];
  if (!archivo) return;

  const lector = new FileReader();
  lector.onload = function(event) {
    try {
      const nuevosDatos = JSON.parse(event.target.result);
      // Usamos push con spread (...) para AGREGAR a lo que ya existe
      datos.push(...nuevosDatos); 
      datosFiltrados = [...datos];
      paginaActual = 1;
      renderTabla();
    } catch (err) {
      alert("Error: El archivo no es un JSON válido");
    }
  };
  lector.readAsText(archivo);
});

function cargarEjemplo() {
  const ejemplo = [
    { nombre: "Juan", edad: 20, nota: 4.5 },
    { nombre: "Ana", edad: 22, nota: 3.8 },
    { nombre: "Luis", edad: 19, nota: 4.2 },
    { nombre: "Sofia", edad: 21, nota: 4.9 },
    { nombre: "Carlos", edad: 23, nota: 3.5 },
    { nombre: "Maria", edad: 20, nota: 4.7 },
    { nombre: "Pedro", edad: 24, nota: 2.9 },
    { nombre: "Laura", edad: 22, nota: 4.1 }
  ];


  datos.push(...ejemplo);
  datosFiltrados = [...datos];
  renderTabla();
}

function renderTabla() {
  const tabla = document.getElementById("tabla");
  tabla.innerHTML = "";

  let inicio = (paginaActual - 1) * filasPorPagina;
  let fin = inicio + filasPorPagina;
  let datosPagina = datosFiltrados.slice(inicio, fin);

  if (datosPagina.length === 0) {
    tabla.innerHTML = "<tr><td colspan='3' style='text-align:center'>No hay datos disponibles</td></tr>";
  }

  datosPagina.forEach((item, index) => {
    const indiceReal = inicio + index;
    tabla.innerHTML += `
      <tr>
        <td contenteditable onblur="editar(${indiceReal}, 'nombre', this.innerText)">${item.nombre}</td>
        <td contenteditable onblur="editar(${indiceReal}, 'edad', this.innerText)">${item.edad}</td>
        <td contenteditable onblur="editar(${indiceReal}, 'nota', this.innerText)">${item.nota}</td>
      </tr>
    `;
  });

  calcularPromedio(datosFiltrados);
  renderPaginacion();
}


function editar(index, campo, valor) {
  if (campo === "nombre") {
    datosFiltrados[index][campo] = valor;
  } else {
    // Convertimos a número para que el promedio no falle
    datosFiltrados[index][campo] = parseFloat(valor) || 0;
  }
  // Recalculamos promedio al editar
  calcularPromedio(datosFiltrados);
}

function calcularPromedio(data) {
  const spanPromedio = document.getElementById("promedio");
  if (data.length === 0) {
    spanPromedio.innerText = "0.00";
    return;
  }
  const suma = data.reduce((acc, item) => acc + (parseFloat(item.nota) || 0), 0);
  const promedio = suma / data.length;
  spanPromedio.innerText = promedio.toFixed(2);
}


document.getElementById("search").addEventListener("input", function(e) {
  const texto = e.target.value.toLowerCase();
  datosFiltrados = datos.filter(item =>
    item.nombre.toLowerCase().includes(texto)
  );
  paginaActual = 1;
  renderTabla();
});


function ordenar(campo) {
  datosFiltrados.sort((a, b) => {
    let valA = a[campo];
    let valB = b[campo];
    
   
    if (typeof valA === 'string') {
        return ascendente ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
 
    return ascendente ? valA - valB : valB - valA;
  });
  
  ascendente = !ascendente;
  renderTabla();
}


function renderPaginacion() {
  const container = document.getElementById("paginacion");
  container.innerHTML = "";
  let totalPaginas = Math.ceil(datosFiltrados.length / filasPorPagina);

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = (i === paginaActual) ? "active" : "";
    btn.onclick = () => {
      paginaActual = i;
      renderTabla();
    };
    container.appendChild(btn);
  }
}