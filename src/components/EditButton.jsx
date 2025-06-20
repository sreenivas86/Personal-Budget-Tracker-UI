
import 'bootstrap-icons/font/bootstrap-icons.css';

function EditButton({ onClick }) {
  return (
    <button className="btn btn-primary btn-sm" onClick={onClick}>
      <i className="bi bi-pencil-square me-1"></i> Edit
    </button>
  );
}

export default EditButton;
