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