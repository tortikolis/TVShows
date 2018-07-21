
export const displayShows = data => {
    const $row = $(".row");
    data.forEach(element => {
        const itemField = $(`<a href='show-info.html' data-id='${element.id}' class="show-link">
            <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 landing-page-a">
                <div class="card">
                    <img class="card-img-top" src=${element.image}>
                    <h4 class="card-title text-center">${element.name}</h4>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">GENRE: <br>${element.genres}</li>
                        <li class="list-group-item">RATING: ${element.rating}
                        <div class="progress">
                        <div class="progress-bar-striped bg-success" role="progressbar" style="width: ${element.rating * 10}%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
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

export const dropdownDisplay = data => {
    const $dropdown = $(".search-list");
    $dropdown.empty();
    data.forEach(show => {
        const item = $(`<li><a href="#" data-id=${show.id}>${show.name}</a></li>`);
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



