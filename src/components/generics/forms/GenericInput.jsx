const GenericInput = (props) => {
  if (!props.name) {
    throw new Error("props.name not set");
  }

  const {
    name,
    type = "text",
    labelText = "",
    invalidText = "saisie non valide",
    required,
    pattern,
    ...rest
  } = props;

  return (
    <div {...rest}>
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        className="form-control"
        id={name + "Input"}
        name={name}
        required={required}
        pattern={pattern}
      />
      <div className="invalid-feedback">{invalidText}</div>
    </div>
  );
};

export default GenericInput;
