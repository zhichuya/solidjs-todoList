/*
 * @Author: zhichuya 1830695417@qq.com
 * @Date: 2023-12-10
 * @LastEditors: zhichuya 1830695417@qq.com
 * @LastEditTime: 2023-12-10
 * @FilePath: /solidjs-todoList/src/context/initData.tsx
 * @Description: provider的初始化数据
 */

import {v4 as uuidV4} from 'uuid';

import {TODO_STATUS_FINISH} from '../constants';
import {TGroupList} from '../types';

export const groupList: TGroupList = [
    {
        id: '69d24cbe-219d-405b-9f84-a8e6b852e2b1',
        title: '工作',
        isDefault: true
    },
    {
        id: '30b867b6-bb05-40e8-8274-60aee4255e2d',
        title: '学习',
        isDefault: true
    },
    {
        id: '493c5208-8a76-46b5-ba7c-c9d179236185',
        title: '娱乐',
        isDefault: true
    }
];

export const todoList = [
    {
        id: uuidV4(),
        text: '开发编辑器',
        status: TODO_STATUS_FINISH,
        groupId: '69d24cbe-219d-405b-9f84-a8e6b852e2b1'
    },
    {
        id: uuidV4(),
        text: '修改bug',
        status: TODO_STATUS_FINISH,
        groupId: '69d24cbe-219d-405b-9f84-a8e6b852e2b1'
    },
    {
        id: uuidV4(),
        text: '看书《Vue.js设计与实现》',
        status: TODO_STATUS_FINISH,
        groupId: '30b867b6-bb05-40e8-8274-60aee4255e2d'
    },
    {
        id: uuidV4(),
        text: '学习Svelte.js',
        status: TODO_STATUS_FINISH,
        groupId: '30b867b6-bb05-40e8-8274-60aee4255e2d'
    }
];
