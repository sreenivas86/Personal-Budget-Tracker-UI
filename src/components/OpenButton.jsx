import { useNavigate } from "react-router-dom";

function OpenButton({btnName,navUrl}) {
  const navigate = useNavigate();

  return (
    <button
      className="btn btn-primary mb-3"
      onClick={() => navigate(navUrl)}
    >
      {btnName}
    </button>
  );
}

export default OpenButton;
