<template>
  <div>
    <CDropdown inNav class="c-header-nav-items" placement="bottom-end" add-menu-classes="pt-0">
      <template #toggler>
        <CHeaderNavLink>
          <div class="c-avatar">
            <img src="img/avatars/6.jpg" class="c-avatar-img " />
          </div>
        </CHeaderNavLink>
      </template>
      <CDropdownHeader tag="div" class="text-center" color="light">
        <strong>Account</strong>
      </CDropdownHeader>

      <CDropdownItem>
        <CIcon name="cil-user" /> Profile
      </CDropdownItem>

      <CDropdownItem @click="logoutConfirm">
        <CIcon name="cil-lock-locked" /> Logout
      </CDropdownItem>
    </CDropdown>
    <Modal v-if="logoutConfirmModal" @close="close" :action="logout" :color="'warning'" :noCloseOnBackdrop="false"
      :title="'Logout Confirm'" :actionButton="true" :actionTitle="'Yes'" :closeTitle="'No'" :crossButton="false">Are
      you sure you want to logout ...?</Modal>
  </div>

</template>

<script>
  import {
    mapGetters
  } from "vuex"
  import Modal from '../views/components/Modal.vue'
  export default {
    name: 'TheHeaderDropdownAccnt',
    components: {
      Modal
    },
    data() {
      return {
        itemsCount: 42,
        logoutConfirmModal: false
      }
    },
    methods: {
      logoutConfirm() {
        this.logoutConfirmModal = true;
      },
      logout() {
        this.logoutConfirmModal = false;
        this.$store.dispatch('users/logout')
      },
      close() {
        this.logoutConfirmModal = false;
      }
    }
  }
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>