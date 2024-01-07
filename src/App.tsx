import {createSignal} from 'solid-js';

import style from './App.module.less';
import Group from './components/Group/GroupList';
import TodoList from './components/Todo/TodoList';
import {AppProvider} from './context';

function App() {
    const [activeGroup, setActiveGroup] = createSignal(0);
    const changeActiveGroup = function (activeIdx: number) {
        setActiveGroup(activeIdx);
    };

    return (
        <AppProvider>
            <div
                class={style.appContainer}
                onContextMenu={e => {
                    e.preventDefault();
                }}
            >
                <div class={style.leftSide}>
                    <Group activeGroup={activeGroup} changeActiveGroup={changeActiveGroup} />
                </div>
                <div class={style.rightSide}>
                    <TodoList activeGroup={activeGroup} />
                </div>
            </div>
        </AppProvider>
    );
}

export default App;
