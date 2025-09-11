import apiClient from "./apiClient";

export default class AbstractApi {
  protected get<T>(url: string, params?: object) {
    return apiClient.get<T>(url, { params }).then((res) => res.data);
  }

  protected post<T>(url: string, data?: object) {
    return apiClient.post<T>(url, data).then((res) => res.data);
  }

  protected put<T>(url: string, data?: object) {
    return apiClient.put<T>(url, data).then((res) => res.data);
  }

  protected delete<T>(url: string) {
    return apiClient.delete<T>(url).then((res) => res.data);
  }
}
