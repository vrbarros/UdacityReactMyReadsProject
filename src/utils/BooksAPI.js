const api = "https://reactnd-books-api.udacity.com"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if ( !token ) 
  token = localStorage.token = Math
    .random()
    .toString( 36 )
    .substr( -8 )

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
}

class BooksAPI {

  static get( bookId ) {
    return fetch( `${ api}/books/${ bookId }`, { headers } )
      .then( res => res.json() )
      .then( data => data.book );
  }

  static getAll() {
    return fetch( `${ api }/books`, { headers } )
      .then( res => res.json() )
      .then( data => data.books );
  }

  static update( book, shelf ) {
    return fetch( `${ api}/books/${ book.id }`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( { shelf } ),
    } ).then( res => res.json() );
  }

  static search( query, max ) {
    return fetch( `${ api }/search`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( { query, max } ),
    } )
      .then( res => res.json() )
      .then( data => data.books );
  }
}

export default BooksAPI;
