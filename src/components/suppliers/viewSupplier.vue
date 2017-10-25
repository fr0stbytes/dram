<template>
  <div class="has-margin-2">
    <div class="text-center">
      <h4>{{supplier.title}}</h4>
      <h6 class="has-margin-1 warning">{{supplier.productType}}</h6>

    </div>
    <b-row class="has-margin-5 ml-1">
      <b-col xs="12" md="6">
        <b-row>
          <b-col xs="2" md="2" class="is-small text-center">
            <i class="fa fa-2x fa-envelope-o gray" aria-hidden="true"></i>
          </b-col>
          <b-col xs="10" md="10" class="pl-2">
            {{supplier.email}}<br>
            <em class="gray is-small pl-1">email</em>
          </b-col>
        </b-row>
        <b-row class="has-margin-1">
          <b-col xs="2" md="2" class="is-small text-center">
            <i class="fa fa-2x fa-mobile gray" aria-hidden="true"></i>
          </b-col>
          <b-col xs="10" md="10" class="pl-1">
            {{supplier.phone}}<br>
            <em class="gray is-small pl-1">τηλέφωνο</em>
          </b-col>
        </b-row>
        <b-row class="has-margin-1" v-if="supplier.contactPerson">
          <b-col xs="2" md="2" class="is-small">
            <i class="fa fa-2x fa-user-o gray" aria-hidden="true"></i>
          </b-col>
          <b-col xs="10" md="10" class="pl-1">
            {{supplier.contactPerson}}<br>
            <em class="gray is-small pl-1">υπεύθυνος επικ.</em>
          </b-col>
        </b-row>
      </b-col>
      <b-col xs="12" md="6">
        <b-row class="ml-2">
          <b-col xs="2" md="2" class="is-small">
            <i class="fa fa-2x fa-home gray" aria-hidden="true"></i>
          </b-col>
          <b-col xs="10" md="10" class="pl-2">
            <p>{{supplier.address}}</p>
            <p>{{supplier.city}}</p>
            <p>{{supplier.country}}</p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="has-margin-3">
      <b-col xs="12">
        <b-card
            sub-title="Σημειώσεις">
          <p class="card-text">
              {{supplier.notes}}
          </p>
          <b-alert show variant="warning" class="has-margin-2 text-center"><em><b>Status: </b> {{supplier.status}}</em></b-alert>
        </b-card>
      </b-col>
    </b-row>


  </div>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    supplier () {
      return this.$store.getters.loadedSupplier(this.id)
    }
  }
}
</script>

<style lang="scss">
  .gray {
    color: #ccc;
  }
</style>
