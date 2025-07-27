import "./pageNumber.scss";

export default function PageNumber(props: {
  pageNumber: number[];
  currentPage: number;
  windowWidth: number;
  handleFetch: (numPage: number) => void;
}) {
  const smallWidth = props.windowWidth <= 720;

  return (
    <div className="pagination">
      <button className="btn-words"
        disabled={props.currentPage === 1}
        onClick={() => props.handleFetch(props.currentPage - 1)}
      >
        {smallWidth ? "Previous" : "<"}
      </button>
      {!smallWidth &&
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
        {smallWidth ? "Next" : ">"}
      </button>
    </div>
  );
}
