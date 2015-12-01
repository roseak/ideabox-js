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
    "<li class='collection-item idea' data-id='" + idea.id
    + "'><h5>"
    + idea.title
    + "</h5><p>"
    + idea.body
    + "</p></li>"
  )
};
