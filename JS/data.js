
class Show {
    constructor(id, name, image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }
}

class DetailedShow extends Show {
    constructor(id, name, image, castList, seasonsList, description) {
        super(id, name, image);
        this.castList = castList;
        this.seasonsList = seasonsList;
        this.description = description
    }
}
class Season {
    constructor(startDate, endDate) {
        this.startDate = startDate,
            this.endDate = endDate
    }
}

export const fetchShows = () => {
    return fetch("https://api.tvmaze.com/shows")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            
            let first50 = [];
            for (let i = 0; i < 50; i++) {
                first50.push(data[i]);
            }
            let shows = first50.map((show) => {
                const id = show.id;
                const image = show.image.medium;
                const name = show.name;
                return new Show(id, name, image);
            })

            return shows;
        })
}

export const fetchSingleShow = (id) => {
    return fetch(`https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const name = data.name;
            const image = data.image.original;
            const id = data.id;
            const description = data.summary;
            let castList = [];
            let seasonsList = [];
            const cast = data._embedded.cast;
            const seasons = data._embedded.seasons;
            cast.forEach(element => {
                castList.push(element.person.name)
            });
            seasons.forEach(element => {
                const startDate = `Premiere: ${element.premiereDate || "TBA"}` ;
                const endDate = `End Date: ${element.endDate || "TBA"}`;
                const newSeason = new Season(startDate, endDate);
                seasonsList.push(newSeason);
            })
            const newDetailedShow = new DetailedShow(id, name, image, castList, seasonsList, description)
            return newDetailedShow;
        })
}

export const showSearch = (input) => {
    return fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let shows = [];
            if (data.length <= 10) {
                data.forEach((element) => {
                    const showName = element.show.name;
                    const showId = element.show.id;
                    const showImg = "";
                    let show = new Show(showId, showName, showImg);
                    shows.push(show);
                })
            }else {
                for (let i = 0; i < 10; i++) {
                    const showName = data[i].show.name;
                    const showId = data[i].show.id;
                    const showImg = "";
                    let showObj = new Show(showId, showName, showImg);
                    shows.push(showObj);
                } 
            }
            return shows;
        })
}


