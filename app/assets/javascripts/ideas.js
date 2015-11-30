$(document).ready(function(){
  $.getJSON('/api/v1/ideas')
    .then(function(data){ console.log('It Worked')})
    .fail(function(data){ console.log('It Failed :(')})
    .always(function(data){ console.log('Stuff is happening.')})
});
