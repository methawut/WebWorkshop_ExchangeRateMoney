// ! document.getElementById ----> เข้าถึง Element ID ต่างๆ ใน HTML

// TODO --> ส่วนของ Tab เลือกสกุลเงิน : <select name="" id="currency">
const Currency_before = document.getElementById('currency-init');     //*ตัวแปล currency_before เข้าถึง Element ID: currency-init ใน HTML
const Currency_after = document.getElementById('currency-final');   //*ตัวแปล currency_after เข้าถึง Element ID: currency-final ใน HTML


// TODO --> ส่วนของช่องพิมพ์จำนวนเงิน :<input type="number" name="" id="amount" value="1">
const Amount_before = document.getElementById('amount-init');         //*ตัวแปล amount_before เข้าถึง Element ID: amount_init ใน HTML
const Amount_after = document.getElementById('amount-final');       //*ตัวแปล amount_after เข้าถึง Element ID: amount_final ใน HTML


// TODO --> ส่วนของอัตราแลกเปลี่ยนเงิน : <div class="rate" id="rate"> อัตราแลกเปลี่ยน </div>
const RateText = document.getElementById('rate');       //*ตัวแปล RateText เข้าถึง Element ID: rate ใน HTML


// TODO --> ส่วนของปุ่มสลับสกุลเงิน : <button class="btn" id="btn"> สลับสกุลเงิน </button>
const SwapButton = document.getElementById('btn');      //*ตัวแปล SwapButton เข้าถึง Element ID: btn ใน HTML

// 
// 
// 
// 
// 
// 
// 
// 

CalculateMoney_FUNC();      //* เริ่มโปรแกรม จะเรียกใช้ฟังก์ชั่นทันที



// ! addEventListener ----> เมื่อมีการเกิด Event ที่ตัวแปลนั้นๆ ด้วยวิธีต่างๆ จะเรียกใช้ฟังก์ชั่น
Currency_before.addEventListener('change',CalculateMoney_FUNC);     //* addEventListener : เมื่อมีการเกิด Event ที่ตัวแปล "Currency_before", ด้วยวิธีการ "change", จะเรียกใช้ฟังก์ชั่น "CalculateMoney_FUNC"
Currency_after.addEventListener('change',CalculateMoney_FUNC);      //* addEventListener : เมื่อมีการเกิด Event ที่ตัวแปล "Currency_after", ด้วยวิธีการ "change", จะเรียกใช้ฟังก์ชั่น "CalculateMoney_FUNC"

Amount_before.addEventListener('input',CalculateMoney_FUNC);        //* addEventListener : เมื่อมีการเกิด Event ที่ตัวแปล "Amount_before", ด้วยวิธีการ "input", จะเรียกใช้ฟังก์ชั่น "CalculateMoney_FUNC"
Amount_after.addEventListener('input',CalculateMoney_FUNC);

SwapButton.addEventListener('click', ()=>{                          
        const TestBefore = Currency_before.value;
        Currency_before.value = Currency_after.value;
        Currency_after.value = TestBefore;
        CalculateMoney_FUNC();

        /*
        *           addEventListener : เมื่อมีการเกิด Event ที่ตัวแปล "SwapButton", ด้วยวิธีการ "click" , *** ()=>{ } : เป็นฟังก์ชั่น ไม่ส่งค่ากลับ
        TODO:       Currency_before เป็นตัวแปลที่เข้าถึง Element ID: currency-init ใน HTML (เป็นส่วน Tab)
        TODO:       Currency_after เป็นตัวแปลที่ Element ID: currency-init ใน HTML  (เป็นส่วน Tab)
        TODO:       value เป็นค่าใน Tab Currency ที่เข้าถึง Element ID: currency ใน HTML (ส่วนของสกุลเงิน)
        */
});





function CalculateMoney_FUNC(){
    console.log("Clicked Currency Box");    //* print ที่ console log ใน F12 ที่ Web

    const Before = Currency_before.value;   //* เก็บ value ที่อยู่ในช่องใส่ตัวแปล
    const After = Currency_after.value;

    console.log("สกุลเงินต้นทาง = " , Before);     //* print(" " , value in variable)
    console.log("สกุลเงินปลายทาง = " , After);

    //
    //

    // ! fetch -> เป็นการดึง link api ที่จะใช้งาน
    // let APIurl = `https://api.exchangerate-api.com/v4/latest/${Before}` ;
    // fetch(APIurl);
    
    fetch(`https://api.exchangerate-api.com/v4/latest/${Before}`)   // TODO ---> ตัวแปล Before, มาจาก Currency_before, มาจาก currency-init ใน HTML
    .then(res => res.json())                                        // TODO ---> คำสั่ง Then เป็นการ return ค่า : โดยให้ return ไฟล์ Json (ในลิงค์ API นี้ เป็นไฟล์ Json) ที่ถูกเก็บอยู่ในตัวแปล "res"
    .then(data => {                                                 // TODO ---> ใน api มีตัวแปล res และ data ที่คอยให้ข้อมูล และตัวแปล data มีตัวแปล rates ที่คอยให้ข้อมูลอัตราเงิน
        console.log(data);   
        const showrate = data.rates[After];                         // *ตัวแปล showrate เก็บค่าในตัวแปล rates ที่อยู่ใน data ของ api


        // ! addEventListener ----> print คำใส่ตัวแปลนั้นๆ ที่เข้าถึง Element ID ต่างๆ ใน HTML
        RateText.innerText = `1 ${Before} = ${showrate}${After}` ;   


        Amount_after.value = (Amount_before.value * showrate).toFixed(2);   
        /* 
        *   Amount_after --> ตัวแปลที่เข้าถึง Element ID: amount_final ใน HTML
        *   value --> ค่าที่แสดงใน Tap Input : <input type="number" name="" id="amount_final" value="1">
        *   toFixed() --> จำกัดตำแหน่งทศนิยม
        */   
    })
}