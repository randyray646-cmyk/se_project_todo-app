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
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });

    this._todoCheckboxElement.addEventListener("change", () => {
      this._todoElement.classList.toggle("todo_completed");
    });
  }

  generateCheckboxElement() {
    this._todoCheckboxElement =
      this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxElement.checked = this._data.completed;
    this._todoCheckboxElement.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }
  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameElement = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    const formattedDate = this._todoDate(this._data.date);

    todoNameElement.textContent = this._data.name;
    todoDate.textContent = formattedDate;

    this.generateCheckboxElement();
    this._setEventListeners();
    return this._todoElement;
  }
}

export default Todo;
