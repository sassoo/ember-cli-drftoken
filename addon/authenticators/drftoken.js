import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';


const { RSVP: { Promise }, get, run } = Ember;


export default Base.extend({
  /* public mutable properties */
  serverTokenEndpoint: null,

  /* public methods */
  authenticate(username, password) {
    let data = {'username': username, 'password': password};

    return new Promise((resolve, reject) => {
      this.makeRequest(data).then(response => {
        run(() => { resolve(response); });
      }, xhr => {
        run(() => { reject(xhr.responseJSON || xhr.responseText); });
      });
    });
  },

  makeRequest(data) {
    return jQuery.ajax({
      url: get(this, 'serverTokenEndpoint'),
      contentType: 'application/x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      method: 'POST',
      beforeSend(xhr, settings) {
        xhr.setRequestHeader('Accept', settings.accepts.json);
      }
    });
  },

  restore(data) {
    return Promise.resolve(data);
  },
});
