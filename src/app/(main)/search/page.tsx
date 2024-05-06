'use client';

import FilterDrawer from './_page-components/filter-drawer';

function SearchPage() {
  return (
    <div className='relative h-full'>
      <FilterDrawer onCategoriesChange={cats => console.log(cats)} />
      <div></div>
    </div>
  );
}
export default SearchPage;
