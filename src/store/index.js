import { parseQuery } from 'vue-router'
import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categoria: [],
      estado: '',
      numero: 0
    }
  },
  getters: {
  },
  mutations: {
    cargar(state, payload){
      state.tareas = payload
    },
    set(state, payload){
      state.tareas.push(payload)     
    },
    eliminar(state, payload){
      state.tareas = state.tareas.filter(item => item.id !== payload)       
    },
    tarea(state, payload){
      if (!state.tareas.find(item => item.id === payload)) {
        router.push('/')
        return
      }
      state.tarea = state.tareas.find(item => item.id === payload)
    },
    update(state, payload){
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
      router.push('/')
    }
  },
  actions: {
    // LEER DATOS DE LA BASE DE DATOS
    async cargarLocalStorage({commit}){
      try {
        // necesitamos todas las actividades, por lo tanto leemos todas
        const res = await fetch(`https://api-vue-crud-default-rtdb.firebaseio.com/tareas.json`)
        const dataDB = await res.json()
        // declaro un array donde se van a guardar cada una de las tareas que lleguen desde la bd
        const arrayTareas = []

        // recorro el arreglo que llega ingresando a cada elemento por su id
        for(let id in dataDB){
          // empujo a cada una de las tareas por separada al array de tareas creadas anteriormente
          arrayTareas.push(dataDB[id])
        }

        console.log(arrayTareas)

        // cargo el arrayTareas para mostrarlos en la tabla
        commit('cargar', arrayTareas)

      } catch (error) {
        console.log(error)
      }
    },
    // ENVIAR DATOS A LA BASE DE DATOS
    async setTareas({ commit }, tarea) {
      try {
          // guardamos una por una las actividades
          const res = await fetch(`https://api-vue-crud-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(tarea)
          })
          const db = await res.json()
          console.log(db)
          commit('set', tarea)
      } catch (error) {
          console.log(error)
      }
    },
    // ELIMINAR ACTIVIDAD DE LA BASE DE DATOS
    async deleteTareas({commit}, id){
      try {
        const res = await fetch(`https://api-vue-crud-default-rtdb.firebaseio.com/tareas/${id}.json`, {
          method: 'DELETE', 
        })
        commit('eliminar', id)
      } catch (error) {
        console.log(error)
      }
      
    },
    setTarea({commit}, id){
      commit('tarea', id)
    },
    // MODIFICAR DATOS DE LA BASE DE DATOS
    async updateTarea({commit}, tarea){
      try {
        const res = await fetch(`https://api-vue-crud-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`,{
          method: 'PATCH',
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json()        
      } catch (error) {
        console.log(error)
      }

      // actualizo la informacion de la actividad
      commit('update', tarea)
    }
  },
  modules: {
  }
})
