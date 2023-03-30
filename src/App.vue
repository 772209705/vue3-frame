<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
// import { useStore } from 'vuex';
// import { mapMutations } from 'vuex';

export default defineComponent({
  name: 'App',
  setup() {
    // const store = useStore();
    // const isLoggedIn = store.state.isLoggedIn;
    // const user = store.state.user;
    const logout = () => {
      store.commit('logout');
    };

    return {
      // isLoggedIn,
      // user,
      // ...mapMutations(['logout']),
    };
  },
  mounted() {
    // const store = useStore();
    // if (!localStorage.getItem('token')) {
    //   this.$router.push('/login');
    // }
  },
});
</script>

<style>


</style>