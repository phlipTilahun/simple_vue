<template>
    <div class="container">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Add Person</h1>

                <form>
                    <div class="field">
                        <label>First Nsme</label>
                            <div class="control">
                                <input type="text" name="firstName" class="input">
                            </div>   
                    </div>         

                    <div class="field">
                        <label>Age</label>
                            <div class="control">
                                <input type="number" name="age" class="input">
                            </div>   
                    </div>  
                        
                    <div class="field">
                        <label>Sex</label><br>
                            <div class="select is-normal is-active">
                               <select name="gender">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>   
                    </div>                                        
                    
                    <div class="field">
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

export default {
    name: 'AddPerson'
}
</script>
