import authApi from '@/api/auth';

const state = {
  isSubmitting: false
};

const mutations = {
  registerStart(state) {
    state.isSubmitting = true;
  }
};

const actions = {
  register(context, credentials) {
    return new Promise(() => {
      authApi
        .register(credentials)
        .then(res => {
          console.log(res);
        })
        .catch(result => {
          console.log('err', result);
        });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
