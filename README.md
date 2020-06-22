# Checkbox

Checkbox组件

## 安装

```
npm install --save react-widget-checkbox
```


## 使用

[![Edit react-widget-checkbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-widget-checkbox-g9xn0?fontsize=14&hidenavigation=1&theme=dark)

```js
import {Checkbox} from 'react-widget-checkbox';
import 'react-widget-checkbox/style';

<Checkbox defaultChecked={true}>Checkbox</Checkbox>

```



### Interfaces

```ts
export interface RWCheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
    prefixCls?: string;
    className?: string;
    name?: string;
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    indeterminate?: boolean;
}
export interface RWCheckboxState {
    checked: boolean;
}
export declare class RWCheckbox extends React.Component<RWCheckboxProps, RWCheckboxState> {
    static defaultProps: {
        prefixCls?: string;
        defaultChecked: boolean;
    };
    static getDerivedStateFromProps(props: RWCheckboxProps, state: RWCheckboxState): {
        checked: boolean;
    };
    state: {
        checked: boolean;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    render(): JSX.Element;
}

export interface CheckboxProps extends Omit<RWCheckboxProps, "onChange" | "onMouseEnter" | "onMouseLeave"> {
    name?: string;
    value?: any;
    onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
    onMouseEnter?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
}
export declare const Checkbox: React.FC<CheckboxProps> & {
    Group: typeof CheckboxGroup;
};

export interface CheckboxOption<T = any> {
    value: T;
    label: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
}


export interface RenderProps<T = any> {
    value: T | undefined;
    onChange: (value: T) => void;
}
export interface CheckboxOption<T = any> {
    value: T;
    label: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface CheckboxGroupProps<T = any> extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange" | "defaultChecked"> {
    prefixCls?: string;
    name?: string;
    defaultValue?: T[];
    value?: T[];
    disabled?: boolean;
    readOnly?: boolean;
    options?: T extends string | number ? (string | number)[] : CheckboxOption<T>[];
    render?: (props: RenderProps) => React.ReactNode;
    onChange?: (checkedValue: T[]) => void;
}
export interface CheckboxGroupState<T = any> {
    value: T[];
}
export declare class CheckboxGroup<T = any> extends React.Component<CheckboxGroupProps<T>, CheckboxGroupState<T>> {
    static defaultProps: {
        prefixCls: string;
    };
    static getDerivedStateFromProps(nextProps: CheckboxGroupProps, state: CheckboxGroupState): {
        value: any[];
    };
    state: {
        value: T[];
    };
    getGroupContext(): {
        toggleChange: (option: CheckboxOption<any>) => void;
        value: T[];
        name: string | undefined;
        disabled: boolean;
        readOnly: boolean;
    };
    getOptions(): CheckboxOption<any>[];
    toggleChange: (option: CheckboxOption) => void;
    handleChange: (value: T[]) => void;
    render(): JSX.Element;
}
```


### 基础样式

```css
/* RWCheckbox 基础样式 */
.rw-checkbox {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    outline: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    flex: none;
}

.rw-checkbox-input {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    cursor: pointer;
    opacity: 0;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.rw-checkbox-inner {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 16px;
    height: 16px;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    box-sizing: border-box;
}

.rw-checkbox-input:focus + .rw-checkbox-inner,
.rw-checkbox:hover .rw-checkbox-inner {
    border-color: #1890ff;
}

.rw-checkbox-disabled .rw-checkbox-input,
.rw-checkbox-disabled {
    cursor: not-allowed;
}

.rw-checkbox-disabled:hover .rw-checkbox-inner,
.rw-checkbox-disabled:active .rw-checkbox-inner,
.rw-checkbox-disabled .rw-checkbox-inner {
    background-color: #f5f5f5 !important;
    border-color: #d9d9d9 !important;
}

/* RWCheckbox 选中样式 */
.rw-checkbox-checked .rw-checkbox-inner {
    background: #1890ff;
    border-color: #1890ff;
}

.rw-checkbox-inner:after {
    box-sizing: border-box;
    position: absolute;
    top: 45%;
    left: 22%;
    display: table;
    width: 6px;
    height: 9px;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg) scale(0) translate(-50%, -50%);
    opacity: 0;
    content: " ";
}

.rw-checkbox-checked .rw-checkbox-inner:after {
    opacity: 1;
    transform: rotate(45deg) scale(1) translate(-50%, -50%);
}

.rw-checkbox-disabled .rw-checkbox-inner:after {
    border-color: #d9d9d9;
}

/* RWCheckbox半选状态 */
.rw-checkbox-indeterminate:not(.rw-checkbox-disabled) .rw-checkbox-inner {
    border-color: #1890ff;
}
.rw-checkbox-indeterminate .rw-checkbox-inner:after {
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background-color: #1890ff;
    border: 0;
    border-radius: 1px;
    transform: translate(-4px, -4px) scale(1);
    opacity: 1;
    content: " ";
}

.rw-checkbox-indeterminate.rw-checkbox-disabled .rw-checkbox-inner:after {
    background: #d9d9d9;
}

/* Checkbox */
.rw-checkbox-wrapper {
    display: inline-flex;
    cursor: pointer;
    vertical-align: middle;
    outline: none;
    align-items: center;
    flex: 1;
}

.rw-checkbox-wrapper:hover .rw-checkbox-inner {
    border-color: #1890ff;
}

.rw-checkbox-label {
    flex: 1;
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.rw-checkbox-wrapper-disabled .rw-checkbox-label {
    color: rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
}

/* CheckboxGroup */
.rw-checkbox-group {
    display: inline-flex;
}


```
