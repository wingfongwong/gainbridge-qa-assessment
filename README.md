# gainbridge-qa-assessment
## Assumptions
1. The database is empty prior to test.
2. When id is not found it return 404
3. When post body is invalid or empty return 400
4. When deleting nonexistant book or book with reviews returns 403
5. There exists a put/patch but not specifically mentioned in the assignment.

## Paths to test
1. GET /books?genre={genre}&author={author}
2. GET /books/{id}
3. POST /books
4. DELETE /books/{id}

## Test cases

1.1 No filter - should return all available books

1.2 Genre filter - should return all books of that genre

1.2.1 Genre filter invalid - should return no books

1.3 Author filter - should return all books of that author

1.3.1 Genre filter invalid - should return no books

1.4 Both filters - should return the union of both filters

2.1 Valid id - returns one book with the id

2.2 Invalid id - returns 404


3.1 Post valid filled request body - should return a unique id and success message

3.2 Empty request body - should return 400

3.3 Invalid request body - should return 400

3.4 Null data and duplicate key data - Is there serverside validation of data for null and duplicate data?


4.1 Delete book without review - book is successfully deleted

4.2 Delete book with review - book is not deleted maybe error 403



5.1 Put/Patch test? - does this exist?
