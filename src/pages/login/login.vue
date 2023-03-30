<template>
  <div class="login">
    <star-sky class="star-sky"></star-sky>
    <div class="login-form-wrapper">
      <form class="login-form" @submit.prevent="login">
        <el-input id="input_user" v-model="user_login.username" @input="onUsername" placeholder="请输入用户名" clearable >
          <template #prefix><el-icon size="16"><User /></el-icon></template>
        </el-input>
        <label for="input_user"></label>
        <div id="margin-input"></div>
        <el-input id="input_password" v-model="user_login.password" @input="onPassword" type="password" placeholder="请输入密码" clearable >
          <template #prefix><el-icon size="16"><Lock /></el-icon></template>
        </el-input>
        <el-button id="login-button" type="primary" native-type="submit">登录</el-button>

      </form>
    </div>
  </div>
</template>

<script>
import { reactive,toRefs,ref  } from 'vue';
import StarSky from '@/components/StarSky.vue';
export default {
  name: "Login",
  setup() {
    // const _username = ref('')
    // const _password = ref('')
    const user_login = reactive({
      username: "",
      password: ""
    });
    const onUsername = (value) => {
      console.log(value);
      user_login.username = value;
    };
    const onPassword = (event) =>{
      console.log(event);
      user_login.password = event;
    };
    return {
      user_login,
      onUsername,
      onPassword,
    }
  },
  methods: {
    login() {
      this.$http.post('/api/login', {
        username: this.user_login.username,
        password: this.user_login.password
      })
      .then(response => {
         // 登录成功并使用vuex4管理token或者使用缓存保存
         this.$store.dispatch('login',response.data.token)
         localStorage.setItem('token', response.data.token)
         this.$router.push('/index')
      })
      .catch(error => {
        // 登录失败
        console.log(error)
      })
    }
  },
  created() {

  },
  components: {
    StarSky,
  },
};
</script>

<style>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100vw;
  height: 100vh;
}

#login-button{
  width: 350px;
  margin-top: 20px;
}

.star-sky {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.login-form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 500px; /* 设置宽度为500px */
  height: 380px; /* 设置高度为380px */
  padding: 20px; /* 左右内边距各为50px */
  background-color: rgba(29, 27, 168, 0.2);
  border-radius: 5px;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 100%;
}
#margin-input{
  margin: 10px 0;

}
.login-form input {
  margin-top: 5px;
  margin-bottom: 5px;
}

.el-button {
  width: 100%;
}

</style>
