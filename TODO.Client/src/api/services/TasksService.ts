/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeleteTaskCommand } from '../models/DeleteTaskCommand';
import type { EditTaskCommand } from '../models/EditTaskCommand';
import type { TaskDTO } from '../models/TaskDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class TasksService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns string Success
     * @throws ApiError
     */
    public postApiTasks(
requestBody?: TaskDTO,
): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/tasks',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns TaskDTO Success
     * @throws ApiError
     */
    public getApiTasks(): CancelablePromise<Array<TaskDTO>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/tasks',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public deleteApiTasks(
requestBody?: DeleteTaskCommand,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/tasks',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns TaskDTO Success
     * @throws ApiError
     */
    public putApiTasks(
requestBody?: EditTaskCommand,
): CancelablePromise<TaskDTO> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/tasks',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
