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
    reviewId?: string;
    rating: number;
    comment: string;
};

interface TestCase {
    testId: number;
    testTitle: string;
    bookId?: string;
    bookTitle?: string;
    genre?: string;
    author?: string;
    reviews?: Review[];
    expectedStatus?: number;
};

const testCases: TestCase[] = [
    {
        testId: 4.1,
        testTitle: 'Delete book without review',
        bookId: '2',
        expectedStatus: 403
    },
    {
        testId: 4.2,
        testTitle: 'Delete book with review',
        bookId: '3'

    }
];

test.describe.configure({ mode: 'serial'});

test.beforeAll( () => {
    setupData();
});

for(const testCase of testCases) {
    test(`${testCase.testId} DELETE /books/{id} - ${testCase.testTitle}`,async ({ request }) => {
        const response = await request.delete(`/books/${testCase.bookId}`);
        console.log(response.status());
        if(!testCase.expectedStatus) {
            const getDeletedBook = await request.get(`/book/${testCase.bookId}`);
            const deletedBookStatus = getDeletedBook.status();
            expect(deletedBookStatus).toBe(404);
            testCase.expectedStatus = 204;
        };
        expect(response.status()).toBe(testCase.expectedStatus);
        
    });   
};

//Utility functions
function setupData() {
    /*
        1. Book with review.
        2. Book without review.
        3. Book with review.
    */
}
