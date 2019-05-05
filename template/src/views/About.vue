<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }

    },
    methods: {


    },
    created() {

    },
    mounted() {
      console.log('about mounted')
      console.log(this.$store.state)
      this.$store.dispatch('updateA')
      this.$store.dispatch('about/update')

    }
  }


</script>
