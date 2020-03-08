
$((ev)=>{
    let countItems=0;
    let price=0;
    const elem = document.querySelector('.items');
    elem.addEventListener('getAllBtns', (e) => {
        $(".items button[id^='HT-']").each((i,el)=>{
            idIndex = $(el).attr("id");
            if(getStorage(idIndex)){
                $(el).toggleClass("cartChecked");
            }
        });
    }, false);


    elem.addEventListener('getAllCheckedData', (e) => {
            Object.values(localStorage).forEach(element => {
                element = JSON.parse(element);
                q = element.q;
                p = element.price;
                price = +($("#price").text());
                price += +p * +q;
                countItems+=q;
                $("#price").text(price);
                $(".num").text(countItems);
            });
    }, false);
    
    $(".items").on("click","button[id^='HT-']" ,(ev)=>{
        idVal = $(ev.currentTarget).attr("id");
        console.log("clicked", idVal);
        setStorage(idVal, idVal);
        $("#"+idVal).toggleClass("cartChecked");
    });


    function setStorage(index, num){
        if(localStorage.getItem(index))
        {
            console.log("exists");
            
            prodPrice = $(`.price.${index}`).text();
            price = $("#price").text();
            price = (+price) - (+prodPrice)
            countItems-=1;
            $("#price").text(price);
            $(".num").text(countItems);
            localStorage.removeItem(index)
        }
        else{
            console.log("not exists");
            prodPrice = $(`.price.${index}`).text();
            price = $("#price").text();
            price = (+price) + (+prodPrice)
            countItems+=1;
            $("#price").text(price);
            $(".num").text(countItems);

            item = {"id":num, "q":1, "price":prodPrice};
            localStorage.setItem(index,JSON.stringify(item));
        }
    }

    function getStorage(index){
        if(localStorage.getItem(index))
        {
            return true;
        }
        return false;
    }

    function removeStorage(){
        localStorage.clear()
    }

});