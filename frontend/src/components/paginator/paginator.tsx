import React from "react";

import "./paginator.scss";

interface PaginatorProps {
  onPageSelect: (index: number) => void;
  selectedPage: number;
  maxCount: number;
}

const Paginator = ({ onPageSelect, selectedPage }: PaginatorProps): React.ReactElement => {
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
      {/* TODO Отображение пагинатора в пределах 5 элементов */}
      {[1, 2].map(page => {
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
      <div className='element'>Следующая</div>
    </div>
  );
};

export default Paginator;
