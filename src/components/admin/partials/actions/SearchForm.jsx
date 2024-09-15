import React from 'react';

function SearchForm({
  placeholder
}) {
  return (
    <form className="relative">
      <label htmlFor="action-search" className="sr-only">Search</label>
      <input id="action-search" className="form-input pl-9 focus:border-slate-300" type="search" placeholder={placeholder} />
    </form>
  );
}

SearchForm.defaultProps = {
  placeholder: 'Search…'
}

export default SearchForm;