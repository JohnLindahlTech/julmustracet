export class HttpError extends Error {
  name: string;
  statusCode: number;
  data: unknown;
  rootError: Error;

  constructor(
    message: string,
    statusCode: number,
    data: unknown,
    rootError?: Error
  ) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.data = data;
    this.rootError = rootError;
  }
}

export async function http(
  url: RequestInfo,
  opts?: RequestInit
): Promise<unknown> {
  const res = await fetch(url, opts);
  const data = await res.json();
  if (!res.ok) {
    throw new HttpError(res.statusText, res.status, data);
  }
  return data;
}

export async function sendData(
  method: string,
  url: string,
  data: unknown
): Promise<unknown> {
  return http(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function postData(url: string, data: unknown): Promise<unknown> {
  return sendData("POST", url, data);
}

export async function patchData(url: string, data: unknown): Promise<unknown> {
  return sendData("PATCH", url, data);
}

export async function putData(url: string, data: unknown): Promise<unknown> {
  return sendData("PUT", url, data);
}
