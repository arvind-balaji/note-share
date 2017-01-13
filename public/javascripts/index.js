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
           //alert(data); // show response from the php script.
        }
    });

    e.preventDefault(); // avoid to execute the actual submit of the form.
    location.reload();
});
// $(function () {
//   $('#newPost').parsley().on('field:validated', function() {
//     var ok = $('.parsley-error').length === 0;
//     $('.bs-callout-info').toggleClass('hidden', !ok);
//     $('.bs-callout-warning').toggleClass('hidden', ok);
//   })
//   .on('form:submit', function() {
//     alert("invalid");
//     return false; // Don't submit form for this demo
//   });
// });
