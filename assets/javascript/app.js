var topics = ["Star Trek:TNG", "Doctor Who", "Battlestar Gallactica", "Torchwood"];
//set up url to get the gif using the api url + title or keyword + api key
//use jQuery ajax method to get the gifs
//For each array position, make a button and append it to HTML element
function buttons() {
    //document.querySelector("#gifArea").innerHTML = "";
    document.querySelector("#gifArea").innerHTML = "";
    for (var i = 0; i < topics.length; i++) {
        var addBtn = document.createElement("button");
        addBtn.setAttribute("class", "giphy");
        addBtn.setAttribute("data-name", topics[i]);
        addBtn.innerHTML = (topics[i]);
        document.querySelector("#gifArea").appendChild(addBtn);
    }
}

document.querySelector("#addGif").addEventListener("click", function (event) {
    event.preventDefault();
    var giphy = $("#gifInput").val().trim();
    // document.querySelector("#gifInput").string.trim();
    topics.push(giphy);
    buttons();
});
buttons();

document.querySelector("button").addEventListener("click", function(event){
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=cYiJj1CIt08YVAtJrYaKhUYxYUzVn35K";

    $.ajax({//change to JS fetch method
        url: queryURL,
        method: "GET"
    }).then(function(reponse){



        
    })
})


//create an on click function for each button
//Function will grab 10 *static* images on the topic from Giphy API
//Create onclick function that will animate and stop animation for each gif
//Display the metadata underneath each gif: rating
//TEST IT ALL OUT
