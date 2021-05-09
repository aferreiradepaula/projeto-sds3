// export const BASE_URL = "http://localhost:10550"


// BACKEND_APP foi definido no netlify com a url do backend no heroku.
export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:10550'