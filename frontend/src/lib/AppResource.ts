import { AxiosError } from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { IAsyncResourceStatus } from "../../types";

interface IAsyncResourceCallbacks<T> {
  fulfilled?: (data: T) => void;
  pending?: () => void;
  rejected?: (error: any) => void;
}

interface IAsyncResourceConstrutor<T, T1> {
  dataGetter: () => Promise<T>;
  callbacks?: IAsyncResourceCallbacks<T>;
  metadata?: T1;
}

type IUpdateWithPrevFn<T> = (prev: T) => T;

/**
 * Represents an asynchronous resource.
 * @template T - The type of the response.
 * @template T1 - The type of the metadata.
 */
export default class AppResource<TResponse, TMetadata = any> {
  public status?: IAsyncResourceStatus;
  public response: TResponse | null = null;
  public error: any = null;
  public metadata?: TMetadata;
  private resourceObject:
    | {
        silent: boolean;
        resource: Promise<void>;
      }
    | undefined;
  private dataGetter!: () => Promise<TResponse>;
  private callbacks?: IAsyncResourceCallbacks<TResponse>;

  /**
   * Constructs an AsyncResource instance.
   */
  constructor(initData: IAsyncResourceConstrutor<TResponse, TMetadata>) {
    makeAutoObservable(this);

    if (!initData.dataGetter) {
      throw new Error("promise or dataGetter must be provided.");
    }

    this.dataGetter = initData.dataGetter;
    this.metadata = initData.metadata;
    this.callbacks = initData.callbacks;
  }

  private _initResourceObject(
    options: { silent: boolean } = { silent: false }
  ) {
    this.status = "pending";
    // Call the onPending callback if provided
    this.callbacks?.pending?.();

    if (!options.silent) {
      this.error = null;
      this.response = null;
    }

    // Assign the promise to the suspender and handle its resolution and rejection
    this.resourceObject = {
      silent: options.silent,
      resource: this.dataGetter()
        .then((res) => {
          runInAction(() => {
            this.status = "fulfilled";
            this.response = res;
            this.callbacks?.fulfilled?.(res);
          });
        })
        .catch((err) => {
          if (options.silent) return;
          runInAction(() => {
            this.status = "rejected";
            this.error = err;
            this.callbacks?.rejected?.(err);
          });
        }),
    };

    return this;
  }

  private get suspender() {
    if (!this.resourceObject) {
      this._initResourceObject();
    }
    return this.resourceObject!;
  }

  /**
   * @description Refreshes the resource by re-executing the dataGetter function.
   */
  public refresh() {
    return this._initResourceObject();
  }

  /**
   * @description Refreshes the resource silently(without suspending) by re-executing the dataGetter function.
   */
  public refreshSilent() {
    return this._initResourceObject({ silent: true });
  }

  /**
   * Used in React Suspense enabled components. Reads the current state of the resource.
   * @returns The response data if the request was successful.
   * @throws The suspender promise if the request is still pending.
   * @throws The error if the request failed.
   */
  suspend() {
    const suspender = this.suspender;
    switch (this.status) {
      case "pending":
        if (suspender.silent) {
          // If silent and has existing data, return the data
          if (this.response) {
            return this.response;
          } else {
            // If silent and no data, return
            return;
          }
        }
        // If not silent, throw the suspender
        throw suspender.resource; // Suspense will handle this
      case "rejected":
        // TODO: AsyncResource may not be the right place to handle this
        if (this.error instanceof AxiosError) {
          if (this.error.response?.status === 401) {
            return null;
          }
        }
        throw this.error; // ErrorBoundary will handle this
      default:
        return this.response; // Return the response if successful
    }
  }

  /**
   * Asynchronously gets the data of the resource. Can be used in non-Suspense components
   * @returns A promise that resolves to the response data or null.
   * @throws The error if the request failed.
   */
  public async fetch(): Promise<TResponse | null> {
    const suspender = this.suspender;
    if (this.status === "pending") {
      await suspender.resource;
    }
    if (this.status === "rejected") {
      throw this.error;
    }
    return this.response;
  }

  /**
   * Makes the instance awaitable. When you `await` an instance of `AsyncResource`,
   * this method will be called, and it will delegate to the `fetch` method.
   */
  then<TResult1 = TResponse, TResult2 = never>(
    onfulfilled?:
      | ((value: TResponse | null) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2> {
    return this.fetch().then(onfulfilled, onrejected);
  }

  /**
   * Makes the instance awaitable. When you `await` an instance of `AsyncResource`,
   * this method will be called, and it will delegate to the `fetch` method.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | PromiseLike<TResult>)
      | undefined
      | null
  ): Promise<TResponse | TResult | null> {
    return this.fetch().catch(onrejected);
  }

  // Sets the data directly, giving the ability to access current data
  setData(update: IUpdateWithPrevFn<TResponse> | TResponse): TResponse {
    runInAction(() => {
      if (this.response) {
        if (typeof update === "function") {
          this.response = (update as IUpdateWithPrevFn<TResponse>)(
            this.response
          );
        } else {
          this.response = update;
        }
      }
    });
    return this.response!;
  }

  // Updates only the given fields instead of the whole object
  updateData(data: Partial<TResponse>): TResponse {
    runInAction(() => {
      Object.keys(data).forEach((k) => {
        const key = k as keyof TResponse;
        if (this.response) {
          this.response[key] = data[
            key
          ] as NonNullable<TResponse>[keyof TResponse];
        }
      });
    });
    return this.response!;
  }
}
