import { createQuery } from '@tanstack/solid-query';
import { Show } from 'solid-js';
import { fetchUsers } from './api/apiClient';

function App() {
  const query = createQuery(() => ['users'], fetchUsers);

  return (
    <div>
      <h1 class="text-2xl font-bold mb-4">Users</h1>
      <Show when={!query.isLoading} fallback={<p>Loading...</p>}>
      <ul>
        {query?.data?.map((user: any) => (
          <li key={user.id} class="mb-2">
            <h2 class="font-semibold">{user.username}</h2>
          </li>
        ))}
      </ul>
      </Show>
    </div>
  );
}

export default App
