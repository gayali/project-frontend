<template>
    <CRow>
        <CCol col="12" xl="8">
            <CCard>
                  <CForm @submit.prevent="submit">
                  <CCardHeader>
                    <CButton variant="outline" color="dark" type="button" @click="$router.go(-1)"
                        v-c-tooltip.hover="'Back'">
                        <CIcon name="cilArrowLeft" />
                    </CButton>

                    <div class="alert alert-danger col-6 mx-auto" role="alert" v-if="editProjectError !== ''">
                        {{ editProjectError }}</div>

                    <CButton color="primary" class="col-4 col-md-2 col-lg-2 float-right" :disabled="loading" type="submit">
                        <CSpinner v-if="loading" color="light" size="sm" /> Edit</CButton>
                </CCardHeader>
              
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
        name: 'EditProject',
        components: {
            VueEditor
        },
        computed: {
            ...mapGetters({
                loading: 'projects/loading',
                editProjectError: 'projects/editProjectError',
            }),
        },
        data() {
            return {
                id: this.$route.query.id,
                projectName:  this.$route.query.projectName,
                projectDescription:  this.$route.query.projectDescription,
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
            async submit() {
                await this.$store.dispatch("projects/edit", {
                    id:this.id,
                    project_name: this.projectName,
                    description: this.projectDescription,
                });
            },
            async resetError() {
                await this.$store.dispatch("projects/resetError");
            },
        },
        async beforeMount() {
            await this.$store.dispatch('users/canAccess')
        },
    }
</script>