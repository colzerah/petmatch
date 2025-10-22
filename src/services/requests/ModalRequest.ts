import api from '../../services/api';

export interface ITodosResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const requestTodos = async (): Promise<ITodosResponse | undefined> => {
  console.log('TESTE1');
  try {
    const response = await api.get(`https://www.boredapi.com/api/activity`);
    console.log('TESTE', response);

    return response.data;
  } catch (err) {
    console.log('ERROR', err);
    return undefined;
  }
};
