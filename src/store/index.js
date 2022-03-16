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
    },
    user: null
  },
  getters: {
  },
  mutations: {
    setUser(state, payload){
      state.user = payload
    },
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
    // LOGGIN DE USUARIO
    async ingresarUsuario({commit}, usuario){
      try {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1fSAaiip0smSIC1uo7NwQl_VoxNxjvsM`, {
            method: 'POST',
            body: JSON.stringify({
                email: usuario.email, 
                password: usuario.password,
                returnSecureToken: true
            })
        })
        const dataDB = await res.json()
        console.log(dataDB)
        if (dataDB.error) {
          return console.log(dataDB.error)
        }
        commit('setUser', dataDB)
        router.push('/')
      } catch (error) {
          console.log(error)
      }
    },
    //REGISTRAR USUARIO EN LA BASE DE DATOS
    async registrarUsuario({commit}, usuario){
      try {
        const res = fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1fSAaiip0smSIC1uo7NwQl_VoxNxjvsM`,{
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true //envia un token de seguridad para poder validar cada una de las acciones que se realicen
          })
        })

        const userDB = await res.json()
        console.log(userDB)
        
        if(userDB.error){
          console.log(userDB.error)
          return
        }

        commit('setUser', userDB)
        router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    // LEER DATOS DE LA BASE DE DATOS
    async cargarLocalStorage({commit, state}){
      try {
        // necesitamos todas las actividades, por lo tanto leemos todas
        const res = await fetch(`https://api-vue-crud-default-rtdb.firebaseio.com/tareas/${state.user.idToken}.json?auth=${state.user.idToken}`)
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
    async setTareas({ commit, state }, tarea) {
      try {
          // guardamos una por una las actividades
          const res = await fetch(`https://api-vue-crud-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
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
    async deleteTareas({commit, state}, id){
      try {
        const res = await fetch(`https://api-vue-crud-default-rtdb.firebaseio.com/tareas/${state.user.idToken}/${id}.json?auth=${state.user.idToken}`, {
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
    async updateTarea({commit, state}, tarea){
      try {
        const res = await fetch(`https://api-vue-crud-default-rtdb.firebaseio.com/tareas/${state.user.idToken}/${tarea.id}.json?auth=${state.user.idToken}`,{
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
