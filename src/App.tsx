import { Card, Checkbox, Input } from "antd";
import "./App.css";
import { useTodoStore } from "./model/todoStore";
import { useState } from "react";

function App() {
    const { todoArray, add, check } = useTodoStore();
    const [title, setTitle] = useState<string>("");

    return (
        <div className="wrapper">
            <Input
                style={{ width: 300 }}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && title !== "") {
                        add(title);
                        setTitle("");
                    }
                }}
            />
            {todoArray.map((todo, i) => (
                <Card className="card">
                    <span>{todo.title}</span>
                    <Checkbox checked={todo.isCompleted} onChange={() => check(i)} />
                </Card>
            ))}
        </div>
    );
}

export default App;
