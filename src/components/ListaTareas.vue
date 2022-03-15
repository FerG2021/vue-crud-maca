<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Categoria</th>
                <th scope="col">Estado</th>
                <th scope="col">Numero</th>
                <th scope="col">Accion</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in tareas" :key="item.index">
                <th scope="row">{{ item.id }}</th>
                <td>{{ item.nombre }}</td>
                <td>
                    <span v-for="(cat, index) in item.categoria" :key="index">
                        {{ item.categoria.length === index + 1 ? cat : cat + ", " }}
                    </span>
                </td>
                <td>{{ item.estado }}</td>
                <td>{{ item.numero }}</td>
                <td>
                    <button class="btn btn-danger" @click="deleteTareas(item.id)">
                        Eliminar
                    </button>   
                    <router-link 
                        class="btn btn-warning ml-2"
                            :to="{
                                name: 'Editar',
                                params:{
                                    id: item.id
                                }
                            }"
                    >
                        Editar
                    </router-link>                
                </td>
            </tr>   
        </tbody>
    </table>
</template>



<script>
    import { mapState, mapActions } from "vuex";

    export default {
        components:{
            
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
        computed: {
            ...mapState(["tareas"]),
        },
        methods: {
            ...mapActions(["deleteTareas"]),
        },
    };
</script>