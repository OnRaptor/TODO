import { useEffect, useState } from "react";
import TaskListItem from "../components/TaskListItem";
import { TaskDTO } from "../api";
import { orderBy } from 'lodash';
import { useApiStore } from "../store/ApiStore";
import useBus from "use-bus";
import { useTranslation } from "react-i18next";


const MainPage = () => {
    const [todos, setTodos] = useState<Array<TaskDTO>>();
    const apiClient = useApiStore(store => store.client);
    const {t} = useTranslation();

    useEffect(() => {
        loadTasks();
    }, []);

    useBus("refreshTasks", () => loadTasks(),[])

    const loadTasks = () => {
        setTodos([]);
        apiClient.tasks.getApiTasks().then((tasks) => {
            setTodos(tasks);
        });
    }

    const deleteTask = async (taskId: string) => {
        await apiClient.tasks.deleteApiTasks({taskID: taskId});
        loadTasks();
    };

    const markTask = async (task: TaskDTO) => {
        const _isCompleted = task.isCompleted;
        await apiClient.tasks.putApiTasks(
            {
                newTask: {...task, isCompleted: !_isCompleted }
            }
        );
        loadTasks();
    };

    return ( 
    <div className="px-6 mt-3 w-full">
        {orderBy(orderBy(todos, ['priority'], ['desc']), ['isCompleted'], ['asc']).map(todo => 
            <TaskListItem 
                task={todo}
                onDeleteClick={deleteTask}
                onMarkClick={markTask}
                key={todo.id}
                />
        )
        }
        {todos?.length === 0 && 
            <p className="w-full text-center">{t("OutOfTodosMessage")}</p>
        }
    </div> );
}

export default MainPage;