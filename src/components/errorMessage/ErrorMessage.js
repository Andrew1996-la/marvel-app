import error from "./error.gif";

function ErrorMessage() {
  const errorMessageStyle = {
    display: "block",
    margin: "0 auto",
    width: "250px",
    height: "250px",
    objectFit: "contain",
  };
  return <img src={error} style={errorMessageStyle} alt="error message" />;
}

export default ErrorMessage;
