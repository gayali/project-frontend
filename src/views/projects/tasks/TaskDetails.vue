<template>
<div>   Hello ji
    
</div>
 
</template>

<script>

    import {
        mapGetters
    } from "vuex"
    export default {
        name: 'TaskDetails',
        props: {
            task: {
                default: null
            }
        },
        computed: {
            ...mapGetters({
                loading: 'tasks/loading',
                editTaskError: 'tasks/editTaskError',
            }),
        },
        data() {
            return {
               
            }
        },
        methods: {

        },
        mounted() {


        },
    }
</script>