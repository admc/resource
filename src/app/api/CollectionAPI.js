var CollectionAPI = {}

CollectionAPI.fetch = function () {
  return new Promise(function (resolve, reject) {
    $.get( "/collection", function(result) {
      resolve(result);
    });
  });
}

CollectionAPI.create = function (collection) {
  return new Promise(function (resolve, reject) {
  $.post( "/collection/create", collection, function(result) {
      resolve(result);
    });
  });
}


module.exports = CollectionAPI;
