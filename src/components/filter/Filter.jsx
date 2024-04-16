import { useState } from 'react';
import css from './Filter.module.css';

export const Filter = ({ setQuery }) => {
  const [value, setValue] = useState('');

  const onChange = e => {
    setValue(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    setQuery(value);
    setValue('');
  };

  return (
    <form onSubmit={e => onSubmit(e)} className={css.form}>
      <input type="text" value={value} onChange={e => onChange(e)} />
      <button type="submit">Search</button>
    </form>
  );
};
