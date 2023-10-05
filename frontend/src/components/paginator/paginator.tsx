import React, { useMemo } from "react";

import "./paginator.scss";

interface PaginatorProps {
  onPageSelect: (index: number) => void;
  selectedPage: number;
  maxCount: number;
}

const Paginator = ({ onPageSelect, selectedPage, maxCount }: PaginatorProps): React.ReactElement => {
  const pageList = useMemo(() => {
    let allPages: number[] = [];
    for (let i = 1; i <= maxCount; i++) {
      allPages.push(i);
    };
    const res = allPages.filter(el => el > 0 && el <= maxCount);
    const currentPageIndex = res.findIndex(el => el === selectedPage);
    let startIndex = Math.max(0, currentPageIndex - 2);

    if (startIndex + 5 > maxCount) {
      startIndex += maxCount - (startIndex + 5)
    };

    return res.slice(Math.max(startIndex, 0), Math.min(maxCount, startIndex + 5));
  }, [selectedPage, maxCount]);

  return (
    <div className='paginator'>
      <div
        className={`element ${selectedPage <= 1 ? "disabled" : ""}`}
        onClick={(): void => {
          if (selectedPage > 1) {
            onPageSelect(selectedPage - 1);
          }
        }}
      >
        Предыдущая
      </div>
      {pageList.map(page => {
        return (
          <div
            key={page}
            className={`element ${page === selectedPage ? "selected" : ""}`}
            onClick={(): void => {
              onPageSelect(page);
            }}
          >
            {page}
          </div>
        );
      })}
      <div
        className={`element ${selectedPage >= Math.max(...pageList) ? "disabled" : ""}`}
        onClick={(): void => {
          if (selectedPage < Math.max(...pageList)) {
            onPageSelect(selectedPage + 1);
          }
        }}
        >
          Следующая
        </div>
    </div>
  );
};

export default Paginator;
