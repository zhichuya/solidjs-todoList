/*
 * @Author: zhichuya 1830695417@qq.com
 * @Date: 2023-12-10
 * @LastEditors: zhichuya 1830695417@qq.com
 * @LastEditTime: 2024-01-07
 * @FilePath: /solidjs-todoList/src/components/Todo/TodoList/index.tsx
 * @Description: TodoList组件
 */
import {Accessor, createEffect, createSignal, splitProps, useContext} from 'solid-js';

import AddIcon from '../../../assets/add.svg';
import {TODO_STATUS_FINISH, TODO_STATUS_PENDING} from '../../../constants';
import {AppContext} from '../../../context';
import {groupList, todoList} from '../../../context/initData';
import {TAccessContextValue, TAppContext} from '../../../types';
import {TTodo} from '../../../types/index';
import EditTodo from '../EditTodo';
import style from './index.module.less';

interface Props {
    activeGroup: Accessor<number>;
}

function TodoList(props: Props) {
    const [isAddingTodo, setIsAddingTodo] = createSignal<boolean>(false);
    const [clickTodoId, setClickTodoId] = createSignal<string>('');
    const [editingTodoId, setEditingTodoId] = createSignal<string>('');
    const [showContextMenu, setShowContextMenu] = createSignal<boolean>(false);
    const [contextmenuId, setContextmenuId] = createSignal<string>('');

    const [appState, {editGroup, addGroup, deleteGroup, editTodo}] = useContext(AppContext) as TAppContext;

    const currGroup = () => {
        return appState().groupList[props.activeGroup()];
    };

    // 判断是否todo完成
    const isFinished = (todo: TTodo) => {
        return todo.status == TODO_STATUS_FINISH;
    };

    // 改变 todo的状态 => 返回改变后的 todo
    const handleChangeTodoStatus = (
        e: Event & {currentTarget: HTMLInputElement; target: Element},
        oldTodo: TTodo
    ): TTodo => {
        const target = e.target;
        const checked = (target as HTMLInputElement).checked;
        let status = checked ? TODO_STATUS_FINISH : TODO_STATUS_PENDING;
        let newTodo = {
            ...oldTodo,
            status
        };

        return newTodo;
    };

    // 编辑todo
    const handleEditTodo = (oldTodo: TTodo, newTodo: TTodo) => {
        editTodo(oldTodo, newTodo);
        setEditingTodoId('');
    };

    // 根据 todo 的状态计算 className
    const computeClassName = (todo: TTodo) => {
        let className = '';
        if (todo.status == TODO_STATUS_PENDING) {
            className = style.todoPending;
        } else if (todo.status == TODO_STATUS_FINISH) {
            className = style.todoFinish;
        }

        return className;
    };

    return (
        <div class={style.todoListContainer}>
            {/* todoList 头部区域 */}
            <div class={style.header}>
                <div class={style.title}>{currGroup().title || '默认'}</div>
                <div class={style.operationContainer}>
                    <img
                        class={style.operationAddIcon}
                        src={AddIcon}
                        onClick={() => {
                            setIsAddingTodo(true);
                        }}
                    />
                </div>
            </div>
            {/* todoList 渲染区域 */}
            <div class={style.todoList}>
                {appState().todoList.map((todo, idx) => {
                    if (todo.groupId !== currGroup().id) {
                        return <></>;
                    }

                    return (
                        <div
                            class={todo.id !== clickTodoId() ? style.todoItem : `${style.todoItem}, ${style.clickTodo}`}
                            onClick={() => {
                                // setClickTodoId(todo.id);
                            }}
                            onDblClick={() => {
                                setEditingTodoId(todo.id);
                            }}
                            onContextMenu={() => {
                                setShowContextMenu(true);
                                setContextmenuId(todo.id);
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={isFinished(todo)}
                                class={style.checkbox}
                                onChange={e => {
                                    const newTodo = handleChangeTodoStatus(e, todo);
                                    handleEditTodo(todo, newTodo);
                                }}
                            />
                            {editingTodoId() !== todo.id ? (
                                <div class={`${style.todoText}` + computeClassName(todo)}>{todo.text}</div>
                            ) : (
                                <div class={style.todoText}>
                                    <EditTodo
                                        isFocused={true}
                                        value={todo.text}
                                        onChange={(text: string) => {
                                            const newTodo = {
                                                ...todo,
                                                text
                                            };

                                            handleEditTodo(todo, newTodo);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TodoList;
