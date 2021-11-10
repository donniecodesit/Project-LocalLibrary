function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    if (!book.borrows[0].returned) acc++;
    return acc;
  }, 0);
}

function getMostCommonGenres(books) {
  //Create an array of every book's genre
  let genres = books.map(book => book.genre);
  let result = [];
  
  //Loop through each genre and compare it against itself in result. If exists, +1, else create, 1.
  genres.map(genre => {
    const genreIndex = result.findIndex(index => index.name === genre);
    genreIndex >= 0 ? result[genreIndex].count++ : result.push({ name: genre, count: 1 });
  }, []);

  //Return, Limited to 5
  return sortCountToFive(result);
}

function getMostPopularBooks(books) {
  //Create an array of the books with just the name and borrow count
  const result = books.map(book => ({
    name: book.title,
    count: book.borrows.length,
  }));
  
  //Return, Limited to 5
  return sortCountToFive(result);
}

function getMostPopularAuthors(books, authors) {
  //Sort the books according to most borrowed.
  let sortedBooks = books.sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length);

  //Reduce that object to an array with the author's name and book's borrow count.
  const result = sortedBooks.reduce((acc, book, index) => {
    let author = authors.find(orgAuth => orgAuth.id === book.authorId).name;
    acc[index] = { name: `${author.first} ${author.last}`, count: book.borrows.length, };
    return acc;
  }, []);

  //Return, Limited to 5
  return sortCountToFive(result);
}





sortCountToFive = items => {
  items.sort((itemA, itemB) => itemB.count - itemA.count);
  return items.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
