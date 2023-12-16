import { Card, CardHeader, Button, Divider, CardBody, CardFooter, Accordion, AccordionItem } from "@nextui-org/react";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { TaskDTO } from "../api";
import { dispatch } from "use-bus";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface Props{
    task:TaskDTO;
    onDeleteClick: (taskId:string) => void;
    onMarkClick: (task:TaskDTO) => void;
}

const TaskListItem = ({task, onDeleteClick, onMarkClick}: Props) => {
    const {t} = useTranslation();

    return ( 
        <Accordion className={`w-full mb-3 ${task.isCompleted && 'dark:bg-green-950 light:bg-green-300 '}`} variant="bordered">
            <AccordionItem 
                className="max-w-full"
                title={<p className="truncate">{task.name}</p>}
                subtitle={
                    <div className="flex gap-2">
                        <p>{t("PriorityLabel")} {
                            (() : ReactNode => {
                                if (task.priority === 0)
                                    return t("LowStatus");
                                else if (task.priority === 1)
                                    return t("MediumStatus")
                                else if (task.priority === 2)
                                        return t("HighStatus");
                            })()
                        }
                        </p>
                        {task.deadline &&
                            <p>✱ {t("")} {new Date(task.deadline ?? "").toLocaleString()}</p>
                        }
                    </div>
                }>
                <div className="flex flex-col gap-3">
                    <p className="text-gray-500 max-h-36 overflow-hidden text-ellipsis">{task.description ?? ""}</p>
                    <Divider/>
                    <div className='gap-2 flex'>
                        <Button color={task.isCompleted ? "danger" : "success"} onClick={()=> onMarkClick(task)} className="m-0" size="md" variant="light" isIconOnly>
                                {
                                    task.isCompleted ?
                                    <IoClose/> :
                                    <IoCheckmarkSharp/>
                                }
                        </Button>
                        <Button onClick={() => dispatch({type:"showEditTask", task: task})} className="m-0" size="md" variant="light" color="warning" isIconOnly>
                                <MdModeEditOutline/>
                        </Button>
                        <Button onClick={()=> onDeleteClick(task.id)} className="m-0" size="md" variant="light" isIconOnly color="danger">
                                <MdDelete/>
                        </Button>
                    </div>
                </div>
            </AccordionItem>
        </Accordion>
    );
}
 
export default TaskListItem;