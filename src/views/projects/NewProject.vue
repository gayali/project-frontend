<template>
    <CRow>
        <CCol col="12" xl="8">
            <CCard>
                <CForm @submit.prevent="submit">
                    <CCardBody>
                        <CInput placeholder="Enter Project Name" label="Project Name" autocomplete="Project Name"
                            aria-label="Project Name" name="projectName" @focus="resetError" type="text"
                            v-model="projectName" required>
                            <template #prepend-content>
                                <CIcon name="cil-calculator" /></template>
                        </CInput>
                        <div class="mb-2">Project Description</div>
                        <vue-editor v-model="projectDescription" :editorToolbar="customToolbar" required></vue-editor>

                    </CCardBody>
                    <CCardFooter>
                        <CRow>
                            <div class="alert alert-danger col-12" role="alert" v-if="newProjectError !== ''">
                                {{ newProjectError }}</div>
                            <CCol col="6" class="text-left">

                                <CButton color="dark" class="px-4" type="button" @click="$router.go(-1)"> Back</CButton>


                            </CCol>
                            <CCol col="6" class="text-right">
                                <CButton color="primary" class="px-4" :disabled="loading" type="submit">
                                    <CSpinner v-if="loading" color="light" size="sm" /> Submit</CButton>
                            </CCol>
                        </CRow>
                    </CCardFooter>
                </CForm>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>
    import {
        mapGetters
    } from "vuex"
    import {
        VueEditor
    } from "vue2-editor"
    export default {
        name: 'NewProject',
        components: {
            VueEditor
        },
        computed: {
            ...mapGetters({
                loading: 'projects/loading',
                newProjectError: 'projects/newProjectError',
            }),
        },
        data() {
            return {
                projectName: '',
                projectDescription: '',
                customToolbar: [
                    ["bold", "italic", "underline"],
                    [{
                        list: "ordered"
                    }, {
                        list: "bullet"
                    }],
                    ["code-block"]
                ]
            };
        },
        methods: {
            async submit(event) {
                await this.$store.dispatch("projects/submit", {
                    project_name: this.projectName,
                    description: this.projectDescription,
                });
            },
            async resetError(event) {
                await this.$store.dispatch("projects/resetError");
            },
        },
        async beforeMount() {
            await this.$store.dispatch('users/canAccess')
        },
    }
</script>