/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthUserCommand } from '../models/AuthUserCommand';
import type { RegisterUserCommand } from '../models/RegisterUserCommand';
import type { UserDTO } from '../models/UserDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns string Success
     * @throws ApiError
     */
    public postApiRegister(
requestBody?: RegisterUserCommand,
): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns string Success
     * @throws ApiError
     */
    public postApiLogin(
requestBody?: AuthUserCommand,
): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns UserDTO Success
     * @throws ApiError
     */
    public getApiUserinfo(): CancelablePromise<UserDTO> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/userinfo',
        });
    }

}
