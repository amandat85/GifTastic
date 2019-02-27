$(document).ready(function () { //change to JS
    //VARIABLES======================================================================================================================
    var topics = ["Jean-Luc Picard", "William Riker", "Worf", "Data", "Deanna Troi", "Beverly Crusher"];
    // console.log(topics);
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
        //console.log(event);
        var sciFi = $(this).attr("data-name");//Change to JS
        //console.log(sciFi);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sciFi + "&api_key=cYiJj1CIt08YVAtJrYaKhUYxYUzVn35K" + "&limit=10"; 
        $.ajax({//change to JS fetch method
            url: queryURL,
            method: "GET"
        }).done(function (response){
            console.log(response);
            // console.log(queryURL);
            document.querySelector("#display").innerHTML = "";
            for (var i = 0; i < response.data.length; i++) {
                var imageDiv = document.createElement("div");
                imageDiv.setAttribute("class", "individualGif");
                var ratingsID = document.createElement("p");
                var ratings = response.data[i].rating.toUpperCase();
                ratingsID.innerHTML = ("RATINGS: " + ratings);

                var topicImage = document.createElement("img");
                topicImage.setAttribute("class", "gif");
                var imageURL = ("data-still", response.data[i].images.fixed_height_still.url); 
                topicImage.src = imageURL;
                topicImage.setAttribute("data-state", "still");
                
                var imageURLAnimate = ("data-animate", response.data[i].images.fixed_height.url);
                // console.log(imageURLA);
        
                // "data-animate", response.data[i].images.fixed_height.url);

                imageDiv.appendChild(ratingsID);
                imageDiv.appendChild(topicImage);
                document.querySelector("#display").prepend(imageDiv);
            };
             //change to js
    $(".gif").on("click", function(event){
        console.log(event);
        if ($(event.target).attr("data-state") === "still"){
            console.log("yes");
            topicImage.src = imageURLAnimate;
            topicImage.setAttribute("data-state", "animate");
          
        } 
        });

         //STILL AND ANIMATE======================================================================================
    //console.log(this);
   
          

    
        // else {
        //     $(this).attr("src", stillImage);
        //     $(this).attr("data-state", "still");
        // }
    });
    };
    //ADD ON CLICK FUNCTION=================================================================================
   // document.addEventListener("click", ".giphy", getGiphy);
   $(document).on("click", ".giphy", getGiphy);
  
});