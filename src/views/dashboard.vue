<template>
    <div class="container">
        <div class="rows is-multiline">
            <div class="rows is-centered mb-4">
                <h1 class="column title">Dashboard</h1>
                <div class="notification is-info is-centered pl-5" v-if="username">
                        <p v-bind:key="username"> {{ username }} </p>
                </div>                
            </div> 
            
            <div class="notification is-info" v-if="people.length">
                    <div v-for="person in people" v-bind:key="person">    
                        <hr>
                        {{ person }} 
                    </div>
            </div> 

            <div class="columns is-centered">
                <div class="column mr-3">
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
             people: [],
             username: ''
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
                           this.username = response.data.username
                           axios
                                .get(`/api/v1/addpeople/getpeople/${response.data.id}`)
                                .then(response => {
                                    //console.log(response.data)
                                    const peps = String(response.data).split("\n")
                                    
                                    for(const pep in peps){
                                            var line = peps[pep].split(" ")
                                            var line1 = ""
                                            for(let j=0; j<line.length; j++){
                                                for(let i = 0; i<(80-line[j].length); i++){
                                                    line[j] = line[j] + '\xa0'
                                                } 
                                                line1 = line1 + line[j]
                                            }

                                            this.people.push(line1)
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
