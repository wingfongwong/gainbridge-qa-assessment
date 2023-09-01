import { test, expect } from '@playwright/test';

/*
Paths to test
1. GET /books?genre={genre}&author={author}
2. GET /books/{id}
3. POST /books
4. DELETE /books/{id}

Test cases
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
*/
interface TestCase {
    id?: Number;
    title: string;
    genre?: string;
    author?: string;
}

const getBookFilterTestCases : TestCase[] = [
    {   
        id: 1.1,
        title: 'No filter' },
    {
        id: 1.2,
        title: 'Null filter',
        genre: '',
        author: ''
    },
    { 
        id: 1.3,
        title: 'Valid Genre',
        genre: 'Fiction'
    },
    {
        id: 1.4,
        title: 'Valid Author',
        author: 'Herman Melville'
    }
];

test.beforeAll( () => {
    setupData();
})

for(const testCase of getBookFilterTestCases) {
test(`${testCase.id} GET /books - ${testCase.title}`, async ({ request }) => {
    var url : string = '/books';
    url += (testCase.genre||testCase.author)?'?':'';
    url += testCase.genre?`genre=${testCase.genre}`:'';
    url += (testCase.genre||testCase.author)?'&':'';
    url += testCase.author?`author=${testCase.author}`:'';

    console.log(testCase)
    console.log(`Requested url ${encodeURI(url)}`)
    const response = await request.get(encodeURI(url));
    const responseBody = await response.json();
    // console.log(responseBody.length);
    expect(responseBody[0]).toHaveProperty('title', 'Moby Dick');
    
})
};

test('2.1 Valid ID', async ({ request }) => {
    const BOOK_ID : Number = 2;
    const response = await request.get(`/books/${ BOOK_ID }`);
    const responseBody = await response.json();
    console.log(responseBody);
})

//Utility functions
function setupData(): void {
    
}