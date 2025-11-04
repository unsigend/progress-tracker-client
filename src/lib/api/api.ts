/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface RegisterRequestDto {
  /**
   * The username of the user
   * @minLength 3
   * @maxLength 32
   */
  username: string;
  /**
   * The email of the user
   * @format email
   */
  email: string;
  /**
   * The password of the user
   * @minLength 8
   * @maxLength 128
   */
  password: string;
}

export interface AccessTokenResponseDto {
  /** The access token */
  accessToken: string;
}

export interface LoginRequestDto {
  /**
   * The email of the user
   * @format email
   */
  email: string;
  /**
   * The password of the user
   * @minLength 8
   * @maxLength 128
   */
  password: string;
}

export interface EmailCheckResponseDto {
  /** Whether the email is available */
  isAvailable: boolean;
}

export interface SendCodeRequestDto {
  /**
   * The email of the user
   * @format email
   */
  email: string;
}

export interface SendCodeResponseDto {
  /** The reset token */
  resetToken: string;
}

export interface VerifyCodeRequestDto {
  /** The code to verify */
  code: string;
  /** The reset token */
  resetToken: string;
}

export interface VerifyCodeResponseDto {
  /** Whether the code is valid */
  isValid: boolean;
}

export interface ResetPasswordRequestDto {
  /**
   * The new password
   * @minLength 8
   * @maxLength 32
   */
  password: string;
  /** The reset token */
  resetToken: string;
  /** The code to verify */
  code: string;
}

export interface FileDeleteRequestDto {
  /**
   * The URL of the file to delete
   * @format uri
   */
  url: string;
}

export interface UserCreateRequestDto {
  /** The username of the user */
  username: string;
  /**
   * The email of the user
   * @format email
   */
  email: string;
  /** The password of the user */
  password: string;
  /** The role of the user */
  role?: "ADMIN" | "USER";
  /** The avatar image file of the user */
  avatarImage?: object;
}

export interface UserResponseDto {
  /** The id of the user */
  id: string;
  /** The username of the user */
  username: string;
  /** The email of the user */
  email: string;
  /** The avatar url of the user */
  avatarUrl: string | null;
  /** The provider of the user */
  provider: string[];
  /** The role of the user */
  role: "ADMIN" | "USER";
  /**
   * The created at timestamp
   * @format date-time
   */
  createdAt: string;
  /**
   * The updated at timestamp
   * @format date-time
   */
  updatedAt: string;
}

export interface UserUpdateRequestDto {
  /** The username of the user */
  username?: string;
  /**
   * The email of the user
   * @format email
   */
  email?: string;
  /** The password of the user */
  password?: string;
  /** The role of the user */
  role?: "ADMIN" | "USER";
  /** The avatar image file of the user */
  avatarImage?: object;
}

export interface BookResponseDto {
  /** The id of the book */
  id: string;
  /** The title of the book */
  title: string;
  /** The pages of the book */
  pages: number;
  /** The author of the book */
  author: string | null;
  /** The description of the book */
  description: string | null;
  /** The ISBN10 of the book */
  ISBN10: string | null;
  /** The ISBN13 of the book */
  ISBN13: string | null;
  /** The cover URL of the book */
  coverUrl: string | null;
  /**
   * The created at of the book
   * @format date-time
   */
  createdAt: string;
  /**
   * The updated at of the book
   * @format date-time
   */
  updatedAt: string;
  /** The created by of the book */
  createdBy: string;
}

export interface BooksResponseDto {
  /** The books of the books */
  books: BookResponseDto[];
  /** The total count of the books */
  totalCount: number;
}

export interface BookCreateRequestDto {
  /** The title of the book */
  title: string;
  /** The author of the book */
  author?: string;
  /** The pages of the book */
  pages: number;
  /** The description of the book */
  description?: string;
  /** The ISBN10 of the book */
  ISBN10?: string;
  /** The ISBN13 of the book */
  ISBN13?: string;
  /** The cover image file of the book */
  coverImage?: object;
}

export interface BookUpdateRequestDto {
  /** The title of the book */
  title?: string;
  /** The author of the book */
  author?: string;
  /** The pages of the book */
  pages?: number;
  /** The description of the book */
  description?: string;
  /** The ISBN10 of the book */
  ISBN10?: string;
  /** The ISBN13 of the book */
  ISBN13?: string;
  /** The cover image file of the book */
  coverImage?: object;
}

export interface UserBookResponseDto {
  /** The id of the user book */
  id: string;
  /** The book id of the user book */
  bookId: string;
  /** The status of the user book */
  status: "IN_PROGRESS" | "COMPLETED";
  /** The current page of the user book */
  currentPage: number;
  /**
   * The start date of the user book
   * @format date-time
   */
  startDate: string | null;
  /**
   * The completed date of the user book
   * @format date-time
   */
  completedDate: string | null;
  /** The total minutes of the user book */
  totalMinutes: number;
  /** The total days of the user book */
  totalDays: number;
  /**
   * The created at of the user book
   * @format date-time
   */
  createdAt: string;
  /**
   * The updated at of the user book
   * @format date-time
   */
  updatedAt: string;
  /** The book of the user book */
  book: BookResponseDto | null;
}

export interface UserBooksResponseDto {
  /** The user books */
  userBooks: UserBookResponseDto[];
  /** The total count of the user books */
  totalCount: number;
}

export interface UserBookCreateRequestDto {
  /** The book id of the user book */
  bookId: string;
}

export interface RecordingResponseDto {
  /** The id of the recording */
  id: string;
  /** The user book id of the recording */
  userBookId: string;
  /**
   * The date of the recording
   * @format date-time
   */
  date: string;
  /** The pages of the recording */
  pages: number;
  /** The minutes of the recording */
  minutes: number;
  /** The notes of the recording */
  notes: string | null;
}

export interface RecordingsResponseDto {
  /** The recordings of the recordings */
  recordings: RecordingResponseDto[];
  /** The total count of the recordings */
  totalCount: number;
}

export interface RecordingCreateRequestDto {
  /**
   * The date of the recording
   * @format date-time
   */
  date: string;
  /** The pages of the recording */
  pages: number;
  /** The minutes of the recording */
  minutes: number;
  /** The notes of the recording */
  notes?: string;
}

export interface ReadingRecordingRequestDto {
  /**
   * The start date of the reading recording
   * @format date-time
   */
  startDate?: string;
  /**
   * The end date of the reading recording
   * @format date-time
   */
  endDate?: string;
}

export interface ReadingRecordingResponseDto {
  /** The total minutes of the reading recording */
  totalMinutes: number;
  /** The total pages of the reading recording */
  totalPages: number;
  /** The total recordings of the reading recording */
  totalRecordings: number;
}

export interface ReadingRecordingDetailRequestDto {
  /**
   * The start date of the reading recording detail
   * @format date-time
   */
  startDate?: string;
  /**
   * The end date of the reading recording detail
   * @format date-time
   */
  endDate?: string;
  /** The limit to query */
  limit?: number;
  /** The page to query */
  page?: number;
  /** The sort to query */
  sort?: string;
  /** The order to query */
  order?: "asc" | "desc";
}

export interface ReadingRecordingDetailResponseDto {
  /** The recordings of the reading recording detail */
  recordings: RecordingResponseDto[];
  /** The total count of the recordings */
  totalCount: number;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Progress Tracker API
 * @version v1
 * @license MIT (https://opensource.org/licenses/MIT)
 * @contact
 *
 * API documentation for the Progress Tracker application
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRegister
     * @summary Register a new user
     * @request POST:/api/v1/auth/register
     */
    authControllerRegister: (
      data: RegisterRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<AccessTokenResponseDto, any>({
        path: `/api/v1/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @summary Login a user
     * @request POST:/api/v1/auth/login
     */
    authControllerLogin: (data: LoginRequestDto, params: RequestParams = {}) =>
      this.request<AccessTokenResponseDto, any>({
        path: `/api/v1/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogout
     * @summary Logout a user
     * @request POST:/api/v1/auth/logout
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/logout`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerEmailCheck
     * @summary Check if an email is already in use
     * @request GET:/api/v1/auth/email-check/{email}
     */
    authControllerEmailCheck: (email: string, params: RequestParams = {}) =>
      this.request<EmailCheckResponseDto, any>({
        path: `/api/v1/auth/email-check/${email}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerGithub
     * @summary Github login entry point
     * @request GET:/api/v1/auth/login/github
     */
    authControllerGithub: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/login/github`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerGoogle
     * @summary Google login entry point
     * @request GET:/api/v1/auth/login/google
     */
    authControllerGoogle: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/login/google`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerGithubCallback
     * @summary Github callback with access token
     * @request GET:/api/v1/auth/login/github/callback
     */
    authControllerGithubCallback: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/login/github/callback`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerGoogleCallback
     * @summary Google callback with access token
     * @request GET:/api/v1/auth/login/google/callback
     */
    authControllerGoogleCallback: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/login/google/callback`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerSendCode
     * @summary Send a verify code to a user's email
     * @request POST:/api/v1/auth/verify-code/send
     */
    authControllerSendCode: (
      data: SendCodeRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<SendCodeResponseDto, any>({
        path: `/api/v1/auth/verify-code/send`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerVerifyCode
     * @summary Verify a code
     * @request POST:/api/v1/auth/verify-code/verify
     */
    authControllerVerifyCode: (
      data: VerifyCodeRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<VerifyCodeResponseDto, any>({
        path: `/api/v1/auth/verify-code/verify`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerResetPassword
     * @summary Reset a user's password
     * @request POST:/api/v1/auth/reset-password
     */
    authControllerResetPassword: (
      data: ResetPasswordRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/auth/reset-password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cloud
     * @name CloudControllerUpload
     * @summary Upload a file to the cloud
     * @request POST:/api/v1/cloud/upload
     */
    cloudControllerUpload: (
      data: {
        /** @format binary */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/cloud/upload`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cloud
     * @name CloudControllerUploadImage
     * @summary Upload an image to the cloud
     * @request POST:/api/v1/cloud/upload/image
     */
    cloudControllerUploadImage: (
      data: {
        /** @format binary */
        image: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/cloud/upload/image`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cloud
     * @name CloudControllerUploadAvatar
     * @summary Upload an avatar to the cloud
     * @request POST:/api/v1/cloud/upload/avatar
     */
    cloudControllerUploadAvatar: (
      data: {
        /** @format binary */
        avatar: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/cloud/upload/avatar`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cloud
     * @name CloudControllerDelete
     * @summary Delete a file from the cloud
     * @request DELETE:/api/v1/cloud/delete
     */
    cloudControllerDelete: (
      data: FileDeleteRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/cloud/delete`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerFindAll
     * @summary Find all users
     * @request GET:/api/v1/users
     */
    userControllerFindAll: (
      query?: {
        /** The field to query */
        field?: string;
        /** The value to query */
        value?: string;
        /** The sort to query */
        sort?: string;
        /** The order to query */
        order?: "asc" | "desc";
        /**
         * The limit to query
         * @min 1
         */
        limit?: number;
        /**
         * The page to query
         * @min 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/users`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerCreate
     * @summary Create a user
     * @request POST:/api/v1/users
     */
    userControllerCreate: (
      data: UserCreateRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<UserResponseDto, any>({
        path: `/api/v1/users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerGetCurrentUser
     * @summary Get the current user
     * @request GET:/api/v1/users/me
     */
    userControllerGetCurrentUser: (params: RequestParams = {}) =>
      this.request<UserResponseDto, any>({
        path: `/api/v1/users/me`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerUpdateCurrentUser
     * @summary Update the current user
     * @request PUT:/api/v1/users/me
     */
    userControllerUpdateCurrentUser: (
      data: UserUpdateRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<UserResponseDto, any>({
        path: `/api/v1/users/me`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerDeleteCurrentUser
     * @summary Delete the current user
     * @request DELETE:/api/v1/users/me
     */
    userControllerDeleteCurrentUser: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/users/me`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerFindById
     * @summary Find a user by id
     * @request GET:/api/v1/users/{id}
     */
    userControllerFindById: (id: string, params: RequestParams = {}) =>
      this.request<UserResponseDto, any>({
        path: `/api/v1/users/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerDelete
     * @summary Delete a user
     * @request DELETE:/api/v1/users/{id}
     */
    userControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/users/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserControllerUpdate
     * @summary Update a user
     * @request PUT:/api/v1/users/{id}
     */
    userControllerUpdate: (
      id: string,
      data: UserUpdateRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<UserResponseDto, any>({
        path: `/api/v1/users/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Book
     * @name BookControllerFindAll
     * @summary Find all books
     * @request GET:/api/v1/book
     */
    bookControllerFindAll: (
      query?: {
        /** The field to query */
        field?: string;
        /** The value to query */
        value?: string;
        /** The sort to query */
        sort?: string;
        /** The order to query */
        order?: "asc" | "desc";
        /** The limit to query */
        limit?: number;
        /** The page to query */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<BooksResponseDto, void>({
        path: `/api/v1/book`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Book
     * @name BookControllerCreate
     * @summary Create a book
     * @request POST:/api/v1/book
     */
    bookControllerCreate: (
      data: BookCreateRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<BookResponseDto, any>({
        path: `/api/v1/book`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Book
     * @name BookControllerFindRandom
     * @summary Find random books
     * @request GET:/api/v1/book/random
     */
    bookControllerFindRandom: (
      query: {
        /** The count of the books to find */
        count: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<BooksResponseDto, void>({
        path: `/api/v1/book/random`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Book
     * @name BookControllerFindById
     * @summary Find book by id
     * @request GET:/api/v1/book/{id}
     */
    bookControllerFindById: (id: string, params: RequestParams = {}) =>
      this.request<BookResponseDto, any>({
        path: `/api/v1/book/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Book
     * @name BookControllerUpdate
     * @summary Update a book
     * @request PUT:/api/v1/book/{id}
     */
    bookControllerUpdate: (
      id: string,
      data: BookUpdateRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<BookResponseDto, any>({
        path: `/api/v1/book/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Book
     * @name BookControllerDelete
     * @summary Delete a book
     * @request DELETE:/api/v1/book/{id}
     */
    bookControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/book/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserBook
     * @name UserBookControllerFindAll
     * @summary Find all user books
     * @request GET:/api/v1/user-book
     */
    userBookControllerFindAll: (
      query: {
        /** The field to query */
        field?: string;
        /** The value to query */
        value?: string;
        /** The sort to query */
        sort?: "createdAt" | "updatedAt" | "completedDate" | "startDate";
        /** The order to query */
        order?: "asc" | "desc";
        /** The limit to query */
        limit?: number;
        /** The page to query */
        page?: number;
        /**
         * The expand to query
         * @default false
         */
        expand: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserBooksResponseDto, void>({
        path: `/api/v1/user-book`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserBook
     * @name UserBookControllerCreate
     * @summary Create a user book
     * @request POST:/api/v1/user-book
     */
    userBookControllerCreate: (
      data: UserBookCreateRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<UserBookResponseDto, any>({
        path: `/api/v1/user-book`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserBook
     * @name UserBookControllerFindById
     * @summary Find a user book by id
     * @request GET:/api/v1/user-book/{id}
     */
    userBookControllerFindById: (
      id: string,
      query: {
        /**
         * The expand to query
         * @default false
         */
        expand: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserBookResponseDto, any>({
        path: `/api/v1/user-book/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserBook
     * @name UserBookControllerDelete
     * @summary Delete a user book
     * @request DELETE:/api/v1/user-book/{id}
     */
    userBookControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/user-book/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserBook
     * @name UserBookControllerFindRecordings
     * @summary Find all recordings
     * @request GET:/api/v1/user-book/{id}/recordings
     */
    userBookControllerFindRecordings: (
      id: string,
      query?: {
        /** The limit to query */
        limit?: number;
        /** The page to query */
        page?: number;
        /** The sort to query */
        sort?: string;
        /** The order to query */
        order?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<RecordingsResponseDto, void>({
        path: `/api/v1/user-book/${id}/recordings`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserBook
     * @name UserBookControllerCreateRecording
     * @summary Create a recording
     * @request POST:/api/v1/user-book/{id}/recordings
     */
    userBookControllerCreateRecording: (
      id: string,
      data: RecordingCreateRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<RecordingResponseDto, any>({
        path: `/api/v1/user-book/${id}/recordings`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserBook
     * @name UserBookControllerDeleteRecordings
     * @summary Delete recordings
     * @request DELETE:/api/v1/user-book/{id}/recordings
     */
    userBookControllerDeleteRecordings: (
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/user-book/${id}/recordings`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Statistics
     * @name StatisticsControllerGetReadingRecording
     * @summary Get the reading recording statistics
     * @request GET:/api/v1/statistics/reading-recording
     */
    statisticsControllerGetReadingRecording: (
      data: ReadingRecordingRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<ReadingRecordingResponseDto, any>({
        path: `/api/v1/statistics/reading-recording`,
        method: "GET",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Statistics
     * @name StatisticsControllerGetReadingRecordingToday
     * @summary Get the reading recording statistics for today
     * @request GET:/api/v1/statistics/reading-recording/today
     */
    statisticsControllerGetReadingRecordingToday: (
      params: RequestParams = {},
    ) =>
      this.request<ReadingRecordingResponseDto, any>({
        path: `/api/v1/statistics/reading-recording/today`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Statistics
     * @name StatisticsControllerGetReadingRecordingWeek
     * @summary Get the reading recording statistics for this week
     * @request GET:/api/v1/statistics/reading-recording/week
     */
    statisticsControllerGetReadingRecordingWeek: (params: RequestParams = {}) =>
      this.request<ReadingRecordingResponseDto, any>({
        path: `/api/v1/statistics/reading-recording/week`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Statistics
     * @name StatisticsControllerGetReadingRecordingDetail
     * @summary Get the detailed reading recording statistics
     * @request GET:/api/v1/statistics/reading-recording/detail
     */
    statisticsControllerGetReadingRecordingDetail: (
      data: ReadingRecordingDetailRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<ReadingRecordingDetailResponseDto, any>({
        path: `/api/v1/statistics/reading-recording/detail`,
        method: "GET",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Statistics
     * @name StatisticsControllerGetReadingRecordingDetailToday
     * @summary Get the detailed reading recording statistics for today
     * @request GET:/api/v1/statistics/reading-recording/detail/today
     */
    statisticsControllerGetReadingRecordingDetailToday: (
      params: RequestParams = {},
    ) =>
      this.request<ReadingRecordingDetailResponseDto, any>({
        path: `/api/v1/statistics/reading-recording/detail/today`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Statistics
     * @name StatisticsControllerGetReadingRecordingDetailWeek
     * @summary Get the detailed reading recording statistics for this week
     * @request GET:/api/v1/statistics/reading-recording/detail/week
     */
    statisticsControllerGetReadingRecordingDetailWeek: (
      params: RequestParams = {},
    ) =>
      this.request<ReadingRecordingDetailResponseDto, any>({
        path: `/api/v1/statistics/reading-recording/detail/week`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
