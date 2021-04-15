export default ({ app, $axios, redirect }) => {
  $axios.onError((error) => {
    if (error.response) {
      if (error.response.status === 401) {
        redirect('/');
        app.$auth.logout();
      }
      if ([404, 500].includes(error.response.status)) redirect('/404')
    }

    return Promise.reject(error);
  });
}
