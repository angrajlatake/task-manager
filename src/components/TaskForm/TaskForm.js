import "./TaskForm.scss";

function TaskForm(props) {
  return (
    <>
      <form className="form" onSubmit={props.handleAdd}>
        <h2 className="form__heading">Create a new task</h2>
        <div className="form__input-container">
          <input
            name="category"
            type="text"
            placeholder="category"
            className="form__input-content"
          ></input>
          <input
            name="content"
            type="text"
            placeholder="description"
            className="form__input-content"
          ></input>
          <input
            name="priority"
            type="text"
            placeholder="priority"
            className="form__input-content"
          ></input>
          <input
            name="due-date"
            type="text"
            placeholder="due date (yyyy/mm/dd)"
            className="form__input-content"
          ></input>
        </div>
        <button className="form__button btn" type="submit">
          Submit new task
        </button>
      </form>
    </>
  );
}

export default TaskForm;
