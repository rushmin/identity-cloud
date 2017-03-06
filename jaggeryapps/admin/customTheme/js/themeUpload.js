function uploadTheme() {

    var themeFile = $("#themeFile")[0].files[0];

    if (themeFile == undefined) {
        message({labelId: 'themeFile-error', content: 'Please select a Theme File', type: 'error'});
        return;
    } else {
        $('#themeFile-error').hide();
    }

    var fileName = $("#themeFile").val().split('/').pop().split('\\').pop();
    var fileExt = fileName.substr(fileName.length - 4);
    if (fileExt != ".zip") {
        alert("File extension : " + fileExt + " of file : " + fileName + " is not supported");
        return;
    }
    else {
        var formData = new FormData();
        formData.append('themeFile', themeFile);
        formData.append('cookie', cookie);
        formData.append('themeType', "webapp");
        formData.append('fileName', fileName);

        var str = "/admin/customTheme/themeUpload_finish";
        $.ajax({
                   url: str,
                   type: 'POST',
                   data: formData,
                   contentType: false,
                   processData: false,
                   success: function (data) {
                       var result = JSON.parse(data);
                       alert(result.errorMsg);

                       //Refresh the pae when there's no errors
                       if (!result.error) {
                           location.reload();
                       }
                   }
               });

    }

}
