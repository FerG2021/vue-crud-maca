<template>
    <h1 class="text-center">Login</h1>

    <form @submit.prevent="ingresarUsuario({email: email, password: pass1})">
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

        <div class="d-grid gap-2">
            <button 
                type="submit" 
                class="btn btn-dark btn-block my-3" 
                :disabled="deshabilitarBoton"
            >
                Ingresar
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
                    this.pass1.length < 5){
                    return true
                } else {
                    return false
                } 
            }
        },
        methods:{
            ...mapActions(['ingresarUsuario']),           
        }
    }
</script>