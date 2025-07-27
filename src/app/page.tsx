"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import StarwarPeople from "./components/people-list/starwarPeople";
import { useSelector, useDispatch } from "react-redux";
import * as starwarSlice from "./store/features/starwarSlice";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "./store/store";
import { loadPeopleData } from "./store/features/peopleSlice";
import useWindowSize from "@rooks/use-window-size";
import Loading from "./components/loading/loading";
import Alert from "./components/alert/alert";
import Pagination from "./components/pagination/pagination";

export default function Home() {
  const { innerWidth } = useWindowSize();
  const smallWidth = innerWidth && innerWidth <= 720;
  const starwarState = useSelector((state: RootState) => state.starwar);
  const [pageNum, setPageNum] = useState<number>(starwarState.currentPage);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const fetchData = () => {
    dispatch(starwarSlice.fetchStart({ currentPage: pageNum }));
    dispatch(starwarSlice.getStarwarAsync(pageNum));
  };

  useEffect(() => {
    if (pageNum > 0 && starwarState.data === undefined) {
      fetchData();
    } else if (starwarState.currentPage !== pageNum) {
      fetchData();
    }
  }, [pageNum]);

  const handleClick = (index: number) => {
    let data = starwarState?.data?.results[index];
    if (data) {
      const url = new URL(data.url);
      let pathname = url.pathname;
      if (pathname.endsWith("/")) {
        pathname = pathname.slice(0, -1);
      }
      const segments = pathname.split("/");
      const id = segments[segments.length - 1];
      data = { ...data, id };
      dispatch(loadPeopleData({ data }));
      router.push(`/starwar/${id}`);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.pending}>
          {starwarState && starwarState.status === "pending" ? <Loading /> : ""}
        </div>
        <div>
          {starwarState && starwarState.status === "failed" && (
            <Alert
              alertText="Something gone wrong! Please try again"
              type="danger"
            />
          )}
        </div>
        {starwarState && starwarState.status === "succeeded" && (
          <StarwarPeople starwarState={starwarState} getPeople={handleClick} />
        )}

        <div className={styles.buttonlist}>
          {starwarState &&
            starwarState.status === "succeeded" &&
            starwarState.data &&
            starwarState.data.pageNumber.length > 0 && (
              <Pagination
                onPageChange={(page: number) => setPageNum(page)}
                totalCount={starwarState.data?.count}
                currentPage={pageNum}
                pageSize={10}
                isSmall={smallWidth}
              />
            )}
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
