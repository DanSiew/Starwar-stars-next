import { People, PeopleListModel } from "../../models/starwar.model";
import Button from "../button/button";
import "./starwarPeople.scss";

export default function StarwarPeople(props: PeopleListModel) {
  const handleClick = (index: number) => {
    props.getPeople(index);
  };

  return (
    <div className="people-list">
      <h1>Starwars stars</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {props.starwarState.data &&
            props.starwarState.data.results.map(
              (people: People, key: number) => (
                <tr key={key}>
                  <td>{people.name}</td>
                  <td>
                    <Button
                      label="View details"
                      type="button"
                      size="small"
                      buttonType="primary"
                      event={key}
                      handleClick={handleClick}
                    />
                  </td>
                </tr>
              )
            )}
        </tbody>
        <tfoot>
          <tr>
            {props.starwarState.data && (
              <td colSpan={2}>
                Page {props.starwarState.data.currentPage} of{" "}
                {props.starwarState.data.numberPages}
              </td>
            )}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
