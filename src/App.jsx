import { useState ,useEffect} from "react";

function App() {
  const [todos, setTodos] = useState(() => {
  const savedTodos = localStorage.getItem("todos");

  return savedTodos
    ? JSON.parse(savedTodos)
    : [];
});

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

  // ADD TODO
  const addTodo = () => {
    if (!input.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input.trim(),
        completed: false,
      },
    ]);

    setInput("");
  };

  // ENTER KEY
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  // CHECK / UNCHECK
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // DELETE
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // CLEAR COMPLETED
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // FILTER
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completed = todos.filter((todo) => todo.completed).length;
  const remaining = todos.length - completed;

  return (
    <div className="min-h-screen bg-[#f5f6fa] px-4 py-8 sm:px-8">

      <div className="mx-auto max-w-5xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="mb-2 text-sm font-semibold tracking-widest text-violet-600">
              MY PRODUCTIVITY
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              My Tasks
            </h1>

            <p className="mt-2 text-gray-500">
              Organize your day, one task at a time.
            </p>
          </div>

          {/* STATS */}

          <div className="flex gap-3">

            <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-gray-100">
              <p className="text-xs font-medium text-gray-400">
                REMAINING
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-900">
                {remaining}
              </p>
            </div>

            <div className="rounded-2xl bg-violet-600 px-5 py-4 shadow-lg shadow-violet-200">
              <p className="text-xs font-medium text-violet-200">
                COMPLETED
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {completed}
              </p>
            </div>

          </div>

        </div>


        {/* ================= MAIN CARD ================= */}

        <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

          {/* ADD TASK */}

          <div className="p-5 sm:p-7">

            <div className="flex flex-col gap-3 sm:flex-row">

              <div className="relative flex-1">

                <div className="absolute left-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg bg-violet-100 text-lg font-medium text-violet-600">
                  +
                </div>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a new task..."
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-14 pr-4 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />

              </div>

              <button
                onClick={addTodo}
                className="rounded-2xl bg-gray-900 px-8 py-4 text-sm font-semibold text-white transition hover:bg-violet-600 active:scale-95"
              >
                + Add Task
              </button>

            </div>

          </div>


          {/* ================= FILTER BAR ================= */}

          <div className="flex flex-col gap-4 border-y border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">

            <div className="flex w-fit rounded-xl bg-gray-100 p-1">

              {["all", "active", "completed"].map((item) => (

                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold capitalize transition ${
                    filter === item
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

            <button
              onClick={clearCompleted}
              className="text-xs font-semibold text-gray-400 transition hover:text-red-500"
            >
              Clear completed
            </button>

          </div>


          {/* ================= TODO LIST ================= */}

          <div className="p-5 sm:p-7">

            {filteredTodos.length === 0 ? (

              <div className="flex min-h-[70] flex-col items-center justify-center">

                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-2xl text-violet-600">
                  ✓
                </div>

                <h2 className="font-semibold text-gray-800">
                  No tasks found
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Add a new task to get started.
                </p>

              </div>

            ) : (

              <div className="space-y-3">

                {filteredTodos.map((todo) => (

                  <div
                    key={todo.id}
                    className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                      todo.completed
                        ? "border-gray-100 bg-gray-50"
                        : "border-gray-100 hover:border-violet-200 hover:shadow-md"
                    }`}
                  >

                    {/* CHECKBOX */}

                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition ${
                        todo.completed
                          ? "border-violet-600 bg-violet-600 text-white"
                          : "border-gray-300 bg-white hover:border-violet-500"
                      }`}
                    >

                      {todo.completed && (

                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12l4 4L19 7" />
                        </svg>

                      )}

                    </button>


                    {/* TODO TEXT */}

                    <p
                      className={`flex-1 text-sm font-medium ${
                        todo.completed
                          ? "text-gray-400 line-through"
                          : "text-gray-800"
                      }`}
                    >
                      {todo.text}
                    </p>


                    {/* DELETE */}

                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="rounded-xl p-2 text-gray-300 transition hover:bg-red-50 hover:text-red-500"
                    >

                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v5" />
                        <path d="M14 11v5" />
                      </svg>

                    </button>

                  </div>

                ))}

              </div>

            )}

          </div>


          {/* ================= FOOTER ================= */}

          <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 sm:px-7">

            <div className="flex justify-between text-xs text-gray-400">

              <span>
                {todos.length} {todos.length === 1 ? "task" : "tasks"} total
              </span>

              <span>
                {remaining} remaining
              </span>

            </div>

          </div>

        </div>


        {/* ================= BOTTOM ================= */}

        <p className="mt-6 text-center text-xs text-gray-400">
          Built with React • Tailwind CSS. Do not &copy; | Prakash singh.
        </p>

      </div>

    </div>
  );
}

export default App;

