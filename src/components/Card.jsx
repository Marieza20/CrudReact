import React, {useState,useEffect} from 'react'

import llamadosTareas from '../services/llamadosTareas'
import Swal from 'sweetalert2'
import 'boxicons'
import '../styles/Card.css'

function Card() {
  const [tareas, setTareas]=useState([])
  const [tareaCrear, setTareaCrear]=useState()

  useEffect(() => {
    async function fetchDataTareas(){
      const datos = await llamadosTareas.get()
      setTareas(datos)
    };
    fetchDataTareas();
  },[]);
  
  function tarea(evento){
    setTareaCrear(evento.target.value)
  }

  async function agregar(){
    llamadosTareas.post(tareaCrear,"Pendiente")
    const datos = await llamadosTareas.get()
    setTareas(datos)
  }

  async function completar(id){
    const encontrado = tareas.find(tarea => tarea.id===id)  
    let estado = "Completada"
    llamadosTareas.update(encontrado.nombre,estado,id);
    const datos = await llamadosTareas.get()
    setTareas(datos)
  }

  function editar(id){
    Swal.fire({
      title: "Editar Tarea",
      icon: "info",
      input: "text",
      inputValue: tareas.nombre,
      showCancelButton: true,
      confirmButtonText: "Guardar",
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevoNombre = result.value;
        Swal.fire("Guardado", "", "success");
        //const encontrado = tareas.map(tarea => tarea[estado].id)
        const encontrado2 = tareas.find(tarea => tarea.id===id)        
        llamadosTareas.update(nuevoNombre,encontrado2.estado,id);
        actualizar()
        async function actualizar(){
          const datos = await llamadosTareas.get()
          setTareas(datos)
        }
      }
    });
  }

  function eliminar(id) {
    Swal.fire({
      title: "¿Seguro que quieres eliminar esta tarea?",
      showDenyButton: true,
      confirmButtonText: "Cancelar",
      denyButtonText: `Eliminar`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("No se eliminó la tarea", "", "info");
      } else if (result.isDenied) {
        Swal.fire("Eliminado correctamente", "", "success");
        llamadosTareas.deleteT(id);
      }
    });
  }


  return (
    <div>
      <div id="container">
        <h1 id='titulo'>Tareas por hacer</h1>
        <div id='postTarea'>
          <input id='agregar' onChange={tarea} value={tareaCrear} type="text" placeholder='Ingresar Tarea' />
          <input id='agregarbtn' onClick={agregar} type="button" value="Agregar" />
        </div>

        <ul id='ul'>
          {tareas.map((tarea,index) => (
            <li id='list' key={index}>
              <input id='check' onClick={e=>completar(tarea.id)} type="checkbox" />
              <p>{tarea.nombre}</p>
              <box-icon id='icono' onClick={e=>editar(tarea.id)} type='solid' name='pencil'></box-icon>
              <box-icon id='icono' onClick={e=>eliminar(tarea.id)} type='solid' name='trash-alt'></box-icon>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Card