/*===MAIN VARIABLES AND FUNCTIONS===*/
var general = (function () {
    /*Replace blankspace with '+' in a string*/
    var searchStringReplacement = (str) => {
        for (let i = 0; i < str.length; i++) {
            if (str[i] === " " || str[i] === ",") {
                str[i] = "+";
            }
        }
        return str;
    };

    /*Return value of search field with blankspaces converted to '+'*/
    var determineSearchTerms = () => {
        var terms = document.getElementById('search').value;

        /*Control*/
        if (terms === '') {
            console.log('No input was provided.')
        }

        /*Function call to fix up the search string*/
        terms = searchStringReplacement(terms);
        return terms;
    };


    /*Get and clear the container div with sub-divs where the gifs are to be appended*/
    var clearContainer = () => {
        var container = document.getElementById('container');
        container.innerHTML = '';
        container.innerHTML = `<div class="row" id="result"></div>
        <div class="row" id="result2"></div>
        <div class="row" id="result3"></div>
        <div class="row" id="result4"></div>
        <div class="row" id="result5"></div>
        <div class="row" id="result6"></div>`;
    };

    /*Embed gifs from response*/
    var embedAll = (response) => {
        /*Call function which clears container div*/
        clearContainer();

        var result = document.getElementById('result');
        var result2 = document.getElementById('result2');
        var result3 = document.getElementById('result3');
        var result4 = document.getElementById('result4');
        var result5 = document.getElementById('result5');
        var result6 = document.getElementById('result6');

        /*Loop through all gifs and append them*/
        for (let i = 0; i < response.data.length; i++) {
            var thumbnail = document.createElement('div');
            thumbnail.setAttribute("class", "col-xs-12 col-sm-6 col-md-4 col-lg-2");
            thumbnail.innerHTML = `<a href="#" class="thumbnail">
    <img src="${response.data[i].images.fixed_height_small.url}" alt="gif" class="img-thumbnail">
</a>`;
            if (i < 6) {
                result.appendChild(thumbnail);
            } else if (i > 5 && i < 12) {
                result2.appendChild(thumbnail);
            } else if (i > 11 && i < 18) {
                result3.appendChild(thumbnail);
            } else if (i > 17 && i < 24) {
                result4.appendChild(thumbnail);
            } else if (i > 23 && i < 30) {
                result5.appendChild(thumbnail);
            } else {
                result6.appendChild(thumbnail);
            }
        }
    };

    /*Public*/
    return {
        clearContainer: clearContainer,
        embedAll: embedAll,
        searchStringReplacement: searchStringReplacement,
        determineSearchTerms: determineSearchTerms
    };
})();

/*===FUNCTIONS FOR TRENDING ENDPOINT===*/
var trending = (function () {
    /*Keeps track of the value of the offset. Default offset is 0*/
    var offset = 0;

    /*Keeps track of the total search results*/
    var totalResults = 0;

    /*Changes the offset to what it should be on the next page*/
    var nextOffset = () => {
        offset = offset + 36;
    };

    /*Changes the offset to what it should be on the previous page*/
    var previousOffset = () => {
        offset = offset - 36;
    };

    /*Determines value of totalResults variable depending on the search response*/
    var determineTotalResults = (response) => {
        totalResults = response.pagination.total_count;
    };

    /*Control for offset; sets offset to 0 when it would be too large and maximizes it if too small*/
    var offsetControl = () => {
        if (offset >= totalResults) {
            offset = 0;
        } else if (offset < 0) {
            offset = totalResults - 36;
        }
    };

    /*Swap to the next page. Requires in parameter with the appropriate function.*/
    var nextPage = () => {
        /*Change value of offset*/
        nextOffset();

        /*Control*/
        offsetControl();

        /*New gifs with the new offset*/
        getTrending();
    };

    /*Swap to the previous page. Requires in parameter with the appropriate function.*/
    var previousPage = () => {
        /*Change value of offset*/
        previousOffset();

        /*Control*/
        offsetControl();

        /*New gifs with the new offset*/
        getTrending();
    };

    /*Determines what the offset string will be, to be used in the search query*/
    var setOffsetString = () => {
        var offsetString = '';
        if (offset !== 0) {
            offsetString = `offset=${offset}&`;
        }
        return offsetString;
    };

    /*Because the file path is different, trending has its own function to show the preloader*/
    var showPreloader = () => {
        /*Call function which clears container div*/
        general.clearContainer();

        /*Add new content*/
        document.getElementById('result').innerHTML = `<img src="images/pre-loader.gif" alt="loading..." class="preloader">`;
    };


    /*Ajax request for obtaining trending gifs*/
    var getTrending = () => {
        /*Show preloader*/
        showPreloader();

        var url = `http://api.giphy.com/v1/gifs/trending?limit=36&${setOffsetString()}api_key=dc6zaTOxFJmzC`;

        /*Ajax with function calls inside*/
        $.ajax({
            method: 'GET',
            url: url,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (response) => {
                general.clearContainer();
                general.embedAll(response);
                determineTotalResults(response);
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
        getTrending: getTrending,
        nextPage: nextPage,
        previousPage: previousPage
    };
})();

/*===FUNCTIONS FOR SEARCH ENDPOINT*/
var search = (function () {
    /*Keeps track of the value of the offset. Default offset is 0*/
    var offset = 0;

    /*Keeps track of the total search results*/
    var totalResults = 0;

    /*Changes the offset to what it should be on the next page*/
    var nextOffset = () => {
        offset = offset + 36;
    };

    /*Changes the offset to what it should be on the previous page*/
    var previousOffset = () => {
        offset = offset - 36;
    };

    /*Determines value of totalResults variable depending on the search response*/
    var determineTotalResults = (response) => {
        totalResults = response.pagination.total_count;
    };

    /*Control for offset; sets offset to 0 when it would be too large and maximizes it if too small*/
    var offsetControl = () => {
        if (offset >= totalResults) {
            offset = 0;
        } else if (offset < 0) {
            offset = totalResults - 36;
        }
    };

    /*Swap to the next page. */
    var nextPage = () => {
        /*Change value of offset*/
        nextOffset();

        /*Control*/
        offsetControl();

        /*New gifs with the new offset*/
        searchQuery();
    };

    /*Swap to the previous page. */
    var previousPage = () => {
        /*Change value of offset*/
        previousOffset();

        /*Control*/
        offsetControl();

        /*New gifs with the new offset*/
        searchQuery();
    };

    /*Determines what the offset string will be, to be used in the search query*/
    var setOffsetString = () => {
        var offsetString = '';
        if (offset !== 0) {
            offsetString = `offset=${offset}&`;
        }
        return offsetString;
    };

    /*Show loading gif*/
    var showPreloader = () => {
        /*Call function which clears container div*/
        general.clearContainer();

        /*Add new content*/
        document.getElementById('result').innerHTML = `<img src="../images/pre-loader.gif" alt="loading..." class="preloader">`;
    };


    /*Ajax request which uses search method of the API. Calls functions for embedding.*/
    var searchQuery = () => {
        /*Show preloader*/
        showPreloader();

        /*Determine URL depending on search terms*/
        var url = `http://api.giphy.com/v1/gifs/search?q=${general.determineSearchTerms()}&limit=36&${setOffsetString()}api_key=dc6zaTOxFJmzC`;

        /*Ajax with function calls inside*/
        $.ajax({
            method: 'GET',
            url: url,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (response) => {
                general.clearContainer();
                general.embedAll(response);
                determineTotalResults(response);
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
        searchQuery: searchQuery,
        nextPage: nextPage,
        previousPage: previousPage
    };
})();

/*===FUNCTIONS FOR TRENDING STICKERS ENDPOINT===*/
var stickersTrending = (function () {
    /*Keeps track of the value of the offset. Default offset is 0*/
    var offset = 0;

    /*Keeps track of the total search results*/
    var totalResults = 0;

    /*Changes the offset to what it should be on the next page*/
    var nextOffset = () => {
        offset = offset + 36;
    };

    /*Changes the offset to what it should be on the previous page*/
    var previousOffset = () => {
        offset = offset - 36;
    };

    /*Determines value of totalResults variable depending on the search response*/
    var determineTotalResults = (response) => {
        totalResults = response.pagination.total_count;
    };

    /*Control for offset; sets offset to 0 when it would be too large and maximizes it if too small*/
    var offsetControl = () => {
        if (offset >= totalResults) {
            offset = 0;
        } else if (offset < 0) {
            offset = totalResults - 36;
        }
    };

    /*Swap to the next page. */
    var nextPage = () => {
        /*Change value of offset*/
        nextOffset();

        /*Control*/
        offsetControl();

        /*New gifs with the new offset*/
        getTrending();
    };

    /*Swap to the previous page. */
    var previousPage = () => {
        /*Change value of offset*/
        previousOffset();

        /*Control*/
        offsetControl();

        /*New gifs with the new offset*/
        getTrending();
    };

    /*Determines what the offset string will be, to be used in the search query*/
    var setOffsetString = () => {
        var offsetString = '';
        if (offset !== 0) {
            offsetString = `offset=${offset}&`;
        }
        return offsetString;
    };


    /*Show loading gif*/
    var showPreloader = () => {
        /*Call function which clears container div*/
        general.clearContainer();

        /*Add new content*/
        document.getElementById('result').innerHTML = `<img src="../images/pre-loader.gif" alt="loading..." class="preloader">`;
    };


    /*Ajax request for obtaining trending gifs*/
    var getTrending = () => {
        /*Show preloader*/
        showPreloader();

        var url = `http://api.giphy.com/v1/stickers/trending?limit=36&${setOffsetString()}api_key=dc6zaTOxFJmzC`;

        /*Ajax with function calls inside*/
        $.ajax({
            method: 'GET',
            url: url,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (response) => {
                general.clearContainer();
                general.embedAll(response);
                determineTotalResults(response);
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
        getTrending: getTrending,
        previousPage: previousPage,
        nextPage: nextPage
    };
})();

/*===FUNCTIONS FOR STICKERS SEARCH ENDPOINT*/
var stickersSearch = (function () {
    /*Keeps track of the value of the offset. Default offset is 0*/
    var offset = 0;

    /*Keeps track of the total search results*/
    var totalResults = 0;

    /*Changes the offset to what it should be on the next page*/
    var nextOffset = () => {
        offset = offset + 36;
    };

    /*Changes the offset to what it should be on the previous page*/
    var previousOffset = () => {
        offset = offset - 36;
    };

    /*Determines value of totalResults variable depending on the search response*/
    var determineTotalResults = (response) => {
        totalResults = response.pagination.total_count;
    };

    /*Control for offset; sets offset to 0 when it would be too large and maximizes it if too small*/
    var offsetControl = () => {
        if (offset >= totalResults) {
            offset = 0;
        } else if (offset < 0) {
            offset = totalResults - 36;
        }
    };

    /*Swap to the next page. */
    var nextPage = () => {
        /*Change value of offset*/
        nextOffset();

        /*Control*/
        offsetControl();

        /*New gifs with the new offset*/
        searchQuery();
    };

    /*Swap to the previous page. */
    var previousPage = () => {
        /*Change value of offset*/
        previousOffset();

        /*Control*/
        offsetControl();

        /*New gifs with the new offset*/
        searchQuery();
    };

    /*Determines what the offset string will be, to be used in the search query*/
    var setOffsetString = () => {
        var offsetString = '';
        if (offset !== 0) {
            offsetString = `offset=${offset}&`;
        }
        return offsetString;
    };

    /*Show loading gif*/
    var showPreloader = () => {
        /*Call function which clears container div*/
        general.clearContainer();

        /*Add new content*/
        document.getElementById('result').innerHTML = `<img src="../images/pre-loader.gif" alt="loading..." class="preloader">`;
    };


    /*Ajax request which uses search method of the API. Calls functions for embedding.*/
    var searchQuery = () => {
        /*Show preloader*/
        showPreloader();

        /*Determine URL depending on search terms*/
        var url = `http://api.giphy.com/v1/stickers/search?q=${general.determineSearchTerms()}&limit=36&${setOffsetString()}api_key=dc6zaTOxFJmzC`;


        /*Ajax with function calls inside*/
        $.ajax({
            method: 'GET',
            url: url,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (response) => {
                general.clearContainer();
                general.embedAll(response);
                determineTotalResults(response);
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
        searchQuery: searchQuery,
        nextPage: nextPage,
        previousPage: previousPage
    };
})();

/*===FUNCTIONS FOR UPLOAD ENDPOINT*/
var upload = (function () {
    /*Saves id*/
    var uploadedID = '';

    /*Another version of the preloader function*/
    var showPreloader = () => {
        /*Obtain div*/
        var result = document.getElementById('result');

        /*Clear innerHTML*/
        result.innerHTML = '';

        /*Add new content*/
        result.innerHTML = `<img src="../images/pre-loader.gif" alt="loading..." class="preloader">`;
    };

    /*Finds the id of an uploaded gif*/
    var obtainID = (response) => {
        return response.data.id;
    };

    /*Upload function for urls*/
    var uploadUrl = (url) => {
        /*Show preloader*/
        showPreloader();

        /*Ajax request with function calls inside*/
        /*These are the headers recommended to be used with this API. For some reason, contentType and dataType are not used.*/
        $.ajax({
            type: 'POST',
            url: 'http://upload.giphy.com/v1/gifs',
            data: {
                api_key: 'dc6zaTOxFJmzC',
                source_image_url: url,
            },
            success: (response) => {
                console.log(response);
                console.log('Uploaded');
                uploadedID = obtainID(response);
                document.getElementById('result').innerHTML = `Uploaded! ID: ${uploadedID}`;
                document.getElementById('id-btn').disabled = false;

            },
            error: (error) => {
                console.log(error);
                document.getElementById('result').innerHTML = '';
            }
        });

    };

    /*Upload function for file paths*/
    var uploadFile = (file) => {
        /*Show preloader*/
        showPreloader();

        /*Ajax request with function calls inside*/
        /*These are the headers recommended to be used with this API. For some reason, contentType and dataType are not used.*/
        $.ajax({
            type: 'POST',
            url: 'http://upload.giphy.com/v1/gifs',
            data: {
                api_key: 'dc6zaTOxFJmzC',
                file: file,
            },
            success: (response) => {
                console.log(response);
                console.log('Uploaded');
                uploadedID = obtainID(response);
                document.getElementById('result').innerHTML = `Uploaded! ID: ${uploadedID}`;
                document.getElementById('id-btn').disabled = false;

            },
            error: (error) => {
                console.log(error);
                document.getElementById('result').innerHTML = '';
            }
        });

    };

    /*Obtains the content of input fields to determine where to find the gif; calls upload functions*/
    var obtainSource = () => {
        /*Find out what the input fields say*/
        var filepath = document.getElementById('filepath').value;
        var sourceUrl = document.getElementById('source-url').value;

        /*If a source url is available, that will be used first. If there is no source url but a file path, the file path will be used. If neither has been provided, the console will log an error message.*/
        if (sourceUrl !== '') {
            uploadUrl(sourceUrl);
        } else if (filepath !== '') {
            uploadFile(filepath);
        } else {
            console.log('No image provided.');
        }
    };


    var gifByID = () => {
        /*Show preloader*/
        showPreloader();

        /*Determine URL depending on search terms*/
        var url = `http://api.giphy.com/v1/gifs/${uploadedID}?api_key=dc6zaTOxFJmzC`;

        /*Ajax with function calls inside*/
        $.ajax({
            method: 'GET',
            url: url,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (response) => {
                var result = document.getElementById('result');
                result.innerHTML = '';
                result.innerHTML = `<a href="${response.data.embed_url}">${response.data.embed_url}</a>`;
                console.log(response);
                return response;
            },
            error: (error) => {
                console.log(error);
                document.getElementById('result').innerHTML = '';
                return error;
            }
        })
    };

    return {
        obtainSource: obtainSource,
        gifByID: gifByID
    };
})();
