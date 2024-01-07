/*
 * @Author: zhichuya 1830695417@qq.com
 * @Date: 2024-01-07
 * @LastEditors: zhichuya 1830695417@qq.com
 * @LastEditTime: 2024-01-07
 * @FilePath: /solidjs-todoList/src/components/Todo/EditTodo/index.tsx
 * @Description: 编辑todo
 */
import {createSignal, onMount} from 'solid-js';

import style from './index.module.less';

interface Props {
    value: string;
    isFocused: boolean;
    onChange: (value: string) => void;
}

const EditTodo = (props: Props) => {
    let inputElement: HTMLInputElement | ((el: HTMLInputElement) => void) | undefined;

    const onChange = function (e: any) {
        props.onChange && props.onChange(e.target.value);
    };

    // 回车主动触发失去焦点事件
    const handleKeyup = function (e: {target?: any; key?: any}) {
        const {key} = e;
        if (key === 'Enter') {
            e.target.blur();
        }
    };

    onMount(() => props.isFocused && (inputElement as HTMLInputElement).focus());

    return (
        <div class={style.todoEditContainer}>
            <form>
                <input
                    value={props.value}
                    ref={inputElement}
                    onChange={onChange}
                    onKeyUp={handleKeyup}
                    class={style.todoEditInput}
                    placeholder="添加一个Todo"
                />
            </form>
        </div>
    );
};

export default EditTodo;
