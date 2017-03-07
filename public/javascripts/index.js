$("#newPost").submit(function(e) {
    var data = {type:'', title:'', post:''}
    var formData = $("#newPost").serializeArray();

    if($('#text-tab').hasClass('active')){
        data.type = "text";
        data.title = $('#textTitle').val();
        data.post = $('#textPost').val();
    }else if($('#link-tab').hasClass('active')){
        data.type = "link";
        data.title = $('#linkTitle').val();
        data.post = $('#linkPost').val();
    }

    var url = "/api/newPost"; // the script where you handle the form input.
    $.ajax({
        async:false,
        type: "POST",
        url: url,
        data: data,
        success: function(data)
        {
           //alert(data);
        }
    });

    e.preventDefault(); // avoid to execute the actual submit of the form.
    location.reload();
});
function deletePosts(x){
    var url = "/api/deletePost"; // the script where you handle the form input.
    var data = {'posts':JSON.stringify(x)};
    $.ajax({
        async:false,
        type: "POST",
        url: url,
        data: data,
        success: function(data)
        {
           //alert(data);
        }
    });
    location.reload();
}
$('#selectAll').click(function() {
    for (toggle of $('.delete-btn')) {
        $(toggle).button('toggle');
    }
});
$('#selectTime').click(function() {
    for (toggle of $('.delete-btn')) {
        var time = $(toggle).parent().nextAll(1).children().text();
        if(time.includes("just now")||time.includes("minutes")){
            $(toggle).button('toggle');
        }
    }
});
$('#applyDeletion').click(function() {
    var toDelete = [];
    for (toggle of $('.delete-btn')) {
        if($(toggle).hasClass('active')){
            toDelete.push($(toggle).attr('id'))
        }
    }
    console.log(toDelete);
    deletePosts(toDelete);
});
