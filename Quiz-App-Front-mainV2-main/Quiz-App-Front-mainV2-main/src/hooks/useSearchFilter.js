import { useSearchParams } from 'react-router-dom';


export const useSearchFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const type = searchParams.get('type') || '';

  const updateSearchParams = (newParams) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...currentParams, ...newParams });
  };

  const setSearch = (searchValue) => {
    updateSearchParams({ search: searchValue });
  };

  const setType = (typeValue) => {
    updateSearchParams({ type: typeValue});
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const filterItems = (items) => {
    return items.filter(item => {
      // Search filter
      const matchesSearch = !search || 
        item.text?.toLowerCase().includes(search.toLowerCase()) ||
        item.question?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase());

      // Type filter
      const matchesType = !type || item.type === type;

      return matchesSearch && matchesType;
    });
  };

  return {
    search,
    type,
    setSearch,
    setType,
    clearFilters,
    filterItems,
    hasActiveFilters: search || type
  };
};
