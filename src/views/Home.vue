<template>
  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea" />
  </form>
  <ListaTareas />
</template>

<script>
  import Input from '../components/Input'
  import ListaTareas from '../components/ListaTareas'
  import {mapActions} from 'vuex'
  const shortid = require('shortid')

  export default {
    name: 'Home',
    components:{
      Input,
      ListaTareas
    },
    data(){
      return{
        tarea:{
          id: '',
          nombre: '',
          categoria: [],
          estado: '',
          numero: 0
        }
      }
    },
    methods:{
      ...mapActions(['setTareas']),
      procesarFormulario(){
        console.log(this.tarea)
        if (this.tarea.nombre.trim() === "") {
          console.log("El campo nombre esta vacio")
        } else {
          console.log("El campo nombre no esta vacio")
        }

        // genero el id
        this.tarea.id = shortid.generate()
        console.log(this.tarea.id)

        // envio los datos
        this.setTareas(this.tarea)
        
        // limpio los campos
        this.tarea = {
          id: '',
          nombre: '',
          categoria: [],
          estado: '',
          numero: 0
        }
      }
    }    
  }
</script>