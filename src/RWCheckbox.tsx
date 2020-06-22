import React from "react";
import classNames from "classnames";

export interface RWCheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
	type: "checkbox" | "radio";
	prefixCls: string;
	className?: string;
	name?: string;
	defaultChecked?: boolean;
	checked?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	indeterminate?: boolean;
	inputRef?: React.RefObject<HTMLInputElement>;
}

export interface RWCheckboxState {
	checked: boolean;
}

export class RWCheckbox extends React.Component<RWCheckboxProps, RWCheckboxState> {
	static defaultProps: RWCheckboxProps = {
		prefixCls: "rw-checkbox",
		defaultChecked: false,
		type: "checkbox",
	};

	static getDerivedStateFromProps(props: RWCheckboxProps, state: RWCheckboxState) {
		return {
			checked: props.checked === undefined ? state.checked : props.checked,
		};
	}

	state = {
		checked: !!this.props.defaultChecked,
	};

	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const props = this.props;

		if (props.disabled) {
			return;
		}

		if (props.checked === undefined) {
			this.setState({
				checked: e.target.checked,
			});
		}

		props.onChange?.(e);
	};

	render() {
		let {
			prefixCls,
			className,
			style,
			name,
			disabled,
			readOnly,
			indeterminate,
			type,
			inputRef,
			...restProps
		} = this.props;
		let { checked } = this.state;

		const classString = classNames(prefixCls, className, {
			[`${prefixCls}-checked`]: checked,
			[`${prefixCls}-indeterminate`]: indeterminate && !checked,
			[`${prefixCls}-disabled`]: disabled,
		});
		const inputClassString = classNames({
			[`${prefixCls}-input`]: true,
			[`${prefixCls}-input-indeterminate`]: indeterminate && !checked,
		});

		return (
			<span className={classString} style={style}>
				<input
					{...restProps}
					ref={inputRef}
					className={inputClassString}
					name={name}
					type={type}
					readOnly={readOnly}
					disabled={disabled}
					checked={!!checked}
					onChange={this.handleChange}
				/>
				<span className={`${prefixCls}-inner`} />
			</span>
		);
	}
}
export default RWCheckbox;
