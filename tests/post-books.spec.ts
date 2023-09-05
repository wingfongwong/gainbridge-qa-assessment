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
        testId: 3.1,
        testTitle: 'Post valid filled request body',
        bookId: "3", //expected id
        bookTitle: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Novel",
        reviews: [
            {
                rating: 4.5,
                comment: "A mesmerizing tale of ambition and love."
            }
        ]
    },
    {
        testId: 3.2,
        testTitle: 'Empty request body',
        expectedStatus: 400
    },
    {
        testId: 3.3,
        testTitle: 'Invalid request body',
        genre: "asdf",
        expectedStatus: 400
    },
    {
        testId: 3.4,
        testTitle: 'Duplicate key data',
        bookTitle: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Novels",
        reviews: [
            {
                rating: 4.5,
                comment: "A mesmerizing tale of ambition and love."
            }
        ],
        expectedStatus: 400
    },
    {
        testId: 3.5,
        testTitle: 'Null key data',
        bookTitle: "",
        author: "",
        genre: "",
        reviews: [
            {
                rating: 4.5,
                comment: "A mesmerizing tale of ambition and love."
            }
        ],
        expectedStatus: 400
    },
]

test.beforeAll( () => {
    setupData();
});
for(const testCase of testCases) {
    test(`${testCase.testId} POST /books - ${testCase.testTitle}`,async ({ request }) => {
        var reqData = {};
        if(!testCase.expectedStatus) {
            reqData = {
                data: {
                    title: testCase.bookTitle,
                    author: testCase.author,
                    genre: testCase.genre,
                    reviews: testCase.reviews
                }
            };
        }
        const postBook = await request.post('/books', reqData);
        if(testCase.expectedStatus) {
            await expect(postBook.status()).toBe(testCase.expectedStatus);
        } else {
            await expect(postBook.status()).toBe(200);
            await expect(await postBook.json()).toHaveProperty('id', testCase.bookId);
        }
    });
}


//Utility functions
function setupData() {
    /*
        Seed two valid books.
    */
}
