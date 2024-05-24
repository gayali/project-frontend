<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard v-if="isAdmin">
        <CCardHeader>
          <CRow>
            <CCol col="6" class="text-left">
              <h4 class="mb-0">{{ projectName || "NA" }}</h4>
            </CCol>
            <CCol col="6" class="text-right">
              <CButton color="success" class="px-4 btn-sm" type="button" @click="
                $router.push({
                  name: 'New Task',
                  query: { id: $route.query.id },
                })
                ">
                Add Task</CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="mb-2"> Project Prefix : <strong>{{ prefix }}</strong></div>

          <div class="mb-2"> Current Sprint : <strong>{{ currentSprintName }}</strong></div>


          <div class="mb-2">Project Description : </div>
          <div v-if="projectDescription" class="border p-2 rounded mb-4" v-html="projectDescription" />


          <CCard>
            <CCardHeader>

              <CRow>
                <CCol col="6" class="text-left">
                  <h5 class="mb-2">Sprints : </h5>
                </CCol>
                <CCol col="6" class="text-right">
                  <CButton color="success" class="px-4 btn-sm" type="button" :disabled="loading" @click="$router.push({
                    name: 'New Sprint',
                    query: { project_id: $route.query.id },
                  })">
                    <CSpinner v-if="loading" color="light" size="sm" />
                    Add Sprint
                  </CButton>
                </CCol>
              </CRow>

            </CCardHeader>
            <CCardBody>
              <div class="table-responsive">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Status</th>
                      <th scope="col" class="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="sprintLoading">
                      <CSpinner color="light" />
                    </tr>
                    <template v-else>
                      <tr v-for="sprint in filteredSprints">
                        <th scope="row">

                          <div class="d-flex align-items-center m-2">{{ sprint.name }}
                            <button class="btn btn-sm btn-light ml-2"
                              title="Rename Sprint" type="button" @click="renameSprint(sprint)">
                              <CIcon name="cilPencil" />
                            </button>
                          </div>
                        </th>
                        <td>
                          <strong v-if="Number(sprint.is_active) === 0" class="text-danger d-flex align-items-center m-2">
                            INACTIVE
                          </strong>
                          <strong v-else class="text-success d-flex align-items-center m-2">
                            ACTIVE
                          </strong>
                        </td>

                        <td class="grid text-center">
                          <button class="btn btn-sm btn-primary col-lg-5 col-md-12 m-2"
                            v-if="Number(sprint.is_active) === 0" title="Activate Sprint" type="button"
                            @click="activateSprint(sprint)">
                            ACTIVATE
                          </button>

                          <button
                          v-if="Number(sprint.is_active) === 0"
                          
                          title="Delete Sprint" type="button" class="btn btn-sm btn-danger col-lg-5 col-md-12 m-2"
                            @click="deleteSprint(sprint)">
                            DELETE
                          </button>
                        </td>

                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </CCardBody>
          </CCard>



        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol col="6" class="text-left">
              <CButton color="danger" class="px-4 btn-sm" type="button" :disabled="loading" @click="deleteProject">
                <CSpinner v-if="loading" color="light" size="sm" />

                Delete Project
              </CButton>
            </CCol>
            <CCol col="6" class="text-right">
              <CButton color="info" class="px-4 btn-sm" type="button" @click="
                $router.push({
                  name: 'Edit Project',
                  query: {
                    id: $route.query.id,
                    projectName: projectName,
                    projectDescription: projectDescription,
                  },
                })
                ">
                Edit Project</CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>


      <CCard v-else>
        <CCardHeader>
          <CRow>
            <CCol col="6" class="text-left">
              <h4 class="mb-0">{{ projectName || "NA" }}</h4>
            </CCol>

          </CRow>
        </CCardHeader>
        <CCardBody>
          <div class="mb-2"> Project Prefix : <strong>{{ prefix }}</strong></div>

          <div class="mb-2"> Current Sprint : <strong>{{ currentSprintName }}</strong></div>


          <div class="mb-2">Project Description : </div>
          <div v-if="projectDescription" class="border p-2 rounded mb-4" v-html="projectDescription" />


          <CCard>
            <CCardHeader>

              <CRow>
                <CCol col="6" class="text-left">
                  <h5 class="mb-2">Sprints : </h5>
                </CCol>
              </CRow>

            </CCardHeader>
            <CCardBody>
              <div class="table-responsive">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="sprintLoading">
                      <CSpinner color="light" />
                    </tr>
                    <template v-else>
                      <tr v-for="sprint in filteredSprints">
                        <th scope="row">

                          <div class="d-flex align-items-center m-2">{{ sprint.name }}

                          </div>
                        </th>
                        <td>
                          <strong v-if="Number(sprint.is_active) === 0" class="text-danger d-flex align-items-center m-2">
                            INACTIVE
                          </strong>
                          <strong v-else class="text-success d-flex align-items-center m-2">
                            ACTIVE
                          </strong>
                        </td>



                      </tr>
                    </template>

                  </tbody>
                </table>
              </div>
            </CCardBody>
          </CCard>



        </CCardBody>

      </CCard>
    </CCol>

  </CRow>
</template>

<script>
import { mapGetters } from "vuex";
import { VueEditor } from "vue2-editor";
import Table from "@/views/components/Table";
export default {
  name: "Details",
  components: {
    VueEditor,
    Table,
  },
  computed: {
    ...mapGetters({
      loading: "projects/loading",
      sprintLoading: "sprints/loading",
      projects: "projects/projects",
      sprints: "sprints/sprints",
      isAdmin: "users/isAdmin",
    }),
    filteredSprints() {
      return this.sprints.filter((sprint) => {
        return sprint.project_id == this.$route.query.id;
      });
    },
    sprintsData() {
      let sprintList = [];
      let filteredSprint = this.sprints.filter((sprint) => {
        return sprint.project_id == this.$route.query.id;
      });
      if (filteredSprint.length > 0) {
        for (let i = 0; i < filteredSprint.length; i++) {
          const sprint = filteredSprint[i];
          const sprintData = {
            id: sprint.id,
            Name: sprint.name,
            Status: sprint.is_active == 0 ? "FALSE" : "TRUE",
            Action: sprint,
          };
          sprintList.push(sprintData);
        }
      }

      return sprintList;
    },

  },
  data() {
    return {
      projectName: null,
      projectDescription: null,
      prefix: null,
      currentSprintName: null,
      sprintFields: ["Name", "Status", "Action"],
      selectedSprint: '',
      customToolbar: [
        ["bold", "italic", "underline"],
        [
          {
            list: "ordered",
          },
          {
            list: "bullet",
          },
        ],
        ["code-block"],
      ],
    };
  },
  methods: {
    getProjects() {
      for (let i = 0; i < this.projects.length; i++) {
        const project = this.projects[i];
        if (project.id === parseInt(this.$route.query.id)) {
          this.projectName = project.project_name;
          this.projectDescription = project.description;
          this.prefix = project.prefix;
          this.currentSprintName = project?.current_sprint?.name;
          break;
        }
      }
      if (this.projectName === null) {
        this.projectName = "Not found";
        this.projectDescription = "Not found";
        this.prefix = "Not found";
      }
    },
    async deleteProject() {
      let yesDelete = confirm(
        "This will delete project and all the task records regarding this projects. \nAre you sure to delete ?"
      );
      if (yesDelete)
        await this.$store.dispatch("projects/delete", {
          id: this.$route.query.id,
        });
    },
    async activateSprint(sprint) {
      let yesActivate = confirm(
        "This will mark it as the current sprint. \nAre you sure to do it ?"
      );
      if (yesActivate){
           await this.$store.dispatch("sprints/activate", { id: sprint.id });
           await this.$store.dispatch("projects/fetch");
           this.getProjects();
      }
     
    },
    async renameSprint(sprint) {

      let sprintName = prompt("Please enter new sprint name", sprint.name);
      if (sprintName !== null && sprint.name !== sprintName) {
        await this.$store.dispatch("sprints/renameSprint", { sprint: sprint, sprintName: sprintName });
        await this.$store.dispatch("projects/fetch");
        this.getProjects();
      }
    },
    async deleteSprint(sprint) {
      let yesDelete = confirm(
        "This will delete sprint. \nAre you sure to delete ?"
      );
      if (yesDelete){
        await this.$store.dispatch("sprints/deleteSprint", { id: sprint.id });
        await this.$store.dispatch("projects/fetch");
        this.getProjects();
      }
    },
  },
  async beforeMount() {
    if (Object.entries(this.projects).length === 0)
      await this.$store.dispatch("projects/fetch");
    if (Object.entries(this.sprints).length === 0)
      await this.$store.dispatch("sprints/fetch");
    this.getProjects();
  },
  watch: {
    "$route.query": {
      handler() {
        this.getProjects();
      },
    },
  },
};
</script>

