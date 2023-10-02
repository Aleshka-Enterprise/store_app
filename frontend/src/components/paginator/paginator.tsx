import React, { useState } from "react";

import "./paginator.scss";

interface PaginatorProps {
  onPageSelect: (index: number) => void;
  maxPages?: number;
}

const Paginator = ({ onPageSelect }: PaginatorProps): React.ReactElement => {
  const [selectedPage, setPage] = useState<number>(0);

  return (
    <div className='paginator'>
      <div
        className={`element ${selectedPage <= 1 ? "disabled" : ""}`}
        onClick={(): void => {
          if (selectedPage > 1) {
            setPage(selectedPage - 1)
            onPageSelect(selectedPage - 1);
          }
        }}
      >
        Предыдущая
      </div>
      {[1, 2].map((page) => {
        return (
          <div
            key={page}
            className={`element ${page === selectedPage ? "selected" : ""}`}
            onClick={(): void => {
              setPage(page)
              onPageSelect(page);
            }}
          >
            {page}
          </div>
        )
      })}
      <div className='element'>Следующая</div>
    </div>
  );
};

export default Paginator;
