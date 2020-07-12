/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect } from 'react';

// import { Container } from './styles';

function TechList() {
  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('Techs'));
    if (data) {
      setTechs(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('Techs', JSON.stringify(techs));
  }, [techs]);

  function handleAddTech() {
    setTechs([...techs, newTech]);
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
