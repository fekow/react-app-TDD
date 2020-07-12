import React from 'react';
import 'jest-localstorage-mock';
import '@testing-library/jest-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';

import TechList from '~/components/TechListUseState';

describe('TechList Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should be able to add new tech', () => {
    const { getByText, getByTestId, getByLabelText } = render(<TechList />);

    // dispara o onChange
    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });

    fireEvent.submit(getByTestId('tech-form'));

    // fireEvent.click(getByText('Adicionar'));

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByLabelText('Tech')).toHaveValue('');
  });

  it('should store techs in storage', () => {
    let { getByTestId, getByLabelText, getByText } = render(<TechList />);

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('tech-form'));

    cleanup();

    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      'Techs',
      JSON.stringify(['Node.js'])
    );

    ({ getByTestId, getByLabelText, getByText } = render(<TechList />));

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
  });
});
