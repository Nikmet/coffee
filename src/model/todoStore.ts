import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export type TodoType = {
    title: string;
    isCompleted: boolean;
};

type TodoState = {
    todoArray: TodoType[];
};

type TodoActions = {
    add: (title: string) => void;
    check: (index: number) => void;
};

const todoSlice: StateCreator<TodoState & TodoActions, [["zustand/devtools", never]]> = (
    set,
    get
) => ({
    todoArray: [],
    add: (title: string) => {
        const { todoArray } = get();
        set(
            { todoArray: [...todoArray, { title, isCompleted: false }] },
            false,
            `addTodo ${title}`
        );
    },
    check: (index: number) => {
        const { todoArray } = get();
        const newArrayTodo: TodoType[] = [
            ...todoArray.slice(0, index),
            { ...todoArray[index], isCompleted: !todoArray[index].isCompleted },
            ...todoArray.slice(index + 1)
        ];
        set({ todoArray: newArrayTodo }, false, `checkTodo ${index}`);
    }
});

export const useTodoStore = create<TodoState & TodoActions>()(devtools(todoSlice));
