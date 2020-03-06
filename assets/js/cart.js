
$((ev)=>{
    $("[id^='HT-1']").each((i,el)=>{
        if(getStorage(i)){
            $(el).toggleClass("cartChecked");
        }
        $(el).click((ev)=>{
            idVal = $(el).attr("id");
            console.log(i,$(el).attr("id"));
            setStorage(i, idVal);
            $(el).toggleClass("cartChecked");
        });
    });
});

function setStorage(index, num){
    if(sessionStorage.getItem(index))
    {
        console.log("exists");
        sessionStorage.removeItem(index)
    }
    else{
        console.log("not exists");
        sessionStorage.setItem(index,num);
    }
}

function getStorage(index){
    if(sessionStorage.getItem(index))
    {
        return true;
    }
    return false;
}

function removeStorage(index){
    sessionStorage.removeItem(index)
}