
cartProduct = getLocalStorageData();
cartProduct.forEach((e)=>{
    getProductData(e);
    
})

const elem = document.querySelector('table');

elem.addEventListener('getAllCart', (e) => {
    q = JSON.parse(localStorage.getItem(e.detail.id)).q;
    $("table tbody").append(
    "<tr class='"+e.detail.id+"-row'>"+
        "<td width='100px'>"+
            "<img class='img-thumbnail my-2' src='"+e.detail.image+"' width='60px' height='100px'>"+
        "</td>"+

        "<td width='140px'>"+e.detail.name+"</td>"+

        "<td class='"+e.detail.id+"'>"+e.detail.price+"</td>"+

        "<td>"+
            "<input class='"+e.detail.id+"' type='text' name='quantity' value='"+q+"'>"+
        "</td>"+

        "<td class='"+e.detail.id+" total' >"+e.detail.price*q+"</td>"+

        "<td><button class='"+e.detail.id+" rounded-circle bg-danger text-white'>x</button></td>"+

    "</tr>");
    getTotalPrice();
    
}, false);

$(".cartTable").on("click", "button", (ev)=>{
    btnClicked = ev.target.className.split(" ")[0];
    localStorage.removeItem(btnClicked);
    $("tr."+btnClicked+"-row").remove();
    getTotalPrice();
});

getTotalPrice()
function getTotalPrice(){
    tot = 0;
    $(".total").each((i,el)=>{
        tot += +el.innerText
    });
    $(".totPrice").val(tot)
}

$("table").on("focus","input" , function() {
    clsName = $(this)[0].className;
    $("."+clsName+":eq(1)").change(function() {
        prodPrice = Number($("."+clsName+":eq(0)").text());
        prodQuantity = Number($("."+clsName+":eq(1)").val());
        if(!checkQuantityValid(prodQuantity)){
            $("."+clsName+":eq(1)").val(1);
            prodQuantity = 1;
        }
        updateQuantity(clsName, prodQuantity);
        let total = prodPrice * prodQuantity;
        $("."+clsName+".total").html(total);
        getTotalPrice();
    }).change();
});

//update number of quantities in the localStorage
function updateQuantity(cls, q){
    quantStorage = JSON.parse(localStorage.getItem(cls))
    quantStorage.q = q;
    localStorage.setItem(cls, JSON.stringify(quantStorage)) 
}


//do a validation check on the quantity entered by the customer
function checkQuantityValid(quant){
    console.log(quant);
    
    if(isNaN(quant)||quant==0){
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

//get checked product's details to display it on the cart page
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
        details = 
            {"id":idIndex.id, "name": name, "price": price, "image": image, "quantity":quantity};
        
        let event = new CustomEvent('getAllCart', {detail:details});
        const elem = document.querySelector('table');
        elem.dispatchEvent(event);
    });
}
