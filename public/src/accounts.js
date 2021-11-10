function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    if (book.borrows.find(book => book.id === account.id)) acc++;
    return acc;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  //Filter the books down to which books are absent
  const booksPossessed = books.filter(book => book.borrows[0].id === account.id && !book.returned);

  //Add the author's object to each book filtered through
  for (let book of booksPossessed) {
    const authorObj = authors.find(author => author.id === book.authorId);
    book["author"] = authorObj;
  }
  return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
