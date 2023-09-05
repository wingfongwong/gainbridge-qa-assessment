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
interface Reviews {
    reviewId: string;
    rating: string;
    comment: string;
}; 

interface TestCase {
    testId: number;
    testTitle: string;
    bookId: number;
    bookTitle?: string;
    genre?: string;
    author?: string;
    reviews?: Reviews[];
    expectedStatus?: number;
};

const testCases : TestCase[] = [
    {
        testId: 2.1,
        testTitle: 'Valid Id',
        bookId: 1,
        genre: 'Fiction',
        author: 'Herman Melville'
    },
    {
        testId: 2.2,
        testTitle: 'Invalid Id',
        bookId: -99,
        expectedStatus: 404
    },
];

test.beforeAll( () => {
    setupData();
});

for(const testCase of testCases) {
    test(`${testCase.testId} GET /books/{id} - ${testCase.testTitle}`,async ({ request }) => {
        var url : string = `/books/${testCase.bookId}`;
        const response = await request.get(encodeURI(url));
        if(!testCase.expectedStatus){
            const responseBody = await response.json();
            expect(responseBody.genre).toBe(testCase.genre);
            expect(responseBody.author).toBe(testCase.author);
        };
        if(testCase.expectedStatus) {
            expect(response.status()).toBe(testCase.expectedStatus);
        };
    });
};


//Utility functions
function setupData() {
    /*
        1. Valid record.
        2. Valid record.
        3. Valid record.
    */
}
