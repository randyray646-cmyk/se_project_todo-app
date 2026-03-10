class Todo {    
  constructor(data, selector) {
    this._id = data.id;
    this._data = data;
    this._name = data.name;
    this._selector = selector;
    this._date = data.date;
    this._templateElement = document.querySelector(selector);
  }

  _todoDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return "";

  return `Due: ${date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}`;
}

  _setEventListeners() {
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._todoElement.classList.toggle("todo_completed");
    });
  }


  generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);

  }
  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;
    todoDate.textContent = this._data.date;

    this.generateCheckboxEl();
    this._setEventListeners();

    todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });

    return this._todoElement;
  }

}

export default Todo;