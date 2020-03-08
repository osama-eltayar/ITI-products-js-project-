

const DB_NAME = 'OrdersHistory';
const DB_V = 1;
const ORDERS_HISTORY = 'OrdersHistory';
let db; 

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
        console.log('onsuccess');
        db = ev.target.result;
    }


    dbReq.onerror = (ev) => {
        console.error('onerror', ev.target.errorCode);
    };

}


$(".submitBtn").on("click",(ev)=>{
    console.log(getLocalStorageData());
    let items = getLocalStorageData()
    totalPrice = 0;
    items.forEach(element => {
        console.log(element);
        q = element.q;
        p = element.price;
        totalPrice += +p * +q;
    });
    let d = new Date();
    let day = d.getDay();
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

