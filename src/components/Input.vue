<template>
    <!-- Nombre de la actividad -->
    <input 
      type="text"
      class="form-control my-2"
      placeholder="Ingrese un nombre"
      v-model.trim="tarea.nombre">

    <!-- Tipo de categorias -->
    <div class="form-check form-check-inline mt-2">
      <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="Javascript" 
      v-model="tarea.categoria">
      <label class="form-check-label" for="inlineCheckbox1">Javascript</label>      
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="Vue.js" v-model="tarea.categoria">
      <label class="form-check-label" for="inlineCheckbox2">Vue.js</label>
    </div>

    <!-- Estado de la tarea -->
    <div class="mt-2">
      <div class="form-check form-check-inline mt-2">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Urgente" v-model="tarea.estado">
        <label class="form-check-label" for="inlineRadio1">Urgente</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="No necesario" v-model="tarea.estado">
        <label class="form-check-label" for="inlineRadio2">No necesario</label>
      </div>
    </div>

    <!-- Numero -->
    <div class="mt-2">      
      <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Ingrese un numero" v-model="tarea.numero">
    </div>

    <!-- Boton procesar formulario -->
    <div class="d-grid gap-2">
      <button class="btn btn-dark btn-block mt-2" :disabled="deshabilitarBoton">
        Añadir actividad
      </button>
    </div>
</template>

<script>
    export default {
        props:{
            tarea: Object
        },
        computed:{
            deshabilitarBoton(){
                if(this.tarea.nombre.trim() === ""){
                    return true
                }else{
                    return false
                }
            }
        }
    }
</script>