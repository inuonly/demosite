function demo(){
    alert("hi! \n Alert script works for now!");
};

let myPromise = new Promise(function(myResolve, myReject) {
    let req = new XMLHttpRequest();
    req.open('GET', "index.html");
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
);