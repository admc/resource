var ProjectAPI = {}

ProjectAPI.fetch = function () {
  return new Promise(function (resolve, reject) {
    $.get( "/project/list", function(result) {
      resolve(result);
    });
  });
}

ProjectAPI.create = function (project) {
  return new Promise(function (resolve, reject) {
  $.post( "/project/create", project, function(result) {
      resolve(result);
    });
  });
}


module.exports = ProjectAPI;
