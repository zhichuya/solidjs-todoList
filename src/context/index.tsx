/*
 * @Author: zhichuya 1830695417@qq.com
 * @Date: 2023-12-09
 * @LastEditors: zhichuya 1830695417@qq.com
 * @LastEditTime: 2023-12-10
 * @FilePath: /solidjs-todoList/src/context/index.tsx
 * @Description: 统一的状态管理
 */
import {ParentProps, createContext, createSignal} from 'solid-js';

import {TAppContext, TContextValue, TGroup, TTodo} from '../types';
import {groupList, todoList} from './initData';

export const AppContext = createContext<TAppContext>();

export function AppProvider(props: ParentProps) {
    const [state, setState] = createSignal<TContextValue>({groupList, todoList});

    const value: TAppContext = [
        state,
        {
            addGroup: (group: TGroup) => {
                const {groupList, todoList} = state();
                setState({todoList, groupList: [...groupList, group]});
            },
            editGroup: (oldGroup: TGroup, newGroup: TGroup) => {
                const {groupList, todoList} = state();
                setState({
                    todoList,
                    groupList: groupList.map(item => {
                        if (item.id === oldGroup.id) {
                            return newGroup;
                        }
                        return item;
                    })
                });
            },
            deleteGroup: (group: TGroup) => {
                if (group.isDefault) {
                    return;
                }
                const {groupList, todoList} = state();
                setState({todoList, groupList: groupList.filter(item => item.id !== group.id)});
            },
            addTodo: (todo: TTodo) => {
                const {groupList, todoList} = state();
                setState({
                    groupList,
                    todoList: [...todoList, todo]
                });
            },
            editTodo: (odlTodo: TTodo, newTodo: TTodo) => {
                const {groupList, todoList} = state();
                setState({
                    groupList,
                    todoList: todoList.map(item => {
                        if (item.id === odlTodo.id) {
                            return newTodo;
                        }
                        return item;
                    })
                });
            },
            deleteTodo: (todo: TTodo) => {
                const {groupList, todoList} = state();
                setState({
                    groupList,
                    todoList: todoList.filter(item => item.id !== todo.id)
                });
            }
        }
    ];

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
