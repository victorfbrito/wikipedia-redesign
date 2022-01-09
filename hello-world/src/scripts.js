const app = new Vue({

  el: '#main',

  data: {

    result: ' ',
    responseAvailable: false,
    apiKey: '<YOUR_RAPIDAPI_KEY>'

  },

  methods: {

    fetchAPIData() {
      this.responseAvailable = false;

      fetch("https://jokes-database.p.rapidapi.com/", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "jokes-database.p.rapidapi.com",
          "x-rapidapi-key": this.apiKey
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            alert("Server returned " + response.status + " : " + response.statusText);
          }
        })
        .then(response => {
          this.result = response.body;
          this.responseAvailable = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

})