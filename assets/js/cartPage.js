const elem = document.querySelector('table');
elem.addEventListener('getAllCart', (e) => {
    q = JSON.parse(localStorage.getItem(e.detail.id)).q;
    $("table tbody").append("<tr>"+
    "<td width='100px'><img class='img-thumbnail my-2' src='"+e.detail.image+
    "' width='60px' height='100px'></td><td width='140px'>"+e.detail.name+"</td>"+
    "<td class='"+e.detail.id+"'>"+e.detail.price+"</td>"+
    "<td><input class='"+e.detail.id+"' type='text' name='quantity' value='"+q+"'></td>"+
    "<td class='"+e.detail.id+" total' >"+e.detail.price*q+"</td>"+
    "</tr>");
    getTotalPrice();
    
}, false);

getTotalPrice()
function getTotalPrice(){
    tot = 0;
    $(".total").each((i,el)=>{
        console.log(el);
        tot += +el.innerText
    });
    $(".totPrice").val(tot)
    console.log("tot:", tot);
}

$("table").on("click","input" , function() {
    clsName = $(this)[0].className;
    $("."+clsName+":eq(1)").change(function() {
        prodPrice = Number($("."+clsName+":eq(0)").text());
        prodQuantity = Number($("."+clsName+":eq(1)").val());
        if(!checkQuantityValid(prodQuantity)){
            $("."+clsName+":eq(1)").val(1);
            prodQuantity = 1;
        }
        updateQuantity(clsName, prodQuantity);
        console.log(quantStorage.q);
        let total = prodPrice * prodQuantity;
        $("."+clsName+".total").html(total);
        getTotalPrice();
    }).change();
});

function updateQuantity(cls, q){
    quantStorage = JSON.parse(localStorage.getItem(cls))
    quantStorage.q = q;
    localStorage.setItem(cls, JSON.stringify(quantStorage)) 
}


cartProduct = getLocalStorageData();
cartProduct.forEach((e)=>{
    getProductData(e);
    
})


function checkQuantityValid(quant){
    if(isNaN(quant)){
        return false;
    }
    return true;
}

function getLocalStorageData(){
    arr=[]
    for (i in localStorage) {
        if (localStorage.hasOwnProperty(i)) {
        if (i.match(/^HT-[0-9]+/)) {
            value = JSON.parse(localStorage.getItem(i));
            arr.push(value);
        }
        }
    }
    return arr;
}
var count = 0;
function getProductData(idIndex){
    
    let myFirstPromise = new Promise((resolve, reject) => {
    $.ajax({
        url:"https://afternoon-falls-30227.herokuapp.com/api/v1/products/"+idIndex.id,
        success:function(response)
        { 
            resolve(response)
        } ,
        error:function()
        {
            reject("error xxx");
        }
    });
    });

    myFirstPromise.then((response)=>{
        let item = response.data;
        let name = item.Name;
        let price = item.Price;
        let image = item.ProductPicUrl;
        let quantity = idIndex.q;
        count++;
        details = 
            {"id":idIndex.id, "name": name, "price": price, "image": image, "quantity":quantity};
        
        let event = new CustomEvent('getAllCart', {detail:details});
        const elem = document.querySelector('table');
        elem.dispatchEvent(event);
    });
}