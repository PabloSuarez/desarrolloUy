// babel -c -w main.js --out-file ../../js/main.compiled.js

/*
*	funciones para manejar PROMISES
*/
function getPromise(url) {
	return Promise.resolve($.get(url))
}

function getPromiseCache(url) {
	if(sessionStorage[url]){
		// paso a JSON
		let datos = JSON.parse(sessionStorage[url])
		return Promise.resolve(datos)
	}
	return Promise.resolve($.get(url))
	.then((data) => {
		let datos = data
		// paso el objeto a string
		// console.log(datos)
		datos = JSON.stringify(datos)
		sessionStorage[url] = datos
		return Promise.resolve(data)
	})
}
/* fin PROMISES */
