<template>
    <div>
        <CRow>
            <CCol col="12" xl="8">
                <Table :items="usersData" :fields="fields" @open="setClickedUser">
                    <template #header>
                        <CIcon name="cil-grid" /> User Table
                    </template>
                </Table>
            </CCol>
        </CRow>

        <Modal :shouldColored="false" :closeOnBackdrop="false" :title="'EDIT USER'" size="lg" :actionButton="false"
            :closeButton="false" v-if="openDetailModal" @close="onClose">
            <EditUser :user="user"></EditUser>
        </Modal>
    </div>

</template>

<script>
    import Modal from '../components/Modal'
    import Table from '../components/Table'
    import EditUser from './EditUser'
    import {
        mapGetters
    } from "vuex"
    export default {
        name: 'Users',
        components: {
            EditUser,
            Modal,
            Table
        },
        computed: {
            ...mapGetters({
                users: 'users/users',
            }),
            usersData() {
                let userData = []
                for (let i = 0; i < this.users.length; i++) {
                    const user = this.users[i];
                    let roleName = ''
                    if (user.roles.length !== 0) roleName = user.roles[0].name

                    user.role = roleName

                    const userOneData = {
                        'Name': user.name,
                        'Email': user.email,
                        'action': user,
                        'Role': roleName
                    }
                    userData.push(userOneData)
                }
                return userData
            }
        },
        data() {
            return {
                loading: false,
                user: {},
                openDetailModal: false,
                fields: ["Name", "Email", "Role", "Action"]
            };
        },
        methods: {
            setClickedUser(user) {
                this.user = user.action
                this.openDetailModal = true
            },
            onClose() {
                this.openDetailModal = false
                this.user = {}
            },

        },
        async beforeMount() {
           let canAccess= await this.$store.dispatch('users/canAccess')
           if(canAccess) await this.$store.dispatch('users/fetchAll')
        },
        
    }
</script>