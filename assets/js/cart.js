
$((ev)=>{
    let countItems=0;
    let price=0;
    const elem = document.querySelector('.items');
    elem.addEventListener('getAllBtns', (e) => {
        // console.log(e);
        $(".items a[id^='HT-']").each((i,el)=>{
            idIndex = $(el).attr("id");
            if(getStorage(idIndex)){
                $(el).toggleClass("cartChecked");
                console.log("done");
            }
        });
    }, false);


    elem.addEventListener('getAllCheckedData', (e) => {
            Object.values(localStorage).forEach(element => {
                let url= "/"+element
                p= new products;
                p.getProductPage(url).then(msg=>{
                    let item = msg.data;
                    let itemPrice = item.Price;
                    price+=itemPrice
                    countItems+=1;
                    $(".num").text(countItems);
                    $("#price").text(price);
                    console.log(price)
                    });
                console.log(element);
            });
            console.log("done");
    }, false);
    
    $(".items").on("click","a[id^='HT-']" ,(ev)=>{
        console.log(ev)
        idVal = $(ev.target).attr("id");
        console.log(idVal,$(ev.target).attr("id"));
        setStorage(idVal, idVal);
        $("#"+idVal).toggleClass("cartChecked");
    });


    function setStorage(index, num){
        if(localStorage.getItem(index))
        {
            console.log("exists");
            let url= "/"+num
            p= new products;
            p.getProductPage(url).then(msg=>{
                let item = msg.data;
                let itemPrice = item.Price;
                price-=itemPrice
                countItems-=1;
                $("#price").text(price);
                $(".num").text(countItems);
                });
            localStorage.removeItem(index)
        }
        else{
            console.log("not exists");

            let url= "/"+num
            p= new products;
            p.getProductPage(url).then(msg=>{
                let item = msg.data;
                let itemPrice = item.Price;
                price+=itemPrice
                countItems+=1;
                $("#price").text(price);
                $(".num").text(countItems);
                });
                item = {"id":num, "q":1};
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

    function removeStorage(index){
        localStorage.removeItem(index)
    }

});