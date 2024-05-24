<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol col="12">
            <div class="d-flex align-items-center">
              <CButton
                size="sm"
                variant="outline"
                color="dark"
                type="button"
                @click="$router.go(-1)"
                v-c-tooltip.hover="'Back'"
                class="mr-2"
              >
                <CIcon name="cilArrowLeft" />
              </CButton>
              <CCardTitle class="mb-0">New Sprint</CCardTitle>
            </div>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody  v-if="!isAdmin">
                    <CRow>
                        <CCol col="12" class="text-center">
                            <h4 class="mb-0">USER NOT ALLOWED</h4>
                        </CCol>
                    </CRow>
                </CCardBody>

      <CForm v-else @submit.prevent="$store.dispatch('sprints/submit',{name:name,is_active:0,project_id:project_id})">
        <CCardBody>
          <CInput
            required
            label="Sprint Name"
            autocomplete="Sprint Name"
            aria-label="Sprint Name"
            name="sprintName"
            type="text"
            v-model="name"
          >
          </CInput>

          <select
          required
            class="form-control form-control-sm col-12 "
            placeholder="Select Project"
            @change="project_id = $event.target.value"
            :value="project_id"
          >
            <option
              v-for="project in projects"
              :key="project.id"
              :value="project.id"
            >
              {{ project.project_name }}
            </option>
          </select>

         
        </CCardBody>
        <CCardFooter>
          <CRow>
            <div
              class="alert alert-danger col-12 mx-auto"
              role="alert"
              v-if="error !== ''"
            >
              {{ error }}
            </div>
            <CCol col="12" class="text-right">
              <CButton color="primary" class="px-4 btn-sm" type="submit" :disabled="loading">
              <CSpinner v-if="loading" color="light" size="sm" />  Save Sprint</CButton
              >
            </CCol>
          </CRow>
        </CCardFooter>
      </CForm>
    </CCard>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "NewSprint",
  data() {
    return {
      name: "",
      project_id: "",
    };
  },
  computed: {
    ...mapGetters({
      error: "sprints/newSprintError",
      loading: "sprints/loading",
      projects: "projects/projects",
      isAdmin: "users/isAdmin",
    }),
  },
  beforeMount() {
    if (this.$route.query.project_id){
       this.project_id = this.$route.query.project_id;
    }
     
  },
};
</script>