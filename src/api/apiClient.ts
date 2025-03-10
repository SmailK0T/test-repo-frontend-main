import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchUsers = async (page: number, limit: number) => {
  try {
    const start = (page - 1) * limit;
    const response = await apiClient.get(`/users?_start=${start}&_limit=${limit}`);
    const totalCount = parseInt(response.headers['x-total-count'] || '0', 10);
    return {
      users: response.data,
      total: totalCount
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error('Неизвестная ошибка при загрузке пользователей');
  }
};