<template>
  <div class="">
    <form @submit.prevent="onCreateSupplier">
      <b-card no-body class="has-margin-2">
        <b-tabs ref="tabs" card>
            <b-tab title="Βασικά στοιχεία" active>
              <b-form-group id="exampleInputGroup1"
                        label="* Επωνυμία επιχείρησης:" label-for="exampleInput1" >
                <b-form-input id="exampleInput1" type="text" required v-model="title"
                              placeholder="Το όνομα της εταιρίας" class="form-control"
                              size="lg"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="exampleInputGroup2"
                        label="* Email:" label-for="exampleInput2" class="has-margin-2">
                <b-form-input id="exampleInput2" type="text" required v-model="email"
                              placeholder="" class="form-control"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="exampleInputGroup2"
                        label="* Προϊόντα:" label-for="exampleInput2" class="has-margin-2">
                <b-form-input id="exampleInput2" type="text" required v-model="productType"
                              placeholder="Το είδος των προϊόντων, π.χ. whiskey, νερό κλπ" class="form-control"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="exampleInputGroup3"
                        label="* Status:" label-for="exampleInput3" required>
                <b-form-select v-model="selected" :options="options" class="mb-3"></b-form-select>
              </b-form-group>

            </b-tab>
            <b-tab title="Άλλα στοιχεία">
              <b-row>
                <b-col xs="12">
                  <b-form-group id="exampleInputGroup4"
                            label="Διεύθυνση:" label-for="exampleInput4" >
                    <b-form-input id="exampleInput4" type="text" v-model="address"
                                  placeholder="" class="form-control"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col xs="12" md="6">
                  <b-form-group id="exampleInputGroup2"
                            label="Χώρα:" label-for="exampleInput2" >
                    <b-form-input id="exampleInput2" type="text" v-model="country"
                                  placeholder="" class="form-control"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col xs="12" md="6">
                  <b-form-group id="exampleInputGroup3"
                            label="Πόλη:" label-for="exampleInput3" >
                    <b-form-input id="exampleInput3" type="text" v-model="city"
                                  placeholder="" class="form-control"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col xs="12" md="6">
                  <b-form-group id="exampleInputGroup4"
                            label="Τηλέφωνο:" label-for="exampleInput4" >
                    <b-form-input id="exampleInput4" type="text" v-model="phone"
                                  placeholder="" class="form-control"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col xs="12" md="6">
                  <b-form-group id="exampleInputGroup2"
                            label="Website:" label-for="exampleInput2" >
                    <b-form-input id="exampleInput2" type="text" v-model="website"
                                  placeholder="" class="form-control"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="has-margin-2">
                <b-col xs="12" md="6">
                  <b-form-group id="exampleInputGroup2"
                            label="Υπέυθυνος επικοινωνίας:" label-for="exampleInput2" >
                    <b-form-input id="exampleInput2" type="text" v-model="contactPerson"
                                  placeholder="" class="form-control"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

            </b-tab>
            <b-tab title="Σημειώσεις">
              <b-form-textarea id="textarea1"
                     v-model="notes"
                     placeholder="Σημειώσεις για τον προμηθευτή"
                     :rows="5"
                     :max-rows="20">
              </b-form-textarea>
            </b-tab>
        </b-tabs>
      </b-card>
      <b-row class="has-margin-2 text-center">
        <b-col xs="4" v-if="!loading">
          <b-button type="submit" variant="primary">Καταχώρηση</b-button>
        </b-col>
        <b-col xs="4" v-if="loading">
          <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
          <span class="sr-only">Loading...</span>
        </b-col>
      </b-row>
      <b-row class="has-margin-2">
        <b-col xs="12">
          <b-alert :variant="messageType"
                dismissible
                :show="showAlert"
                @dismissed="showAlert=false">
            {{this.message}}
          </b-alert>
        </b-col>
      </b-row>


    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: null,
      options: [
        { value: null, text: '-- Eπιλoγή status --' },
        { value: 'Δεν έχουμε επικοινωνήσει ακόμα', text: 'Δεν έχουμε επικοινωνήσει ακόμα' },
        { value: 'Δεν ενδιαφέρονται', text: 'Δεν ενδιαφέρονται' },
        { value: 'Αναμονή απάντησης', text: 'Αναμονή απάντησης' },
        { value: 'Ενδιαφέρεται', text: 'Ενδιαφέρεται' },
        { value: 'Υπάρχει συνεργασία', text: 'Υπάρχει συνεργασία' }
      ],
      title: '',
      email: '',
      productType: '',
      address: '',
      city: '',
      country: '',
      phone: '',
      website: '',
      contactPerson: '',
      notes: '',
      showAlert: false,
      isLoading: null
    }
  },
  methods: {
    onCreateSupplier () {
      const supplier = {
        title: this.title,
        email: this.email,
        address: this.address,
        city: this.city,
        country: this.country,
        phone: this.phone,
        website: this.website,
        contactPerson: this.contactPerson,
        notes: this.notes,
        status: this.selected,
        productType: this.productType
      }
      this.$store.dispatch('createSupplier', supplier)
      setTimeout(() => {
        this.title = ''
        this.email = ''
        this.address = ''
        this.city = ''
        this.country = ''
        this.phone = ''
        this.website = ''
        this.contactPerson = ''
        this.notes = ''
        this.productType = ''
        this.selected = null
        this.showAlert = true
      }, 2000)
      setTimeout(() => {
        this.showAlert = false
      }, 5000)
    }
  },
  computed: {
    loading () {
      return this.$store.getters.getLoading
    },
    message () {
      return this.$store.getters.getMessage
    },
    messageType () {
      return this.$store.getters.getMessageType
    }
  }
}
</script>

<style lang="css">
</style>
