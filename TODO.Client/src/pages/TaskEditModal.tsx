import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Textarea, Tooltip, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import useBus, { dispatch } from "use-bus";
import { useApiStore } from "../store/ApiStore";
import { ApiError } from "../api/core/ApiError";
import { TaskDTO } from "../api";
import { useTranslation } from "react-i18next";

const TaskEditModal = () => {
    const {isOpen,onOpen,onOpenChange, onClose} = useDisclosure();
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [mark, setMark] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [priority, setPriority] = useState<string>("0");
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [uuid, setUuid] = useState<string>("");
    const apiClient = useApiStore(store => store.client); 
    const {t} = useTranslation();


    useBus(
        'showCreateTask',
        () => {
            onOpen();
            setError("");
            setIsEditing(false);
            setTitle(undefined);
            setDescription(undefined);
            setPriority("0");
            setDate(undefined);
            setTime(undefined);
            setMark(false);
            setUuid(undefined);
        },
        [isOpen]
    )

    useBus(
        'showEditTask',
        (e) => loadTask(e["task"]),
        [isOpen]
    )
    
    const loadTask = (task:TaskDTO) => {
        console.log(task);
        setIsEditing(true);
        setTitle(task.name);
        setDescription(task.description);
        setPriority(task.priority?.toString());
        setDate(new Date(task.deadline).toISOString().split('T')[0]);
        setTime(new Date(task.deadline).toLocaleTimeString());
        setMark(task.isCompleted);
        setUuid(task.id);
        setError("");
        onOpen();
    }

    const createTask = async () =>{
        let datetime = undefined;
        if (date?.length > 0 && time?.length > 0)
            datetime = new Date(date + ", " + time).toISOString();
        await apiClient.tasks.postApiTasks({
            name: title,
            description: description,
            deadline: datetime,
            isCompleted: mark,
            priority: Number.parseInt(priority)
        });
    }
    const editTask = async () => {
        let datetime = undefined;
        if (date?.length > 0 && time?.length > 0)
            datetime = new Date(date + ", " + time).toISOString();
        await apiClient.tasks.putApiTasks({
            newTask: {
                name: title,
                description: description,
                deadline: datetime,
                isCompleted: mark,
                priority: Number.parseInt(priority),
                id: uuid
            }
        });
    }

    const saveFn = async () =>{
        try{
            if (checkDate(new Date(date + ", " + time))) 
            {
                setError("Invalid date");
                return;
            }

            if (isEditing)
                await editTask();
            else
                await createTask();

            onClose();
            dispatch("refreshTasks");
        }
        catch(e){
            console.log(e);
            if (e instanceof ApiError) {
                setError("Error occured: " + e.message);
            }
        }
    }

    const deleteTaskFn = async () => {
        await apiClient.tasks.deleteApiTasks({taskID: uuid});
        dispatch("refreshTasks");
        onClose();
    };

    const checkDate = (date) => {
        return new Date().getTime() > date.getTime();
    }

    return ( 
    <>
        <Modal 
            isOpen={isOpen}
            isDismissable={false} 
            scrollBehavior={"outside"}
            onOpenChange={onOpenChange}
            closeButton={<></>}
            classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
              }}
            >
            <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-3">
                        <p>
                            ToDo
                        </p>
                        <Input
                            label={t('TitleLabel')}
                            value={title}
                            variant="flat"
                            onChange={e => setTitle(e.target.value)}
                        />
                    </ModalHeader>
                    <ModalBody>
                    <RadioGroup
                          label={t('PriorityLabel')}
                          orientation="horizontal"
                          value={priority}
                          onValueChange={setPriority}
                        >
                          <Radio value="0">{t("LowStatus")}</Radio>
                          <Radio value="1">{t("MediumStatus")}</Radio>
                          <Radio value="2">{t("HighStatus")}</Radio>
                        </RadioGroup>
                        <div className="flex gap-3">
                            <Input 
                                variant="flat"
                                type="date"
                                label={t("DeadlineDateLabel")}
                                value={date}
                                onValueChange={setDate}
                            />

                            <Input 
                                variant="flat"
                                type="time"
                                label={t("DeadlineTimeLabel")}
                                value={time}
                                onValueChange={setTime}
                            />
                        </div>
                        <Textarea
                            label={t('DescriptionLabel')}
                            variant="flat"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        /> 
                        <p className="text-red-600">{error}</p>                   
                    </ModalBody>
                    <Divider/>
                    <ModalFooter className="flex justify-between">
                        <div className="gap-1 flex">
                            {isEditing && 
                            <>
                                {!mark ? 
                                    (
                                    <Button onClick={() => setMark(true)} color="success" isIconOnly variant="shadow">
                                        <IoCheckmarkSharp/>
                                    </Button>
                                    )
                                    :
                                    (
                                    <Tooltip showArrow content="Unmark">
                                        <Button onClick={() => setMark(false)} color="warning" isIconOnly variant="flat">
                                            <IoClose/>
                                        </Button>
                                    </Tooltip>
                                    )
                                }
                                <Button onClick={deleteTaskFn} color="danger" isIconOnly variant="flat">
                                    <MdDelete/>
                                </Button>
                            </>
                            }
                        </div>
                        <div className="gap-1 flex">
                            <Button onClick={saveFn} color="primary" variant="solid">{t('SaveBtn')}</Button>
                            <Button color="secondary" onPress={onClose} variant="light">{t('DiscardBtn')}</Button>
                        </div>
                    </ModalFooter>
                </>
                )}
            </ModalContent>
            
            
        </Modal>
    </>
    );
}
 
export default TaskEditModal;