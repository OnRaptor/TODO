/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TaskPriority } from './TaskPriority';

export type TaskDTO = {
    id?: string;
    name?: string | null;
    description?: string | null;
    deadline?: string | null;
    priority?: TaskPriority;
    isCompleted?: boolean;
};
