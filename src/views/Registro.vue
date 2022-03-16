<template>
    <h1 class="text-center">Registro de usuarios</h1>

    <form @submit.prevent="procesarFormulario">
        <input 
            type="email" 
            placeholder="Email" 
            class="form-control my-3"
            v-model.trim="email"
        >

        <input 
            type="password" 
            placeholder="Contraseña (minimo 6 caracteres)" 
            class="form-control my-2"
            v-model.trim="pass1"
        >
        
        <input 
            type="password" 
            placeholder="Confirmar contraseña" 
            class="form-control my-2"
            v-model.trim="pass2"
        >

        <div class="d-grid gap-2">
            <button 
                type="submit" 
                class="btn btn-dark btn-block my-3" 
                :disabled="deshabilitarBoton"
            >
                Registrar
            </button>
        </div>        
    </form>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        data() {
            return {
                email: '',
                pass1: '',
                pass2: ''
            }
        },
        computed: {
            deshabilitarBoton(){
                if (this.email.trim() === "" || 
                    this.pass1.trim() === "" || 
                    this.pass2.trim() === "" || 
                    !this.email.includes('@') ||
                    this.pass1.length < 5 ||
                    this.pass1.length != this.pass2.length){
                    return true
                } else {
                    return false
                } 
            }
        },
        methods:{
            ...mapActions(['registrarUsuario']),
            procesarFormulario(){
                this.registrarUsuario({email: this.email, password: this.pass1})
                this.email = '',
                this.pass1 = '',
                this.pass2 = ''
            }
        }
    }
</script>