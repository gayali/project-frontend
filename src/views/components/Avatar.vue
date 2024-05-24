<template>
    <avatar :username="avatar" :size="size"></avatar>
</template>
  
<script>
import Avatar from 'vue-avatar'
export default {
    name: 'Avator',
    components: {
        Avatar
    },
    props: {
        user: {
            type: Object,
            default: () => { }
        },
        size: {
            type: Number,
            default: 36
        }
    },
    computed: {
        avatar() {
            let userName = ''
            if (this.user && this.user.name) {
                userName = this.user.name
            }
            return userName
        }
    }
}


</script>