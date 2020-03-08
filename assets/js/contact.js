nameText = document.querySelector('#name');
mailText = document.querySelector('#email');
subjectText = document.querySelector('#subject');
messageText = document.querySelector('#message');
subbtn = document.querySelector('#subbtn');
nameFlag=subFlag=mailFlag=false;

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

    if(nameFlag && mailFlag && subFlag && messageText.value.length >0)
    {
        dataobj={
            name:nameText.value,
            email:mailText.value,
            subject:subjectText.value,
            message:messageText.value

        }
        var datajson=JSON.stringify(dataobj);
        console.log(datajson);
        $(function(){
            $.ajax({
                method:"POST",
                contentType: "application/json",
                url: "https://afternoon-falls-30227.herokuapp.com/api/v1/contact_us",
                data: datajson,
                dataType: "json",
                success:function(data,status,xhr){
                    console.log("success");
                },           
            })
        })
    }  
}