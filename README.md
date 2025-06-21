## API Documentation

### Books API

#### POST /api/books

Create a new book.

- **Request Body:**

  - `title` (string, required): The title of the book.
  - `author` (string, required): The author of the book.
  - `genre` (string, required): The genre of the book. Must be one of: "FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY".
  - `isbn` (string, required): The ISBN of the book.
  - `description` (string, required): The description of the book.
  - `copies` (number, required): The number of copies available.

- **Response:**
  - `success` (boolean): Indicates if the operation was successful.
  - `message` (string): A message describing the result.
  - `data` (object): The created book object.

#### GET /api/books

Retrieve all books or filtered books.

- **Query Parameters:**

  - `filter` (string, optional): Filter books by genre.
  - `sortBy` (string, optional): Field to sort by.
  - `sort` (string, optional): Sort order, either "asc" or "desc".
  - `limit` (number, optional): Number of results to return, default is 10.

- **Response:**
  - `success` (boolean): Indicates if the operation was successful.
  - `message` (string): A message describing the result.
  - `data` (array): An array of book objects.

#### GET /api/books/:bookId

Retrieve a specific book by ID.

- **URL Parameters:**

  - `bookId` (string, required): The ID of the book.

- **Response:**
  - `success` (boolean): Indicates if the operation was successful.
  - `message` (string): A message describing the result.
  - `data` (object): The book object.

#### PUT /api/books/:bookId

Update a specific book by ID.

- **URL Parameters:**

  - `bookId` (string, required): The ID of the book.

- **Request Body:**

  - `title` (string, optional): The title of the book.
  - `author` (string, optional): The author of the book.
  - `genre` (string, optional): The genre of the book.
  - `isbn` (string, optional): The ISBN of the book.
  - `description` (string, optional): The description of the book.
  - `copies` (number, optional): The number of copies available.

- **Response:**
  - `success` (boolean): Indicates if the operation was successful.
  - `message` (string): A message describing the result.
  - `data` (object): The updated book object.

#### DELETE /api/books/:bookId

Delete a specific book by ID.

- **URL Parameters:**

  - `bookId` (string, required): The ID of the book.

- **Response:**
  - `success` (boolean): Indicates if the operation was successful.
  - `message` (string): A message describing the result.

### Borrows API

#### POST /api/borrow

Create a new borrow record.

- **Request Body:**

  - `book` (string, required): The ID of the book to borrow.
  - `quantity` (number, required): The quantity to borrow.
  - `dueDate` (date, required): The due date for returning the book.

- **Response:**
  - `success` (boolean): Indicates if the operation was successful.
  - `message` (string): A message describing the result.
  - `data` (object): The created borrow record.

#### GET /api/borrow

Retrieve a summary of borrowed books.

- **Response:**
  - `success` (boolean): Indicates if the operation was successful.
  - `message` (string): A message describing the result.
  - `data` (array): An array of borrowed books summary, including book title, ISBN, and total quantity.
