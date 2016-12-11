/*
(($) => {
    $("#upload").click(() => {
        
        let form = new FormData($("#file"));
        
        let files = document.getElementById("file-input").files;
        
        if(files.length == 0) {
            alert("No file selected")
            return;
        }
        form.append("originalName", files[0].name)
        

        $.ajax({
            url:"/users/upload",
            type:"post",
            data:form,
            processData:false,
            contentType:false,
            success:function(data){
                console.log("success");
            },
            error:function(e){
                alert("error");
            }
        });
    });
})(jQuery);
*/