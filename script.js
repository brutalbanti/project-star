window.addEventListener('load', loadedPage);

function loadedPage() {
    var apiHero = 'https://swapi.dev/api/people/?page=', //ссылка для запроса api
        newDiv = [],
        allHero = document.querySelector('.all-name-heroes'),
        heroesCharacter = document.querySelector('.heroes__character'),
        heroesBlock = document.getElementById('heroes'),
        heroesName = document.getElementById('heroes__name'),
        nextImportBtn = document.getElementById('next-heroes__btn'),
        previousImportBtn = document.getElementById('previous-heroes__btn'),
        table = document.getElementById('table-info-hero'),
        tr = document.createElement('tr');

    n = 1; //номер страницы

    nextImportBtn.addEventListener("click", nextPageImport);
    previousImportBtn.addEventListener("click", previousPageImport);

    function hideNameHeroesBlock() {
        heroesCharacter.style.transform = 'translateX(0px)';
    }
    function hideNameHeroes() {
        allHero.style.transform = 'translateY(3000px)';
        setTimeout(hideNameHeroesBlock, 400);
    }
    function visibleNameHeroes() {
        heroesCharacter.style.transform = 'translateX(-1000px)';
        document.querySelectorAll('td').forEach(td => {
            td.remove();
        })
        var title = document.querySelector('h2.heroes__about-title');
        title.remove();
        preloaderHide();
        allHero.style.transform = 'translateY(0px)';
    }

    function informationHeroes() {
        hideNameHeroes();
        setTimeout(preloaderLoad, 500)
        //TITLE
        var h2 = document.createElement('h2');
        table.appendChild(h2);
        h2.classList.add('heroes__about-title');
        h2.innerHTML = 'INFORMATION ABOUT ' + this.name;
        //TITLE
        table.appendChild(tr);
        tr.classList.add('td-class')
        var searchTR = document.querySelector('.td-class');
        // NAME
        var tdName = document.createElement('td');
        tdName.classList.add('td');
        searchTR.appendChild(tdName);
        tdName.innerHTML = 'NAME:'
        var spanNameHero = document.createElement('span');
        tdName.appendChild(spanNameHero);
        spanNameHero.innerHTML = this.name;
        // NAME
        // HEIGHT
        var tdHeight = document.createElement('td');
        tdHeight.classList.add('td');
        searchTR.appendChild(tdHeight);
        tdHeight.innerHTML = 'HEIGHT:'
        var spanHeightHero = document.createElement('span');
        tdHeight.appendChild(spanHeightHero);
        spanHeightHero.innerHTML = this.height;
        // HEIGHT 
        // MASS
        var tdMass = document.createElement('td');
        tdMass.classList.add('td');
        searchTR.appendChild(tdMass);
        tdMass.innerHTML = 'MASS:'
        var spanHeightHero = document.createElement('span');
        tdMass.appendChild(spanHeightHero);
        spanHeightHero.innerHTML = this.mass;
        // MASS
        // FILMS
        var tdFilms = document.createElement('td');
        tdFilms.classList.add('td');
        searchTR.appendChild(tdFilms);
        if (this.films.length === 1) {
            tdFilms.innerHTML = 'FILM:'
        } else {
            tdFilms.innerHTML = 'FILMS:'
        }
        var ulFilms = document.createElement('ul');
        tdFilms.appendChild(ulFilms);
        this.films.forEach(filmURL => {
            fetch(filmURL)
                .then(function (film) {
                    return film.json();
                })
                .then(function (nameFilm) {
                    ulFilms.appendChild(document.createElement('li')).innerHTML = nameFilm.title;
                })
        })
        // FILMS
        // EYE-COLOR
        var tdEye = document.createElement('td');
        tdEye.classList.add('td');
        searchTR.appendChild(tdEye);
        tdEye.innerHTML = 'EYE-COLOR:'
        var spanTdEye = document.createElement('span');
        tdEye.appendChild(spanTdEye);
        spanTdEye.innerHTML = this.eyeColor;
        // EYE-COLOR
        // BIRTH-YEAR
        var tdBirthYear = document.createElement('td');
        tdBirthYear.classList.add('td');
        searchTR.appendChild(tdBirthYear);
        tdBirthYear.innerHTML = 'BIRTH-YEAR:'
        var spanTdtdBirthYear = document.createElement('span');
        tdBirthYear.appendChild(spanTdtdBirthYear);
        spanTdtdBirthYear.innerHTML = this.birthYear;
        // BIRTH-YEAR
        //BUTTON
        var btnToBack = document.createElement('button');
        btnToBack.innerHTML = 'Go Back';
        var tdBack = document.createElement('td');
        tdBack.appendChild(btnToBack);
        searchTR.appendChild(tdBack);
        btnToBack.addEventListener('click', visibleNameHeroes);
        //BUTTON
        setCookie(this.name);
    }

    function setCookie(name) {
        var nameCookie = document.cookie = `${name}=${name}; max-age=60880`;
    }

    function changeName() {
        heroesName.innerHTML = this.textContent; //при наведении на блок, заберает имя с блока и вставляет в heroesName
    }
    function clearName() {
        heroesName.innerHTML = ''; //при выходе курсора с блока - очищается heroesName
    }

    function importApiHeroes() {
        fetch(apiHero + n) //api-ссылка + номер страницы
            .then(function (response) {
                return response.json(); //возвращает ответ от запроса
            })
            .then(function (data) {
                for (var g = 0; g < data.results.length; g++) { //перебираем информацию с страницы запроса
                    if (newDiv[g]) {
                        newDiv[g].innerHTML = data.results[g].name; //при нажатии кнопки вперед или назад заберает имя с страницы на которую сдлан запрос, и изменяет имя.
                        newDiv[g].onclick = informationHeroes;

                        newDiv[g].name = data.results[g].name;
                        newDiv[g].height = data.results[g].height;
                        newDiv[g].mass = data.results[g].mass;
                        newDiv[g].films = [...data.results[g].films];
                        newDiv[g].eyeColor = data.results[g].eye_color;
                        newDiv[g].birthYear = data.results[g].birth_year;

                    } else {
                        newDiv[g] = document.createElement('div'); //создаём столько блоков, сколько нашли героев
                        heroesBlock.appendChild(newDiv[g]) //в блок с героями добавляем дивы которые создали выше
                        newDiv[g].classList.add('block'); //добавляем класс block
                        newDiv[g].textContent = data.results[g].name; //вставяем в блоки имена, которые забрали с api запроса в героев 
                        newDiv[g].onmouseover = changeName;
                        newDiv[g].onmouseout = clearName;
                        newDiv[g].onclick = informationHeroes;

                        newDiv[g].name = data.results[g].name;
                        newDiv[g].height = data.results[g].height;
                        newDiv[g].mass = data.results[g].mass;
                        newDiv[g].films = [...data.results[g].films];
                        newDiv[g].eyeColor = data.results[g].eye_color;
                        newDiv[g].birthYear = data.results[g].birth_year;
                    }
                }
            })
    }
    importApiHeroes();

    function nextPageImport() {
        n += 1; //при нажатии на кнопку вперед номер страницы увеличивается на 1
        if (n <= 9) { //если номер страницы меньше и равен 9, то вызываем вывод имён героев с следующей страницы
            importApiHeroes();
        } else { //иначе возвращаем номер страницы 1(по дефолту первая), и вызываем вывод имён героев с данной страницы
            n = 1;
            importApiHeroes();
        }
    }

    function previousPageImport() {
        n -= 1; //при нажатии на кнопку назад номер страницы уменьшаеться на 1
        if (n >= 1) { //если номер страницы больше или равен 1, то вызываем вывод имён героев, с предыдушей страницы
            importApiHeroes();
        } else { //иначе возвращаем номер страницы 9(последнюю), и вызываем вывод имён героев с данной страницы
            n = 9;
            importApiHeroes();
        }
    }


    function preloaderLoad() {
        document.querySelector('.preloader').classList.remove('hide');
        setTimeout(preloaderHide, 3000);
    }

    function preloaderHide() {
        document.querySelector('.preloader').classList.add('hide');
    }

}
