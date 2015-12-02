$(document).ready(function(){
    getIdeas();
    createIdea();
    deleteIdea();
});

function getIdeas(){
  $.getJSON('/api/v1/ideas', function(data) {
    $.each(data, function(index, idea){
      renderIdeas(idea)
    })
  });
};

function renderIdeas(idea) {
  $('#idea-listing').prepend(
    "<li class='collection-item idea' data-id='" + idea.id
    + "' data-quality='" + idea.quality
    + "'><div class='row' id='idea-item'><div class='col s1' id='thumbs'>"
    + "<a class='btn-flat' id='thumbs-up-idea'>"
    + "<i class='large material-icons'>thumb_up</i></a>"
    + "<a class='btn-flat' id='thumbs-down-idea'>"
    + "<i class='large material-icons'>thumb_down</i></a></div>"
    + "<div class='col s10' id='idea-meat'><h5>"
    + idea.title
    + "</h5><p>"
    + truncate(idea.body)
    + "</p><p class='quality'>Quality: "
    + idea.quality
    + "</div><div class='col s1'><a class='btn-flat' id='delete-idea'>"
    + "<i class='large material-icons'>close</i></a></div></li>"
  )
  thumbsUp();
  thumbsDown();
  searched();
};

function searched(){
  $('#filter').keyup(function(){
    var filter = $(this).val(), count = 0;
    $('#idea-listing li').each(function(){
      if ($(this).text().search(new RegExp(filter, 'i')) < 0) {
        $(this).fadeOut();
      } else {
        $(this).show();
        count++;
      }
    });
    var numberItems = count;
    $('#filter-count').text('Number of Comments = ' +count);
  });
}

function truncate(string){
  if(string.length > 100){
    return $.trim(string).substring(0, 100)
           .split(" ").slice(0, -1).join(" ") + "...";
  } else {
    return string;
  }
}

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

function thumbsUp(){
  $('#thumbs-up-idea').on('click', function(){
    var $idea = $(this).closest('li.collection-item.idea')
    var $id = $(this).closest('li').attr('data-id')
    var $quality = $(this).closest('li').attr('data-quality')
    var thumbsUpMap = {
      genius: "genius",
      plausible: "genius",
      swill: "plausible"
    }
    var ideaParams = {
      idea: {
        quality: thumbsUpMap[$quality]
      }
    }

    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/' + $id + '.json',
      data: ideaParams,
      success: function(idea){
        updateQuality($idea, idea.quality);
      },
    })
  })
}

function updateQuality(idea, quality){
  $(idea).find('.quality').html('Quality: ' + quality);
  $(idea).attr('data-quality', quality);
}

function thumbsDown(){
  $('#thumbs-down-idea').on('click', function(){
    var $idea = $(this).closest('li.collection-item.idea')
    var $id = $(this).closest('li').attr('data-id')
    var $quality = $(this).closest('li').attr('data-quality')
    var thumbsDownMap = {
      genius: "plausible",
      plausible: "swill",
      swill: "swill"
    }
    var ideaParams = {
      idea: {
        quality: thumbsDownMap[$quality]
      }
    }

    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/' + $id + '.json',
      data: ideaParams,
      success: function(idea){
        updateQuality($idea, idea.quality);
      },
    })
  })
}


// function updateIdea() {
//   $('#idea-listing').delegate('#update-idea', )
// }
