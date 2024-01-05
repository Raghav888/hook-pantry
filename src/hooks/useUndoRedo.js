import { useState } from 'react';

export const useUndoRedo = (initialState) => {
  const [state, setState] = useState(initialState);
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);

  const undo = () => {
    if (past.length > 0) {
      const previousState = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      setPast(newPast);
      setFuture([state, ...future]);
      setState(previousState);
    }
  };

  const redo = () => {
    if (future.length > 0) {
      const nextState = future[0];
      const newFuture = future.slice(1);

      setPast([...past, state]);
      setFuture(newFuture);
      setState(nextState);
    }
  };

  const updateState = (newState) => {
    setPast([...past, state]);
    setFuture([]);
    setState(newState);
  };

  return {
    state,
    undo,
    redo,
    updateState,
  };
};
