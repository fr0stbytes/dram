<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>

    <b-link class="navbar-brand" :to="'/'">Dashboard</b-link>
    <b-nav is-nav-bar class="d-md-down-none">
      <b-nav-item class="px-3"><router-link :to="'/'">Προμηθευτές</router-link></b-nav-item>
      <b-nav-item class="px-3"><router-link :to="'/'">Πρόϊόντα</router-link></b-nav-item>
      <b-nav-item class="px-3"><router-link :to="'/'">Κουτιά</router-link></b-nav-item>
      <b-nav-item class="px-3"><router-link :to="'/'">Marketing</router-link></b-nav-item>
      <b-nav-item class="px-3"><router-link :to="'/'">Οικονομικά</router-link></b-nav-item>
    </b-nav>
    <b-nav is-nav-bar class="ml-auto">
      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>{{user.email}}</em>
        </template>

        <b-dropdown-item><b-button variant="link danger" type="submit" @click="logout">Logout</b-button></b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item class="d-md-down-none">
        <i class="fa fa-envelope-o"></i><span class="badge badge-pill badge-danger">5</span>
      </b-nav-item>
    </b-nav>
  </header>
</template>
<script>
export default {
  name: 'dashboard-header',
  data () {
    return {
      alertValue: 'true'
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    logout () {
      this.$store.dispatch('logout')
      // this.$emit('displayMsg', this.alertValue)
      setTimeout(() => {
        this.$router.push('/login')
      }, 1000)
    }
  }
}
</script>
