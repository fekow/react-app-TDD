import React from 'react';
import 'jest-localstorage-mock';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import TechList from '~/components/TechListUseSelector';

import { addTech } from '~/store/modules/techs/actions';

jest.mock('react-redux');
// nao preciso testar a resposta do meu estado do redux, apenas testo a
// renderização do componente com esses dados
// pra testar o proprio reducer com store e provider rodando seria teste de integração.
describe('Techlist Redux', () => {
  it('Should read state and create tech list.', () => {
    useSelector.mockImplementation(cb =>
      cb({
        techs: ['Node.js', 'ReactJS'],
      })
    );

    const { getByText, getByTestId } = render(<TechList />);

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
  });

  it('should be able to add an tech using dispatch', () => {
    const { getByLabelText, getByTestId } = render(<TechList />);

    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });

    fireEvent.submit(getByTestId('tech-form'));

    expect(dispatch).toHaveBeenCalledWith(addTech('Node.js'));
  });
});
