async function loginUser(data: {
  username: string;
  password: string;
}): Promise<Response> {
  const response = await fetch(`/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function registerUser(data: {
  username: string;
  password: string;
}): Promise<User> {
  const response = await fetch(`/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  return await response.json();
}

export { loginUser, registerUser };

export interface Response {
  id: number;
  roles: string[];
  token: string;
}

export interface User {
  userId: number;
  username: string;
  password: string;
  updatedAt: string;
  createdAt: string;
}
