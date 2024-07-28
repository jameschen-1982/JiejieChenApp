import React, {useEffect, useState} from "react";

export default function PaginationComponent({pageIndex, totalPageCount, onPageChange}: {
  pageIndex: number,
  totalPageCount: number,
  onPageChange: (pageNumber: number) => void
}) {

  const [pageOptions, setPageOptions] = useState<React.JSX.Element[]>();

  useEffect(() => {
    let options = Array.from(Array(totalPageCount).keys());
    setPageOptions(options.map((i) => {
      if (i == pageIndex) {
        return (<li key={i}>
          <button aria-current="page"
                  className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{i + 1}</button>
        </li>);
      } else {
        return (<li key={i}>
          <button onClick={() => {
            onPageChange(i)
          }}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{i + 1}</button>
        </li>);
      }
    }));
  }, [pageIndex, totalPageCount]);

  return (
    <div className="flex m-5">
      <ul className="inline-flex -space-x-px text-sm mx-auto">
        <li>
          <button onClick={() => {
            if (pageIndex > 0) {
              onPageChange(pageIndex - 1)
            }
          }}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous
          </button>
        </li>
        {pageOptions}
        <li>
          <button onClick={() => {
            if (pageIndex + 1 < totalPageCount) {

              onPageChange(pageIndex + 1)
            }
          }}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next
          </button>
        </li>
      </ul>
    </div>
  );
}
