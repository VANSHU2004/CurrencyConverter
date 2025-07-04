const API_KEY = 'cur_live_5uxQTw7zhIkWwsSLYKNArCH2CWhQQmvmJWMXqB4I'; // Replace with your actual key
const BASE_URL = 'https://api.currencyapi.com/v3/latest';

let dropdowns = document.querySelectorAll(".dropDown select");
let btn = document.querySelector("form button");
let amount = document.querySelector(".amount input");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let result = document.querySelector(".msg p");




for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;     
        
        if(select.name ==="from" && currCode ==="USD"){
            newOption.selected = "selected";
        }            
        if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });

        
}  

const updateFlag = (element) =>{
    
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let image = element.parentElement.querySelector("img");
    image.src = newSrc;


}

let updateExchangerate = async () => {
    let amountValue = amount.value;
    if(amountValue ==="" || amountValue<0){
        amountValue=1;
        amount.value="1";
    }
    try{

        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurr.value}`);
        const data = await response.json();
        const rate = data.data[toCurr.value].value;
        const convertedAmount = (rate * amountValue).toFixed(2);

        result.innerText = `${amountValue} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
        

    } catch(err){
        console.error(err);
    }
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
})

window.addEventListener("load",()=>{
    updateExchangerate();    
})






