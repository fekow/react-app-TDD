/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTech } from '~/store/modules/techs/actions';

function TechList() {
  const [newTech, setNewTech] = useState('');
  const dispatch = useDispatch();

  const techs = useSelector(state => state.techs);

  function handleAddTech() {
    dispatch(addTech(newTech));
    setNewTech('');
  }

  return (
    <form onSubmit={handleAddTech} data-testid="tech-form">
      <ul data-testid="tech-list">
        {techs.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <label htmlFor="tech">Tech</label>
      <input
        type="text"
        id="tech"
        value={newTech}
        onChange={e => setNewTech(e.target.value)}
      />
      <button type="button" onClick={handleAddTech}>
        Adicionar
      </button>
    </form>
  );
}

export default TechList;
