/*
 * @Author: zhichuya 1830695417@qq.com
 * @Date: 2023-12-09
 * @LastEditors: zhichuya 1830695417@qq.com
 * @LastEditTime: 2023-12-10
 * @FilePath: /solidjs-todoList/src/types/index.ts
 * @Description: 类型定义文件
 */

import {Accessor} from 'solid-js';

export type TGroup = {
    id: string;
    title: string;
    isDefault: boolean;
};

export type TTodo = {
    id: string;
    text: string;
    status: number;
    groupId: string;
};

export type TGroupList = TGroup[];
export type TTodoList = TTodo[];

export type TContextValue = {
    groupList: TGroupList;
    todoList: TTodoList;
};

export type TAccessContextValue = Accessor<TContextValue>;
export type TContextMethod = {
    addGroup: (group: TGroup) => void;
    editGroup: (oldGroup: TGroup, newGroup: TGroup) => void;
    deleteGroup: (group: TGroup) => void;
    addTodo: (todo: TTodo) => void;
    editTodo: (odlTodo: TTodo, newTodo: TTodo) => void;
    deleteTodo: (todo: TTodo) => void;
};
export type TAppContext = [TAccessContextValue, TContextMethod];
