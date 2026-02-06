(function () {
  const STORAGE_KEY = "todos";

  let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  let currentFilter = "all";

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const countEl = document.getElementById("todo-count");
  const footer = document.getElementById("footer");
  const clearBtn = document.getElementById("clear-completed");
  const filterBtns = document.querySelectorAll(".filter-btn");

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  function render() {
    list.innerHTML = "";

    const filtered = todos.filter(function (todo) {
      if (currentFilter === "active") return !todo.completed;
      if (currentFilter === "completed") return todo.completed;
      return true;
    });

    filtered.forEach(function (todo) {
      const li = document.createElement("li");
      li.className = "todo-item" + (todo.completed ? " completed" : "");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", function () {
        todo.completed = checkbox.checked;
        save();
        render();
      });

      const span = document.createElement("span");
      span.textContent = todo.text;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "\u00d7";
      deleteBtn.addEventListener("click", function () {
        todos = todos.filter(function (t) {
          return t.id !== todo.id;
        });
        save();
        render();
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });

    const activeCount = todos.filter(function (t) {
      return !t.completed;
    }).length;
    const completedCount = todos.length - activeCount;

    countEl.textContent = activeCount + " item" + (activeCount === 1 ? "" : "s") + " left";
    footer.className = todos.length === 0 ? "footer hidden" : "footer";
    clearBtn.style.display = completedCount > 0 ? "" : "none";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    todos.push({
      id: Date.now(),
      text: text,
      completed: false,
    });

    input.value = "";
    save();
    render();
  });

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentFilter = btn.dataset.filter;
      filterBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      render();
    });
  });

  clearBtn.addEventListener("click", function () {
    todos = todos.filter(function (t) {
      return !t.completed;
    });
    save();
    render();
  });

  render();
})();
