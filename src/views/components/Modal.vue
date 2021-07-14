<template>
    <div>

        <CModal :no-close-on-backdrop="noCloseOnBackdrop" :centered="centered" :size="size" :title="title"
            :color="shouldColored ? color : ''" :show.sync="show">
            <template #header>
                <h6 class="modal-title">{{title}}</h6>
                <CButtonClose v-if="crossButton" @click="close" class="text-white" />
            </template>

            <slot>
                <p>Modal content can go here</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
                <p>...</p>
            </slot>
            <template #footer>
                <CButton v-if="closeButton" @click="close" color="danger">{{closeTitle}}</CButton>
                <CButton v-if="actionButton" @click="action" color="success">{{actionTitle}}</CButton>
            </template>
        </CModal>
    </div>
</template>


<script>
    import {
        mapGetters
    } from "vuex"
    export default {
        name: 'Modal',
        data(){
            return {
                show:true
            }
        },
        props: {
            noCloseOnBackdrop: {
                default: true
            },
            title: {
                default: null
            },
            color: {
                default: 'primary'
            },
            size: {
                default: 'sm'
            },
            centered: {
                default: true
            },
            closeButton: {
                default: true
            },
            actionButton: {
                default: false
            },
            actionTitle: {
                default: 'OK'
            },
            closeTitle: {
                default: 'CANCEL'
            },
            crossButton: {
                default: true
            },
            shouldColored:{
                 default: true
            }
        },
        computed: {
          
        },
        methods: {
            action() {
                this.$emit('action')
            },
            close() {
                this.$emit('close')
            },
        },
    }
</script>

<style scoped>
</style>