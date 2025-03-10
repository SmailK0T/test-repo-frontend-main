import { createQuery } from '@tanstack/solid-query';
import { createEffect, createSignal, Show, For } from 'solid-js';
import { fetchUsers } from './api/apiClient';
import { Card } from './Card';

function App() {
  const [error, setError] = createSignal<string | null>(null);
  const [currentPage, setCurrentPage] = createSignal(1);
  const [itemsPerPage, setItemsPerPage] = createSignal(4);
  const [displayedUsers, setDisplayedUsers] = createSignal([]);

  const query = createQuery<any, Error>(() => ['users'], fetchUsers, {
    onError: (err: Error) => {
      console.error('Error fetching users:', err);
      setError(`Ошибка при загрузке пользователей: ${err.message}`);
      alert(`Произошла ошибка: ${err.message}`);
    },
  });

  createEffect(() => {
    if (query.data) {
      const startIndex = (currentPage() - 1) * itemsPerPage();
      const endIndex = startIndex + itemsPerPage();
      setDisplayedUsers(query.data.slice(startIndex, endIndex));
    }
  });

  const totalPages = () => query.data ? Math.ceil(query.data.length / itemsPerPage()) : 0;

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

  return (
    <div class='p-5'>
      <h1 class="text-2xl font-bold mb-4">Card</h1>
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
          <For each={query.data}>
            {(user, index) => (
              <li id={user.id} class="mb-2 animate-lift-slow" style={`animation-delay: ${index() * 50}ms`}>
                <Card user={user.name}></Card>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
}

export default App;