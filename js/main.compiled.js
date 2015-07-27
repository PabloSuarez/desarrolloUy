// babel -w main.js --out-file ../../js/main.compiled.js

/*
* eventos MENÚ mobile
*/
'use strict';

function menu_activar(id) {
	$(id).toggleClass('js-active');
}

function menu_desplegar(id) {
	if ($(id).hasClass('js-active')) {
		$(id).css('display', 'list-item');
	} else {
		menu_ocultar(id);
	}
}

function menu_ocultar(id) {
	$(id).fadeOut(200);
}

$('.js-menu-mobile').on('click', function (e) {
	e.stopPropagation();
	$('.js-menu-mobile').toggleClass('active');
	menu_activar('#js-menu-items');
	menu_desplegar('#js-menu-items');
});
/* final MENÚ */

/*
* items MENÚ
*/
function ocultarTodo() {
	$('.section_content').css('display', 'none');
	$('#js-slider').css('display', 'none');
	$('.js-aside-content').css('display', 'none');
}

function mostrarSectionContent(id) {
	ocultarTodo();
	$(id).fadeIn(200);
}

$('.js-menu').on('click', function (e) {
	var id = e.target.id;
	var element = $('#' + id);
	var main = '#js-main';
	mostrarSectionContent('.js-' + id + '-content');

	// Si no es el inicio cargo el aside
	if (id != 'index') {
		$('.js-aside-content').fadeIn(200);
	} else {
		$('#js-slider').fadeIn(200);
	}

	// para saber si estoy en mobile
	if ('none' != $('.js-menu-mobile').css('display')) {
		$('.js-menu-mobile').trigger('click');
	}
});
/* final ITEMS MENÚ */

/*
* GoogleMaps
*/
function loadMap() {
	var lasPiedras = new google.maps.LatLng(-34.727514, -56.216513);

	var ubicaciones = [['Ciudad de Las Piedras', -34.727514, -56.216513, 1]];

	var marker;
	var map;

	function toggleBounce() {
		if (marker.getAnimation() != null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}

	var mapOptions = {
		zoom: 10,
		center: lasPiedras
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	for (var i = 0; i < ubicaciones.length; i++) {
		var ub = ubicaciones[i];
		var pos = new google.maps.LatLng(ub[1], ub[2]);
		var marker = new google.maps.Marker({
			position: pos,
			map: map,
			title: ub[0],
			animation: google.maps.Animation.DROP,
			zIndex: ub[3]
		});
		google.maps.event.addListener(marker, 'click', toggleBounce);
	}
}

$('.js-las-piedas').on('click', function (event) {
	var mapa = $('.map_main');
	if (mapa.hasClass('hidden')) {
		// si esta oculto lo muestro
		mapa.removeClass('hidden');
		loadMap();
	} else {
		mapa.addClass('hidden');
	}
});
/* final GoogleMaps */

/*
*	funciones para manejar PROMISES
*/
function getPromise(url) {
	return Promise.resolve($.get(url));
}

function getPromiseCache(url) {
	if (localStorage[url]) {
		// paso a JSON
		var datos = JSON.parse(localStorage[url]);
		return Promise.resolve(datos);
	}
	return Promise.resolve($.get(url)).then(function (data) {
		var datos = data;
		// paso el objeto a string
		// console.log(datos)
		datos = JSON.stringify(datos);
		localStorage[url] = datos;
		return Promise.resolve(data);
	});
}
/* fin PROMISES */

/*
* cargo REPOS desde GITHUB
*/
function leoRepositorios(url) {
	!url ? url = 'https://api.github.com/users/pablosuarez/repos' : false;
	getPromiseCache(url).then(function (data) {
		cargoRepositorios(data);
	});
}

function cargoRepositorios(data) {
	var repositorio = '\n\t<ul id="list_repositories_item" class="list">\n\t\t<li class="list_item">\n\t\t\t<div class="list_item_head">\n\t\t\t\t<div class="list_item_head_page flex_container flex_container-flex-space-between flex_container-flex-direction-row">\n\t\t\t\t\t<a class="list_item_head_page_link" href="BRANCH-URL" target="_blank">\n\t\t\t\t\t\t<div class="list_item_head_title">BRANCH-NAME</div>\n\t\t\t\t\t</a>\n\t\t\t\t\t<div class="list_item_date">BRANCH-UPDATE</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="">BRANCH-DESCRIPTION</div>\n\t\t\t</div>\n\t\t\t<div class="list_item_body">\n\t\t\t\t<div class="list_item_body_clone">git clone BRANCH-CLONE</div>\n\t\t\t\t<div class="list_item_body_demo">\n\t\t\t\t\t<a class="list_item_body_demo link" target="_blank" href="BRANCH-HOMEPAGE">Ver web</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</li>\n\t</ul>';

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var repo = _step.value;

			var repoAppned = repositorio;
			repoAppned = repoAppned.replace('BRANCH-URL', repo.html_url);
			repoAppned = repoAppned.replace('BRANCH-NAME', repo.name);
			repoAppned = repoAppned.replace('BRANCH-HOMEPAGE', repo.homepage);
			repoAppned = repoAppned.replace('BRANCH-DESCRIPTION', repo.description);
			var date = new Date(repo.updated_at);
			repoAppned = repoAppned.replace('BRANCH-UPDATE', date.getDay() + '/' + date.getMonth() + '/' + date.getYear());
			repoAppned = repoAppned.replace('BRANCH-CLONE', repo.clone_url);
			$('.js-container-repositories').append(repoAppned);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator['return']) {
				_iterator['return']();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
}
/* final REPOS desde GITHUB */

$(document).ready(function () {
	leoRepositorios();
});
