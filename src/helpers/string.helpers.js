class StringHelpers {
  static initialize = () => {
    // eslint-disable-next-line no-extend-native
    String.prototype.capitalize = function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    // eslint-disable-next-line no-extend-native
    String.prototype.toCamelCase = function () {
      return this.replace(/_(.)/g, function ($1) {
        return $1.toUpperCase();
      })
        .replace(/_/g, "")
        .replace(/^(.)/, function ($1) {
          return $1.toLowerCase();
        })
        .capitalize();
    };
    // eslint-disable-next-line no-extend-native
    String.prototype.unCamelify = function () {
      return this.replace(/([A-Z])/g, "_$1")
        .replace(/_(.)/g, function ($1) {
          return $1.toLowerCase();
        })
        .replace("_", "");
    };
    // eslint-disable-next-line no-extend-native
    String.prototype.containsOneOf = function(...patterns){
      let result = false;
      patterns.forEach(p => {
        if(this.includes(p)){
          result = true;
        }
      });
      return result;
    }

    JSON.tryParse = function(text){
      let result;
      try{
          result = JSON.parse(text);
      }
      catch(error){
          console.log(error, text);
      }
      return result;
  }
  // eslint-disable-next-line no-extend-native
  String.prototype.toJson = function () {
    let result;
    try {
      result = JSON.parse(this);
    } catch (error) {
      console.log(error, this);
    }
    return result;
  };
  };
}

module.exports = StringHelpers.initialize();
