<template>
   <Modal></Modal>
</template>

<script>
import Modal from '../../components/Modal.vue'
    import {
        mapGetters
    } from "vuex"
    export default {
        name: 'TaskDetails',
        components:{
            Modal
        },
       
        computed: {
            ...mapGetters({
                loading: 'tasks/loading',
               // editTaskError: 'tasks/editTaskError',
            }),
        },
        data() {
            return {
            };
        },
        methods: {
           
        },
        mounted() {
            

        },
    }
</script>