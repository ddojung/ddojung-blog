import * as React from 'react';
import style from './style.css';

interface IPaginationProps {
  onChange: Function;
  totalLength: number;
  displayLength: number;
  /** 페이지 최대 범위 */
  maxRange?: number;
}

const Pagination: React.FC<IPaginationProps> = ({ onChange, totalLength, displayLength, maxRange }) => {
  const pageNum = Math.ceil(totalLength / displayLength);
  const maxPageNumRange = maxRange || 5;
  // 현재 페이지 숫자
  const [currentPageNum, setCurrentPage] = React.useState(1);

  const liEle = (() => {
    const minRange = Math.min(pageNum, maxPageNumRange);
    const setPageNum = new Array(minRange)
      .fill(0)
      .map((_, idx) => {
        const diffCurrent = currentPageNum - (pageNum - Math.floor(maxPageNumRange / 2));

        if (diffCurrent > 0) {
          return idx + currentPageNum - Math.floor(maxPageNumRange / 2) - diffCurrent;
        }

        return idx + currentPageNum - Math.floor(maxPageNumRange / 2);
      })
      .filter(num => num > 0);

    const setPageNumLength = setPageNum.length;

    if (setPageNumLength < minRange) {
      new Array(minRange - setPageNum.length).fill(0).forEach((_, idx) => setPageNum.push(setPageNumLength + idx + 1));
    }

    return setPageNum.map(num => (
      <li key={num} onClick={() => onChangePage(num)}>
        <a className={num === currentPageNum ? style.current : undefined}>{num}</a>
      </li>
    ));
  })();

  function onChangePage(num: number) {
    setCurrentPage(num);
    onChange({ selected: num });
  }

  return (
    <div>
      <ul className={style.pagination}>
        <li
          className={
            Math.min(pageNum, maxPageNumRange) === pageNum ||
            currentPageNum <= maxPageNumRange - Math.floor(maxPageNumRange / 2)
              ? style.disabled
              : undefined
          }
          onClick={() => onChangePage(1)}
        >
          <a>&lt;&lt;</a>
        </li>
        {liEle}
        <li
          className={
            Math.min(pageNum, maxPageNumRange) === pageNum ||
            currentPageNum >= pageNum - Math.floor(maxPageNumRange / 2)
              ? style.disabled
              : undefined
          }
          onClick={() => onChangePage(pageNum)}
        >
          <a>&gt;&gt;</a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
