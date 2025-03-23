import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { runInAction } from "mobx";
import { toast } from "react-toastify";
import { store } from "../stores/Root";

/**
 * Represents an HTTP service for making API requests.
 */
class HttpService {
  constructor() {
    this._configureSessionStorage();
    this._configureAxiosGlobalDefaults();
  }

  /**
   * Configures the global defaults for Axios.
   * Sets the base URL and enables sending credentials with requests.
   * Handles common error responses and redirects if necessary.
   */
  private _configureAxiosGlobalDefaults(): void {
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URI;

    axios.defaults.withCredentials = true;

    axios.interceptors.response.use(
      (response) => {
        if (response.status === 200) {
          runInAction(() => {
            store.isAuthenticated = true;
          });
        }
        return response;
      },
      (error) => {
        if (error.response?.status) {
          // Handle 401 Unauthorized error
          if (error.response.status === 401) {
            runInAction(() => {
              store.isAuthenticated = false;
            });
          }
          // Handle 400, 500, and 422 errors
          else if (error.response?.status === 400 || error.response?.status === 500 || error.response?.status === 422) {
            const message = error.response?.data?.error?.message || error.response?.data?.message;
            if (message) {
              // Display error message using toast
              toast.error(message, {
                position: "top-right"
              });
            }
          }
        }

        const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

        // Handle 403 Forbidden error
        if (error.response?.status === 403) {
          // Handle UNAUTHORIZED_ADMIN_ACCESS error
          if (error.response.data?.name === "UNAUTHORIZED_ADMIN_ACCESS") {
            // Redirect to 404 error page
            window.location.replace(window.location.origin + "/error/404");
          }
          // Handle INVALID_SUBSCRIPTION error
          if (error.response.data?.name === "INVALID_SUBSCRIPTION") {
            // Display warning message using toast
            toast.warn(error.response.data?.message, {
              position: "top-right"
            });
          }
        }

        // Log unexpected errors
        if (!expectedError) {
          console.error("oneshot error: ", error);
        }

        // Reject the promise with the error
        return Promise.reject(error);
      }
    );
  }

  private _configureSessionStorage() {
    const urlParams = new URLSearchParams(window.location.search);
    const contextUserId = urlParams.get("contextUserId");
    const sessionContextUserId = sessionStorage.getItem("contextUserId");
    // Set contextUserId in session storage
    if (contextUserId && contextUserId !== sessionContextUserId) {
      sessionStorage.setItem("contextUserId", contextUserId);
    }
    if (!contextUserId && sessionContextUserId) {
      sessionStorage.removeItem("contextUserId");
    }
  }

  private _getUrl(path: string) {
    let modUrl = `/api/${path}`;
    try {
      const contextUserId = sessionStorage.getItem("contextUserId");
      if (contextUserId) {
        const fullUrl = `${axios.defaults.baseURL}${modUrl}`;
        const urlObj = new URL(fullUrl);
        const urlSearchParams = new URLSearchParams(urlObj.search);
        urlSearchParams.set("contextUserId", contextUserId);
        modUrl = urlObj.pathname + `?${urlSearchParams.toString()}`;
      }
    } catch (error) {
      console.error("getModUrl", error);
    }
    return modUrl;
  }

  async get<T>(path: string, config?: AxiosRequestConfig) {
    const response = await axios.get<T>(this._getUrl(path), config);

    return response.data;
  }

  async post<T, R>(path: string, data?: T, config?: AxiosRequestConfig) {
    const response = await axios.post<R>(this._getUrl(path), data, config);

    return response.data;
  }

  async patch<T, R>(path: string, data?: T, config?: AxiosRequestConfig) {
    const response = await axios.patch<R>(this._getUrl(path), data, config);

    return response.data;
  }

  async put<T, R>(path: string, data: T, config?: AxiosRequestConfig) {
    const response = await axios.put<R>(this._getUrl(path), data, config);

    return response.data;
  }

  async delete<R>(path: string, config?: AxiosRequestConfig) {
    const response = await axios.delete<R>(this._getUrl(path), config);

    return response.data;
  }

  async stream<T>(path: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<ReadableStream>> {
    return axios.post<ReadableStream>(this._getUrl(path), data, {
      responseType: "stream",
      ...config,
      adapter: "fetch",
      fetchOptions: {
        credentials: "include"
      }
    });
  }
}

const httpService = new HttpService();

export default httpService;
