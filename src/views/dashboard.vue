<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Dashboard</h1>
            </div> 

            <div class='columns'>
                <div class="column">
                    <button @click="addPerson()" class="button is-success"> Add Person</button>
                </div> 

                <div class="column">
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
            this.$router.push('/addperson')
        }
    }
}
</script>
