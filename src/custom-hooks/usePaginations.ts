import { useMemo } from 'react';

export const DOTS = '...';

const range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

const getArrayObject = (type: string, numRange: number[], lastPageIndex: number, firstPageIndex: number) => {
    let objResult = numRange.map((item) => {
        return {
            key: item,
            value: item.toString(),
        };
    })
    const firstPage = { key: firstPageIndex, value: firstPageIndex.toString() };
    const lastPage = { key: lastPageIndex, value: lastPageIndex.toString() };
    if (type === 'left') {
        const dots = { key: numRange.length + 1, value: DOTS };
        objResult = [...objResult, dots, lastPage]
        return objResult;
    }
    if (type === 'right') {
        const dots = { key: firstPageIndex + 1, value: DOTS };
        objResult = [firstPage, dots, ...objResult]
        return objResult;
    }
    if (type === 'middle') {
        const rightDots = { key: numRange[numRange.length - 1] + 1, value: DOTS };
        const leftDots = { key: numRange[0] - 1, value: DOTS };
        objResult = [firstPage, leftDots, ...objResult, rightDots, lastPage];
        return objResult;
    }
}

export const usePagination = (props: {
    totalCount: number;
    pageSize: number;
    siblingCount: number;
    currentPage: number;
}): ({ key: number, value: string })[] | undefined => {

    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(props.totalCount / props.pageSize);

        // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = props.siblingCount + 5;

        /*
          If the number of pages is less than the page numbers we want to show in our
          paginationComponent, we return the range [1..totalPageCount]
        */
        if (totalPageNumbers >= totalPageCount) {
            const numRange = range(1, totalPageCount);
            return numRange.map((item) => {
                return {
                    key: item,
                    value: item.toString(),
                };
            })
        }

        const leftSiblingIndex = Math.max(props.currentPage - props.siblingCount, 1);
        const rightSiblingIndex = Math.min(
            props.currentPage + props.siblingCount,
            totalPageCount
        );

        /*
          We do not want to show dots if there is only one position left 
          after/before the left/right page count as that would lead to a change if our Pagination
          component size which we do not want
        */
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * props.siblingCount;
            let leftRange = range(1, leftItemCount);
            const objResult = getArrayObject('left', leftRange, lastPageIndex, firstPageIndex);
            return objResult;
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * props.siblingCount;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );
            const objResult = getArrayObject('right', rightRange, lastPageIndex, firstPageIndex);
            return objResult;
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            const objResult = getArrayObject('middle', middleRange, lastPageIndex, firstPageIndex);
            return objResult;
        }
    }, [props.totalCount, props.pageSize, props.siblingCount, props.currentPage]);

    return paginationRange;
};
