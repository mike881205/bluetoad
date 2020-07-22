// Function to retrieve and add imgs to the page
searchAPI = (searchTerm) => {
    //Clear the previous results (if any)
    $("#imgs-appear-here").empty();
    // Add personal API key here
    let APIKEY = ""
    // Giphy API URL
    let queryURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=" + searchTerm + "&safe_search=1&api_key=" + APIKEY + "&per_page=25&format=json&nojsoncallback=1"
    // Ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then((data) => {
            // Assign variable to returned data array
            let photos = data.photos.photo
            // Go through the results
            for (let i = 0; i < photos.length; i++) {
                // Create image URL tag variables
                let farm = photos[i].farm.toString()
                let server = photos[i].server
                let id = photos[i].id
                let secret = photos[i].secret
                // Create the image
                let url = "https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + "_c.jpg"
                // Creating row/col structure for the img
                let imgRow = $("<div>").addClass("row imgRow")
                let imgCol = $("<div>").addClass("col-sm imgCol");
                // Create Image
                let image = $("<img>").addClass("searchImg").attr("src", url).attr("alt", searchTerm);
                // Append the image and row/col
                imgCol.append(image);
                imgRow.append(imgCol)
                // Prepending the imgRow to the "#gifs-appear-here" div in the HTML
                $("#imgs-appear-here").prepend(imgRow);
            }
        })
}

// Function to handle button click
$(document).on("click", "#searchBtn", (event) => {
    // Only search if the input has a value
    if ($("#search-input").val()) {
        event.preventDefault()
        // Pass the input value into the searchAPI function
        searchAPI($("#search-input").val());
    }
})

// Function to handle key press
$(document).keypress((event) => {
    // Only search if the enter key was pressed & the input has a value
    if (event.keyCode === 13 && $("#search-input").val()) {
        event.preventDefault()
        // Pass the input value into the searchAPI function
        searchAPI($("#search-input").val());
    }
})