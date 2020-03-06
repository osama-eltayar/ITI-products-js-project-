$(function()
{
    let total_pages 
    let page=1
    let url= "page="+page

    p= new products;
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
    });



    $(".pagePrev").on('click',()=>{
        if (page==1) {
            console.log("end");
        }
        else
        {
            page = page-1
            console.log(page);
            let url= "page="+page

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
            });
        }
    })
    $(".pageNext").on('click',()=>{
        if (page==total_pages) {
            console.log("end");
        }
        else
        {
            page = page+1
            console.log(total_pages);
            console.log(page);
            let url= "page="+page

            p= new products;
            p.reListProducts()
            p.getProductPage(url).then(msg=>{
            //     console.log(msg)
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
            });
        }
    })

    
})

class products
{
    async getProductPage(urlPage)
    {
        return await new Promise((resolve, reject)=>{
            $.ajax({
                url:"https://afternoon-falls-30227.herokuapp.com/api/v1/products?limit=6&"+urlPage, //path or url 
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
          price.addClass("col-6 price text-left")
          price.text(`${priceVal}$`)
        let checkout =$("<div></div>")
            checkout.addClass("col-6 checkout text-right")
            checkout.html("<a class='btn btn-sm btn-success'> check</a>")
        

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