export async function fetchSampleUsers() {
  let users = [];
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    users = data.map(({ id, name, email }) => ({ id, name, email }));
  } catch (err) {
    console.error('fetchSampleUsers error:', err.message);
    users = [];
  } finally {
    console.log('fetchSampleUsers: request finished');
  }
  return users;
}

    
export function fetchSampleUsersPromise() {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => data.map(({ id, name, email }) => ({ id, name, email })))
    .catch((err) => {
      console.error('fetchSampleUsersPromise error:', err.message);
      return [];
    });
}