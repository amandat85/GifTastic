$(document).ready(function () { //change to JS
    //VARIABLES======================================================================================================================
    var topics = ["Captain Picard", "William Riker", "Worf", "Data", "Deanna Troi", "Beverly Crusher", "Geordi La Forge"];
    var audio = document.createElement("audio");
    audio.setAttribute("src", "assets/audio/TheNextGenerationTheme.mp3");
    //MAKE BUTTONS=================================================================================================================
    function makeButtons() {
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
    });
    makeButtons();
    //GET GIPHY WITH API===========================================================================================================
    function getGiphy() {
        var sciFi = $(this).attr("data-name");//Change to JS
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sciFi + "&api_key=cYiJj1CIt08YVAtJrYaKhUYxYUzVn35K" + "&limit=10";
        $.ajax({//change to JS fetch method? or xhr?
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            document.querySelector("#display").innerHTML = "";
            for (var i = 0; i < response.data.length; i++) {
                var imageDiv = document.createElement("div");
                imageDiv.setAttribute("class", "individualGif");
                var topicImage = document.createElement("img");
                topicImage.setAttribute("class", "gif");
                //Set both still and animated to same variable?
               // var imageURL = ("data-still", response.data[i].images.fixed_height_still.url);
                topicImage.src = response.data[i].images.fixed_height_still.url;
                topicImage.setAttribute("data-still", response.data[i].images.fixed_height_still.url);
                topicImage.setAttribute("data-animate", response.data[i].images.fixed_height.url);


               //var imageURLAnimate = ("data-animate", response.data[i].images.fixed_height.url); //append attribute data-state=animate?
                var ratingsID = document.createElement("p");
                var ratings = response.data[i].rating.toUpperCase();
                ratingsID.innerHTML = ("RATING: " + ratings);
                imageDiv.appendChild(topicImage);
                imageDiv.appendChild(ratingsID);
                document.querySelector("#display").prepend(imageDiv);
             
            };
            //change to js
            $(".gif").on("click", function (event) {
                console.log(this);
                if ($(this).attr("src") === $(this).attr("data-still")){
                    
                    // $(this).src() = $(this).attr("data-animate")
                    $(this).attr("src", $(this).attr("data-animate"));
                }
                else {
                    $(this).attr("src", $(this).attr("data-still"));
                }

                //var state = this.dataset.state;

                // var  state = $(this).attr("data-state");
                
                // console.log(event);
                // //use getattribute??
                // //assign to a specific gif with id?
                // if (state === "still") {
                //     topicImage.src = imageURLAnimate;
                //     topicImage.setAttribute("data-state", "animate");
                // }
                // else {
                //     topicImage.src = imageURL;
                //     topicImage.setAttribute("data-state", "still")
                // }

                // console.log(state);
            
            });
        });
    };
    //ADD ON CLICK FUNCTION=================================================================================
    // document.addEventListener("click", ".giphy", getGiphy);
    $(document).on("click", ".giphy", getGiphy);
    $("#play").on("click", function(){
        audio.play();
    });

    $("#pause").on("click", function(){
        audio.pause();
    });





});