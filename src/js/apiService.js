export default {
  API_KEY: '168af0fe4d819af69af0e65f181d8d99',
  page: 1,
  searchText: '',
  updatePage() {
    this.page += 1;
  },
  downgradePage() {
    if (!this.page) return;
    this.page -= 1;
  },
  resetPage() {
    this.page = 1;
  },

  async getPopularMovies() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}&language=en-US&page=${this.page}&region=UA`,
    );
    const data = await response.json();
    return data.results.map(item => ({
      imageURL:
        item.poster_path === null
          ? 'https://consaltliga.com.ua/wp-content/themes/consultix/images/no-image-found-360x250.png'
          : `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      title: item.title,
      vote: item.vote_average,
      id: item.id,
    }));
  },

  async getMovie(id) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${this.API_KEY}&language=en-US`,
    );
    const data = await response.json();
    return {
      imageURL:
        data.poster_path === null
          ? 'https://consaltliga.com.ua/wp-content/themes/consultix/images/no-image-found-360x250.png'
          : `https://image.tmdb.org/t/p/w500${data.poster_path}`,
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
      release_date: data.release_date.split('-')[0],
      popularity: data.popularity,
      id: data.id,
    };
  },

  getWatchedMovie(key) {
    const watchedMovieArr = JSON.parse(localStorage.getItem(key));
    console.log(watchedMovieArr);
    console.log(watchedMovieArr.map(item => item.data));
    return watchedMovieArr.map(item => item.data);
  },

  async getSearchedMovie(query) {
    console.log('query', query);
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
      imageURL:
        item.poster_path === null
          ? 'https://consaltliga.com.ua/wp-content/themes/consultix/images/no-image-found-360x250.png'
          : `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      original_title: item.original_title,
      title: item.title,
      release_date: item.release_date.split('-')[0],
      vote: item.vote_average,
      id: item.id,
    }));
  },
};
