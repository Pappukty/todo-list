const Alert = ({ type, msg }) => {
  return (
    <div>
      <p className={`alert alert-${type}`}>{msg}</p>
    </div>
  );
};

export default Alert;
