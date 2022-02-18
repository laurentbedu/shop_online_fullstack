const GenericForm = (props) => {
  if (!props.endpoint) {
    throw new Error("props.endpoint not set");
  }

  const {
    endpoint,
    method = "post",
    submitButtonText = "Valider",
    callback,
    validation,
    ...rest
  } = props;

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    if (validation) {
      form.querySelectorAll("[required], [pattern]").forEach((input) => {
        if (
          !input.value ||
          (input.pattern && !new RegExp(input.pattern).test(input.value))
        ) {
          input.classList.add("is-invalid");
          input.onfocus = (evt) => {
            evt.currentTarget.classList.remove("is-invalid");
          };
        } else {
          input.parentElement.classList.remove("is-invalid");
        }
      });
      const isNotValid = Array.from(
        form.querySelectorAll("[required], [pattern]")
      ).some((input) => input.classList.contains("is-invalid"));
      if (isNotValid) return;
    }
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    const body = JSON.stringify(jsonData);
    await fetch(endpoint, {
      method,
      headers: {
        "content-type": "application/json",
      },
      body,
    }).then((response) => {
        return callback ? callback(evt, response) : {evt, response};
      })
      .catch(console.log);
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate={validation} {...rest}>
        {props.children}
        <button type="submit" className="btn btn-primary">
          {submitButtonText}
        </button>
      </form>
    </>
  );
};

export default GenericForm;
