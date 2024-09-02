import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "./features/list/listSlice";
import { RootState, AppDispatch } from "./app/store";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function App() {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const list = useSelector((state: RootState) => state.list);
  const handleAddItem = () => {
    setIsDisabled(true);
    dispatch(addItem());
  };
  const handleRemoveItem = () => {
    setIsDisabled(true);
    dispatch(removeItem());
  };

  const exitOffset = list.length >= 5 ? "40vw" : `${(5 - list.length) * 40}vw`;
  const exitDuration = list.length >= 5 ? 0.3 : (5 - list.length) * 0.3;

  return (
    <div className="App">
      <div className="buttons">
        <button disabled={isDisabled} onClick={handleAddItem}>
          Добавить
        </button>
        <button disabled={isDisabled} onClick={handleRemoveItem}>
          Удалить
        </button>
      </div>
      <div className="list-container">
        <AnimatePresence initial={false}>
          {list.map((item) => (
            <motion.div
              key={item.id}
              className="list-item"
              style={{ backgroundColor: item.color }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{
                x: exitOffset,
                transition: {
                  duration: exitDuration,
                },
              }}
              layout
              onAnimationComplete={() => setIsDisabled(false)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
