nameText = document.querySelector('#name');
mailText = document.querySelector('#email');
subjectText = document.querySelector('#subject');
messageText = document.querySelector('#message');
subbtn = document.querySelector('#subbtn');
nameFlag=subFlag=mailFlag=false;
$('#helpname').hide();
$('#helpmail').hide();
$('#helpsub').hide();
$('#sent').hide();

nameText.addEventListener("keyup", validateName);
subjectText.addEventListener("keyup", validateSub);
mailText.addEventListener("keyup", validateEmail);
subbtn.addEventListener("click", send);

function validateName()
{
    console.log(this.value.length);
    
    if (this.value.length < 3 || this.value.length >50)
    {
        $(this).removeClass("is-valid");
        $(this).addClass("is-invalid");
        nameFlag=false;
    }
    else
    {
        console.log("ok");
        $(this).removeClass("is-invalid");
        $(this).addClass("is-valid");
        $('#helpname').hide();
        nameFlag = true;
    }         
}

function validateSub() 
{
    console.log(this.value.length);

    if (this.value.length < 3 || this.value.length > 50) {
        $(this).removeClass("is-valid");
        $(this).addClass("is-invalid");
        subFlag = false;
    }
    else {
        console.log("ok");
        $(this).removeClass("is-invalid");
        $(this).addClass("is-valid");
        $('#helpsub').hide();
        subFlag = true;
    }
}

function validateEmail()
{
    const regex = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,4}$/gm;
    var mail = this.value;
    if (regex.exec(mail) !== null)
    {
        console.log("ok");
        $(this).removeClass("is-invalid");
        $(this).addClass("is-valid");
        $('#helpmail').hide(); 
        mailFlag=true;
        
    }
    else
    {
        $(this).removeClass("is-valid");
        $(this).addClass("is-invalid");
        mailFlag=false;
    }
}



function send()
{
    console.log(messageText.value.length);

    if(subFlag==true)
    {
        console.log(subFlag);
        dataobj={
            name:nameText.value,
            email:mailText.value,
            subject:subjectText.value,
            message:messageText.value

        }
        var datajson=JSON.stringify(dataobj);
        console.log(datajson);
        $(function(){
           var req= $.ajax({
                method:"POST",
                contentType: "application/json",
                url: "https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us",
                data: datajson,
                dataType: "json",
                cache: false
            });
            req.done(function(res){
                console.log(res.message)
                $('#sent').text(res.message);
                $('#sent').show();
                $("#helpname").hide();
                $('#helpmail').hide();
                $('#helpsub').hide();
            })
            req.fail(function(){
                console.log("failed")
                $('#sent').hide();
                res=JSON.parse(req.responseText).error
                console.log(res)
                if(res.name)
                {
                    $("#helpname").show();
                    $(nameText).removeClass("is-valid");
                    $(nameText).addClass("is-invalid");
                }
                if(res.email)
                {
                    $('#helpmail').show();
                    $(mailText).removeClass("is-valid");
                    $(mailText).addClass("is-invalid");

                }
             
            });
             
        })
    }
    else
    {
        $('#sent').hide();
        $('#helpsub').show();
        $(subjectText).removeClass("is-valid");
        $(subjectText).addClass("is-invalid");
        if(!nameFlag)
        {
            $("#helpname").show();
            $(nameText).removeClass("is-valid");
            $(nameText).addClass("is-invalid");
        }
        if(!mailFlag)
        {
            $('#helpmail').show();
            $(mailText).removeClass("is-valid");
            $(mailText).addClass("is-invalid");
        }
    }

}