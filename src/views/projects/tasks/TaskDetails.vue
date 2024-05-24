<template>
  <div>
    <CCard v-if="loading">
      <CCardBody class="d-flex justify-content-center align-items-center" style="gap:1rem;">
        <CSpinner color="dark" size="lg" />
        <div>Loading</div>
      </CCardBody>
    </CCard>
    <CCard v-else-if="task">

      <CCardHeader>
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <CButton class="mr-2" variant="outline" color="dark" type="button" size="sm" @click="$router.go(-1)"
              v-c-tooltip.hover="'Back'">
              <CIcon name="cilArrowLeft" />
            </CButton>
            <div class="h5 mb-0">{{ task.task_title }}</div>
          </div>

          <CDropdown>
            <template #toggler>
              <CHeaderNavLink>
                <CIcon name="cil-options" />
              </CHeaderNavLink>
            </template>
            <CDropdownItem @click="$router.push({name:'Edit Task',query:{task:task.branch_name}})">
              <CIcon name="cilPencil" class="mr-2" /> Edit Task
            </CDropdownItem>
            <CDropdownItem @click="deleteTask">
              <CIcon name="cilTrash" class="mr-2" /> Delete Task
            </CDropdownItem>

          </CDropdown>
        </div>


      </CCardHeader>
      <CCardBody>
        <CRow class="mb-4">
          <CCol col="12" sm="12" md="4" xl="4">
            <CListGroup>
              <CListGroupItem class="d-flex justify-content-between align-items-center">
                <strong> Status</strong>
                <CBadge color="light" shape="pill" class="p-2">{{ task.status }}</CBadge>
              </CListGroupItem>
              <CListGroupItem class="d-flex justify-content-between align-items-center">
                <strong> Sprint</strong>
                <CBadge color="light" shape="pill" class="p-2">{{ task.sprint ? task.sprint.name : 'Not Assigned' }}
                </CBadge>
              </CListGroupItem>
              <CListGroupItem class="d-flex justify-content-between align-items-center">
                <strong> Reporter</strong>
                {{ task.reporter_user ? task.reporter_user.name : 'Not Assigned' }}
              </CListGroupItem>
              <CListGroupItem class="d-flex justify-content-between align-items-center">
                <strong> Assinee</strong>
                {{ task.asignee_user ? task.asignee_user.name : 'Not Assigned' }}
              </CListGroupItem>

              <CListGroupItem class="d-flex justify-content-between align-items-center">
                <strong> Start Date</strong>
                <CBadge color="light" shape="pill">{{ task.start_date ? task.start_date : 'Not Assigned' }}</CBadge>
              </CListGroupItem>
              <CListGroupItem class="d-flex justify-content-between align-items-center">
                <strong> End Date</strong>
                <CBadge color="light" shape="pill">{{ task.end_date ? task.end_date : 'Not Assigned' }}</CBadge>
              </CListGroupItem>
            </CListGroup>

          </CCol>
          <CCol col="12" sm="12" md="8" xl="8">
            <h5 class="mt-3">
              Branch Name :
              <CBadge color="secondary" shape="pill">{{
                task.branch_name
              }}</CBadge>
            </h5>

            <div class="mb-2">Task Description</div>
            <div v-if="task.description" class="border p-2 rounded mb-4" v-html="task.description" />

            <div v-else class="border p-2 rounded mb-4">
              No description provided
            </div>



          </CCol>
        </CRow>
        <TaskComment class="pt-4" :task="task"></TaskComment>

      </CCardBody>

    </CCard>
    <CCard v-else>
      <CCardBody class="d-flex justify-content-center align-items-center" style="gap:1rem;">
        No Task Found
      </CCardBody>
    </CCard>

  </div>
</template>

<script>
import * as Roles from "@/enums/roles";
import { VueEditor } from "vue2-editor";
import { mapGetters } from "vuex";
import { BACKLOG, allTypes } from "../../../enums/taskTypes";
import TaskComment from "../comments/TaskComment";
export default {
  name: "TaskDetails",
  components: {
    VueEditor,
    TaskComment
  },
  computed: {
    ...mapGetters({
      loading: "tasks/loading",
      users: "users/users",
      user: "users/user",
      sprints: "sprints/sprints",
      task: "tasks/selectedTask",
    }),
    userCantEdit() {
      if (this.user.roles[0].name === Roles.ADMIN) return false;
      return true;
    },
    filteredSprints() {
      let sprints = [];
      for (let i = 0; i < this.sprints.length; i++) {
        const sprint = this.sprints[i];
        sprints.push({
          value: parseInt(sprint.id),
          label: sprint.name,
        });
      }
      return sprints;
    },
  },
  data() {
    return {

      statusOptions: allTypes,
      backlog: BACKLOG,
      options: [],
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
    fetchUser() {
      for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i];
        this.options.push({
          value: parseInt(user.id),
          label: user.name,
        });
      }
    },
    
    async resetError() {
      await this.$store.dispatch("tasks/resetError");
    },
    async deleteTask() {
      let yesDelete = confirm(
        "This will delete task records and all comments regarding. \nAre you sure to delete ?"
      );
      if (yesDelete)
        await this.$store.dispatch("tasks/delete", {
          id: this.task.id,
        });
    },

    async resetError(event) {
      await this.$store.dispatch('taskComments/resetError')
    },
  },
  async beforeMount() {

    if (this.$route.query.task) {
      await this.$store.dispatch("tasks/setSelectedTaskBranchName", this.$route.query.task);
    }

    if (Object.entries(this.users).length === 0)
      await this.$store.dispatch("users/fetchAll");
    if (Object.entries(this.sprints).length === 0)
      await this.$store.dispatch("sprints/fetch");
    this.fetchUser();
    await this.$store.dispatch("users/fetchUserDetails");
  },
};
</script>