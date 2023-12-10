import {Accessor, Show, createSignal, useContext} from 'solid-js';
import {For} from 'solid-js/web';
import {v4 as uuidV4} from 'uuid';

import addIcon from '../../../assets/add.svg';
import todoIcon from '../../../assets/todo.svg';
import {AppContext} from '../../../context';
import {groupList} from '../../../context/initData';
import {TAccessContextValue, TAppContext} from '../../../types';
import CustomMenu from '../../CustomMenu';
import EditGroup from '../EditGroup';
import style from './index.module.less';

interface Props {
    activeGroup: Accessor<number>;
    changeActiveGroup: (idx: number) => void;
}

function GroupList({activeGroup, changeActiveGroup}: Props) {
    const [appState, {editGroup, addGroup, deleteGroup}] = useContext(AppContext) as TAppContext;
    const [editIdx, setEditIdx] = createSignal(-1);
    const [showContextMenu, setShowContextMenu] = createSignal(false);
    const [contextmenuIdx, setContextmenuIdx] = createSignal(-1);
    const [isAddGroup, setIsAddGroup] = createSignal(false);

    const getTodoCountInGroup = function (groupId: string) {
        let count = 0;
        (appState as TAccessContextValue)().todoList.forEach(todo => {
            todo.groupId === groupId && count++;
        });
        return count;
    };

    // 展示添加分组组件
    const handleShowAddGroup = async function () {
        setIsAddGroup(true);
    };

    return (
        <div class={style.groupContainer}>
            {/* 分组列表 */}
            <div class={style.groupList}>
                <For each={(appState as TAccessContextValue)().groupList}>
                    {(group, idx) => {
                        return (
                            <Show
                                when={idx() !== editIdx()}
                                fallback={
                                    <EditGroup
                                        value={group.title}
                                        isFocused={true}
                                        onChange={title => {
                                            if (title) {
                                                const newGroup = {
                                                    ...group,
                                                    title
                                                };
                                                editGroup(group, newGroup);
                                            }
                                            setEditIdx(-1);
                                        }}
                                    />
                                }
                            >
                                <div
                                    class={
                                        idx() !== activeGroup() ? style.groupItem : `${style.groupItem} ${style.active}`
                                    }
                                    onClick={() => {
                                        changeActiveGroup(idx());
                                    }}
                                    onDblClick={() => {
                                        setEditIdx(idx());
                                    }}
                                    onContextMenu={e => {
                                        setShowContextMenu(true);
                                        setContextmenuIdx(idx());
                                    }}
                                >
                                    <img class={style.groupIcon} src={todoIcon} />
                                    <div class={style.groupTitle}>{group.title || '默认'}</div>
                                    <div class={style.groupTodoCount}>{getTodoCountInGroup(group.id)}</div>
                                </div>
                            </Show>
                        );
                    }}
                </For>
                <Show when={isAddGroup()}>
                    <EditGroup
                        value={''}
                        isFocused={true}
                        onChange={groupTitle => {
                            if (groupTitle) {
                                const id = uuidV4();
                                addGroup({id, title: groupTitle, isDefault: false});
                            }

                            setIsAddGroup(false);
                        }}
                    />
                </Show>
            </div>
            {/* 点击空白处添加一个新分组 */}
            <div class={style.groupBlank} onDblClick={handleShowAddGroup} />
            {/* 分组操作 */}
            <div class={style.groupOperate}>
                <div class={style.groupAdd} onClick={handleShowAddGroup}>
                    <img class={style.groupIcon} src={addIcon} />
                    <div class={style.groupTitle}>添加分组</div>
                </div>
            </div>
            {/* 自定义菜单：展示菜单 && (右击Idx === 当前激活的activeGroup)  ==> 在激活处右击菜单方可展示 */}
            <Show when={showContextMenu() && contextmenuIdx() == activeGroup()}>
                <CustomMenu>
                    <div class={style.menuList}>
                        <div
                            class={style.menuItem}
                            onClick={() => {
                                setEditIdx(contextmenuIdx());
                            }}
                        >
                            编辑
                        </div>
                        <div
                            class={style.menuItem}
                            onClick={() => {
                                deleteGroup(appState().groupList[contextmenuIdx()]);
                            }}
                        >
                            删除
                        </div>
                    </div>
                </CustomMenu>
            </Show>
        </div>
    );
}

export default GroupList;
