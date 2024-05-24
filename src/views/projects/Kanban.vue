<template>
  <div class="d-flex flex-column align-content-stretch">
    <div class="
        row
        align-items-center
        justify-content-between
        text-sm
        mb-2
        px-2
        pt-2
        bg-white
        rounded
      ">
      <div class="col-sm-12 col-md-6 pr-0">
        <h6 class="mb-0 ml-1">Project : {{ selectedProject.project_name }}</h6>
      </div>
      <div class="col-sm-12 col-md-4 my-2">
        <div class="d-flex align-items-center">
          <label for="staticEmail" class="col-sm-3 col-form-label">
            Sprint :
          </label>
          <select class="form-control form-control-sm col-sm-9" placeholder="Select Sprint"
            @change="selectedSprint = $event.target.value" :value="selectedSprint">
            <option value="">No Sprint</option>
            <option v-for="sprint in filteredSprints" :key="sprint.id" :value="sprint.id">
              {{ sprint.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="kanban-view-class">
      <div class="d-inline-flex">
        <CCard class="bg-section m-1" v-for="taskType in taskTypes.allKanbanTypes" v-bind:key="taskType">
          <CCardHeader class="text-center px-0 py-1">
            <h6 class="m-0">
              <strong>{{ taskType }}</strong>
            </h6>
          </CCardHeader>
          <CCardBody class="px-2 py-1">
            <div class="text-center m-4" v-if="taskLoading">
              <CSpinner color="primary " size="lg" />
            </div>

            <template v-for="task in filteredTasks">
              <CCard class="my-2 task-card" v-bind:key="task.id" v-if="task.status === taskType && !taskLoading" @click="
                $router.push({
                  name: 'Task Details',
                  query: { task: task.branch_name },
                })
                ">
                <CCardBody class="p-2">
                  <CRow>
                    <CCol col="4">
                      <CBadge color="primary" size="sm">{{
                        task.branch_name
                      }}</CBadge>
                    </CCol>
                  </CRow>
                  <CRow class="mt-2">
                    <CCol col="12">{{ task.task_title }}</CCol>
                  </CRow>
                  <CRow class="align-items-end">
                    <CCol col="9" v-if="task.status === taskTypes.TODO ||
                      task.status === taskTypes.DOING
                      ">
                      <CBadge color="tertiary">
                        <CIcon name="cilCalendar" class="icon-bal mr-1" size="sm" />
                        Est : {{ moment(task.start_date, task.end_date) }}
                      </CBadge>
                    </CCol>
                    <CCol col="3" class="text-right">
                      <avatar :username="task.asignee_user.name" :size="30" style="float: right"
                        v-c-tooltip.hover="task.asignee_user.name">
                      </avatar>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </template>
          </CCardBody>
        </CCard>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TaskTypes from "../../enums/taskTypes";
import Avatar from "vue-avatar";
import moment from "moment";
export default {
  name: "Kanban",
  components: {
    Avatar,
  },
  computed: {
    ...mapGetters({
      tasks: "tasks/tasks",
      taskLoading: "tasks/loading",
      sprints: "sprints/sprints",
      projects: "projects/projects",
      selectedProject: "projects/selectedProject",
    }),
    filteredSprints() {
      return this.sprints.filter((sprint) => {
        return sprint.project_id == this.$route.query.id;
      });
    },
    filteredTasks() {
      return this.tasks.filter((task) => {
        if (this.selectedSprint) {
          return (
            (this.selectedSprint === task.sprint_id) &&
            task.project_id.toString() === this.$route.query.id
          );
        } else {
          return(
            (task.sprint_id === null || task.sprint_id === ''|| task.sprint_id === 'null') &&
            task.project_id.toString() === this.$route.query.id
          )
        }

      });
    },
  },
  data() {
    return {
      loading: false,
      task: {},
      openDetailModal: false,
      taskTypes: TaskTypes,
      selectedSprint: "",
    };
  },
  async beforeMount() {
    if (Object.entries(this.tasks).length === 0)
      await this.$store.dispatch("tasks/fetch");

    if (Object.entries(this.sprints).length === 0)
      await this.$store.dispatch("sprints/fetch");

    if (Object.entries(this.projects).length === 0)
      await this.$store.dispatch("projects/fetch");

    this.$store.dispatch("projects/updateSelectedProject", {
      id: this.$route.query.id,
    });
  },
  methods: {
    moment(startDate, endDate) {
      
      console.log('startDate',startDate)
      console.log('endDate',endDate)
      if (startDate !== null && endDate !== null) {
        let start = moment(startDate, "YYYY-MM-DD");
        let end = moment(endDate, "YYYY-MM-DD").add(1, 'days');

        let estimate = moment.duration(end.diff(start)).humanize()
        return estimate;
      } else {
        return "Not Estimated";
      }
    },
  },
};
</script>
<style scoped>
.kanban-view-class {
  overflow-x: scroll;
  flex: 1;
}

.bg-section {
  min-width: 250px;
  background-color: #f3f4f6;
}

.task-card {
  cursor: pointer;
  border-radius: 15px;
}

.icon-bal {
  margin-top: -3px;
}
</style>