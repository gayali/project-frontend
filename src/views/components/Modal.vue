<template>
    <div>

        <CModal :closeOnBackdrop="closeOnBackdrop" :centered="centered" :size="size" :title="title"
            :color="shouldColored ? color : ''" :show.sync="show">
            <template #header>
                <h6 class="modal-title">{{title}}</h6>
                <CButtonClose v-if="crossButton" @click="close" :class="shouldColored ? 'text-white':''" />
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

    export default {
        name: 'Modal',
        data() {
            return {
                show: true
            }
        },
        props: {
            closeOnBackdrop: {
                default: false
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
            shouldColored: {
                default: true
            }
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