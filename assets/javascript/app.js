$(document).ready(function () { //change to JS
var topics = ["Doctor Who", "Star Trek:TNG", "Battlestar Gallactica", "Torchwood"];
//set up url to get the gif using the api url + title or keyword + api key
//use jQuery ajax method to get the gifs
//For each array position, make a button and append it to HTML element
function makeButtons() {
    document.querySelector("#gifButton").innerHTML = "";
    for (var i = 0; i < topics.length; i++) {
        var addBtn = document.createElement("button");
        addBtn.setAttribute("class", "giphy");
        addBtn.setAttribute("data-name", topics[i]);
        addBtn.innerHTML = (topics[i]);
        document.querySelector("#gifButton").appendChild(addBtn);
    }


document.querySelector("#addGif").addEventListener("click", function (event) {
    event.preventDefault();
    var giphy = $("#gifInput").val().trim();
    // document.querySelector("#gifInput").string.trim();
    topics.push(giphy);
    
});


// document.querySelector("button").addEventListener("click", function(event)//why did this only work on one button?
$("button").on("click", function(event){
    document.querySelector("#display").innerHTML = "";
    //console.log(event);
    var sciFi = $(this).attr("data-name");//Change to JS
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sciFi + "&api_key=cYiJj1CIt08YVAtJrYaKhUYxYUzVn35K";

    $.ajax({//change to JS fetch method
        url: queryURL,
        method: "GET"
    }).then(function(response){
        //console.log(response.data);   
        // display(response);
        document.querySelector("#display").innerHTML = "";
    for (var i = 0; i < response.data.length; i++){
        var ratings = document.createElement("p");
        ratings.innerHTML = ("Rating: " + response.data[i].rating);
        //console.log(ratings);
        document.querySelector("#display").appendChild(ratings);
        var imageURL = response.data[i].images.fixed_width_still.url;
        //console.log(imageURL);
        //console.log(images);
        //Change this to vanilla js
        var topicImage = $("<img>");
        topicImage.attr = ("src", imageURL);
        console.log(topicImage);
        $("#display").append(topicImage);
        // $(images).attr("src", response.data[i].images.fixed_width_still.url);
        // // images.innerHTML = response.data[i].images.fixed_width_still.url;
        // document.querySelector("p").prepend(images);

    }
    })
})

}

makeButtons();
})

//create an on click function for each button
//Function will grab 10 *static* images on the topic from Giphy API
//Create onclick function that will animate and stop animation for each gif
//Display the metadata underneath each gif: rating
//TEST IT ALL OUT
