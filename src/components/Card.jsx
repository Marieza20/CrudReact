import React, {useState,useEffect} from 'react'

import llamadosTareas from '../services/llamadosTareas'
import Swal from 'sweetalert2'
import 'boxicons'

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

  function completar(id){
    const encontrado = tareas.map(tarea => tarea[nombre].id)
    let estado = "Completada"
    llamadosTareas.update(encontrado,estado,id);
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
      <h1>Tareas por hacer</h1>
      <div>
        <input onChange={tarea} value={tareaCrear} type="text" placeholder='Ingresar Tarea' />
        <input onClick={agregar} type="button" value="Agregar" />
      </div>
      <div>
        
        <ul className='List'>
          {tareas.map((tarea,index) => (
            <li key={index}>
              <input onClick={e=>completar(tarea.id)} type="checkbox" />
              <p>{tarea.nombre}</p>
              <box-icon onClick={e=>editar(tarea.id)} type='solid' name='pencil'></box-icon>
              <box-icon onClick={e=>eliminar(tarea.id)} type='solid' name='trash-alt'></box-icon>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Card