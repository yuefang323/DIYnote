import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { deleteNotebookThunk } from "../../store/notebook";

const NotebookDeleteConfirm = ({ showModal, notebookId, userId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const deleteCurrentNotebook = async () => {
    const deletedNotebookId = await dispatch(deleteNotebookThunk(notebookId));
    if (deletedNotebookId) {
      history.push(`/users/${userId}/home`);
      showModal(false);
    }
  };

  return (
    <div className="upload-form">
      Do you really want to delete this notebook? It will delete all notes
      included in this notebook!
      <button type="submit" onClick={deleteCurrentNotebook}>
        Yes
      </button>
    </div>
  );
};

export default NotebookDeleteConfirm;
