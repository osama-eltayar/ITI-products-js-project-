
$((ev)=>{

    let event = new Event('getAllBtns');
    const elem = document.querySelector('.items');
    elem.addEventListener('getAllBtns', (e) => {
        $(".items a[id^='HT-']").each((i,el)=>{
            idIndex = $(el).attr("id");
            if(getStorage(idIndex)){
                $(el).toggleClass("cartChecked");
                console.log("done");
            }
        });
    }, false);
    
    $(".items").on("click","a[id^='HT-']" ,(ev)=>{
        idVal = $(ev.target).attr("id");
        console.log(idVal,$(ev.target).attr("id"));
        setStorage(idVal, idVal);
        $("#"+idVal).toggleClass("cartChecked");
    });


    function setStorage(index, num){
        if(localStorage.getItem(index))
        {
            console.log("exists");
            localStorage.removeItem(index)
        }
        else{
            console.log("not exists");
            localStorage.setItem(index,num);
        }
    }

    function getStorage(index){
        if(localStorage.getItem(index))
        {
            return true;
        }
        return false;
    }

    function removeStorage(index){
        localStorage.removeItem(index)
    }

});