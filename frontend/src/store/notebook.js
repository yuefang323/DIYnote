import { csrfFetch } from "./csrf";

// -------- Constants --------
const GET_ALL_NOTEBOOKS = "notebooks/GET_ALL_NOTEBOOKS";
const GET_NOTEBOOK = "notebooks/GET_NOTEBOOK";
const CREATE_NOTEBOOK = "notebooks/CREATE_NOTEBOOK";
// const UPDATE_NOTEBOOK = 'notebooks/UPDATE_NOTEBOOK';
const DELETE_NOTEBOOK = "notebooks/DELETE_NOTEBOOK";

// ---------------- Actions -----------
// GET a user's all notebooks
export const getAllNotebooks = (notebooks) => ({
  type: GET_ALL_NOTEBOOKS,
  payload: notebooks,
});
// GET a notebook's all notes
export const getNotebook = (notebook) => ({
  type: GET_NOTEBOOK,
  payload: notebook,
});
// POST a new notebook
export const createNotebook = (newNotebook) => ({
  type: CREATE_NOTEBOOK,
  payload: newNotebook,
});
// UPDATE a notebook
// export const updateNotebook = (updatedNotebook) => ({
//     type: UPDATE_NOTEBOOK,
//     payload: updatedNotebook
// })
// DELETE a notebook
export const deleteNotebook = (notebook) => ({
  type: DELETE_NOTEBOOK,
  payload: notebook,
});

// ---------------- Thunk Actions -------------
// Thunk for getting all notebooks
export const getAllNotebooksThunk = (userId) => async (dispath) => {
  const res = await csrfFetch(`/api/users/${userId}/notebooks`);
  if (res.ok) {
    const allNotebooks = await res.json();
    dispath(getAllNotebooks(allNotebooks));
    return allNotebooks;
  }
};
// Thunk for getting a notebook's all notes
// export const getNotebookThunk = (notebookId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/notebooks/`);
//   if (res.ok) {
//     const notebookNotes = await res.json();
//     dispatch(getNotebook(notebookNotes));
//     if(!notebookNotes) {
//         return "bad"
//     }
//     return "ok"
//   }
// };
// Thunk for creating a new notebook
export const createNotebookThunk = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/notebooks/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  if (res.ok) {
    const newNotebook = await res.json();
    dispatch(createNotebook(newNotebook));
    return newNotebook;
  }
};
// Thunk for deleting a notebook
export const deleteNotebookThunk = (notebook) => async (dispatch) => {
  const { id } = notebook;
  const res = await csrfFetch(`/api/notebooks/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
  if (res.ok) {
    const deletedNotebook = await res.json();
    dispatch(deleteNotebook(deletedNotebook));
    return deleteNotebook;
  }
};

const initialState = {}; 

export default function notebooksReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
      case GET_ALL_NOTEBOOKS: {
        return { ...state, notebooks: action.payload };
      }
    //   case GET_NOTEBOOK: {
    //     return { ...state, notebook: action.payload };
    //   }
    //   case CREATE_NOTEBOOK: {
    //     return { ...state, notebooks: action.payload };
    //   }
    //   case DELETE_NOTEBOOK:
    //         newState = { ...state };
    //         newNotebooks = { ...state.notebooks };
    //         delete newNotebooks[action.notebook.id];
    //         newState.notebooks = newNotebooks;
    //         return newState;
      default:
        return state;
    }
  }