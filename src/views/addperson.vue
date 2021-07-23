<template>
    <div class="container">
        <div class="columns">
            <div class="column is-4 is-offset-4 has-background-info-light mt-6">
                <h1 class="title mt-5">Add Person</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>First Name</label>
                            <div class="control">
                                <input type="text" name="firstName" class="input" v-model="firstName">
                            </div>   
                    </div>      

                    <div class="field">
                        <label>Last Name</label>
                            <div class="control">
                                <input type="text" name="lastName" class="input" v-model="lastName">
                            </div>   
                    </div>  

                    <div class="field">
                        <label>Age</label>
                            <div class="control">
                                <input type="number" name="age" class="input" v-model="age">
                            </div>   
                    </div>  
                        
                    <div class="field">
                        <label>Sex</label><br>
                            <div class="select is-normal is-active">
                               <select name="sex" v-model="sex">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
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
    name: 'AddPerson',
    data(){
         return {
             firstName: '',
             lastName: '',
             age: undefined,
             sex: '',
             user: '',
             errors: []
         }
    },
    methods: {
        submitForm(){

            this.errors = []
            if (this.firstName === ''){
                this.errors.push('First Name is Required')
            }
            if(this.lastName === ''){
                this.errors.push('Last Name is Required')
            }
            if(this.age === undefined){
                this.errors.push('Age is Required')
            }
            if(this.sex === ''){
                this.errors.push('Sex is Required')
            }

            var formData = {
                    firstName: '',
                    lastName: '',
                    age: '',
                    sex: '',
                    user: ''
            }


            axios
                 .get('/api/v1/users/me/')
                 .then(response => {
                            formData.firstName = this.firstName,
                            formData.lastName = this.lastName,
                            formData.age = this.age,
                            formData.sex = this.sex,
                            formData.user = response.data.id
                    axios
                         .post('/api/v1/addpeople/postperson/', formData)
                         .then(response => {
                            if(response.data != 'Success'){
                               this.errors.push('Person already exists')
                            }else{
                                this.$router.push('/dashboard')
                            }
                         })
                        .catch(error => {
                            if (error.response){
                                for(const property in error.response.data){
                                    this.errors.push[`${property}: ${error.response.data[property]}`]
                                }
                            }else if (error.message){
                                this.errors.push('Something went wrong. Please try again in a while')
                            }
                        }) 

                 })
                 .catch(error => {
                     console.log(error.response.data)
                 })


            
            
                           
        }
    }            
}
</script>
