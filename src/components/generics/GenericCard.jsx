import { Link } from "react-router-dom";

const GenericCard = (props) => {
  const {
    width = "auto",
    height = "auto",
    color = "white",
    backgroundColor = "rgba(0,0,0,0.5)",
    imgSrc,
    title = "title",
    text = "text",
    textTrunc,
    route,
  } = props;

  const inner = (
    <>
      {imgSrc && <img className="card-img-top" src={imgSrc} alt="Card" />}
      <div className="card-img-overlay">
        <h4 className="card-title">
          <span className="px-1" style={{ backgroundColor, color }}>
            {title}
          </span>
        </h4>
        <p className="card-text px-1" style={{ backgroundColor, color }}>
          {textTrunc ? text.substr(0, textTrunc) + "..." : text}
        </p>
      </div>
    </>
  );

  return (
    <div className="card p-0" style={{ height, width }}>
      {route ? <Link to={route}>{inner}</Link> : inner}
    </div>
  );
};

export default GenericCard;
