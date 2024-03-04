import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchIds, fetchItems } from './store/redusers/ActionCreator';

function App() {
  const dispatch = useAppDispatch();
  const { isLoading, items } = useAppSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchIds(0)).then(() => {
      dispatch(fetchItems());
    });
  }, []);

  if (isLoading) {
    return <h1>Идет загрузка...</h1>;
  }

  return (
    <div className='App'>
      {items.map((item) => (
        <span key={item.id}>{item.price}</span>
      ))}
    </div>
  );
}

export default App;
