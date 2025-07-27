"use client";
import "./page.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../store/features/counterSlice";
import { RootState } from "../store/store";
import Button from "../components/button/button";

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="main">
      <h1>Count: {count}</h1>
      <div className="container">
        <Button
          label="Increment"
          type="button"
          size="small"
          buttonType="primary"
          event=""
          handleClick={() => dispatch(increment())}
        />
        <Button
          label="decrement"
          type="button"
          size="small"
          buttonType="primary"
          event=""
          handleClick={() => dispatch(decrement())}
        />
        <Button
          label="Increment by 5"
          type="button"
          size="small"
          buttonType="primary"
          event=""
          handleClick={() => dispatch(incrementByAmount(5))}
        />
      </div>
    </div>
  );
}
