

const DB_NAME = 'OrdersHistory';
const DB_V = 1;
const ORDERS_HISTORY = 'OrdersHistory';
let db;
const st = 'OrdersHistory' ;

if ('indexedDB' in window) {
    openDB();
}


function openDB() {
    const dbReq = indexedDB.open(DB_NAME, DB_V);
    dbReq.onupgradeneeded = (ev) => {
        console.log('onupgradeneeded');
        const db = ev.target.result;
        console.log(ev);
        console.log(db);

        if (!db.objectStoreNames.contains(ORDERS_HISTORY)) {
            db.createObjectStore(ORDERS_HISTORY, { keyPath: 'order', autoIncrement: true });
        }
    };


    dbReq.onsuccess = (ev) => {
        db = ev.target.result;
        let ts = db.transaction(st, 'readwrite');
        console.log(ts);
        let bs = ts.objectStore(st);
        console.log(bs);

        bs.openCursor().onsuccess = (ev) => {
            console.log("try try");
            const cursor = ev.target.result;
            console.log(cursor);
            if (cursor) {
                console.log("cursor");
                order = cursor.value.order;
                date = cursor.value.date;
                status = cursor.value.status;
                total = cursor.value.total;


                $("<tr class='table-success'><th scope="+"row"+" >" + order + " </th><td>" + date + "</td><td> " + status + "</td><td> " + total + "</td></tr>").appendTo("#histBody");
                // $("<tr class='table-success' ><th scope='row'>" + order + "</th><td>" + date + "</td><td> " + status + "</td><td> " + total + "</td></tr>").appendTo("#histBody");
            
                cursor.continue();
            }
            else
                console.log("done");
        };        
    }


    dbReq.onerror = (ev) => {
        console.error('onerror', ev.target.errorCode);
    };

}


$(".submitBtn").on("click",(ev)=>{
    console.log(getLocalStorageData());
    let items = getLocalStorageData()
    totalPrice = 0;
    totalQuantity = 0;
    items.forEach(element => {
        console.log(element);
        q = element.q;
        p = element.price;
        totalQuantity += q; 
        totalPrice += +p * +q;
    });
    if (totalQuantity==1) 
    {
        totalPrice =`$${totalPrice} for ${totalQuantity} item`;
    }
    else
    {
        totalPrice =`$${totalPrice} for ${totalQuantity} items`;
    }
    let d = new Date();
    let day = d.getDate();
    let year = d.getFullYear();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[d.getMonth()];
    let date = `${month} ${day}, ${year}`;
    const tx = db.transaction(ORDERS_HISTORY, 'readwrite');
    const orderTx = tx.objectStore(ORDERS_HISTORY);
    orderTx.add({
        date: date,
        status: "Processing",
        total:totalPrice
    });
    
    localStorage.clear()
    console.log("removed from localstorage");
});

