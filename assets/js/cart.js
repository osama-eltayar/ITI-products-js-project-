
$((ev)=>{
    let countItems=0;
    let price=0;
    const elem = document.querySelector('.items');

    //fires when all the products are fetched from the api and listed in the home page
    //to view which product was checked before and stored in the localStorage
    elem.addEventListener('getAllBtns', (e) => {
        console.log("kkkkk");
        
        $(".items button[id^='HT-']").each((i,el)=>{
            idIndex = $(el).attr("id");
            if(getStorage(idIndex)){
                $(el).toggleClass("cartChecked");
            }
        });
    }, false);

    //fires when all the products are fetched from the api and listed in the home page
    elem.addEventListener('getAllCheckedData', (e) => {
        console.log("getAllCheckedData");
        
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
    
    //fires when check button is pressed
    $(".items").on("click","button[id^='HT-']" ,(ev)=>{
        idVal = $(ev.currentTarget).attr("id");
        console.log("clicked", idVal);
        setStorage(idVal, idVal);
        $("#"+idVal).toggleClass("cartChecked");
    });


    function setStorage(index, num){
        prodPrice = $(`.price.${index}`).text();
        price = $("#price").text();
        if(localStorage.getItem(index))
        {
            //remove items from localStorage
            console.log("exists");
            price = (+price) - (+prodPrice)
            countItems-=1;
            localStorage.removeItem(index)
        }
        else{
            //add items to localStorage
            console.log("not exists");
            price = (+price) + (+prodPrice)
            countItems+=1;
            item = {"id":num, "q":1, "price":prodPrice};
            localStorage.setItem(index,JSON.stringify(item));
        }
        $("#price").text(price);
        $(".num").text(countItems);
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