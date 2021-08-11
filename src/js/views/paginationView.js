import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupNextButton(curPage) {
    return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </button> `;
  }

  _generateMarkupPrevButton(curPage) {
    return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // First page, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateMarkupNextButton(curPage);
    }

    // Last page
    if (this._data.page === numPages && numPages > 1) {
      return this._generateMarkupPrevButton(curPage);
    }

    // Other page
    if (this._data.page < numPages) {
      return (
        this._generateMarkupNextButton(curPage) +
        this._generateMarkupPrevButton(curPage)
      );
    }

    // First page, and there are no other pages
    return ``;
  }
}

export default new PaginationView();
