<template>
  <div class="container-fluid">
    <div class="">
      <div class="">
        <!-- <h1 class="text-center my-5">Edit User</h1> -->
        <ValidationObserver v-slot="{ handleSubmit }"> 
          <form class="" @submit.prevent="handleSubmit(onSubmit)">
            <!-- Name -->
            <div>
              <div style="display:flex; justify-content:center;" class="form-group ">
                <div style="text-align:center;">
                  <p>Preview Here:</p>
                  <template v-if="preview">
                    <img  id="imgCon" :src="preview" class="img-fluid" /> <br>
                  </template>
                  <input style="margin:10px;" type="file" accept="image/*" @change="previewImage" class="form-control-file" id="my-file">
                </div>
                
          

              </div>
            </div>
      
            <div class="d-flex mt-2 justify-content-center">
              <input @click="onSubmit()" type="submit" class="col-5 text-white btn btn-primary" data-bs-dismiss="modal" value="Save Image">
            </div>
      
          </form>
        </ValidationObserver>
      </div>

    </div>
  </div>
      
     
</template>

<script>
export default {
  props:{
    user:{},
  },
  data() {
    return {
      preview: null,
      image: null,
      preview_list: [],
      image_list: [],

      responseMessageTrue: 'User image added.',
      responseMessageFalse: 'User image not added.'
    }
  },
  methods: {

    previewImage: function(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        this.image=input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

   async onSubmit() {
      console.log(this.formData);

      try {
      let response = await this.$axios.post(this.$store.state.urlBase+process.env.NUXT_ENV_ADD_CUSTOMER, this.formData);
      let data = response.data.sucessful
      console.log(data);
      
      if (data === true) {
        await this.$store.commit('addCustomerResponse', this.responseMessageTrue)
        alert('User added successfully')
      } else {
        await this.$store.commit('addCustomerResponse', this.responseMessageFalse)
        alert('New user not created.')
      }
    }
      catch (error) {
      this.error = error.message;
    }
    }
  },

}
</script>

<style scoped>
.roleCon{
  display: flex;
}

#imgCon{
     width: 150px;
    height: 150px;
    border-radius: 50%;
}
</style>