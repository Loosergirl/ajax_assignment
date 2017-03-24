/*===MAIN VARIABLES AND FUNCTIONS FOR STICKERS API===*/
var stickers = (function () {
    /*Keeps track of the value of the offset. Default offset is 0*/
    var offset = 0;

    /*Keeps track of the total search results*/
    var totalResults = 0;

    /*Replace blankspace with '+' in a string*/
    var searchStringReplacement = (str) => {
        for (let i = 0; i < str.length; i++) {
            if (str[i] === " ") {
                str[i] = "+";
            }
        }
        return str;
    };

    /*Return value of search field with blankspaces converted to '+'*/
    var determineSearchTerms = () => {
        var terms = document.getElementById('search').value;
        terms = searchStringReplacement(terms);
        return terms;
    };

    /*Add event listener for searching to search button*/
    var addSearchEventListener = () => {
        document.getElementById('submit').addEventListener('click', search);
    };

    /*Determines value of totalResults variable depending on the search response*/
    var setTotalResults = (response) => {
        totalResults = response.pagination.total_count;
    };

    /*Get and clear the result div where the gifs are to be appended; return the div*/
    var clearResult = () => {
        var result = document.getElementById('result');
        result.innerHTML = '';
        return result;
    };

    /*Embed gifs from response*/
    var embedAll = (response) => {
        /*Call function which clears result div and returns it*/
        var result = clearResult();

        /*Loop through all gifs and append them*/
        for (let i = 0; i < response.data.length; i++) {
            var thumbnail = document.createElement('div');
            thumbnail.setAttribute("class", "col-xs-6 col-sm-4 col-md-3 col-lg-2");
            thumbnail.innerHTML = `<a href="#" class="thumbnail">
    <img src="${response.data[i].images.fixed_height_small.url}" alt="gif" class="img-thumbnail">
</a>`;
            result.appendChild(thumbnail);
        }
    };

    /*Changes the offset to what it should be on the next page*/
    var nextOffset = () => {
        offset = offset + 36;
    };

    /*Changes the offset to what it should be on the previous page*/
    var previousOffset = () => {
        offset = offset - 36;
    };

    /*Determines what the offset string will be, to be used in the search query*/
    var setOffsetString = () => {
        var offsetString = '';
        if (offset !== 0) {
            offsetString = `&offset=${offset}`;
        }
        return offsetString;
    };

    /*Swap to the next page.*/
    var nextPage = () => {
        /*Change value of offset*/
        nextOffset();

        /*New gifs with the new offset*/
        search();
    };

    /*Add event listener for the next page arrows*/
    var addNextPageEventListener = () => {
        document.getElementById('next').addEventListener('click', nextPage);
    };

    /*Swap to the previous page.*/
    var previousPage = () => {
        /*Change value of offset*/
        previousOffset();

        /*New gifs with the new offset*/
        search();
    };

    /*Add event listener for the previous page arrows*/
    var addPreviousPageEventListener = () => {
        document.getElementById('previous').addEventListener('click', previousPage);
    };

    /*Show loading gif*/
    var showPreloader = () => {
        /*Call function which clears result div and returns it*/
        var result = clearResult();

        /*Add new content*/
        result.innerHTML = `<img src="images/pre-loader.gif" alt="loading...">`;
    };

    /*Ajax request which uses search method of the API. Calls functions for embedding.*/
    var search = () => {
        var url = `http://api.giphy.com/v1/stickers/search?q=${determineSearchTerms()}&limit=36${setOffsetString()}&api_key=dc6zaTOxFJmzC`;

        /*Show preloader*/
        showPreloader();

        /*Ajax with function calls inside*/
        $.ajax({
            method: 'GET',
            url: url,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (response) => {
                console.log(response);
                setTotalResults(response);
                embedAll(response);
                return response;
            },
            error: (error) => {
                console.log(error);
                clearResult();
                return error;
            }
        })
    };

    /*Public*/
    return {
        addSearchEventListener: addSearchEventListener,
        addNextPageEventListener: addNextPageEventListener,
        addPreviousPageEventListener: addPreviousPageEventListener,
        clearResult: clearResult,
        embedAll: embedAll,
        showPreloader: showPreloader
    };
})();

/*===FUNCTIONS FOR TRENDING ENDPOINT===*/
var trending = (function () {
    var getTrending = () => {
        /*Show preloader*/
        stickers.showPreloader();

        /*Ajax with function calls inside*/
        $.ajax({
            method: 'GET',
            url: 'http://api.giphy.com/v1/gifs/trending?limit=36&api_key=dc6zaTOxFJmzC',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (response) => {
                console.log(response);
                stickers.clearResult();
                stickers.embedAll(response);
                return response;
            },
            error: (error) => {
                console.log(error);
                stickers.clearResult();
                return error;
            }
        })
    };

    /*Public*/
    return {
        getTrending: getTrending
    };
})();

/*===AUTO-ADD EVENT LISTENERS===*/
var autoAddEventListeners = (function () {
    stickers.addSearchEventListener();
    stickers.addNextPageEventListener();
    stickers.addPreviousPageEventListener();
})();

trending.getTrending();

/*
function getAll() {
	$.ajax({
		method: 'GET',
		url: 'http://localhost:3000/movies',
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		success: (response) => {
			console.log(response);
			return response;
		},
		error: (error) => {
			console.log(error);
			return error;
		}
	})
}

function postIt() {
	var movieGenres = [];

	if (horror === true) {
		movieGenres.push("Horror");
	}
	if (comedy === true) {
		movieGenres.push("Comedy");
	}

	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/movies',
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		data: JSON.stringify({
			title: document.getElementById('title-input').value,
			year: document.getElementById('year-input').value,
			genres: movieGenres
		}),
		success: (data) => {
			console.log(data);
		},
		error: (error) => {
			console.log(error);
		}
	})
}

function patchUp() {
	var myUrl = 'http://localhost:3000/movies/' + $('#id-nr').val();

	var movieGenres = [];

	if (horror === true) {
		movieGenres.push("Horror");
	}
	if (comedy === true) {
		movieGenres.push("Comedy");
	}

	$.ajax({
		method: 'PATCH',
		url: myUrl,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		data: JSON.stringify({
			title: document.getElementById('title-input').value,
			year: document.getElementById('year-input').value,
			genres: movieGenres
		}),
		success: (data) => {
			console.log(data);
		},
		error: (error) => {
			console.log(error);
		}
	})
}

function exterminate() {
	var myUrl = 'http://localhost:3000/movies/' + $('#id-nr').val();

	$.ajax({
		method: 'DELETE',
		url: myUrl,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		success: (response) => {
			console.log(response);
		},
		error: (error) => {
			console.log(error);
		}
	})
}
*/
