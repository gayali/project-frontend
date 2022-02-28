<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol col="6" class="text-left">
              <CCardTitle>{{ projectName || "NA" }}</CCardTitle>
            </CCol>
            <CCol col="6" class="text-right">
              <CButton
                color="primary"
                class="px-4 btn-sm"
                type="button"
                @click="
                  $router.push({
                    name: 'New Task',
                    query: { id: $route.query.id },
                  })
                "
              >
                Add New Task</CButton
              >
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CInput
            label="Project Prefix"
            autocomplete="Project Prefix"
            aria-label="Project Prefix"
            name="prefix"
            readonly
            type="text"
            v-model="prefix"
            size="sm"
          >
          </CInput>

        
        <label for="selectSprint">
          Sprints
        </label>

          <select
          id="selectSprint"
            class="form-control form-control-sm mb-4"
            placeholder="Select Sprint"
            @change="selectedSprint = $event.target.value"
            :value="selectedSprint"
          >
            <option value="">No Sprint</option>
            <option
              v-for="sprint in sprintsData"
              :key="sprint.id"
              :value="sprint.id"
            >
              {{ sprint.name }}
            </option>
          </select>

          <div class="mb-2">Project Description</div>
          <vue-editor
            v-model="projectDescription"
            readonly
            :editorToolbar="customToolbar"
            required
          >
          </vue-editor>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol col="6" class="text-left">
              <CButton
                color="danger"
                class="px-4 btn-sm"
                type="button"
                :disabled="loading"
                @click="deleteProject"
              >
                <CSpinner v-if="loading" color="light" size="sm" />

                Delete Project</CButton
              >
            </CCol>
            <CCol col="6" class="text-right">
              <CButton
                color="info"
                class="px-4 btn-sm"
                type="button"
                @click="
                  $router.push({
                    name: 'Edit Project',
                    query: {
                      id: $route.query.id,
                      projectName: projectName,
                      projectDescription: projectDescription,
                    },
                  })
                "
              >
                Edit Project</CButton
              >
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </CCol>
    <CCol col="12">
      <Table
        :items="sprintsData"
        :fields="sprintFields"
        :showDelete="true"
        @delete="deleteSprint"
        @open="openSprintEdit"
      >
        <template #header>
          <div class="d-flex justify-content-between">
            <div>
              <CIcon name="cil-grid" class="mr-2" />
              Sprints
            </div>
            <div>
              <button
                class="btn btn-sm btn-success"
                @click="
                  $router.push({
                    name: 'New Sprint',
                    query: { project_id: $route.query.id },
                  })
                "
              >
                Add Sprint
              </button>
            </div>
          </div>
        </template>
      </Table>
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
      projects: "projects/projects",
      sprints: "sprints/sprints",
    }),
    sprintsData() {
      let sprintList = [];
      let filteredSprint = this.sprints.filter((sprint) => {
        return sprint.project_id == this.$route.query.id;
      });
      if (filteredSprint.length > 0) {
        for (let i = 0; i < filteredSprint.length; i++) {
          const sprint = filteredSprint[i];
          const sprintData = {
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
      showSprintEditModal: false,
      projectName: null,
      projectDescription: null,
      prefix: null,
      sprintFields: ["Name", "Status", "Action"],
      selectedSprint:'',
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
    async deleteSprint(sprint) {
      let yesDelete = confirm(
        "This will delete sprint. \nAre you sure to delete ?"
      );
      if (yesDelete)
        await this.$store.dispatch("sprints/delete", { id: sprint.id });
    },
    openSprintEdit(sprint) {
      this.showSprintEditModal = !this.showSprintEditModal;
      this.$store.dispatch("sprints/setSelectedSprint", sprint);
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