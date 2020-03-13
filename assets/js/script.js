
$(function()
{
    let total_pages ;
    let page=1
    let limit = 9
    let url= "?limit="+limit+"&page="+page
    let dataEvent = new Event('getAllCheckedData');
    const elem = document.querySelector('.items');
    const cate = document.querySelector("#catnav");
    const supname = document.querySelector("#supnav");
    cate.addEventListener('click',chooseCategory);
    let category ;
    let catFlag=false;
    supname.addEventListener('click', chooseSupplier);
    let supplier;
    let supFlag = false;
    elem.dispatchEvent(dataEvent);

    $(".pagePrev").hide();
    $(".page-link:eq(0)").text(page).css({background:'orange'})

    let p= new products;
    p.useProductPage(url).then((ev)=>{
        let dataEvent = new Event('getAllCheckedData');
        const elem = document.querySelector('.items');
        elem.dispatchEvent(dataEvent);
    });

    /*************************************************************************/
    $("#searchBox").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
          //  console.log($(this).val());
            //alert('You pressed a "enter" key in textbox');
             url= "?q="+$(this).val();
            console.log(url);
          //  alert('You pressed a "enter" key in textbox');
            // p= new products;
            p.useProductPage(url)
            // elem.dispatchEvent(dataEvent);
        }
      //  event.stopPropagation();
    });
/*************************************************************************/

    $(".page-link").on('click', (e)=>{
        page = parseInt(e.target.innerText);
        if (page != 1) {
            $(".pagePrev").show()
            if (page<=p.getPagesNum()-2) {
                $(".page-link:eq(0)").text(page).css({background:'orange'})
                $(".page-link:eq(1)").text(page+1).css({background:'white'})
                $(".page-link:eq(2)").text(page+2).css({background:'white'})
            }
            else if (page<=p.getPagesNum()-1) {
                $(".page-link:eq(0)").text(page-1).css({background:'white'})
                $(".page-link:eq(1)").text(page).css({background:'orange'})
                $(".page-link:eq(2)").text(page+1).css({background:'white'})
            }
            else if (page<=p.getPagesNum()) {
                $(".page-link:eq(0)").text(page-2).css({background:'white'})
                $(".page-link:eq(1)").text(page-1).css({background:'white'})
                $(".page-link:eq(2)").text(page).css({background:'orange'})
                $(".pageNext").hide()
            }
        }
        
        console.log(e.target.innerText);
        if (catFlag)
            url = "?limit=" + limit + "&page=" + page + "&category=" + category;
        else if (supFlag)
            url = "?limit=" + limit + "&page=" + page + "&supplier=" + supplier;
        else
            url = "?limit=" + limit + "&page=" + page;
        console.log("page    " + url);
        p.useProductPage(url);

    });

    $(".pagePrev").on('click',()=>{
        if (page==1) {
            console.log("end");
        }
        else
        {
            $(".pageNext").show()
            page = page-1
            $(".page-link:eq(0)").text(page).css({background:'orange'})
            $(".page-link:eq(1)").text(page+1).css({background:'white'})
            $(".page-link:eq(2)").text(page+2).css({background:'white'})
            if (page==1) {
                $(".pagePrev").hide();
            }
            console.log(page);
            if (catFlag)
                url = "?limit=" + limit + "&page=" + page + "&category=" + category;
            else if (supFlag)
                url = "?limit=" + limit + "&page=" + page + "&supplier=" + supplier;
            else
                url = "?limit=" + limit + "&page=" + page;
            p.useProductPage(url)
        }
    })
    $(".pageNext").on('click',()=>{
        if (page == p.getPagesNum()) {
            console.log("end");
        }
        else
        {
            $(".pagePrev").show()
            console.log("=="+page);
            page = page+1
            if (page <= p.getPagesNum()-2) {
                $(".page-link:eq(0)").text(page).css({background:'orange'})
                $(".page-link:eq(1)").text(page+1).css({background:'white'})
                $(".page-link:eq(2)").text(page+2).css({background:'white'})
            }
            else if (page<=p.getPagesNum()-1) {
                $(".page-link:eq(0)").text(page-1).css({background:'white'})
                $(".page-link:eq(1)").text(page).css({background:'orange'})
                $(".page-link:eq(2)").text(page+1).css({background:'white'})
            }
            else if (page<=p.getPagesNum()) {
                $(".page-link:eq(0)").text(page-2).css({background:'white'})
                $(".page-link:eq(1)").text(page-1).css({background:'white'})
                $(".page-link:eq(2)").text(page).css({background:'orange'})
                $(".pageNext").hide()
            }
            console.log(page);
            if (catFlag)
                url = "?limit=" + limit + "&page=" + page + "&category=" + category;
            else if(supFlag)
                url = "?limit=" + limit + "&page=" + page + "&supplier=" + supplier;
            else
                url = "?limit=" + limit + "&page=" + page;    
            p.useProductPage(url)
        }
    })
    // *********************************************************************
    // list categories  & suppliers
    $.ajax({
        method: "GET",
        url: "https://afternoon-falls-30227.herokuapp.com/api/v1/products-stats/"
    })
    .done(function (response) {
        let cats = Object.keys(response.data.Groups.Category)
        let supps = Object.keys(response.data.Groups.SupplierName);
        console.log(supps);
        console.log("--------------------");
        cats.forEach((value)=>{
            console.log(value);
            $("<a class=dropdown-item >"+value+"</a>").appendTo("#catnav");
        })
        supps.forEach((na) => {
            console.log(na+"    item");
            $("<a class=dropdown-item >" + na + "</a>").appendTo("#supnav");
        })
    });
    // **************************************
    function chooseCategory(ev)
    {
        category = ev.target.text;
        console.log(category);
        if (category != "All")
        {
            catFlag = true;
            page = 1;
            url = "?limit=" + limit + "&page=" + page + "&category=" + category;
        }
        else
        {
            catFlag = false;
            page = 1;
            url = "?limit=" + limit + "&page=" + page ;
        }
        
        p.useProductPage(url)
    }
// **********************************************************************
    function chooseSupplier(ev) {
        supplier = ev.target.text;
        console.log(supplier);
        if (supplier != "All") {
            supFlag = true;
            catFlag = false;
            page = 1;
            url = "?limit=" + limit + "&page=" + page + "&supplier=" + supplier;
        }
        else {
            supFlag = false;
            page = 1;
            url = "?limit=" + limit + "&page=" + page;
        }

        p.useProductPage(url)
    }
    // *******************************************************************
    
})

class products
{
    constructor()
    {
        this.total_pages=0;
    }
    async getProductPage(urlPage)
    {
        return await new Promise((resolve, reject)=>{
            $.ajax({
                url:"https://afternoon-falls-30227.herokuapp.com/api/v1/products"+urlPage, //path or url
                success:function(response)
                {
                    resolve(response)
                } ,
                error:function()
                {
                    reject("error xxx")
                }
            });
        })
    }

    useProductPage(url)
    {
        this.reListProducts()
        return this.getProductPage(url).then(msg=>{
            this.total_pages = msg.total_pages
            this.current_page = msg.page
            console.log("total pages:",this.total_pages);
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
        let price =$("<div></div>")
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
}

function showDetails(){
    console.log("clicked");

  console.log($(this).parent().siblings(".checkout").children().attr("id"));
  let itemId=$(this).parent().siblings(".checkout").children().attr("id");
  $.getJSON("https://afternoon-falls-30227.herokuapp.com/api/v1/products/"+itemId, function(result){
  //console.log(result.data.SupplierName);
      $("#myImage").attr("src",result.data.ProductPicUrl);
      $("#myDetailedImage").attr("src",result.data.ProductPicUrl);
      $(".product-name").text(result.data.Name);
      $(".description").text(result.data.Description);
      $(".product-price").text(result.data.Price);

      $(".status").text(result.data.Status);

      $(".add-to-bag").text("Add to Cart")
      if(localStorage.hasOwnProperty(itemId))
      {
        $(".add-to-bag").text("Remove from Cart")
      }
  });

  $(".add-to-bag").unbind().on("click", (e)=>{
      console.log("itemId");
      let clickEvent = new CustomEvent("clickCart", {'detail': {"id":itemId}});
      const elem = document.querySelector('.items');
      elem.dispatchEvent(clickEvent);
  })
  $('#quick-view-pop-up').fadeToggle();
  $('#quick-view-pop-up').css({"top":"34px", "left":"314px"});
  $('.mask').fadeToggle();
}
