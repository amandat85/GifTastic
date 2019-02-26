$(document).ready(function () { //change to JS
    //VARIABLES======================================================================================================================
    var topics = ["Captain Pike", "Captain Kirk", "Captain Picard", "Captain Sisko", "Captain Janeway", "Captain Archer", "Captain Lorca"];
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
        console.log(event);
        var sciFi = $(this).attr("data-name");//Change to JS
        console.log(sciFi);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sciFi + "&api_key=cYiJj1CIt08YVAtJrYaKhUYxYUzVn35K" + "&limit=10"; 
        $.ajax({//change to JS fetch method
            url: queryURL,
            method: "GET"
        }).done(function (response){
            // console.log(response);
            // console.log(queryURL);
            document.querySelector("#display").innerHTML = "";
            for (var i = 0; i < response.data.length; i++) {
                // var imageDiv = document.createElement("div");
                var ratingsID = document.createElement("p");
                var ratings = response.data[i].rating.toUpperCase();
                ratingsID.innerHTML = ("RATINGS: " + ratings);
                var imageURL = response.data[i].images.fixed_width_still.url;
                var imageURLA = response.data[i].images.fixed_width.url;
                var topicImage = document.createElement("img");
                topicImage.src = imageURL;
                topicImage.setAttribute("class", "gif");
                topicImage.setAttribute("data-state", "still");
                console.log(topicImage);
                // document.querySelector("#display").appendChild(imageDiv);
                document.querySelector("#display").setAttribute("class", "individualGif");
                document.querySelector(".individualGif").appendChild(ratingsID);
                document.querySelector(".individualGif").appendChild(topicImage);//having issues with prepend //change so there are two beside each other.
            };
        });
    };
    //ADD ON CLICK FUNCTION=================================================================================
   // document.addEventListener("click", ".giphy", getGiphy);
   $(document).on("click", ".giphy", getGiphy);
    //STILL AND ANIMATE======================================================================================
//     function animate(){
//         var state = $(this).attr("data-state");//js
//         if (state === still) {
//             console.log("yes");
//             console.log(state);
//         }
       
    
//     }
// animate();














})