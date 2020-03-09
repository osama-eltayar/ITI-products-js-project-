
$(function()
{
    let total_pages ;
    let page=1
    let limit = 9
    let url= "?limit="+limit+"&page="+page
    let dataEvent = new Event('getAllCheckedData');
    const elem = document.querySelector('.items');
    $(".pagePrev").hide();
    $(".page-link:eq(0)").text(page).css({background:'cyan'})

    p= new products;
    p.useProductPage(url)
    elem.dispatchEvent(dataEvent);

    $(".page-link").on('click', (e)=>{
        page = parseInt(e.target.innerText);
        if (page != 1) {
            $(".pagePrev").show()
            if (page<=p.getPagesNum()-2) {
                $(".page-link:eq(0)").text(page).css({background:'cyan'})
                $(".page-link:eq(1)").text(page+1).css({background:'white'})
                $(".page-link:eq(2)").text(page+2).css({background:'white'})
            }
            else if (page<=p.getPagesNum()-1) {
                $(".page-link:eq(0)").text(page-1).css({background:'white'})
                $(".page-link:eq(1)").text(page).css({background:'cyan'})
                $(".page-link:eq(2)").text(page+1).css({background:'white'})
            }
            else if (page<=p.getPagesNum()) {
                $(".page-link:eq(0)").text(page-2).css({background:'white'})
                $(".page-link:eq(1)").text(page-1).css({background:'white'})
                $(".page-link:eq(2)").text(page).css({background:'cyan'})
                $(".pageNext").hide()
            }
        }
        console.log(e.target.innerText);
        url= "?limit="+limit+"&page="+page
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
            $(".page-link:eq(0)").text(page).css({background:'cyan'})
            $(".page-link:eq(1)").text(page+1).css({background:'white'})
            $(".page-link:eq(2)").text(page+2).css({background:'white'})
            if (page==1) {
                $(".pagePrev").hide();
            }
            console.log(page);
            url= "?limit="+limit+"&page="+page
            p.useProductPage(url)
        }
    })
    $(".pageNext").on('click',()=>{
        if (page==p.getPagesNum()) {
            console.log("end");
        }
        else
        {
            $(".pagePrev").show()
            console.log("=="+page);
            page = page+1
            if (page<=p.getPagesNum()-2) {
                $(".page-link:eq(0)").text(page).css({background:'cyan'})
                $(".page-link:eq(1)").text(page+1).css({background:'white'})
                $(".page-link:eq(2)").text(page+2).css({background:'white'})
            }
            else if (page<=p.getPagesNum()-1) {
                $(".page-link:eq(0)").text(page-1).css({background:'white'})
                $(".page-link:eq(1)").text(page).css({background:'cyan'})
                $(".page-link:eq(2)").text(page+1).css({background:'white'})
            }
            else if (page<=p.getPagesNum()) {
                $(".page-link:eq(0)").text(page-2).css({background:'white'})
                $(".page-link:eq(1)").text(page-1).css({background:'white'})
                $(".page-link:eq(2)").text(page).css({background:'cyan'})
                $(".pageNext").hide()
            }
            console.log(page);
            url= "?limit="+limit+"&page="+page
            p.useProductPage(url)
        }
    })
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
        this.getProductPage(url).then(msg=>{
            this.total_pages = msg.total_pages
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
            let ColorEvent = new Event('getAllBtns');
            const elem = document.querySelector('.items');
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
  });
  $('#quick-view-pop-up').fadeToggle();
  $('#quick-view-pop-up').css({"top":"34px", "left":"314px"});
  $('.mask').fadeToggle();
}
