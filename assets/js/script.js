
$(function()
{
    let total_pages ;
    let page=1
    let limit = 9
    let url= "?limit="+limit+"&page="+page
    let dataEvent = new Event('getAllCheckedData');
    const elem = document.querySelector('.items');
    $(".page1").empty();
    $("<button></button>")
        .addClass("btn page-link")
        .text(page)
        .appendTo(".page1")
        .css({background:'orange'})
    $(".pagePrev").hide();
    let p= new products(limit);
    p.useProductPage(url).then((ev)=>{
        let dataEvent = new Event('getAllCheckedData');
        const elem = document.querySelector('.items');
        elem.dispatchEvent(dataEvent);
    });

    $(".page-link").on('click', (e)=>{
        page = parseInt(e.target.innerText);
        p.pageNavigation(page, catFlag, supFlag, category, supplier);
    });

    $(".pagePrev").on('click',()=>{
        page -=1;
        p.pageNavigation(page, catFlag, supFlag, category, supplier);
    })
    $(".pageNext").on('click',()=>{
        page +=1;
        p.pageNavigation(page, catFlag, supFlag, category, supplier);
    })

    /*************************************************************************/
    $("#searchBox").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
             url= "?q="+$(this).val();
            // console.log(url);
            p.useProductPage(url)
        }
    });

    // *********************************************************************
    // list categories  & suppliers

    let category ;
    let catFlag=false;
    let supplier;
    let supFlag = false;
    const cate = document.querySelector("#catnav");
    const supname = document.querySelector("#supnav");
    cate.addEventListener('click',(ev)=>{
        page = 1;
        chooseCategory(ev, page);
    });
    supname.addEventListener('click', (ev)=>{
        page = 1;
        chooseSupplier(ev, page);
    });

    $.ajax({
        method: "GET",
        url: "https://afternoon-falls-30227.herokuapp.com/api/v1/products-stats/"
    })
    .done(function (response) {
        let cats = Object.keys(response.data.Groups.Category)
        let supps = Object.keys(response.data.Groups.SupplierName);
        console.log("--------------------");
        cats.forEach((value)=>{
            $("<a class=dropdown-item >"+value+"</a>").appendTo("#catnav");
        })
        supps.forEach((na) => {
            $("<a class=dropdown-item >" + na + "</a>").appendTo("#supnav");
        })
    });
    // **************************************
    function chooseCategory(ev,page)
    {
        category = ev.target.text;
        elements = document.querySelectorAll("#catnav a")
        console.log(elements);
        for(el in elements){
            if(!isNaN(el))
                {elements[el].style.background="white";}
        }
        ev.target.style.background="red"
        if (category != "All")
        {
            catFlag = true;
        }
        else
        {
            catFlag = false;
        }
        p.pageNavigation(page, catFlag, supFlag, category, supplier)
    }

    function chooseSupplier(ev, page)
    {
        supplier = ev.target.text;
        elements = document.querySelectorAll("#supnav a")
        console.log(elements);
        for(el in elements){
            if(!isNaN(el))
                {elements[el].style.background="white";}
        }
        ev.target.style.background="red"

        if (supplier != "All")
        {
            supFlag = true;
        }
        else
        {
            supFlag = false;
        }
        p.pageNavigation(page, catFlag, supFlag, category, supplier)
    }
    // *******************************************************************

})

class products
{
    constructor(limit)
    {
        this.total_pages=0;
        this.limit=limit;
    }

    async useProductPage(url)
    {
        let urlPage = url;
        let promise = new Promise((resolve, reject)=>{
            $.ajax({
                url:"https://afternoon-falls-30227.herokuapp.com/api/v1/products"+urlPage, //path or url
                success:function(response)
                {
                    resolve(response)
                } ,
                error:function()
                {
                    reject("error xxx")
                },
                complete: function(){
                $('#loading').hide();
                }
            });
        })
        let msg = await promise;
        this.reListProducts();
        this.total_pages = msg.total_pages
        let items = msg.data;
        items.forEach(item => {
            let id = item.ProductId;
            let name = item.Name;
            let price = item.Price;
            let image = item.ProductPicUrl
            let length = items.length
            this.listProducts(id, name, price, image)
        });
        const elem = document.querySelector('.items');
        let ColorEvent = new Event('getAllBtns');
        elem.dispatchEvent(ColorEvent);
        $(".details").on("click",showDetails)
        $('.mask').on('click', function(){
            $('.mask').fadeOut();
            $('#quick-view-pop-up').fadeOut();
        });
    }


    listProducts(id, name, priceVal, image)
    {
        let items = $(".items")
        let item = $("<div></div>")
          item.addClass("col col-sm-6 col-md-4 item p-2 p-md-2  text-center")
        let cardDiv = $("<div></div>")
          cardDiv.addClass("card")
        let itemTitle = $("<h6></h6>")
          itemTitle.addClass("card-title")
          itemTitle.text(`${name}`)
        let imgTag = `<img class='card-img-top'  src="${image}" alt='not yet'>`;
        let cardBody =$("<div></div>")
          cardBody.addClass("card-body row")
        let price =$("<div class=text-danger ></div>")
          price.addClass(`col-6 price ${id} text-left border-top pt-3`)
          price.html(`${priceVal}`)
        let checkout =$("<div></div>")
            checkout.addClass("col-6 checkout text-right border-top pt-3")
            checkout.html(`<button class='btn btn-sm btn-light rounded-circle' id="${id}">
                <img src="https://img.icons8.com/ios/15/000000/checkout.png">
            </button>`)
        let details =$("<div></div>")
            details.addClass("col-6 text-center border-top pt-3")
            details.html(`<button class="details btn btn-sm btn-success">details</button>`)

        item.append(cardDiv)
        cardDiv.append(itemTitle)
        cardDiv.append(imgTag)
        cardDiv.append(cardBody)
        cardBody.append(price)
        cardBody.append(checkout)
        cardBody.append(details)
        items.append(item)
    }

    reListProducts()
    {
        let items = $(".items")
        items.empty()
    }

    getPagesNum()
    {
        return this.total_pages;
    }

    pageNavigation(page, catFlag, supFlag, category, supplier)
    {
        let url = "?limit=" + this.limit + "&page=" + page ;
        if (catFlag)
            url += "&category=" + category;
        if(supFlag)
            url += "&supplier=" + supplier;
        this.useProductPage(url).then((ev)=>{
            if(this.total_pages>0)
            {
                if (page == this.total_pages && this.total_pages==1) {
                    $(".pageNext").hide();
                    $(".pagePrev").hide();
                    $(".page1").empty();
                }
                else
                {
                    if (page == this.total_pages && this.total_pages>1) {
                    $(".pageNext").hide();
                    $(".pagePrev").show();
                    }
                    else if (page == 1 && this.total_pages>1)
                    {
                        $(".pageNext").show();
                        $(".pagePrev").hide();
                    }
                    else
                    {
                        $(".pageNext").show()
                        $(".pagePrev").show()
                    }
                    $(".page1").empty();
                    $("<button></button>")
                        .addClass("btn page-link")
                        .text(page)
                        .appendTo(".page1")
                        .css({background:'orange'})
                }
            }
            else
            {
                $("<div>No products here!..</div>").appendTo(".items")
                $(".pageNext").hide();
                $(".pagePrev").hide();
            }
        });

    }

}

function showDetails()
{
    console.log("clicked");

    let itemId=$(this).parent().siblings(".checkout").children().attr("id");
    $.getJSON("https://afternoon-falls-30227.herokuapp.com/api/v1/products/"+itemId, function(result){
    //console.log(result.data.SupplierName);
        $("#myImage").attr("src",result.data.ProductPicUrl);
        $("#myDetailedImage").attr("src",result.data.ProductPicUrl);
        $(".product-name").text(result.data.Name);
        $(".description").text(result.data.Description);
        $(".product-price").text(result.data.Price);

        $(".status").text(result.data.Status);
        $(".quantity").text(result.data.Quantity);

        $(".add-to-bag").text("Add to Cart")
        if(localStorage.hasOwnProperty(itemId))
        {
        $(".add-to-bag").text("Remove from Cart")
        }
    });

    $(".add-to-bag").unbind().on("click", (e)=>{
        let clickEvent = new CustomEvent("clickCart", {'detail': {"id":itemId}});
        const elem = document.querySelector('.items');
        elem.dispatchEvent(clickEvent);
    })
    $('#quick-view-pop-up').fadeToggle();
    $('#quick-view-pop-up').css({"top":"34px", "left":"314px"});
    $('.mask').fadeToggle();
}
