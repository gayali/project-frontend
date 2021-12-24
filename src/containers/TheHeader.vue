<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="setToggleSidebarMobile"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="setToggleSidebarDesktop"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
       <CImg  name="logo"  src="img/logo.png" :height="48" alt="Logo"></CImg>
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
         <span  class="mr-1">Project Management System</span>
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt
  },
   methods: {
      setToggleSidebarMobile() {
       this.$store.dispatch('sidebar/setToggleSidebarMobile')
      },
      setToggleSidebarDesktop() {
       this.$store.dispatch('sidebar/setToggleSidebarDesktop')
      },
     
    },
}
</script>
