import "./pageNumber.scss";

export default function PageNumber(props: {
  pageNumber: number[];
  currentPage: number;
  windowWidth: number;
  handleFetch: (numPage: number) => void;
}) {
  const mobile = props.windowWidth <= 375;

  return (
    <div className="pagination">
      <button className="btn-words"
        disabled={props.currentPage === 1}
        onClick={() => props.handleFetch(props.currentPage - 1)}
      >
        {mobile ? "Previous" : "<"}
      </button>
      {!mobile &&
        props.pageNumber.length > 0 &&
        props.pageNumber.map((numPage: number, key: number) => (
          <button
            className={props.currentPage === numPage ? "active" : ""}
            key={key}
            onClick={() => props.handleFetch(numPage)}
          >
            {numPage}
          </button>
        ))}
      <button className="btn-words"
        disabled={props.currentPage === props.pageNumber.length}
        onClick={() => props.handleFetch(props.currentPage + 1)}
      >
        {mobile ? "Next" : ">"}
      </button>
    </div>
  );
}
