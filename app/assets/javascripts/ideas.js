$(document).ready(function(){
  $.getJSON('/api/v1/ideas', function(data) {
    $.each(data, function(index, idea){
      renderIdeas(idea)
    })
  })
    .then(function(data){ console.log('It Worked')})
    .fail(function(data){ console.log('It Failed :(')})
    .always(function(data){ console.log('Stuff is happening.')})

});

function renderIdeas(idea) {
  $('#idea-listing').append(
    "<h3>"
    + idea.title
    + "</h3><p>"
    + idea.body
    + "</p>"
  )
};
