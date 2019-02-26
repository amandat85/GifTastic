$(document).ready(function () { //change to JS
    //VARIABLES====================================================================================================================    
    var topics = ["Star Trek", "Star Trek:TNG", "Star Trek:DS9", "Star Trek: Voyager", "Star Trek: Enterprise", "Star Trek: Discovery"];
    console.log(topics);
    //MAKE BUTTONS=================================================================================================================
    function makeButtons(){
        document.querySelector("#gifButton").innerHTML = "";
        for (var i = 0; i < topics.length; i++) {
            var addBtn = document.createElement("button");
            addBtn.setAttribute("class", "giphy");
            addBtn.setAttribute("data-name", topics[i]);
            addBtn.innerHTML = (topics[i]);
            document.querySelector("#gifButton").appendChild(addBtn);
        };
    };
    document.querySelector("#addGif").addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelector("#gifInput").innerHTML = "";
        var giphy = $("#gifInput").val().trim();//switch to js
        topics.push(giphy);
        makeButtons();
        //console.log(topics);  
    });
    makeButtons();
    //GET GIPHY WITH API============================================================================================================
    function getGiphy() {
        document.querySelector("#display").innerHTML = "";
        //console.log(event);
        var sciFi = $(this).attr("data-name");//Change to JS
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sciFi + "&api_key=cYiJj1CIt08YVAtJrYaKhUYxYUzVn35K" + "&limit=10";
        $.ajax({//change to JS fetch method
            url: queryURL,
            method: "GET"
        }).done(function (response){
            console.log(response);
            console.log(queryURL);
            for (var i = 0; i < response.data.length; i++) {
                var ratings = document.createElement("p");
                ratings.innerHTML = ("Rating: " + response.data[i].rating);
                document.querySelector("#display").appendChild(ratings);
                var imageURL = response.data[i].images.fixed_width_still.url;
                var topicImage = document.createElement("img");
                topicImage.src = imageURL;
                console.log(topicImage);
                $("#display").append(topicImage);   //Change this to vanilla js
            };
        });
    };
    //ADD ON CLICK FUNCTION=================================================================================
    $(document).on("click", ".giphy", getGiphy);















})