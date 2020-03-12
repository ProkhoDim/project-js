export default {
  API_KEY: '168af0fe4d819af69af0e65f181d8d99',
  page: 1,
  searchText: [],
  updatePage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },

  async getPopularMovies() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=en-US&page=${this.page}&region=UA`,
    );
    const data = await response.json();
    return {
      movies: data.results.map(item => ({
        imageURL: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        title: item.title,
        vote: item.vote_average,
      })),
    };
  },

  async getMovie(id) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${this.API_KEY}&language=en-US`,
    );
    const data = await response.json();
    return {
      imageURL: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      genres: data.genres
        .map(item => {
          return item.name.toLowerCase();
        })
        .join(', '),
      title: data.title,
      originalTitle: data.original_title,
      overview: data.overview,
      vote: data.vote_average,
      votes: data.vote_count,
    };
  },

  async getWatchedMovie(id) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${this.API_KEY}&language=en-US`,
    );
    const data = await response.json();
    return {
      imageURL: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
      title: data.title,
      vote: data.vote_average,
    };
  },

  async getSearchedMovie(query) {
    if (!query) {
      return this.getPopularMovies();
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        this.API_KEY
      }&language=en-US&query=${query.split(' ').join('+')}&page=${
        this.page
      }&region=UA`,
    );
    const data = await response.json();
    return data.results.map(item => ({
      imageURL: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      title: item.title,
      vote: item.vote_average,
    }));
  },
};
