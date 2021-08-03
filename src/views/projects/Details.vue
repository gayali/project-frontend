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

                    <div class="mb-2">Project Description</div>
                    <vue-editor v-model="projectDescription" readonly :editorToolbar="customToolbar" required>
                    </vue-editor>
                </CCardBody>
                <CCardFooter>
                    <CRow>
                        <CCol col="6" class="text-left">
                            <CButton color="danger" class="px-4 btn-sm" type="button" :disabled="loading"
                                @click="deleteProject">

                                <CSpinner v-if="loading" color="light" size="sm" />

                                Delete Project</CButton>
                        </CCol>
                           <CCol col="6" class="text-right">
                            <CButton color="info" class="px-4 btn-sm" type="button"
                                @click="$router.push({name:'Edit Project', query: { id: $route.query.id,projectName: projectName,projectDescription: projectDescription } })">
                                Edit Project</CButton>
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
    import {
        VueEditor
    } from "vue2-editor"
    export default {
        name: 'Details',
        components: {
            VueEditor
        },
        computed: {
            ...mapGetters({
                loading: 'projects/loading',
                projects: 'projects/projects',
            }),
        },
        data() {
            return {
                projectName: null,
                projectDescription: null,
                prefix: null,
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
            },
            async deleteProject() {
                let yesDelete = confirm(
                    'This will delete project and all the task records regarding this projects. \nAre you sure to delete ?'
                    )
                if (yesDelete) await this.$store.dispatch('projects/delete', {id:this.$route.query.id})
            }
        },
        async beforeMount() {
            let projects = Object.entries(this.projects)
            if (projects.length === 0) await this.$store.dispatch('projects/fetch')
            this.getProjects()
        },
        watch: {
            '$route.query': {
                handler(oldUrl, newUrl) {
                    this.getProjects()
                }
            }
        }
    }
</script>