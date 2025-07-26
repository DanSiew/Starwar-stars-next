import "./button.scss";

export default function Button(props: {
  label: string;
  type: "submit" | "reset" | "button" | undefined;
  size: string;
  buttonType: string;
  index: number;
  handleClick: (event: any) => void;
}) {
  return (
    <button
      aria-label={props.label}
      type={props.type}
      className={[
        "ds-button",
        `ds-button--${props.size}`,
        `ds-button--${props.buttonType}`,
      ].join(" ")}
      onClick={() => props.handleClick(props.index)}
    >
      {props.label}
    </button>
  );
}
