var stickers = (function () {
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

    var addSearchEventListener = () => {
        document.getElementById('submit').addEventListener('click', search);
    };

    var embedAll = (response) => {
        for (let i = 0; i < response.data.length; i++) {
            var gif = document.createElement("img");
            gif.setAttribute("src", response.data[i].images.fixed_height_small.url);
            gif.setAttribute("alt", "gif");
            document.body.appendChild(gif);
        }
    };

    /*Ajax request which uses search method of the API. Returns an URL for embedding.*/
    var search = () => {
        var url = `http://api.giphy.com/v1/stickers/search?q=${determineSearchTerms()}&limit=28&api_key=dc6zaTOxFJmzC`;

        $.ajax({
            method: 'GET',
            url: url,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (response) => {
                console.log(response);
                embedAll(response);
                return response;
            },
            error: (error) => {
                console.log(error);
                return error;
            }
        })
    };

    /*Public*/
    return {
        addSearchEventListener: addSearchEventListener
    };
})();

stickers.addSearchEventListener();


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
