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
    + "<i class='material-icons' id='thumbs-up-idea'>thumb_up</i>"
    + "<i class='material-icons' id='thumbs-down-idea'>thumb_down</i></div>"
    + "<div class='col s10' id='idea-meat'>"
    + "<h5 contenteditable='true' class='title-editable'>"
    + idea.title
    + "</h5><p contenteditable='true' class='body-editable'>"
    + truncate(idea.body)
    + "</p><p class='quality'>Quality: "
    + idea.quality
    + "</div><div class='col s1'>"
    + "<i class='material-icons' id='delete-idea'>close</i></div></li>"
  )
  thumbsUp();
  thumbsDown();
  searched();
  editTitle();
  editBody();
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
    $('#filter-count').text('Matching Ideas: ' +count);
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

function editTitle(){
  $('.title-editable').keydown(function(event){
    if(event.keyCode == 13){
      var $title = event.currentTarget.textContent
      var $idea = $(this).closest('li.collection-item.idea')
      var $id = $(this).closest('li').attr('data-id')
      var ideaParams = {
        idea: {
          title: $title
        }
      }

      $.ajax({
        type: 'PUT',
        url: '/api/v1/ideas/' + $id + '.json',
        data: ideaParams,
        success: function(idea){
          $(event.target).blur();
          updateTitle($idea, idea.title);
        }
      })
    }
  })
}

function updateTitle(idea, title){
  $(idea).find('.title-editable').html(title);
}

function editBody(){
  $('.body-editable').keydown(function(event){
    if(event.keyCode == 13){
      var $body = event.currentTarget.textContent
      var $idea = $(this).closest('li.collection-item.idea')
      var $id = $(this).closest('li').attr('data-id')
      var ideaParams = {
        idea: {
          body: $body
        }
      }

      $.ajax({
        type: 'PUT',
        url: '/api/v1/ideas/' + $id + '.json',
        data: ideaParams,
        success: function(idea){
          $(event.target).blur();
          updateBody($idea, idea.body);
        }
      })
    }
  })
}

function updateBody(idea, body){
  $(idea).find('.body-editable').html(body);
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
