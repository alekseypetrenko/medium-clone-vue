<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-sx-center">
            <router-link :to="{name: 'register'}"
              >Need an account??</router-link
            >
          </p>
          <McvValidationErrors
            :validation-errors="validationErrors"
            v-if="validationErrors"
          />
          <form @submit.prevent="onLogin">
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="password"
                v-model="password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import McvValidationErrors from '@/components/ValidationErrors';
import {actionTypes} from '@/store/modules/auth';
export default {
  components: {
    McvValidationErrors
  },
  name: 'MvcLogin',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
    // isSubmitting() {
    //   return this.$store.state.auth.isSubmitting;
    // },
    // validationErrors() {
    //   return this.$store.state.auth.validationErrors;
    // }
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors
    })
  },
  methods: {
    onLogin() {
      this.$store
        .dispatch(actionTypes.login, {
          email: this.email,
          password: this.password
        })
        .then(() => this.$router.push({name: 'globalFeed'}));
    }
  }
};
</script>

<style></style>
