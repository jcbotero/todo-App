'use client' // next por default trabaja desde el lado del servidor y asi no me deja usar usestate... por eso con esta linea trabajo desde el lado del client

import styles from './page.module.css'
import React from 'react'
import { useState, useRef, useEffect } from 'react'




export default function Home() {

 

const toDo = [ "Complete online JavaScritp course " , " Jog around the park 3x ", " 10 minutes meditation ", "Read for 1 hour", "Pick up groceries ", "Complete Todo App on Frontend Mentor"]

 

  const [ tareas , setTareas ] = useState(toDo)  
  const [ newTask , setNewtask ] = useState()  

  const [ completada, setCompletada ] = useState({}) // usestate para cambiar una classname denrto de una array mapeada
                                                     // debo poner el {} porque es un objecto con dos classname
  

  const [ cantidadPendientes , setCantidadP ] = useState([]) // usestate para ingresar en esta array la cantidad de tareas completadas  


  const [ darkMode , setDarkMode ] = useState(true)
   
  
useEffect(() => {
  let cantidades = Array.from(document.getElementsByClassName(styles.tareaHecha))// hago una array de todas las classnames de tareashecas
 
  setCantidadP( cantidades.length )// le doy a este hook la cantidad de estas classnames para restarlas abajo en items left
  


  }) // el useeffect me actualiza constantemente las cosas que ponga dentro, como por ejemplo aqui una SUMA ... de la classnames de tareas hechas

  
  const NuevaTask = useRef()

  
let nuevaTarea = (event) => { 
  setNewtask(event.target.value) // asi doy mediante un onchange el valor de un input/div a un hook
  
}

let add = () => { 
  let NuevoTodo = [... tareas] // primero debo copear la array/hook asi
  NuevoTodo.push(newTask)// luego le hago el push con el valor del input
  setTareas(NuevoTodo);// luego cambio el setTareas() para que tome es la array copeada NuevoTodo
  
} // esta function onclick hace que se me actualice la array mapeada tareas en tiempo real



let complete = (id) => {
   setCompletada((prevState) => ({
    ...completada,
    [id]: !prevState[id] // aqui lo que hace es negarme el estaodo actual/previo del hook completada para la key={i} para que pase a la siguiente className
  })); 

};   {/* codigo para cambiar de un classname a otro de un elemento mapeado*/}
     // a partir de la id del objecto mapeado, que se obtiene en el onclick, actualizo la hook completada para que tome la otra condicion, del conditional ternario de la classname


let active = () => {

      let activas = Array.from(document.getElementsByClassName(styles.tareaHecha));// hago una array de todas las classnames de tareashecas
      let hechas =  Array.from(document.getElementsByClassName(styles.tareaNoHecha));// hago una array de todas las classnames de tareashecas

      for(var i=0; i< activas.length; i++){
        activas[i].hidden = true;
      }; // con este loop hago que todos los elmentos con la misma classname se borren/escondan
  
      for(var i=0; i< hechas.length; i++){
        hechas[i].hidden = false;
      }; // con este loop hago que todos los elmentos con la misma classname se muestren
  
   };  // codigo para ocultar las tareas hechas




   let all = () => {
    let activas = Array.from(document.getElementsByClassName(styles.tareaHecha));// hago una array de todas las classnames de tareashecas
    let hechas =  Array.from(document.getElementsByClassName(styles.tareaNoHecha));// hago una array de todas las classnames de tareashecas

    for(var i=0; i< activas.length; i++){
      activas[i].hidden = false;
    }; 

    for(var i=0; i< hechas.length; i++){
      hechas[i].hidden = false;
    }; 


 };  // codigo para mostrar todas las tareas... en este caso con los loops niego que se escondan/oculten todas las tareas independiente de su className





 let hechas = () => {
  let activas = Array.from(document.getElementsByClassName(styles.tareaHecha));// hago una array de todas las classnames de tareashecas
  let hechas =  Array.from(document.getElementsByClassName(styles.tareaNoHecha));// hago una array de todas las classnames de tareashecas

  
  for(var i=0; i< hechas.length; i++){
    hechas[i].hidden = true;
  };

  for(var i=0; i< activas.length; i++){
    activas[i].hidden = false;
  }; 


};  // codigo para ocultar las tareas No hechas y mostrar solo las hechas




let clear = () => {

  let activas = Array.from(document.getElementsByClassName(styles.tareaHecha));// hago una array de todas las classnames de tareashecas

  for (let i = 0; i < activas.length; i++) {
    if (document.contains(activas[i])) {
      activas[i].style.display = 'none';
    }
  }

};  // este code es para eliminar elementos de una array por classname... simplemente les pongo display : none


let themeToggler = () => {

  document.getElementById("moon").style.display = "none "
  document.getElementById("sun").style.display = "flex "

  const currentState = darkMode;
      setDarkMode( !currentState );
} /* esta fucntion se me dispara al darle click al boton , me hace cambiar el state theme, y por tanto la classname de ese div*/


let themeToggler2 = () => {
  document.getElementById("moon").style.display = "flex "
  document.getElementById("sun").style.display = "none"

  const currentState = darkMode;
      setDarkMode( !currentState );
} /* esta fucntion se me dispara al darle click al boton , me hace cambiar el state theme, y por tanto la classname de ese div*/


let sun = { display : "none" }

// falta el dark mode .. mirar pagina del lado .... y el css

return (
    <div  className={ darkMode ? styles.light : styles.dark}>
     <main className={styles.main}>
            <article className={styles.header}>
                    <div className={styles.header1}>
                      <h1>TODO</h1>
                      <img id="moon" onClick={themeToggler} src={"./icon-moon.svg"} />
                      <img style={sun} id="sun" onClick={themeToggler2} src={"./icon-sun.svg"} />
                    </div>
                    <div  className={styles.header2}>
                      <button onClick={add}></button>
                      <input type='text'   onChange={nuevaTarea} placeholder='Create a new todo...' ref={NuevaTask} />
                    </div>
             </article>
             <section className={styles.listado}>
                  {tareas?.map( (tarea, i) =>
                 <div key={i} className={ completada[i] ? styles.tareaHecha : styles.tareaNoHecha}> {/* este condicional ternario... me escoger entre las dos classname,  pongo el [i] para que me aggara la id del objecto mapeado */}
                     <div className={styles.tareas}>
                        <button  onClick={() => complete(i)}></button>
                          <p>
                          {tarea}
                        </p>
                    </div>
                  </div>               
                      )}
                  <article id={styles.one} className={styles.botones}>
                        <div id={styles.first}>
                            <p>{ tareas.length - cantidadPendientes  + "  items left"}</p>
                        </div>
                        <div  className={styles.opciones}>
                              <button  onClick={all}>All</button>
                              <button  onClick={active}>Active</button>
                              <button  onClick={hechas}>Complete</button>
                        </div>
                        <div id={styles.last}>
                              <button onClick={clear}>Clear Complete</button>
                        </div>
                  </article>
            </section>
      </main>
    </div>
  )
}
