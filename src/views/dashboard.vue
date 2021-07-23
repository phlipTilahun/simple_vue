<template>
    <div class="container">
        <div class="rows is-multiline">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Dashboard</h1>
            </div> 
            
            <div class="notification is-primary" v-if="people.length">
                    <p v-for="person in people" v-bind:key="person"> {{ person }} </p>
            </div> 

            <div class="columns ">
                <div class="column is-4 is-offset-4 mr-0">
                    <button @click="addPerson()" class="button is-success"> Add Person</button>
                </div> 

                <div class="column ml-0">
                    <button @click="logout()" class="button is-danger"> Log out</button>
                </div>
            </div>    

        </div> 
    </div>          
</template>    

<script>
import axios from 'axios'

export default {
    name: 'Dashboard',
    data(){
         return {
             people: []
         }
    },    
    methods: {
        async logout() {
            await axios
                .post('/api/v1/token/logout/')
                .then(response => {
                    console.log("Logged out")
                })
                .catch(error => {
                    console.log(error.response.data)
                })

                axios.defaults.headers.common['Authorization'] = ''
                localStorage.removeItem('token')
                this.$store.commit('removeToken')

                this.$router.push('/')
        },
        addPerson() {
            
            //axios.defaults.headers.common['Authorization'] = 'Token ' + token

            //localStorage.setItem['token', token]
            this.$router.push('/addperson')
        },
         getPeople(){

             axios
                       .get('/api/v1/users/me/')
                       .then(response => {
                           axios
                                .get(`/api/v1/addpeople/getpeople/${response.data.id}`)
                                .then(response => {
                                    //console.log(response.data)
                                    const peps = String(response.data).split("\n")
                                    
                                    for(const pep in peps){
                                            console.log(peps[pep])
                                            this.people.push(peps[pep])
                                    }                                    
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                       })
                       .catch(error => {
                           console.log(error)
                       })
        }
    },
    beforeMount(){
        this.getPeople()
    }
}
</script>
