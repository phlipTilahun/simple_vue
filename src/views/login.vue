<template>
    <div class="container">
        <div class="columns">
            <div class="column is-4 is-offset-4 has-background-info-light mt-6" >
                <h1 class="title mt-5">Log in</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Username</label>
                            <div class="control">
                                <input type="text" name="username" class="input" v-model="username">
                            </div>   
                    </div>         

                    <div class="field">
                        <label>Password</label>
                            <div class="control">
                                <input type="password" name="password" class="input" v-model="password">
                            </div>   
                    </div>                                       

                    <div class="notification is-danger has-text-dark" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error" > {{ error }} </p>
                    </div>  

                    <div class="field mb-6">
                        <div class="control">
                            <button class="button is-success">Submit</button>
                        </div>   
                    </div>                            
                </form>
            </div>
        </div>  
    </div>          
</template>

<script>
import axios from 'axios'


export default {
    name: 'Login',
    data(){
         return {
             username: '',
             password: '',
             errors: []
         }
    },
    methods: {
        submitForm(){

            this.errors = []

            axios.defaults.headers.common['Authorization'] = ''
            localStorage.removeItem('token')

            const formData = {
                username: this.username,
                password: this.password
            }


            axios
                 .post('/api/v1/token/login/', formData)
                 .then(response => {
                     const token = response.data.auth_token

                     this.$store.commit('setToken', token)

                     axios.defaults.headers.common['Authorization'] = 'Token ' + token

                     localStorage.setItem['token', token]

                     this.$router.push('/dashboard')
                 })
                .catch(error => {
                        if (error.response){
                            for(const property in error.response.data){
                                this.errors.push(`${property}: ${error.response.data[property]}`)
                            }
                        }else if (error.message){
                            this.errors.push('Something went wrong. Please try again in a while')
                        }
                })                 
        }
    }    
}
</script>
