<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CIcon name="cil-grid" /> {{caption}}
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable :hover="hover" :striped="striped" :border="border" :small="small" :fixed="fixed" :items="items"
        :fields="fields" :items-per-page="small ? 10 : 5" :dark="dark" pagination>
        <template #Action="{item}">
          <td>
            <CButton color="primary" class="px-4" type="button" @click="open(item)">Edit</CButton>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
  export default {
    name: 'Table',
    props: {
      items: null,
      fields: {
        type: Array,
        default () {
          return ['Name', 'Email']
        }
      },
      caption: {
        type: String,
        default: 'Table'
      },
      hover: Boolean,
      striped: Boolean,
      border: Boolean,
      small: Boolean,
      fixed: Boolean,
      dark: Boolean
    },
    methods: {
      open(item) {
        this.$emit('open', item)
      }
    }
  }
</script>