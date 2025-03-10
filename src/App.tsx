import { createQuery } from '@tanstack/solid-query';
import { createSignal, Show, For, onCleanup, createMemo } from 'solid-js';
import { fetchUsers } from './api/apiClient';
import { Card } from './Card';

function App() {
  const [error, setError] = createSignal<string | null>(null);
  const [currentPage, setCurrentPage] = createSignal(1);
  const [itemsPerPage, setItemsPerPage] = createSignal(4);

  const query = createQuery<any, Error>(() => ['users', currentPage(), itemsPerPage()], 
    () => fetchUsers(currentPage(), itemsPerPage()), {
    onError: (err: Error) => {
      console.error('Error fetching users:', err);
      setError(`Ошибка при загрузке пользователей: ${err.message}`);
      alert(`Произошла ошибка: ${err.message}`);
    },
  });

  const totalPages = () => query.data ? Math.ceil(query.data.total / itemsPerPage()) : 0;

  const nextPage = () => {
    if (currentPage() < totalPages()) {
      setCurrentPage(currentPage() + 1);
    }
  };

  const prevPage = () => {
    if (currentPage() > 1) {
      setCurrentPage(currentPage() - 1);
    }
  };

  const changeItemsPerPage = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const refreshData = () => {
    query.refetch();
  };

  // Автоматическое обновление каждые 10 минут
  const autoRefreshInterval = setInterval(() => {
    refreshData();
  }, 10 * 60 * 1000);

  // Очистка интервала при размонтировании компонента
  onCleanup(() => clearInterval(autoRefreshInterval));

  const generateRandomStatuses = createMemo(() => {
    console.log('Generating random statuses...');
    return query.data?.users.map(() => Math.floor(Math.random() * 4) + 1) || [];
  });

  return (
    <div class='p-5'>
      <h1 class="text-2xl font-bold mb-4">Card</h1>
      <div class="mb-4 flex justify-between items-center">
        <div>
          <span class="mr-2">Элементов на странице:</span>
          <select 
            value={itemsPerPage()} 
            onChange={(e) => changeItemsPerPage(parseInt(e.currentTarget.value))}
            class="border rounded p-1 bg-white"
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>
        <button 
          onClick={refreshData}
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Обновить
        </button>
      </div>
      <div>
          {error() && <span class="text-red-500">{error()}</span>}
      </div>
      <Show
        when={!query.isLoading}
        fallback={
          <div class="flex items-center justify-center space-x-2 h-20">
            <div class="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            <div class="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-150"></div>
            <div class="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-300"></div>
          </div>
        }
      >
        <ul class='flex flex-wrap gap-5'>
          <For each={query.data?.users}>
            {(user, index) => {
              const status = () => generateRandomStatuses()[index()];
              return (
                <li id={user.id} class="mb-2 animate-lift-slow">
                  <Card userId={user.id} user={user.name} web={user.website} status={status()}></Card>
                </li>
              );
            }}
          </For>
        </ul>
        <div class="mt-4 flex justify-between items-center">
          <button 
            onClick={prevPage} 
            disabled={currentPage() === 1}
            class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Предыдущая
          </button>
          <span>Страница {currentPage()} из {totalPages()}</span>
          <button 
            onClick={nextPage} 
            disabled={currentPage() === totalPages()}
            class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Следующая
          </button>
        </div>
      </Show>
    </div>
  );
}

export default App;