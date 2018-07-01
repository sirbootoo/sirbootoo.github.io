import { currencies, setCurrencyList, listCurrencies, setConvertion, getConvertion } from './indexdb';
// declare $;
const firstInput = document.querySelector('#firstInput');
const secondInput = document.querySelector('#secondInput');
const firstSelect = document.querySelector('#inputGroupSelect01');
const secondSelect = document.querySelector('#inputGroupSelect02');

let rate;

const onlineFetching = () => {
    fetch('https://free.currencyconverterapi.com/api/v5/currencies')
        .then((res) => {
            return res.json();
        })
        .then((payload) => {
            let payl = payload.results;
            console.log(payl);
            let i = 0;
            for (let mkey in payl) { // key val looping
                let key = payl[mkey];
                if (key.id === 'NGN') {
                    firstSelect.innerHTML += `<option data-symbol="${key.currencySymbol || key.id}" id="${key.id + i}" value="${key.id}" selected>${key.id}</option>`
                    getRate();
                    updateSymbol();
                    updateSymbol2();
                } else if (key.id === 'USD') {
                    secondSelect.innerHTML += `<option data-symbol="${key.currencySymbol || key.id}" value="${key.id}" selected>${key.id}</option>`
                }
                firstSelect.innerHTML += `<option data-symbol="${key.currencySymbol || key.id}" id="${key.id + i}" value="${key.id}">${key.id}</option>`
                secondSelect.innerHTML += `<option data-symbol="${key.currencySymbol || key.id}" value="${key.id}">${key.id}</option>`
                setCurrencyList(i, payl[mkey]);
                i++;
            }
        }).catch(() => {
            offlineFetching();
        });
}

const offlineFetching = () => {
    listCurrencies().then(payload => {
        console.log(payload);
        let i = 0;
            for (let obj of array) { // key val looping
                let key = obj;
                console.log(key);
                if (key.id === 'NGN') {
                    firstSelect.innerHTML += `<option data-symbol="${key.currencySymbol || key.id}" id="${key.id + i}" value="${key.id}" selected>${key.id}</option>`
                    getRate();
                    updateSymbol();
                    updateSymbol2();
                } else if (key.id === 'USD') {
                    secondSelect.innerHTML += `<option data-symbol="${key.currencySymbol || key.id}" value="${key.id}" selected>${key.id}</option>`
                }
                firstSelect.innerHTML += `<option data-symbol="${key.currencySymbol || key.id}" id="${key.id + i}" value="${key.id}">${key.id}</option>`
                secondSelect.innerHTML += `<option data-symbol="${key.currencySymbol || key.id}" value="${key.id}">${key.id}</option>`
                i++;
            }
    })
}

secondSelect.addEventListener('change', () => {
    updateSymbol2();
    getRate();
});
firstSelect.addEventListener('change', () => {
    updateSymbol();
    getRate();
})

const updateSymbol = (e) => {
    let select = document.querySelector("#inputGroupSelect01");
    const selected = select.options[select.selectedIndex].dataset.symbol;
    console.log(selected);
    document.querySelector("#input-group-text01").innerHTML = selected;
}

const getRate = (payload) => {
    fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${firstSelect.value}_${secondSelect.value},${secondSelect.value}_${firstSelect.value}`).then(payload => {
        return payload.json();
    }).then(res => {
        console.log(res);
        let results = res.results;
        for(let resul in results){
            console.log(resul);
            results[resul].timestamp = new Date();
            setConvertion(resul, results[resul]);
            rate = results[resul];
        }
    }).catch((err) => {
        console.log(err);
        getConvertion(`${firstSelect.value}_${secondSelect.value}`).then(getPayload => {
            rate = getPayload;
            rate.offline = true;
        }).catch(err => {
            console.log(err);
        })
    });
}



document.getElementById('convertBtn').addEventListener('click', (lo) => {
    console.log(firstSelect.value, secondSelect.value);
    console.log(rate);
    secondInput.value = Number(firstInput.value) * Number(rate.val);
    if(rate.offline){
        document.querySelector('#warning').innerHTML = `<p>This might not be the updated conversion, but this is the conversion as at :  ${rate.timestamp.getDay().toLocaleDateString("en-US", options)}</p>`
    }
});

const updateSymbol2 = (e) => {
    let select = document.querySelector("#inputGroupSelect02");
    const selected = select.options[select.selectedIndex].dataset.symbol;
    console.log(selected);
    document.querySelector("#input-group-text02").innerHTML = selected;
}


const init = () => {
    onlineFetching();
}

init();