import React from "react";
import classNames from "classnames";
import CheckboxGroupContext from "./CheckboxGroupContext";
import Checkbox from "./Checkbox";

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

export interface CheckboxGroupProps<T = any>
	extends Omit<
		React.HTMLAttributes<HTMLDivElement>,
		"defaultValue" | "onChange" | "defaultChecked"
	> {
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

export class CheckboxGroup<T = any> extends React.Component<
	CheckboxGroupProps<T>,
	CheckboxGroupState<T>
> {
	static defaultProps = {
		prefixCls: "rw-checkbox",
	};

	static getDerivedStateFromProps(nextProps: CheckboxGroupProps, state: CheckboxGroupState) {
		return {
			value: nextProps.value === undefined ? state.value : nextProps.value,
		};
	}

	state = {
		value: this.props.defaultValue || [],
	};

	getGroupContext() {
		return {
			toggleChange: this.toggleChange,
			value: this.state.value,
			name: this.props.name,
			disabled: !!this.props.disabled,
			readOnly: !!this.props.readOnly,
		};
	}

	getOptions() {
		const options: any[] = this.props.options || [];
		return options.map(
			(option): CheckboxOption => {
				if (typeof option === "string" || typeof option === "number") {
					return {
						label: option,
						value: option,
					};
				}
				return option;
			}
		);
	}

	toggleChange = (option: CheckboxOption) => {
		const checkedValue = this.state.value;
		const idx = checkedValue.indexOf(option.value);
		const value = [...checkedValue];

		if (idx === -1) {
			value.push(option.value);
		} else {
			value.splice(idx, 1);
		}

		this.handleChange(value);
	};

	handleChange = (value: T[]) => {
		if (this.props.value === undefined) {
			this.setState({ value });
		}

		this.props.onChange?.(value);
	};

	render() {
		let {
			prefixCls,
			className,
			children,
			value,
			defaultValue,
			onChange,
			disabled,
			readOnly,
			options,
			render,
			...restProps
		} = this.props;
		const state = this.state;

		if (options && options.length > 0) {
			children = this.getOptions().map((option) => (
				<Checkbox
					prefixCls={prefixCls}
					key={option.value}
					disabled={option.disabled === undefined ? disabled : option.disabled}
					readOnly={option.readOnly === undefined ? readOnly : option.readOnly}
					value={option.value}
					checked={state.value.indexOf(option.value) !== -1}
					onChange={option.onChange}
					className={option.className}
					style={option.style}
				>
					{option.label}
				</Checkbox>
			));
		}

		const cls = classNames(`${prefixCls}-group`, className);

		return (
			<CheckboxGroupContext.Provider value={this.getGroupContext()}>
				{render ? (
					render({
						value: state.value,
						onChange: this.handleChange,
					})
				) : (
					<div {...restProps} className={cls}>
						{children}
					</div>
				)}
			</CheckboxGroupContext.Provider>
		);
	}
}

export default CheckboxGroup;
