import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Notebooks.css";

import * as notebookActions from "../../store/notebook";

function UpdateNotebookPage({ setShowModal, notebookId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const notebooks = useSelector(state => state.notebooks);
  const oldInputVal = notebooks[notebookId].name

  const [inputVal, setInputVal] = useState(oldInputVal);
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/signup" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = [];
    if (inputVal.length < 1) validateErrors.push("Notebook name is required");
    if (validateErrors.length > 0) {
      setErrors(validateErrors);
      return;
    }
    dispatch(notebookActions.updateNotebookThunk(notebookId, inputVal));
    setShowModal(false);
  };
  return (
    <form onSubmit={handleSubmit} className="update-notebook-form">
      <h2 className="update-notebook-name">Update a notebook</h2>
      <ul className="update-notebook-errors">
        {errors && errors.map((error) => <li key={error} className="errors notebook">{error}</li>)}
      </ul>
      <div className="notebook-update-form">
        <label className="update-notebook-label">
          <input
            className="update-notebook-input"
            type="text"
            name="name"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </label>
        <button className="update-notebook-submit" type="submit">
          Update
        </button>
      </div>
    </form>
  );
}

export default UpdateNotebookPage;
