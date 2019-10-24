function ajaxCall(method, url, callback){
    const req = new XMLHttpRequest();
    req.open(method, url, true);
    req.send();
    req.addEventListener("readystatechange", function(){
        if(req.readyState == 4){
            if(req.status == 200){
                callback(req.response);
            }
            else{
                console.log(req.status);
            }
        }
    });
}

// Chuck Norris facts.
function displayChuck(jsonResponse){
    let jsonParse = JSON.parse(jsonResponse);
    document.getElementById("chuck").innerHTML = jsonParse["value"];
}

let chuckButton = document.getElementById("chuckButton");
chuckButton.addEventListener("click", function(){
        ajaxCall("GET", "https://api.chucknorris.io/jokes/random", displayChuck);
});