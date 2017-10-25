<template lang="html">
  <div>
    <div class="has-margin-5 container">
      <b-row class="has-border-bottom">
        <b-col xm="12" md="9">
          <h4>Προμηθευτές</h4>
        </b-col>
        <b-col xm="12" md="3">
          <b-btn v-b-modal.modalAddLocation class="add-btn-simple shadow-2" variant="primary"><i class="fa fa-plus" aria-hidden="true"></i> </b-btn>
        </b-col>
      </b-row>
      <b-row class="has-margin-5">
        <b-col xm="12">
          <b-card class="shadow-1" border-variant="white">
            <b-table hover show-empty
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
               :fields="fields"
               :items="suppliers"
               class="has-margin-2 has-border"
            >
            <template slot="title" scope="data">
              <b-btn variant="link" class="more-actions gray-link">
                <b>{{data.item.title}}</b>
              </b-btn>
            </template>
            <template slot="actions" scope="data">
              <b-row>
                <b-col xs="12">
                  <b-btn variant="link" size="sm" class="more-actions gray-link" @click="showModalViewSupplier(data.item.id, data.item.title)">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </b-btn>
                  <b-btn variant="link" size="sm" class="more-actions gray-link" @click="showModal2(data.item.id)">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </b-btn>
                  <b-btn variant="link" size="sm" class="more-actions gray-link" v-b-modal.modal3>
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </b-btn>
                </b-col>
              </b-row>
            </template>
            </b-table>
          </b-card>
        </b-col>
      </b-row>
    </div>

    <b-modal id="modalAddLocation" ref="modalAddLocation" title="Προσθήκη προμηθευτή" size="lg"
            hide-footer no-close-on-backdrop no-close-on-esc>
      <add-supplier></add-supplier>
    </b-modal>
    <b-modal id="modalViewSupplier" ref="modalViewSupplier" :title="this.title" hide-footer>
      <view-supplier :id="this.id"></view-supplier>
    </b-modal>
  </div>
</template>

<script>
import AddSupplier from './addSupplier'
import ViewSupplier from './viewSupplier'
export default {
  data () {
    return {
      isDanger: 'warning',
      isSuccess: 'success',
      sortBy: 'title',
      sortDesc: false,
      id: '',
      title: '',
      fields: {
        title: { label: 'Εταιρία', sortable: true },
        email: { label: 'Email', sortable: true },
        productType: { label: 'Προϊόντα', sortable: true },
        status: { label: 'Status', sortable: true },
        actions: { label: 'Actions' }
      }
    }
  },
  components: {
    AddSupplier,
    ViewSupplier
  },
  methods: {
    showModalViewSupplier ($id, $title) {
      this.id = $id
      this.title = $title
      this.$refs.modalViewSupplier.show()
    }
  },
  computed: {
    suppliers () {
      return this.$store.getters.loadedSuppliers
    }
  }
}
</script>

<style lang="scss" scoped>
  .success {
    color: #00ce6a;
  }
  .yellow-border {
    border-left: 5px solid #ffb85c
  }

  h4:hover {
    text-decoration: none;
  }

  [v-cloak] {
    display: none;
  }
</style>
