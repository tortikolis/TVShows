
class Show {
    constructor(id, name, image, genres, rating) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.genres = genres;
        this.rating = rating;
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
        .then(response => response.json())
        .then(data => {
            let first50 = [];
            for (let i = 0; i < 50; i++) {
                first50.push(data[i]);
            }
            let shows = first50.map(show => {
                const { id, name, genres } = show;
                const image = show.image.medium;
                const rating = show.rating.average;

                return new Show(id, name, image, genres, rating);
            })
            return shows;
        })
}

export const fetchSingleShow = id => {
    return fetch(`https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`)
        .then(response => response.json())
        .then(data => {
            const { name, id, summary } = data;
            const { cast, seasons } = data._embedded;
            const image = data.image.original;
            const description = summary;
            
            const castList = [];
            const seasonsList = [];
        
            cast.forEach(element => {
                castList.push(element.person.name)
            });
            seasons.forEach(element => {
                const startDate = `Premiere: ${element.premiereDate || "TBA"}`;
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
        .then(response => response.json())
        .then(data => {
            let shows = [];
            if (data.length <= 10) {
                data.forEach((element) => {
                    const showName = element.show.name;
                    const showId = element.show.id;
                    const showImg = "";
                    let show = new Show(showId, showName, showImg);
                    shows.push(show);
                })
            } else {
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


