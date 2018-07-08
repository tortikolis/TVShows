
    export const displayShows = (data) => {
        const $row=$(".row");
        data.forEach ((element) => {
            const itemField = $(`<a href='show-info.html' data-id='${element.id}' class="landing-page-a">
            <div class="col-6 col-sm-4  col-lg-3 col-xl-2">
                <div class="item">
                    <img src=${element.image}>
                    <p>${element.name}</p>
                </div</div>
            </a>`);
            $row.append(itemField);
        })
    }

    export const displayErrorMsg = () => {
        const $row = $("row");
        const itemField = $(`<div class='col-8 offset-2'>Something went wrong!</div>`)
        $row.append(itemField);
    }

    export const displaySingleShow = (data) => {
        const $titleField = $(".title");
        const $title = $(`<h1 id="show-title">${data.name}</h1>`);
        $titleField.append($title);
        const $imgField = $(".img");
        const $img = $(`<img src="${data.image}" alt="${data.name} image" class="info-img">`);
        $imgField.append($img);
        
        const $seasonsList = $(".seasons-list");
        const $castList = $(".cast-list");

        for (let i = 0; i < data.seasonsList.length; i++){
            let $liSeasonsItem = $(`<li>${data.seasonsList[i].startDate} | ${data.seasonsList[i].endDate}</li>`);
            $seasonsList.append($liSeasonsItem);
        }
        for (let i = 0; i < data.castList.length; i++){
            let $liCastItem =  $(`<li>${data.castList[i]}</li>`);
            $castList.append($liCastItem);
        }

        const $showDeatailsField = $(".show-details");
        const $showDeatails = $(`<h3>Show Details</h3><p>${data.description}</p>`);
        $showDeatailsField.append($showDeatails);

    }

    export const dropdownDisplay = (data) => {
        let $dropdown = $(".search-list");
        $dropdown.empty();
        data.forEach((show) => {
            const item = $(`<a href="#" data-id=${show.id}>${show.name}</a>`);
            $dropdown.append(item);
        })
        
    }


    
