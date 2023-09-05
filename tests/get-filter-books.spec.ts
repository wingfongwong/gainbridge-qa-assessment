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

interface Review {
    reviewId: string;
    rating: string;
    comment: string;
};

interface TestCase {
    testId: number;
    testTitle: string;
    bookId?: number;
    bookTitle?: string;
    genre?: string;
    author?: string;
    reviews?: Review[];
    expectedCount: number;
};

const getBookFilterTestCases : TestCase[] = [
    {   
        testId: 1.1,
        testTitle: 'No filter',
        expectedCount: 3
    },
    { 
        testId: 1.2,
        testTitle: 'Valid Genre',
        genre: 'Fiction',
        expectedCount: 1
    },
    {
        testId: 1.3,
        testTitle: 'Valid Author',
        author: 'Herman Melville',
        expectedCount: 1
    },
    { 
        testId: 1.2,
        testTitle: 'Invalid Genre',
        genre: 'InvalidGenre123',
        expectedCount: 0
    },
    {
        testId: 1.3,
        testTitle: 'Invalid Author',
        author: 'Manville Hermel',
        expectedCount: 0
    }
];

test.beforeAll( () => {
    setupData();
})

for(const testCase of getBookFilterTestCases) {
test(`${testCase.testId} GET /books - ${testCase.testTitle}`, async ({ request }) => {
    var url : string = '/books';
    url += (testCase.genre||testCase.author)?'?':'';
    url += testCase.genre?`genre=${testCase.genre}`:'';
    url += (testCase.genre||testCase.author)?'&':'';
    url += testCase.author?`author=${testCase.author}`:'';

    const response = await request.get(encodeURI(url));
    const responseBody = await response.json();
    expect(responseBody.length).toBe(testCase.expectedCount); 
    if(testCase.expectedCount > 0) {
        if(testCase.genre) {
            await expect(responseBody[0]).toHaveProperty('genre');
        };
        if(testCase.author) {
            await expect(responseBody[0]).toHaveProperty('author', testCase.author);
        };
    }   
})
};

//Utility functions
function setupData(): void {
    /*
        setupData for the 5 test cases.
        1. Valid record with a review
        2. Valid record without review and author set to Herman Melville.
        3. Valid record without review and genre set to Fiction.
    */
}