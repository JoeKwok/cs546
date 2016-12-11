(function ($) {
    var next = $("#next");
    var title = $('#title');
    var summary = $('#summary');
    var dueDate = $('#dueDate');
    var body = $('#body');
    next.click(function(event){
        event.preventDefault();

        var nextid = next.data('nextid');
        console.log(nextid);
        

        if (nextid) {
			var requestConfig = {
				method: "POST",
				url: "/"+nextid,
				contentType: 'application/json',
				data: ""
			};

			$.ajax(requestConfig).then(function (data) {
				console.log(data);
                if(!data.success){
                    alert(data.msg);
                }
                if(data.success){
                    title.html(data.note.title);
                    summary.html(data.note.summary);
                    dueDate.html(data.note.dueDate);
                    body.html(data.note.body);
                    next.data('nextid', data.nextId);
                }
				
			});
		}
       
    });



})(jQuery);

