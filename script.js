function demo(){
    alert("hi! \n Alert script works for now!");
};
/* function myDisplayer(some) {
    document.getElementById("demopara").innerHTML = some;
}
let myPromise = new Promise(function(myResolve, myReject) {
    let req = new XMLHttpRequest();
    req.open('GET', "index2.html");
    req.onload = function() {
        if (req.status == 200) {
                myResolve(req.response);
        } else {
            myReject("File not Found");
        }
    };
        req.send();
});
  
myPromise.then(
    function(value) {myDisplayer(value);},
    function(error) {myDisplayer(error);}
); */

/* gpay section code begins */

let googlePayClient;
const tokenizationSpecification = {
    type: 'PAYMENT_GATEWAY',
    parameters: {
        gateway: 'example',
        gatewayMerchantId: 'gatewayMerchantID',
    }
};
const cardPaymentMethod = {
    type: 'CARD',
    parameters: {
        allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"],
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
    }
};
const googlePayConfiguration = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [cardPaymentMethod]
};
function onGooglePayLoaded(){
    googlePayClient = new google.payments.api.PaymentsClient({
        environment: 'TEST', 
});

googlePayClient.isReadyToPay(googlePayConfiguration)
    .then(response => {
        if (response.result){
            createAndAddButton();
        }else{
            //current user cannot pay using google pay offer another payment option here
        }
    })
    .catch(error => console.error('isReadyToPay error : ', error ));   
}

function createAndAddButton() {
    const googlePayButton = googlePayClient.createButton({
        onclick: onGooglePayButtonClicked
    });

    document.getElementById('buy-now').appendChild(googlePayButton);
}

function onGooglePayButtonClicked(){
    const paymentDataRequest = { ...googlePayConfiguration };
    paymentDataRequest.merchantInfo = {
        merchantId: 'BCR2DN4TQSEIBYLW',
        merchantName: 'K2',
    };

    paymentDataRequest.transactionInfo = {
        totalPriceStatus: 'FINAL',
        totalPrice: 10,
        currencyCode: 'INR',
        countryCode: 'IN',
    };

    googlePayClient.loadPaymentData(paymentDataRequest)
    .then(paymentData => processPaymentData(paymentData))
    .catch(error => console.error('loadPaymentData error : ', error));

}

function processPaymentData(paymentData){
    fetch(ordersEndpointURL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: paymentData
    });
}

/* gpay section code ends */