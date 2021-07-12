<template>
    <CRow>
        <CCol col="12" xl="8">
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol col="6" class="text-left">
                            <CCardTitle>{{projectName||"NA"}}</CCardTitle>
                        </CCol>
                        <CCol col="6" class="text-right">
                            <CButton color="primary" class="px-4 btn-sm" type="button"
                                @click="$router.push({name:'New Task', query: { id: $route.query.id } })">
                                Add New Task</CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CInput label="Project Prefix" autocomplete="Project Prefix" aria-label="Project Prefix"
                        name="prefix" readonly type="text" v-model="prefix">
                    </CInput>
                    <CTextarea autocomplete="Project Description" aria-label="Project Description"
                        name="projectDescription" v-model="projectDescription" label="Project Description"
                        placeholder=" Project Description" readonly rows="6" />
                </CCardBody>
                <CCardFooter>
                    <CRow>
                        <CCol col="6" class="text-left">
                            <CButton color="dark" class="px-4" type="button" @click="$router.go(-1)"> Back</CButton>
                        </CCol>
                    </CRow>
                </CCardFooter>

            </CCard>
        </CCol>
    </CRow>
</template>

<script>
    import {
        mapGetters
    } from "vuex"
    export default {
        name: 'Details',
        computed: {
            ...mapGetters({
                projects: 'projects/projects',
            }),
        },
        data() {
            return {
                projectName: null,
                projectDescription: null,
                prefix: null
            };
        },
        methods: {
            getProjects() {
                for (let i = 0; i < this.projects.length; i++) {
                    const project = this.projects[i];
                    if (project.id === parseInt(this.$route.query.id)) {
                        this.projectName = project.project_name
                        this.projectDescription = project.description
                        this.prefix = project.prefix
                        break
                    }
                }
                if (this.projectName === null) {
                    this.projectName = "Not found"
                    this.projectDescription = "Not found"
                    this.prefix = "Not found"
                }
            }
        },
        mounted() {
            if (this.projects === {} || this.projects.length === 0 || this.projects.length === undefined) {
                this.$store.dispatch('projects/fetch').then(() => {
                    this.getProjects()
                })
            } else {
                this.getProjects()
            }
        }
    }
</script>