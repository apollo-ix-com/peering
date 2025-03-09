import { useState, useRef } from "react";

const MAX_SEARCHES = 5;
const SEARCH_RESET_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

interface SearchLimits {
  count: number;
  firstSearchTimestamp: number;
}

const useSearchLimit = () => {
  const [error, setError] = useState<string | null>(null); // To show error if limit is reached
  const searchLimits = useRef<SearchLimits>({
    count: 0,
    firstSearchTimestamp: 0,
  });

  const updateSearchLimits = (newCount: number) => {
    const newLimits = {
      count: newCount,
      firstSearchTimestamp:
        newCount === 1 ? Date.now() : searchLimits.current.firstSearchTimestamp,
    };

    searchLimits.current = newLimits;
    localStorage.setItem("searchLimits", JSON.stringify(newLimits));
  };

  const checkSearchLimit = (): boolean => {
    const { count, firstSearchTimestamp } = searchLimits.current;

    if (count >= MAX_SEARCHES) {
      const timeSinceFirstSearch = Date.now() - firstSearchTimestamp;

      if (timeSinceFirstSearch < SEARCH_RESET_TIME) {
        const remainingTime = Math.ceil(
          (SEARCH_RESET_TIME - timeSinceFirstSearch) / (1000 * 60), // Time in minutes
        );

        setError(
          `Search limit reached. Please try again in ${remainingTime} minute(s).`,
        );

        return false;
      } else {
        updateSearchLimits(0); // Reset after the reset time
      }
    }

    return true; // Limit not reached
  };

  return {
    error,
    checkSearchLimit,
    updateSearchLimits,
    count: searchLimits.current.count,
  };
};

export default useSearchLimit;
