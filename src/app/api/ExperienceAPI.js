var ExperienceAPI = {}

ExperienceAPI.fetch = function () {
  return new Promise(function (resolve, reject) {
    $.get( "/experience", function(result) {
      resolve(result);
    });
  });
}

ExperienceAPI.create = function (experience) {
  return new Promise(function (resolve, reject) {
  $.post( "/experience/create", experience, function(result) {
      resolve(result);
    });
  });
}


module.exports = ExperienceAPI;
