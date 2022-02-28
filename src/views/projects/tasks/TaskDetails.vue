<template>
  <div>
    <CCard>
      <CForm @submit.prevent="edit">
        <CCardHeader>
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <CButton
                class="mr-2"
                variant="outline"
                color="dark"
                type="button"
                size="sm"
                @click="$router.go(-1)"
                v-c-tooltip.hover="'Back'"
              >
                <CIcon name="cilArrowLeft" />
              </CButton>
              <div class="h5 mb-0">{{ task.task_title }}</div>
            </div>

            <CButton
              class="float-right"
              color="info"
              :disabled="loading"
              type="submit"
              size="sm"
              title="Edit task"
            >
              <CIcon name="cilPencil"
            /></CButton>
          </div>

          <div
            class="alert alert-danger col-12 mx-auto"
            role="alert"
            v-if="editTaskError !== ''"
          >
            {{ editTaskError }}
          </div>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol col="12" sm="12" md="4" xl="4">
              <CSelect
                label="Status"
                :options="statusOptions"
                :value.sync="task.status"
                placeholder="Please select"
                name="select_status"
                @focus="resetError"
              />
              <CSelect
                :disabled="task.status == backlog"
                label="Sprint"
                :options="filteredSprints"
                :value.sync="task.sprint_id"
                placeholder="Please Sprint"
                name="sprint_id"
              />

              <CSelect
                label="Reporter User"
                :options="options"
                :value.sync="task.reporter_user_id"
                placeholder="Please select"
                name="reporter_user_id"
                readonly
              />
              <CSelect
                label="Assinee User"
                @focus="resetError"
                :options="options"
                :value.sync="task.assignee_user_id"
                placeholder="Please select"
                name="assignee_user_id"
              />
            </CCol>
            <CCol col="12" sm="12" md="8" xl="8">
              <h5>
                Branch Name :
                <CBadge color="secondary" shape="pill">{{
                  task.branch_name
                }}</CBadge>
              </h5>

              <div class="mb-2">Task Description</div>
              <vue-editor
                v-model="task.description"
                :editorToolbar="customToolbar"
                required
              ></vue-editor>
            </CCol>
          </CRow>
          <CRow>
            <CCol col="6">
              <CInput
                placeholder="Enter Start Date"
                label="Start Date"
                autocomplete="Start Date"
                aria-label="Start Date"
                name="start_date"
                @focus="resetError"
                type="date"
                v-model="task.start_date"
              >
              </CInput>
            </CCol>
            <CCol col="6">
              <CInput
                placeholder="Enter End Date"
                label="End Date"
                autocomplete="End Date"
                aria-label="End Date"
                name="end_date"
                @focus="resetError"
                type="date"
                :disabled="userCantEdit"
                v-model="task.end_date"
              >
              </CInput>
            </CCol>
          </CRow>
        </CCardBody>
      </CForm>
      <CCardFooter>
        <CRow>
          <CCol col="12" class="text-right">
            <CButton
              color="danger"
              class="px-4 btn-sm"
              type="button"
              :disabled="loading"
              @click="deleteTask"
            >
              <CSpinner v-if="loading" color="light" size="sm" />
              Delete Task</CButton
            >
          </CCol>
        </CRow>
      </CCardFooter>
    </CCard>
    <TaskComment :taskId="task.id"></TaskComment>
  </div>
</template>

<script>
import * as Roles from "@/enums/roles";
import { VueEditor } from "vue2-editor";
import { mapGetters } from "vuex";
import { BACKLOG, allTypes } from "../../../enums/taskTypes";
import TaskComment from "./TaskComment";
export default {
  name: "TaskDetails",
  components: {
    VueEditor,
    TaskComment,
  },
  computed: {
    ...mapGetters({
      loading: "tasks/loading",
      editTaskError: "tasks/editTaskError",
      users: "users/users",
      user: "users/user",
      sprints: "sprints/sprints",
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
      task: JSON.parse(this.$route.query.task),
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
    async edit() {
      let isConfirmed = confirm("Are you sure to edit this ?");
      if (isConfirmed) {
        await this.$store.dispatch("tasks/edit", this.task);
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
  },
  async beforeMount() {
    if (Object.entries(this.users).length === 0)
      await this.$store.dispatch("users/fetchAll");
    if (Object.entries(this.sprints).length === 0)
      await this.$store.dispatch("sprints/fetch");
    this.fetchUser();
    await this.$store.dispatch("users/fetchUserDetails");
  },
  beforeUnmount() {
    this.task = {};
  },
};
</script>