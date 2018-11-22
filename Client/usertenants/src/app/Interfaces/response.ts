//the response returned from the server
interface serverResponse<T> {
  item: T
  error: string;
}