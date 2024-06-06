import { useState } from "react";
import { Badge, Form, Button } from "react-bootstrap";
import { FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateStatus, updateTodo } from "./redux/slice/todo";

export default function TodoItem({ id, name, isDone, createdAt, updatedAt, onClickRemove }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(name);

    const handleClick = () => {
        dispatch(updateStatus({ id }));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        dispatch(updateTodo({ id, name: newName }));
        setIsEditing(false);
    };

    return (
        <tr>
            <td>
                {isEditing ? (
                    <Form.Control
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                ) : (
                    <p className={`todo-item ${isDone ? "done" : ""}`}>{name}</p>
                )}
                <Badge bg="secondary">{createdAt}</Badge>
            </td>
            <td>
                <Badge bg={isDone ? "success" : "danger"}>
                    {isDone ? "Done" : "Pending"}
                </Badge>
                {isDone && <p>{updatedAt}</p>}
            </td>
            {!isDone && (
                <td>
                    <div style={{ color: "green", cursor: "pointer" }} onClick={handleClick}>
                        <FaCheck />
                    </div>
                </td>
            )}
            <td>
                {isEditing ? (
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                ) : (
                    <div style={{ color: "blue", cursor: "pointer" }} onClick={handleEdit}>
                        <FaEdit />
                    </div>
                )}
            </td>
            <td>
                <div style={{ color: "red", cursor: "pointer" }} onClick={() => onClickRemove({ id })}>
                    <FaTimes />
                </div>
            </td>
        </tr>
    );
}
