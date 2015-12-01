$(document).ready(function(){
  $.getJSON('/api/v1/ideas', function(data) {
    $.each(data, function(index, idea){
      renderIdeas(idea)
    })
  })
    .then(function(data){ console.log('It Worked')})
    .fail(function(data){ console.log('It Failed :(')})
    .always(function(data){ console.log('Stuff is happening.')})
    deleteIdea();
    createIdea();
});

function renderIdeas(idea) {
  $('#idea-listing').prepend(
    "<li class='collection-item idea' data-id='" + idea.id
    + "'><div class='row' id='idea-item'><div class='col m11'><h5>"
    + idea.title
    + "</h5><p class='truncate'>"
    + idea.body
    + "</p><p>Quality: "
    + idea.quality
    + "</div><div class='col m1'><a class='btn-flat' id='delete-idea'>"
    + "<i class='material-icons'>close</i></a></div></li>"
  )
};

function createIdea(){
  $('#create-idea').on('click', function(){
    var ideaTitle  = $('#idea-title').val()
    var ideaBody   = $('#idea-body').val()
    var ideaParams = {
      idea: {
        title: ideaTitle,
        body: ideaBody
      }
    }

    $('#idea-title').val('')
    $('#idea-body').val('')

    $.ajax({
      type: 'POST',
      url:  '/api/v1/ideas.json',
      data: ideaParams,
      success: function(idea){
        renderIdeas(idea)
      }
    })
  })
};

function deleteIdea() {
  $('#idea-listing').delegate('#delete-idea', 'click', function(){
    var $idea = $(this).closest('.idea')
    console.log($idea)
    console.log("Data-id: " + $idea.attr('data-id'))
    $.ajax({
      type: 'DELETE',
      url:  '/api/v1/ideas/' + $idea.attr('data-id') + '.json',
      success: function(){
        $idea.remove()
      },
      error: function(){
        $idea.remove()
        console.log('Idea already deleted')
      }
    })
  })
}
