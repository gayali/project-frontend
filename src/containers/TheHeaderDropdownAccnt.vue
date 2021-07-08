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

      <CDropdownItem @click="logout">
        <CIcon name="cil-lock-locked" /> Logout
      </CDropdownItem>
    </CDropdown>
    <Modal @action="action" :color="'waring'" :noCloseOnBackdrop="false" :title="'Logout Confirm'" :actionButton="true"
      :actionTitle="'Yes'" :closeTitle="'No'" :crossButton="false">Are you sure you want to logout ...?</Modal>
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
    computed: {
      ...mapGetters({
        modalVisibility: "components/modalVisibility",
      }),
    },
    data() {
      return {
        itemsCount: 42,
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('components/setModalVisibility', true)
      },
      action() {
        this.$store.dispatch('users/logout')
      }
    }
  }
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>