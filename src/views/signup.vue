<template>
    <div class="container">
        <div class="columns">
            <div class="column is-4 is-offset-4 has-background-info-light mt-6">
                <h1 class="title mt-5">Sign up</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Username</label>
                            <div class="control">
                                <input type="text" name="email" class="input" v-model="username">
                            </div>   
                    </div>         

                    <div class="field">
                        <label>Password</label>
                            <div class="control">
                                <input type="password" name="password1" class="input" v-model="password1">
                            </div>   
                    </div>  
                        
                    <div class="field">
                        <label>Repeat Password</label>
                            <div class="control">
                                <input type="password" name="password2" class="input" v-model="password2">
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
import {toast} from 'bulma-toast'

export default {
    name: 'Signup',
    data(){
         return {
             username: '',
             password1: '',
             password2: '',
             errors: []
         }
    },
    methods: {
        submitForm(){
            this.errors = []
            if (this.username === ''){
                this.errors.push('Username is Missing')
            }
            if(this.password1 === ''){
                this.errors.push('Password is Missing')
            }
            if(this.password1 !== this.password2){
                this.errors.push('The Passwords do not Match')
            }
            if (!this.errors.length){
                const formData = {
                    username: this.username,
                    password: this.password1
                }

                axios
                    .post('/api/v1/users/', formData)
                    .then(response => {
                        toast({
                            message: 'Account created successfully',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })
                        this.$router.push('/log-in')
                        console.log(response)
                    })
                    .catch(error => {
                        if (error.response){
                            for(const property in error.response.data){
                                this.errors.push(`${error.response.data[property]}`)
                            }
                        }else if (error.message){
                            this.errors.push('Something went wrong. Please try again in a while')
                        }
                    })

      

            }
        }
    }
}
</script>
