/*
 * @Author: zhichuya 1830695417@qq.com
 * @Date: 2023-12-10
 * @LastEditors: zhichuya 1830695417@qq.com
 * @LastEditTime: 2023-12-10
 * @FilePath: /solidjs-todoList/src/components/CustomMenu/index.tsx
 * @Description: 自定义菜单
 */
import {ParentProps, Show, createEffect, createSignal, onCleanup, onMount} from 'solid-js';

import style from './index.module.less';

interface Props extends ParentProps {
    onShow?: () => void;
    onHide?: () => void;
    onChange?: (show: boolean) => void;
}

function CustomMenu({onShow, onHide, onChange, children}: Props) {
    const [isShowMenu, setIsShowMenu] = createSignal(false);
    const [menuPosition, setMenuPosition] = createSignal({x: 0, y: 0});

    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        setIsShowMenu(true);
        setMenuPosition({x: e.clientX, y: e.clientY});
        return false;
    };

    const handleClickOutside = (e: Event) => {
        setIsShowMenu(false);
    };

    createEffect(() => {
        if (isShowMenu()) {
            onShow && onShow();
        } else {
            onHide && onHide();
        }

        onChange && onChange(isShowMenu());
    });

    onMount(() => {
        window.addEventListener('contextmenu', handleContextMenu);
        window.addEventListener('click', handleClickOutside);
    });

    onCleanup(() => {
        window.removeEventListener('contextmenu', handleContextMenu);
        window.removeEventListener('click', handleClickOutside);
    });

    return (
        <Show when={isShowMenu()}>
            <div
                class={style.menu}
                style={{
                    left: `${menuPosition().x}px`,
                    top: `${menuPosition().y}px`
                }}
            >
                {children}
            </div>
        </Show>
    );
}

export default CustomMenu;
