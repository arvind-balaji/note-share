var CLOUDINARY_URL = "https://api.cloudinary.com/api/v1_1/blerb/upload";
var CLOUDINARY_UPLOAD_PRESET = "wf7kurer";

var data = {type:'', title:'', post:''}

//submit new post
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
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
        success: function(data)
        {
           //alert(data);
        }
    });

    e.preventDefault(); // avoid to execute the actual submit of the form.
    location.reload();
});

//stop blank searches
$("#search").submit(function(e) {
    if ($('#search-input').val().length == 0){
        e.preventDefault(); // avoid to execute the actual submit of the form.
    }
});
$("#newComment").submit(function(e) {
    var data = {text:$('#comment').val(),id:$('.card').attr('id')}
    var url = "/api/newComment"; // the script where you handle the form input.
    $.ajax({
        async:false,
        type: "POST",
        url: url,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data),
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

//upload files to cloudinary and set data.post
$('input[type="file"]').change(function(e){
    var files = [];
    var promises = [];

    $('#modalSubmit').prop('disabled', true)
    $('#uploadProgress').show();

    for (var i = 0; i < e.target.files.length; i++){
        if (i > 4) {
            //alert("Maximum of 5 images.")
            $('#uploadProgress').hide();
            $('#files').append("<span id=\"fileLabel\" class=\"badge badge-danger\">Error. Exceeded Maximum of 5 images.</span>");
            break;
        }
        var file = e.target.files[i];
        var formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        promises.push(axios({
            url: CLOUDINARY_URL,
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formData
        }))
    }


    axios.all(promises).then(function(results) {
        results.forEach(function(res, index) {
            files.push(res.data.url)
            $('#files').append("<span id=\"fileLabel\" class=\"badge badge-primary\">"+res.data.original_filename+"</span>");
        })
        $('#uploadProgress').hide();
        $('#modalSubmit').prop('disabled', false);
        data.post = files;
    }).catch(function(err) {
        $('#files').append("<span id=\"fileLabel\" class=\"badge badge-danger\">An error occured. Try Again.</span>");
        console.log(err);
    });
    //console.log(files)
});
$('#postModal').on('hidden.bs.modal', function (e) {
    $('#files').empty()
})
particlesJS.load('particles-js', '/particles.json', function() {
  console.log('callback - particles.js config loaded');
});
