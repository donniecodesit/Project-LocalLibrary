function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const booksMissing = books.filter(book => !book.borrows[0].returned);
  const booksReturned = books.filter(book => book.borrows[0].returned);
  return [booksMissing, booksReturned];
}

function getBorrowersForBook(book, accounts) {
  //Create a list of borrowers based off of each borrow's id
  const borrowers = book.borrows.map(({ id, returned }) => {
    const account = accounts.find(person => person.id === id);
    return { ...account, returned };
  });

  //Return, Limited to 5
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
