<template>
  <div class="">
    <b-row class="text-center loading-row" align-v="center" v-if="loading">
      <div class="loading-pulse"></div>
    </b-row>
    <div class="app" v-else>
      <dashboard-header></dashboard-header>
      <div class="app-body">
        <sidebar-body></sidebar-body>
        <main class="main">
          <div class="container-fluid has-margin-10">
            <router-view></router-view>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardHeader from '@/components/navigation/dashboardHeader'
import SidebarBody from '@/components/navigation/sidebar/sidebarBody'
export default {
  data () {
    return {
    }
  },
  components: {
    DashboardHeader,
    SidebarBody
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    loading () {

    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
</style>
