$(document).ready(function () { //change to JS
    //VARIABLES======================================================================================================================
    var topics = ["Captain Picard", "William Riker", "Worf", "Data", "Deanna Troi", "Beverly Crusher", "Geordi La Forge"];
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
                var ratingsID = document.createElement("p");
                var ratings = response.data[i].rating.toUpperCase();
                ratingsID.innerHTML = ("RATING: " + ratings);
                var topicImage = document.createElement("img");
                topicImage.setAttribute("class", "gif");
                var imageURL = ("data-still", response.data[i].images.fixed_height_still.url);
                topicImage.src = imageURL;
                topicImage.setAttribute("data-state", "still");
                var imageURLAnimate = ("data-animate", response.data[i].images.fixed_height.url);
                imageDiv.appendChild(ratingsID);
                imageDiv.appendChild(topicImage);
                document.querySelector("#display").prepend(imageDiv);
             
            };
            //change to js
            $(".gif").on("click", function (event) {
                var  state = $(this).attr("data-state");
                
                console.log(event);
                //use getattribute??
                //assign to a specific gif?
                if (state === "still") {
                    console.log("yes");
                    topicImage.src = imageURLAnimate;
                    topicImage.setAttribute("data-state", "animate");
                }
                else {
                    topicImage.src = imageURL;
                    topicImage.setAttribute("data-state", "still")
                }

                console.log(state);
            
            });
        });
    };
    //ADD ON CLICK FUNCTION=================================================================================
    // document.addEventListener("click", ".giphy", getGiphy);
    $(document).on("click", ".giphy", getGiphy);
});