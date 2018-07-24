import { fetchShows, fetchSingleShow, showSearch, fetchSchedule } from "./data.js";
import { displayShows, displaySingleShow, dropdownDisplay, searchInputHandle, displaySchedule, selectCountry } from "./ui.js";

const handleClickOnLink = () => {
    $(document).on("click", ".show-link", function (event) {
        event.preventDefault();

        const id = this.getAttribute("data-id");
        localStorage.setItem("id", id);
        location.assign('show-info.html');
    });
}

const handleTypingInSearch = () => {
    $(".search-input").on("keyup", function (event) {
        let input = this.value;
        showSearch(input)
            .then(data => dropdownDisplay(data))
            .catch(error => console.error("Fetch error:", error))
    });
}

const getShowList = () => {
    fetchShows()
        .then(shows => {

            displayShows(shows);
        })
        .catch(error => console.error("Fetch error:", error))
}

const getSingleShow = id => {
    fetchSingleShow(id)
        .then(movieData => {
            displaySingleShow(movieData);
        })
        .catch(error => console.error("Fetch error:", error))
}

const getSchedule = (country) => {
    fetchSchedule(country)
        .then(data => {

            displaySchedule(data)
        })
        .catch(error => console.error("Fetch error:", error))
}

export const initHomepage = () => {
    getShowList();
    handleClickOnLink();
    searchInputHandle();
    handleTypingInSearch();
}

export const initSinglePage = () => {
    const idInLocalStorage = localStorage.getItem("id");

    getSingleShow(idInLocalStorage);
    handleClickOnLink();
    searchInputHandle();
    handleTypingInSearch();
}

export const initSchedulePage = () => {
    getSchedule();
    selectCountry(getSchedule);
    handleClickOnLink();
    searchInputHandle();
    handleTypingInSearch();
}
