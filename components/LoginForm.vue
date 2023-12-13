<template>

    <div class="container">
      <div class="d-flex formContainer">
        <div class="shadow card p-md-5 col-lg-6 col-md-8 col-sm-10 mx-auto my-auto">
          
          <div class="card-body">
            <p class="display-4 mb-3 pt-2 text-center text-primary">Login</p>

            <span class="d-flex text-primary mb-2 justify-content-center bi bi-people display-1"></span>
            
            <ValidationObserver v-slot="{  }">
              <form class="" method="post" :action=accesspoint>
                
                <ValidationProvider name="username" rules="" v-slot="{ errors }">
                  <div class="input-group">
                    <span class="input-group-text text-primary bg-white" for="exampleInputUsername1" id="basic-addon1">Username</span>
                    <input v-model="formData.userName" type="text" class="form-control" id="uid" name="uid" aria-describedby="UsernameHelp">
                    <i class="input-group-text text-success bg-white bi bi-person-fill" id="basic-addon2"></i>
                  </div>
                    <div id="UsernameHelp" class="text-danger form-text mb-4">{{errors[0]}}</div>
                </ValidationProvider>

                <ValidationProvider name="password" rules="" v-slot="{ errors }">
                  <div class="input-group">
                    <span class="input-group-text text-primary bg-white" for="exampleInputPasswordname1" id="basic-addon1">Password</span>
                    <input v-model="formData.userPassword" type="password" class="form-control" id="upassw" name="upassw" aria-describedby="PasswordHelp">
                    <i class="input-group-text text-success bg-white bi bi-lock-fill" id="basic-addon2"></i>
                  </div>
                    <div id="PasswordHelp" class="text-danger form-text mb-4">{{errors[0]}}</div>
                </ValidationProvider>

                <div class="d-flex col-8 mx-auto justify-content-between mb-4">
                  <div class="form-check">
                    <input class="form-check-input" v-model="formData.shift" type="radio" name="shift" value="1" id="flexRadioDefault1">
                    <label class="form-check-label" for="flexRadioDefault1">
                      Morning Shift
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" v-model="formData.shift" type="radio" name="shift" value="2" id="flexRadioDefault2" checked>
                    <label class="form-check-label" for="flexRadioDefault2">
                      Afternoon Shift
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" v-model="formData.shift" type="radio" name="shift" value="3" id="flexRadioDefault2" checked>
                    <label class="form-check-label" for="flexRadioDefault2">
                      Evening Shift
                    </label>
                  </div>
                </div>

                <div class="d-flex mt-2 justify-content-center">
                  <input type="submit" value="Login" class="col-5 text-white btn btn-primary">
                </div>

              </form>
            </ValidationObserver>
            
          </div>
        
        </div>
      </div>
    </div>
</template>

<script>



export default {
  data() {
    return {
      formData: {
        userName: '',
        userPassword: '',
        shift:''
      },
      accesspoint: this.$store.state.urlBase + "adminloginin"
    }
  },
  methods: {
    async onSubmit() {
      console.log(this.formData);
      try {

      let response = await this.$axios.post(this.$store.state.urlBase+process.env.NUXT_ENV_LOGIN, {
           params: {
           uid: this.formData.userName,
            upassw: this.formData.userPassword,
            shift: this.formData.shift
  
          }
      })
        
          
      console.log(response);  

      if (response.data.sucessful == true) {
          console.log('Logged In');
        // this.testLogin()
        // try {
          // this.testLogin()
          // let responseII = await this.$axios.get(this.$store.state.urlBase+process.env.NUXT_ENV_LOGIN_STATE)
          // console.log(responseII);
          
          
          
          
          
          
          
          
          
          
          // {withCredentials: true})
          // this.$axios.defaults.withCredentials = true;
          // let responseII = this.$axios.create(
            // {withCredentials : true}
            
          // )
          // let date = responseII(this.$store.state.urlBase+process.env.NUXT_ENV_LOGIN_STATE)
          // console.log(date);
        // } catch (error) {
          // this.error = error.message;
        // console.log(error);
        // }
      } else {
        console.log('NOT LOGGED IN');
        
      }
        
        

      }
      catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },
    async testLogin() {
       $.ajax({
    url:'http://54.227.172.35/andypos/haslogin',
    crossDomian: true,
    // headers: {
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin':'http://localhost/'
 
    //      },
    type: "GET", /* or type:"GET" or type:"PUT" */
    dataType: "json",
    data:{},
    success: function (result) {
 console.log(result); 
        try{
            
    }catch(err){
        
        console.log(err); 
    }
//         console.log(result2);   
    },
    error: function (err) {
       
       
       
//     console.log(err);
    }
});
    }
  },
}
</script>

<style>

</style>