export const httpClient = async (path: string, options?: RequestInit) => {
  const token = sessionStorage.getItem("token");
  console.log(sessionStorage.getItem("token"));

  const response = await fetch(path, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (response.status === 401) {
    alert("Пользователь неавторизован");
  } else if (response.status === 403) {
    alert("Доступ запрещен");
  } else if (!response.ok) {
    alert("Произошла ошибка");
  }

  return response;
};
