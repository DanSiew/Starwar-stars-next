import "./alert.scss";

export default function Alert(props: {
  alertText: string;
  type: "info" | "warning" | "danger";
}) {
  return (
    <div className={[
        "alert",
        `alert--${props.type}`,
      ].join(" ")} role="alert">
      {props.alertText}
    </div>
  );
}
