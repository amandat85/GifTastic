$(document).ready(function () { 
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
        var giphy = $("#gifInput").val().trim();
        topics.push(giphy);
        makeButtons();
    });
    makeButtons();
    //GET GIPHY WITH API===========================================================================================================
    function getGiphy() {
        var sciFi = this.dataset.name;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sciFi + "&api_key=vm660ZFmWYyRPf3HYm3NY9HIqQiwRPd9" + "&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            document.querySelector("#display").innerHTML = "";
            for (var i = 0; i < response.data.length; i++) {
                var imageDiv = document.createElement("div");
                imageDiv.classList.add("individualGif", "mr-2", "float-left");
                var topicImage = document.createElement("img");
                topicImage.classList.add("gif", "mt-2");
                topicImage.src = response.data[i].images.fixed_height_still.url;
                topicImage.setAttribute("data-still", response.data[i].images.fixed_height_still.url);
                topicImage.setAttribute("data-animate", response.data[i].images.fixed_height.url);
                var ratingsID = document.createElement("p");
                var ratings = response.data[i].rating.toUpperCase();
                ratingsID.classList.add("mb-2");
                ratingsID.innerHTML = ("RATING: " + ratings);
                imageDiv.appendChild(topicImage);
                imageDiv.appendChild(ratingsID);
                document.querySelector("#display").prepend(imageDiv);
            };
            //ANIMATE/STILL=========================================================================================        
            $(".gif").on("click", function (event) {
                if (this.src === this.dataset.still) {
                    this.src = this.dataset.animate;
                }
                else {
                    this.src = this.dataset.still;
                }
            });
        });
    };
    //ADD ON CLICK FUNCTION=================================================================================
    $(document).on("click", ".giphy", getGiphy);
    //AUDIO PLAY/PAUSE======================================================================================
    document.querySelector("#play").addEventListener("click", function () {
        audio.play();
    });
    document.querySelector("#pause").addEventListener("click", function () {
        audio.pause();
    });
    //CLEAR INPUT=========================================================================================
    document.querySelector("#clearGif").addEventListener("click", function () {
        document.querySelector("#display").innerHTML = "";
    });
});
