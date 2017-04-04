var CLOUDINARY_URL = "https://api.cloudinary.com/api/v1_1/blerb/upload";
var CLOUDINARY_UPLOAD_PRESET = "wf7kurer";

var data = {type:'', title:'', post:''}

$("#newPost").submit(function(e) {
    var formData = $("#newPost").serializeArray();

    if($('#text-tab').hasClass('active')){
        data.type = "text";
        data.title = $('#textTitle').val();
        data.post = $('#textPost').val();
    }else if($('#link-tab').hasClass('active')){
        data.type = "link";
        data.title = $('#linkTitle').val();
        data.post = $('#linkPost').val();
    }else if($('#image-tab').hasClass('active')){
        data.type = "image";
        data.title = $('#imageTitle').val();
        // data.post
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
        if(time.includes("just now")||time.includes("minute")){
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

$('input[type="file"]').change(function(e){
    var file = e.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    $('#modalSubmit').prop('disabled', true)
    $('#uploadProgress').show();
    axios({
        url: CLOUDINARY_URL,
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then(function(res) {
        console.log(res.data.url);
        $('#uploadProgress').hide();
        $('#files').html("<span id=\"fileLabel\" class=\"badge badge-primary\">"+file.name+"</span>");
        $('#modalSubmit').prop('disabled', false);
        data.post = res.data.url;
    }).catch(function(err) {
        $('#files').html("<span id=\"fileLabel\" class=\"badge badge-danger\">An error occured.</span>");
        console.log(err);
    });
});
