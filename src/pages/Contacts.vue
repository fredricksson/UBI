<template>
<q-page>
    <div class="row q-mt-md">
        <div class="col-10 q-ml-md ">
            <div class="text-h6" > Contactos</div>
        </div>
        <div class="q-mr-md absolute-right">
            <q-btn  color="primary" to="/new"  icon="add" />
        </div>
    </div>
    <div class="row justify-center q-pa-sm q-mt-sm">
        <div class="col-12">
            <q-input v-model="search"  filled type="search" hint="Search">
                <template v-slot:append>
                <q-icon name="search" @click="searchContact" />
                </template>
            </q-input>
        </div>
        <div class="col-12 q-mt-md q-gutter-md">
            <q-card class="my-card" v-for="(contact, index) in contacts" :key="index">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="contact.image_url">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold" style="font-size: 17px">{{contact.name}}</q-item-label>
          <q-item-label style="font-size: 12px" caption>
            {{contact.phone}}
          </q-item-label>
        </q-item-section>
      </q-item>
    
    </q-card>
        </div>
    </div>

</q-page>  
</template>

<script>
import Vue from 'vue'
export default {
async created () {
    this.list()
},
 data () {
     return {
         search: '',
         contacts: []
     }
 },
 methods: {
     async searchContact () {
         if (this.search === '')
         return this.list()
         const { data } = await Vue.prototype.$axios.get(`http://localhost:3000/contacts/findByName/${this.search}`)
         if (data.error) {
             this.$q.notify({
                type: 'negative',
                message: data.message,
                icon: 'warning'
              })
         }else {
             if(data === null) {
                 this.$q.notify({
                type: 'negative',
                message: "contacto inexistente",
                icon: 'warning'
              })
                 return
             }
             
             this.contacts = []
             this.contacts.push(data.data)
             this.$q.notify({
                type: 'positive',
                message: data.message,
                icon: 'check'
              })

         }
     },
    async list () {
        this.$q.loading.show()
         const { data } = await Vue.prototype.$axios.get(`http://localhost:3000/contacts/all`)
         if (data.error) {
             this.$q.notify({
                type: 'negative',
                message: data.message,
                icon: 'warning'
              })
         }else {
             this.contacts = data.data
             this.$q.notify({
                type: 'positive',
                message: data.message,
                icon: 'check'
              })

         }
         this.$q.loading.hide()
     }
 }
}
</script>

<style>

</style>