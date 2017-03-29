/*===FUNCTIONS FOR 'RANDOM' ENDPOINT*/
var random = (function () {
    /*Determine tags depending on the user's input*/
    var obtainTags = () => {
        var tags = '';
        tags = document.getElementById('tags').value;
        if (tags !== '') {
            tags = `&tag=${general.searchStringReplacement(tags)}`;
        }
        return tags;
    };

    /*Ajax request for obtaining a random gif*/
    var getRandom = () => {
        /*Show preloader*/
        general.showPreloader();

        /*Determine url depending on whether there were any tags selected*/
        var url = `http://api.giphy.com/v1/gifs/random?limit=36&api_key=dc6zaTOxFJmzC${obtainTags()}`;


        /*Ajax with function calls inside*/
        $.ajax({
            method: 'GET',
            url: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (response) => {
                console.log(response);
                general.clearContainer();
                general.embedAll(response);
                return response;
            },
            error: (error) => {
                console.log(error);
                general.clearContainer();
                return error;
            }
        })
    };

    /*Public*/
    return {
        getRandom: getRandom
    };
})();