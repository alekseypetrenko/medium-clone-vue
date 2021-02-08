import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null
};

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure'
};

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login'
};

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrrors = null;
  },
  [mutationTypes.registerSuccess](state, userPayload) {
    state.isSubmitting = false;
    state.currentUser = userPayload;
    state.isLoggedIn = true;
  },
  [mutationTypes.registerFailure](state, errorsPayload) {
    state.isSubmitting = false;
    state.validationErrors = errorsPayload;
  },
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrrors = null;
  },
  [mutationTypes.loginSuccess](state, userPayload) {
    state.isSubmitting = false;
    state.currentUser = userPayload;
    state.isLoggedIn = true;
  },
  [mutationTypes.loginFailure](state, errorsPayload) {
    state.isSubmitting = false;
    state.validationErrors = errorsPayload;
  }
};

const actions = {
  [actionTypes.register](context, credentials) {
    context.commit(mutationTypes.registerStart);
    return new Promise(resolve => {
      authApi
        .register(credentials)
        .then(response => {
          context.commit(mutationTypes.registerSuccess, response.data.user);
          setItem('accesToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch(result => {
          context.commit(
            mutationTypes.registerFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.login](context, credentials) {
    context.commit(mutationTypes.loginStart);
    return new Promise(resolve => {
      authApi
        .login(credentials)
        .then(response => {
          context.commit(mutationTypes.loginSuccess, response.data.user);
          setItem('accesToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch(result => {
          context.commit(
            mutationTypes.loginFailure,
            result.response.data.errors
          );
        });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
