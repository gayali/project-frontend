<template>
    <div>
        <CForm @submit.prevent="submit">
            <CRow>

                <CCol col="12" sm="12" md="6" xl="6">
                    <CInput label="Name" autocomplete="Name" aria-label="Name" name="name" type="text"
                        v-model="user.name" required @focus="resetError">
                    </CInput>
                    <CInput label="Email" autocomplete="Email" aria-label="Email" name="email" type="email"
                        v-model="user.email" required @focus="resetError">
                    </CInput>
                </CCol>
                <CCol col="12" sm="12" md="6" xl="6">
                    <CInput label="Password" autocomplete="Password" aria-label="Password" name="password"
                        type="password" v-model="user.password" @focus="resetError">
                    </CInput>
                    <CInput label="Confirm Password" autocomplete="Confirm Password" aria-label="Confirm Password"
                        name="confirmPassword" type="password" v-model="user.confirmPassword" @focus="resetError">
                    </CInput>
                </CCol>
                
            </CRow>
              <CRow class="border-top pt-3">
                        <CCol col="12" sm="12" md="12" xl="12">
                            <CSelect label="Role" :options="roles" :value="user.role"
                                placeholder="Please select role" name="select_role" @focus="resetError" />
                        </CCol>
                    </CRow>
            <CRow class="border-top pt-3">
                <div class="alert alert-danger col-12" role="alert" v-if="editUserError !== ''">
                    {{ editUserError }}</div>
                <CCol col="12" sm="12" md="12" xl="12" class="text-right">
                    <CButton color="primary" class="px-4" :disabled="loading" type="submit">
                        <CSpinner v-if="loading" color="light" size="sm" /> Submit</CButton>
                </CCol>
            </CRow>
        </CForm>
    </div>

</template>

<script>
    import {
        mapGetters
    } from "vuex"
    import * as Roles from "../../enums/roles"
    export default {
        name: 'EditUser',
        props: {
            user: {
                name: null,
                email: null,
                password: null,
                confirmPassword: null,
                id:null,
                role:''
            }
        },
        data() {
            return {
                 roles: Roles.allRoles
            }
        },
        computed: {
            ...mapGetters({
                loading: 'users/loading',
                editUserError: 'users/editUserError',
                users: 'users/users',
            }),
        },

        methods: {

            async submit(event) {
                if (this.user.password) {
                    if (this.user.password === this.user.confirmPassword) {
                        await this.$store.dispatch('users/edit', this.user)
                    } else {
                        this.$store.dispatch('users/set_edit_user_error', 'Password doesnot match')
                    }
                }else{
                     await this.$store.dispatch('users/edit', this.user);
                }

            },
            async resetError(event) {
                await this.$store.dispatch('users/resetError')
            },
        },
      
    }
</script>