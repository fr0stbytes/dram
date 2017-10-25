<template>
  <div class="container has-margin-5">
    <b-row class="has-border-bottom">
      <b-col xm="12" md="9">
        <h4>Users</h4>
      </b-col>
    </b-row>
    <b-row class="has-margin-5">
      <b-col xm="12">
        <b-card class="shadow-1" border-variant="white">
          <b-table hover show-empty
             :fields="fields"
             :items="users"
             class="has-margin-2 has-border"
          >
          <template slot="username" scope="data">
            <p v-bind:class="roleType(data.item.role)"><b>{{data.item.username}}</b></p>
          </template>
          <template slot="role" scope="data">
            <p v-bind:class="roleType(data.item.role)"><i class="fa fa-circle is-small" aria-hidden="true"></i>  &nbsp; {{data.item.role}}</p>
          </template>
            <template slot="actions" scope="data">
              <b-row>
                <b-col xs="6" md="4">
                  <b-btn variant="link" size="sm" class="more-actions gray-link" @click="showModal1(data.item.id)" v-if="data.item.role === 'user'">
                    <i class="fa fa-exclamation" aria-hidden="true"></i> &nbsp;Set to admin
                  </b-btn>
                  <b-btn variant="link" size="sm" class="more-actions gray-link" @click="showModal2(data.item.id)" v-if="data.item.role === 'admin'">
                    <i class="fa fa-lock" aria-hidden="true"></i> &nbsp;Set to user
                  </b-btn>
                </b-col>
                <b-col xs="6" md="4">
                  <b-btn variant="link" size="sm" class="more-actions gray-link" v-b-modal.modal3 v-if="data.item.role === 'user'">
                    <i class="fa fa-trash" aria-hidden="true"></i> &nbsp;Delete
                  </b-btn>
                </b-col>
              </b-row>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>

    <b-modal id="modal1" ref="modal1" title="Set to Admin" hide-footer>
      <h6>Are you sure you want to change this user's role to <b class="primary">Admin</b> ?</h6>
      <b-btn variant="outline-secondary" class="has-margin-3" @click="hideModal1">Cancel</b-btn>
      <b-btn variant="success" class="has-margin-3" @click.stop="setToAdmin">Confirm</b-btn>
    </b-modal>

    <b-modal id="modal2" ref="modal2" title="Set to Admin" hide-footer>
      <h6>Are you sure you want to change this user's role to <b class="primary">User</b> ?</h6>
      <b-btn variant="outline-secondary" class="has-margin-3" @click="hideModal2">Cancel</b-btn>
      <b-btn variant="success" class="has-margin-3" @click.stop="setToUser">Confirm</b-btn>
    </b-modal>

    <b-modal id="modal3" ref="modal3" title="Set to Admin" hide-footer>
      <h6>Are you sure you want to <b class="danger">DELETE</b> this user?</h6>
      <em>DELETENG A USER IS A PERMANENT ACTION AND CANNOT BE UNDONE!</em>
      <b-btn variant="outline-secondary" class="has-margin-3" @click="hideModal3">Cancel</b-btn>
      <b-btn variant="danger" class="has-margin-3" @click.stop="deleteUser(data.item.id)">DELETE</b-btn>
    </b-modal>

  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      email: '',
      username: '',
      role: '',
      isPrimary: 'primary',
      isSuccess: 'success',
      fields: {
        username: { label: 'Username', sortable: true },
        email: { label: 'Email', sortable: true },
        role: { label: 'Role', sortable: true },
        actions: { label: 'Actions' }
      },
      showMore: false
    }
  },
  methods: {
    roleType: function ($role) {
      if ($role === 'admin') {
        return this.isSuccess
      } else {
        return this.isPrimary
      }
    },
    showModal1 ($id) {
      this.$refs.modal1.show()
      this.id = $id
    },
    showModal2 ($id) {
      this.$refs.modal2.show()
      this.id = $id
    },
    hideModal1 () {
      this.$refs.modal1.hide()
    },
    hideModal2 () {
      this.$refs.modal2.hide()
    },
    hideModal3 () {
      this.$refs.modal3.hide()
    },
    setToAdmin () {
      const id = this.id
      const role = 'admin'
      this.$store.dispatch('userChangeRole', {
        id,
        role
      })
      setTimeout(() => {
        this.$refs.modal1.hide()
      }, 500)
    },
    setToUser () {
      const id = this.id
      const role = 'user'
      this.$store.dispatch('userChangeRole', {
        id,
        role
      })
      setTimeout(() => {
        this.$refs.modal2.hide()
      }, 500)
    }
  },
  computed: {
    users () {
      return this.$store.getters.loadedUsers
    }
  },
  created: function () {
    this.$store.dispatch('loadUsers')
  }
}
</script>

<style lang="scss">

</style>
