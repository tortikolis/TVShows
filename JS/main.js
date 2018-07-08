import {fetchShows, fetchSingleShow, showSearch} from "./data.js";
import {displayShows,displayErrorMsg,displaySingleShow,dropdownDisplay} from "./ui.js";

    const handleClickOnLink = () => {
        $(document).on("click", "a", function(event){
            event.preventDefault();
            // get id
            const id = this.getAttribute("data-id");
            // set id to local storage
            localStorage.setItem("id", id);
            // reidrect to single show page
            location.assign('show-info.html');
        });
    }

    const handleTypingInSearch = () => {
        $(".form-control").on("keyup", function(event){
            let input = this.value;
            console.log(input);
            showSearch(input)
                .then((data) => dropdownDisplay(data))
                .catch(() => {
                   //handle failed request 
                })
        });
    }
    
    export const initHomepage = () => {
        fetchShows()
            .then((shows) => {
                displayShows(shows);
            })
            .catch((error) => {
                
                displayErrorMsg();
                //handle failed request 
             })
            
        handleClickOnLink();
        handleTypingInSearch();
    }
    
    export const initSinglePage = () => {
        const idInLocalStorage = localStorage.getItem("id");
        
        fetchSingleShow(idInLocalStorage)
        .then((movieData) => {
            displaySingleShow(movieData);
        })

        handleClickOnLink();
        handleTypingInSearch();    
    }

