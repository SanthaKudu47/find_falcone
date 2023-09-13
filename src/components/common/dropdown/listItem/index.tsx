import classes from "./list.module.css";

function ListItem({
  value,
  info,
  clickHandler,
}: {
  value: string;
  info?: string;
  clickHandler: (value: string) => void;
}) {
  return (
    <div className={classes.listItem} onClick={() => clickHandler(value)}>
      <h4>{value}</h4>
      {info && <p>{info}</p>}
    </div>
  );
}

export default ListItem;
