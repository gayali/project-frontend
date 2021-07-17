<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://36central.com" target="_blank">36 Central</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} </span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">Powered by</span>
      <a href="https://36central.com">36 Central for Project Management</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
