<template>
<q-page>
    <div class="row q-mt-md">
        <div class="col-10 q-ml-md">
            <div class="text-bold" style="font-size: 20px">Novo Contacto</div>
        </div>
        <div class="q-mr-md absolute-right">
            <q-btn  color="primary" @click="save" label="Guardar" />
        </div>
    </div>
    <div class="row justify-center q-pa-sm q-mt-sm q-gutter-md "  >
        <div class="col-12 q-pa-sm">
            <q-card class="my-card shadow-5">
                <q-card-section>
                    <div class="text-bold">Nome</div>
                </q-card-section>
            <q-card-section class="q-pt-none">
                 <q-input v-model="name" label="Introduzir nome Completo" />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 q-pa-sm ">
            
            <q-card class="my-card shadow-5">
                <q-card-section>
                    <div class="text-bold">Numero de celular</div>
                </q-card-section>
            <q-card-section class="q-pt-none">
                 <q-input v-model="phone" label="Introduzir o numero" />
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 q-pa-sm">
            <q-img
          :src="imgPreview"
          spinner-color="white"
          style="height: 300px ; full-width "
          />
          </div>
          <div class="col-12 q-pa-sm">
              <q-file
            v-model="file"
            outlined
            label="Capa do livro"
            ref="image"
              lazy-rules
             :rules="[ val =>  val && val.length !== 0  || 'Insira uma image ']"
            :filter="checkFileType"
            @rejected="onRejected"
          >
          <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
              </q-file>
          </div>
    </div>

</q-page>  
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'
const firebaseConfig = {
  apiKey: 'AIzaSyANNGIKFv2l-8erpAEU0ds5J6cXRxlkRjc',
  authDomain: 'bandbook-fc051.firebaseapp.com',
  projectId: 'bandbook-fc051',
  storageBucket: 'bandbook-fc051.appspot.com',
  messagingSenderId: '641116539309',
  appId: '1:641116539309:web:1c78745d2e994626c23924',
  measurementId: 'G-QX72JGDEYF'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export default {
    
 data () {
     return {
         name: '',
         phone: '',
         image_url: '',
         imgPlaceolder: 'http://via.placeholder.com/300',
         file: null,

     }
 },
 methods : {
      checkFileType (files) {
      this.image_url = URL.createObjectURL(files[0])
      return files.filter(file => file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg')
    },
    onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    async save () {
        const notif = this.$q.notify({
        group: false, // required to be updatable
        timeout: 0, // we want to be in control when it gets dismissed
        spinner: true,
        message: 'Uploading file...',
        caption: '0%'
      })
    let upload = 0

      const location = `bandbook/${this.file.name}`
    const uploadTask = firebase.storage().ref().child(location).put(this.file)


    uploadTask.on('state_changed', (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      upload = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      if (upload === 100) {
         ///
      }
       notif({
           caption: `${upload}%`
        })
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
           notif({
           caption: `${upload}%`
        })
          break
        case firebase.storage.TaskState.RUNNING: // or 'running'
          break
      }
    }, (error) => {
      // Handle unsuccessful uploads
      console.log(error)
      this.$q.notify({
        type: 'negative',
        message: 'Erro no upload de imagens'
      })
    }, () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
      
        const { data } = await Vue.prototype.$axios.post(`http://localhost:3000/contacts/create`, {name: this.name,phone: this.phone,image_url: downloadURL})
        if (!data.error) {
        //  commit('ADD_BOOK', data.data)
          notif({
            icon: 'done', // we add an icon
            spinner: false, // we reset the spinner setting so the icon can be displayed
            message: 'Uploading done!',
            timeout: 2500 // we will timeout it in 2.5s
          })
          this.$router.push('/')
         // commit('SET_BOOK', data)
        } else {
          Notify.create({
            type: 'negative',
            message: data.error
          })
        }
      })
    })



    
    }
 },
 computed: {
    imgPreview () {
      return this.image_url === '' ? this.imgPlaceolder : this.image_url
    }
  }
}
</script>

<style>

</style>