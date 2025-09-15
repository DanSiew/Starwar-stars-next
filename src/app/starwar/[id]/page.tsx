"use client";
import Button from "@/app/components/button/button";
import "./page.scss";
import { People } from "@/app/models/starwar.model";
import { getPeopleAsync } from "@/app/store/features/peopleSlice";
import { AppDispatch } from "@/app/store/store";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/app/components/loading/loading";
import Alert from "@/app/components/alert/alert";

function StarwarPage() {
  const params = useParams<{ id: string }>();
  const peopleState = useSelector((state: any) => state.people);
  const data: People = peopleState.data;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (params.id) {
      if (data === undefined) {
        dispatch(getPeopleAsync(params.id));
      } else if (data.id !== params.id) {
        dispatch(getPeopleAsync(params.id));
      }
    }
  }, [params.id]);

  if (data && data.detail === "Not found") {
    return notFound();
  } else {
    return (
      <main className="main">
        <div className="pending">
          {peopleState && peopleState.status === "pending" ? <Loading /> : ""}
        </div>
        <div>
          {peopleState && peopleState.status === "failed" && (
            <Alert
              alertText="Something gone wrong! Please try again"
              type="danger"
            />
          )}
        </div>

        {data && (
          <>
            <h1>Starwars star</h1>
            <table>
              <tbody>
                <tr>
                  <td width="150px"> Name: </td>
                  <td>{data.name} </td>
                </tr>
                <tr>
                  <td>Height: </td>
                  <td>{data.height} </td>
                </tr>
                <tr>
                  <td>Mass: </td>
                  <td>{data.mass} </td>
                </tr>
                <tr>
                  <td>DOB: </td>
                  <td>{data.birth_year} </td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>{data.gender} </td>
                </tr>
              </tbody>
            </table>
            <section className="button-section">
              <Link href="/">
                <Button
                  label="Go back"
                  type="button"
                  size="medium"
                  buttonType="primary"
                />
              </Link>
            </section>
          </>
        )}
      </main>
    );
  }
}

export default StarwarPage;
