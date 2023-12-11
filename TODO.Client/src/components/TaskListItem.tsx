import { Card, CardHeader, Button, Divider, CardBody, CardFooter, Accordion, AccordionItem } from "@nextui-org/react";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { TaskDTO } from "../api";
import { dispatch } from "use-bus";

interface Props{
    task:TaskDTO;
    onDeleteClick: (taskId:string) => void;
    onMarkClick: (task:TaskDTO) => void;
}

const TaskListItem = ({task, onDeleteClick, onMarkClick}: Props) => {
    //const [isHovering, setIsHovering] = useState(false);

    return ( 
        <Accordion className={`mb-3 ${task.isCompleted && 'dark:bg-green-950 light:bg-green-300 '}`} variant="bordered">
            <AccordionItem 
                title={task.name}
                subtitle={
                    <div className="flex gap-2">
                        <p>Priority: {task.priority?.toString()}</p>
                        {task.deadline &&
                            <p>✱ Deadline: {new Date(task.deadline ?? "").toLocaleString()}</p>
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
    // <Card 
    //     className={`mt-2 w-full 
    //         ${task.isCompleted && 'bg-green-800'} 
    //         ${(task.priority === 2 && !task.isCompleted) && 'bg-blue-500'}
    //         ${(task.priority === 0 && !task.isCompleted) && 'bg-blue-700'}
    //         `
    //     }
    //     onMouseOver={() => setIsHovering(true)}
    //     onMouseLeave={() => setIsHovering(false)}
    // >
    //     <CardHeader className="flex justify-between items-center h-10 m-2">
    //         <p className="text-xl">
    //             {task.name}
    //         </p>
    //         {isHovering &&
    //             <div className='gap-2 flex'>
    //                 <Button onClick={()=> onMarkClick(task)} className="m-0" size="md" variant="light" color="success" isIconOnly>
    //                     <IoCheckmarkSharp/>
    //                 </Button>
    //                 <Button className="m-0" size="md" variant="light" color="warning" isIconOnly>
    //                     <MdModeEditOutline/>
    //                 </Button>
    //                 <Button onClick={()=> onDeleteClick(task.id)} className="m-0" size="md" variant="light" isIconOnly color="danger">
    //                     <MdDelete/>
    //                 </Button>
    //             </div>
    //         }
    //     </CardHeader>
    //     <Divider/>
    //     <CardBody className="pb-0">
    //         <p className="overflow-hidden max-h-12 text-gray-400">
    //             {task.description}
    //         </p>
    //     </CardBody>
    //     <CardFooter className="flex justify-end p-0 px-5">
    //         <p className="text-sm text-gray-400">Deadline: {task.deadline}</p>
    //     </CardFooter>
    // </Card>
    );
}
 
export default TaskListItem;