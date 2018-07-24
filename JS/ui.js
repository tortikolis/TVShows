
export const displayShows = data => {
    const $row = $(".row");
    $(".spinner").hide();

    data.forEach(element => {
        const itemField = $(`<a href='show-info.html' data-id='${element.id}' class="show-link">
            <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 landing-page-a">
                <div class="card">
                    <img class="card-img-top" src=${element.image}>
                    <h4 class="card-title text-center">${element.name}</h4>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">GENRE: <br>${element.genres}</li>
                        <li class="list-group-item">RATING: ${element.rating}
                            <div class="stars">${'<i class="far fa-star"></i>'.repeat(element.rating / 2)}${'<i class="far fa-star-half"></i>'.repeat(element.rating % 2)}</div>
                        </li>
                    </ul>
                </div</div>
            </a>`);
        $row.append(itemField);
    })
}

export const displaySingleShow = data => {
    const $titleField = $(".show-title");
    const $title = $(`<h1 id="show-title">${data.name}</h1>`);

    $(".spinner").hide();

    $titleField.append($title);
    const $imgField = $(".img");
    const $img = $(`<img src="${data.image}" alt="${data.name} image" class="info-img">`);
    $imgField.append($img);

    const $seasonsList = $(".seasons-list");
    const $castList = $(".cast-list");

    for (let i = 0; i < data.seasonsList.length; i++) {
        const $liSeasonsItem = $(`<li>${data.seasonsList[i].startDate} | ${data.seasonsList[i].endDate}</li>`);
        $seasonsList.append($liSeasonsItem);
    }
    for (let i = 0; i < data.castList.length; i++) {
        const $liCastItem = $(`<li>${data.castList[i]}</li>`);
        $castList.append($liCastItem);
    }

    const $showDeatailsField = $(".show-details");
    const $showDeatails = $(`<h3>Show Details</h3><p>${data.description}</p>`);
    $showDeatailsField.append($showDeatails);
}

export const displaySchedule = (data) => {
    const $card = $(".schedule-container");
    $(".spinner").hide();
    data.forEach(episode => {
        const cardHTML = `<div class="episode-card">
        <div class="info badge badge-danger">${episode.airtime}</div>
        <div class="info badge badge-light">${episode.channel}</div>
        <div class="name">
            <div class="show-name">${episode.showName}</div>
            <div class="episode-name">${episode.epName}</div>
        </div>
        <div class="image">
            <img src=${episode.image} alt="${episode.showName}">
            </div>
        </div>`

        $card.append(cardHTML);
    });

}

export const dropdownDisplay = data => {
    const $dropdown = $(".search-list");
    $dropdown.empty();
    data.forEach(show => {
        const item = $(`<li><a href="#" data-id=${show.id} class="show-link">${show.name}</a></li>`);
        $dropdown.append(item);
    })
}

export const searchInputHandle = () => {
    const $search = $(".search-button");
    const $closeSearch = $(".close-search-button");
    const $searchInput = $(".search-input");
    const $dropdown = $(".search-list");

    $search.on("click", function (event) {
        $searchInput.fadeIn(500);
        $closeSearch.fadeIn(500);
        $search.css("display", "none")
    })

    $closeSearch.on("click", function (event) {
        $closeSearch.css("display", "none");
        $searchInput.css("display", "none");
        $searchInput.val("");
        $dropdown.empty();
        $search.fadeIn(500);
    })
}

export const selectCountry = (callback) => {
    const $schedule = $("#schedule");
    const $container = $(".schedule-container");

    $schedule.on("change", function () {
        const country = this.value;
        $container.empty();

        callback(country)
    })
}





