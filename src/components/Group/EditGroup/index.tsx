/*
 * @Author: zhichuya 1830695417@qq.com
 * @Date: 2023-12-10
 * @LastEditors: zhichuya 1830695417@qq.com
 * @LastEditTime: 2023-12-10
 * @FilePath: /solidjs-todoList/src/components/Group/EditGroup/index.tsx
 * @Description: 编辑分组
 */
import {onMount} from 'solid-js';

import style from './index.module.less';

interface Props {
    value: string;
    isFocused: boolean;
    onChange: (value: string) => void;
}

function EditGroup({value, isFocused, onChange}: Props) {
    let ref: HTMLInputElement = {} as HTMLInputElement;

    onMount(() => {
        isFocused && ref.focus();
    });

    return (
        <div class={style.groupEditContainer}>
            <form
                class={style.groupInput}
                onSubmit={() => {
                    ref.blur();
                }}
            >
                <input
                    class={style.groupInput}
                    type="input"
                    placeholder="添加一个分组"
                    value={value}
                    ref={ref}
                    onBlur={(e: Event) => {
                        const {value = ''} = e.target as HTMLInputElement;
                        onChange(value);
                    }}
                />
            </form>
        </div>
    );
}

export default EditGroup;
