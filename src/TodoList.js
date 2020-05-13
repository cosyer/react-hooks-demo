import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useRef,
} from "react";
import TodoForm from "./TodoForm";

const ThemeContext = React.createContext("zh-CN");

function Context() {
  const local = useContext(ThemeContext);
  return <p>local: {local}</p>;
}

const App = () => {
  // useState
  const [todos, setTodos] = useState([]);

  const [count, setCount] = useState(0);

  // useRef
  const countRef = useRef(count);

  const [width, setWidth] = useState(window.innerWidth);

  const toggleComplete = (i) =>
    setTodos(
      todos.map((todo, k) =>
        k === i
          ? {
              ...todo,
              complete: !todo.complete,
            }
          : todo
      )
    );

  // useEffect
  useEffect(() => {
    // 每次渲染时值都是固定的 渲染count的话 而useRef会返回最新的对象
    countRef.current = count;
    setTimeout(() => {
      console.log(`You clicked ${countRef.current} times`);
    }, 3000);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  // useContext
  const local = useContext(ThemeContext);

  // useReducer
  const [reducerCount, dispatch] = useReducer((state) => state + 1, 0);

  const INCREASE = "INCREASE";
  const SET_FROZEN = "SET_FROZEN";

  const reducer = (state, action) => {
    switch (action.type) {
      case INCREASE:
        if (state.frozen) {
          return state;
        }
        return {
          ...state,
          count: state.count + 1,
        };

      case SET_FROZEN:
        return {
          ...state,
          frozen: action.frozen,
        };
      default:
        return state;
    }
  };
  const [obj, dispath] = useReducer(reducer, {
    count: 0,
    frozen: false,
  });

  useEffect(() => {
    dispath({ type: INCREASE });
    dispath({ type: SET_FROZEN, frozen: true });
    dispath({ type: INCREASE });
  }, []);

  // useRef
  const inputRef = useRef(null);

  const handleFocusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <div>
        <span className="label label-primary">useState</span>
        <TodoForm
          onSubmit={(text) => setTodos([{ text, complete: false }, ...todos])}
        />
        <div className="list">
          {todos.map(({ text, complete }, i) => (
            <div
              key={text}
              onClick={() => toggleComplete(i)}
              style={{ textDecoration: complete ? "line-through" : "" }}
            >
              {text}
            </div>
          ))}
        </div>
        <button className="btn btn-success" onClick={() => setTodos([])}>
          reset
        </button>
        <p>You clicked {count} times</p>
        <button
          className="btn btn-danger"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          click
        </button>
      </div>
      <hr />
      <div>
        <span className="label label-primary">useEffect</span>
        <p>the innerWidth is {width}px</p>
      </div>
      <hr />
      <div>
        <span className="label label-primary">useContext</span>
        <p>the context is {local}</p>
        <ThemeContext.Provider value={"🇺🇸"}>
          <Context />
        </ThemeContext.Provider>
      </div>
      <hr />
      <div>
        <span className="label label-primary">useReducer</span>
        <p>reducer count is {reducerCount}</p>
        <button
          className="btn btn-danger"
          onClick={() => {
            dispatch();
          }}
        >
          click
        </button>
        <p>current reducer state is {obj.count} </p>
      </div>
      <hr />
      <div>
        <span className="label label-primary">useRef</span>
        <input ref={inputRef} />
        <button className="btn btn-danger" onClick={handleFocusInput}>
          click focus
        </button>
      </div>
    </div>
  );
};

export default App;
