import { fetchShows, fetchSingleShow, showSearch } from "./data.js";
import { displayShows, displaySingleShow, dropdownDisplay, searchInputHandle, headerLoader } from "./ui.js";

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

export const initHomepage = () => {
    fetchShows()
        .then(shows => {
            displayShows(shows);
        })
        .catch(error => console.error("Fetch error:", error))
    
    headerLoader();
    searchInputHandle();
    handleClickOnLink();
    handleTypingInSearch();
}

export const initSinglePage = () => {
    const idInLocalStorage = localStorage.getItem("id");

    fetchSingleShow(idInLocalStorage)
        .then(movieData => {
            displaySingleShow(movieData);
        })
        .catch(error => console.error("Fetch error:", error))

    headerLoader();
    searchInputHandle();
    handleClickOnLink();
    handleTypingInSearch();
}

