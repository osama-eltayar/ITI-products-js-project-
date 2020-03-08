$(function()
{
    let total_pages 
    let page=1
    $(".pagePrev").hide();
    $(".page-link:eq(0)").text(page).css({background:'cyan'})
    let url= "?limit=9&page="+page

    p= new products;
    p.getProductPage(url).then(msg=>{
        total_pages = msg.total_pages
        let items = msg.data;
        let itemsPrice=[];
        items.forEach(item => {
            let id = item.ProductId;
            let name = item.Name;
            let price = item.Price;
            let image = item.ProductPicUrl
            let length = items.length
            itemsPrice.push({[id]:price})
            p.listProducts(id, name, price, image)
            // console.log(id+"==>"+name+"==>"+price+"==>"+length+"==>"+msg.total_pages);
        });
        let dataEvent = new Event('getAllCheckedData');
        let ColorEvent = new Event('getAllBtns');
        const elem = document.querySelector('.items');
        elem.dispatchEvent(ColorEvent);
        elem.dispatchEvent(dataEvent);

            
        $(".page-link").on('click', (e)=>{
            url = "?limit=9&page="+e.target.innerText;
            page = parseInt(e.target.innerText);
            if (page != 1) {
                $(".pagePrev").show()
                if (page<=total_pages-2) {
                    $(".page-link:eq(0)").text(page).css({background:'cyan'})
                    $(".page-link:eq(1)").text(page+1).css({background:'white'})
                    $(".page-link:eq(2)").text(page+2).css({background:'white'})
                }
                else if (page<=total_pages-1) {
                    $(".page-link:eq(0)").text(page-1).css({background:'white'})
                    $(".page-link:eq(1)").text(page).css({background:'cyan'})
                    $(".page-link:eq(2)").text(page+1).css({background:'white'})
                }
                else if (page<=total_pages) {
                    $(".page-link:eq(0)").text(page-2).css({background:'white'})
                    $(".page-link:eq(1)").text(page-1).css({background:'white'})
                    $(".page-link:eq(2)").text(page).css({background:'cyan'})
                    $(".pageNext").hide()
                }
            }
            console.log(e.target.innerText);

            p= new products;
            p.reListProducts()
            p.getProductPage(url).then(msg=>{
                total_pages = msg.total_pages
                let items = msg.data;
                items.forEach(item => {
                    let id = item.ProductId;
                    let name = item.Name;
                    let price = item.Price;
                    let image = item.ProductPicUrl
                    let length = items.length
                    p.listProducts(id, name, price, image)
                    // console.log(id+"==>"+name+"==>"+price+"==>"+length+"==>"+msg.total_pages);
                });

                let ColorEvent = new Event('getAllBtns');
                const elem = document.querySelector('.items');
                elem.dispatchEvent(ColorEvent);
                console.log("first")
            
        })
    });        
        
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
            // let url= "?limit=6&page="+page

            p= new products;
            p.reListProducts()
            p.getProductPage(url).then(msg=>{
                console.log(msg)
                total_pages = msg.total_pages
                let items = msg.data;
                items.forEach(item => {
                    let id = item.ProductId;
                    let name = item.Name;
                    let price = item.Price;
                    let image = item.ProductPicUrl
                    let length = items.length
                    p.listProducts(id, name, price, image)
                    // console.log(id+"==>"+name+"==>"+price+"==>"+length+"==>"+msg.total_pages);
                });

                let ColorEvent = new Event('getAllBtns');
                const elem = document.querySelector('.items');
                elem.dispatchEvent(ColorEvent);
                console.log("first")
            });
        }
    })
    $(".pageNext").on('click',()=>{
        console.log(total_pages);
        
        if (page==total_pages) {
            console.log("end");
        }
        else
        {
            $(".pagePrev").show()
            console.log("=="+page);
            
            page = page+1
            if (page<=total_pages-2) {
                $(".page-link:eq(0)").text(page).css({background:'cyan'})
                $(".page-link:eq(1)").text(page+1).css({background:'white'})
                $(".page-link:eq(2)").text(page+2).css({background:'white'})
            }
            else if (page<=total_pages-1) {
                $(".page-link:eq(0)").text(page-1).css({background:'white'})
                $(".page-link:eq(1)").text(page).css({background:'cyan'})
                $(".page-link:eq(2)").text(page+1).css({background:'white'})
            }
            else if (page<=total_pages) {
                $(".page-link:eq(0)").text(page-2).css({background:'white'})
                $(".page-link:eq(1)").text(page-1).css({background:'white'})
                $(".page-link:eq(2)").text(page).css({background:'cyan'})
                $(".pageNext").hide()
            }
            // $('.page-link').addClass('page-link');
            console.log(total_pages);
            console.log(page);
            // let url= "?limit=6&page="+page

            p= new products;
            p.reListProducts()
            p.getProductPage(url).then(msg=>{
                total_pages = msg.total_pages
                let items = msg.data;
                items.forEach(item => {
                    let id = item.ProductId;
                    let name = item.Name;
                    let price = item.Price;
                    let image = item.ProductPicUrl
                    let length = items.length
                    p.listProducts(id, name, price, image)
                    // console.log(id+"==>"+name+"==>"+price+"==>"+length+"==>"+msg.total_pages);
                });

                let ColorEvent = new Event('getAllBtns');
                const elem = document.querySelector('.items');
                elem.dispatchEvent(ColorEvent);
                console.log("first")
            });
        }
    })

    
})

class products
{
    getProductPage(urlPage)
    {
        
        return new Promise((resolve, reject)=>{
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
          price.addClass(`col-6 price ${id} text-left`)
          price.html(`${priceVal}`)
        let checkout =$("<div></div>")
            checkout.addClass("col-6 checkout text-right")
            checkout.html(`<a class='btn btn-sm btn-success' id="${id}"> check</a>`)
        

        item.append(cardDiv)
        cardDiv.append(itemTitle)
        cardDiv.append(imgTag)
        cardDiv.append(cardBody)
        cardBody.append(price)
        cardBody.append(checkout)
        items.append(item)
    }

    reListProducts()
    {
        let items = $(".items")
        items.empty()
    }
}