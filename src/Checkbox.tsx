import React from "react";
import classNames from "classnames";
import CheckboxGroupContext, { CheckboxGroupContextValue } from "./CheckboxGroupContext";
import { RWCheckbox, RWCheckboxProps } from "./RWCheckbox";
import { CheckboxGroup } from "./CheckboxGroup";

export interface CheckboxProps
	extends Omit<RWCheckboxProps, "onChange" | "onMouseEnter" | "onMouseLeave" | "type"> {
	name?: string;
	value?: any;
	onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
	onMouseEnter?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
	onMouseLeave?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
}

export const Checkbox: React.FC<CheckboxProps> & { Group: typeof CheckboxGroup } = function ({
	prefixCls,
	className,
	name,
	value,
	style,
	checked,
	disabled,
	readOnly,
	onChange,
	onMouseEnter,
	onMouseLeave,
	children,
	...restProps
}) {
	const context = React.useContext<CheckboxGroupContextValue | null>(CheckboxGroupContext);

	if (context) {
		name = context.name;
		checked = context.value.indexOf(value) !== -1;
		disabled = disabled || context.disabled;
		readOnly = readOnly || context.readOnly;
	}

	const cls = classNames(className, {
		[`${prefixCls}-wrapper`]: true,
		[`${prefixCls}-wrapper-checked`]: checked,
		[`${prefixCls}-wrapper-disabled`]: disabled,
		[`${prefixCls}-wrapper-readonly`]: readOnly,
	});

	const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(e.target.checked, e);
		}
		if (context) {
			context.toggleChange({
				value,
				label: children,
			});
		}
	}, []);

	return (
		<label
			className={cls}
			style={style}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<RWCheckbox
				{...restProps}
				name={name}
				checked={checked}
				onChange={handleChange}
				prefixCls={prefixCls}
				disabled={disabled}
				readOnly={readOnly}
			/>
			{children !== undefined ? (
				<span className={`${prefixCls}-label`}>{children}</span>
			) : null}
		</label>
	);
};

Checkbox.displayName = "Checkbox";
Checkbox.defaultProps = {
	prefixCls: "rw-checkbox",
};
Checkbox.Group = CheckboxGroup;

export default Checkbox;
