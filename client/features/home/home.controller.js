export default class HomeController {
  constructor($http) {
    this.data = [];
    this.saving = false;
    this.nbOfBins = 5;
    this.$http = $http;
  }


  complete(content) {
    console.log("upload completed");
    this.data = content.data;
  }
  save(nbOfBins) {
    this.saving = true;

    this.$http.post("/save", {name: this.file.name, bins: nbOfBins}).then(response => {
      console.info("saved");
    }).catch(err => {
      console.error(err);
    });
  }
  reset() {
    this.saving = false;
  }
}

HomeController.$inject = ["$http"];