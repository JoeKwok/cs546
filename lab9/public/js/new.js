(function ($) {
	var noteForm = $('#noteForm');

    var noteTitle = $('#noteTitle');
    var dueDate = $('#dueDate');
    var noteSummary = $('#noteSummary');
    var noteBody = $('#noteBody');


	noteForm.submit(function(event){

		var noteTitleVal =  noteTitle.val();
		var dueDateVal =  dueDate.val();
		var noteSummaryVal = noteSummary.val();
		var noteBodyVal = noteBody.val();

        console.log(noteTitle.val(), dueDate.val(), noteSummary.val(), noteBody.val());

		if (noteTitleVal && dueDateVal && noteSummaryVal && noteBodyVal) {
			var requestConfig = {
				method: "POST",
				url: "/new",
				contentType: 'application/json',
				data: JSON.stringify({
					title: noteTitleVal,
					dueDate: dueDateVal,
					summary: noteSummaryVal,
					body: noteBodyVal
				})
			};

			$.ajax(requestConfig).then(function (responseMessage) {
				console.log(responseMessage);
				window.location.href = '/' + responseMessage.noteId;
			});
		}
        
		event.preventDefault();
	});

})(jQuery);

