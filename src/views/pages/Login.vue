<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol xxl="4" xl="4" md="6" sm="12" xs="12">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="submit">
                  <img src="/img/logo.png" alt="36 Central Training and Development" class="w-100">
                  <h5 class="text-center">Project Management System</h5>
                  <p class="text-muted mt-4">Sign In to your account</p>
                  <CInput placeholder="Enter Email" autocomplete="email" aria-label="Email address" name="email"
                    @focus="resetError" type="email" v-model="email" required>
                    <template #prepend-content>
                      <CIcon name="cil-user" /></template>
                  </CInput>
                  <CInput placeholder="Enter Password" autocomplete="password" aria-label="Password" name="password"
                    @focus="resetError" type="password" v-model="password" required>
                    <template #prepend-content>
                      <CIcon name="cil-lock-locked" /></template>
                  </CInput>
                  <CRow>
                    <div class="alert alert-danger" role="alert" v-if="errorMessage !== ''">{{ errorMessage }}</div>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4" :disabled="loading" type="submit">
                        <CSpinner v-if="loading" color="light" size="sm" /> Login</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex"
  export default {
    name: 'Login',
    computed: {
      ...mapGetters({
        loading: "users/loading",
        errorMessage: "users/loginError",
        status: "users/status",
      }),
    },
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      async submit(event) {
        await this.$store.dispatch("users/login", {
          email: this.email,
          password: this.password,
        });
      },
      async resetError(event) {
        await this.$store.dispatch("users/resetError");
      },
    },
  }
</script>