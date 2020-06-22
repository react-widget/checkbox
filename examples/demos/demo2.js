import React from "react";
import { Checkbox } from "../../src";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Apple", "Pear", "Orange"];
const defaultCheckedList = ["Apple", "Orange"];

export default class Demo2 extends React.Component {
	state = {
		checkedList: defaultCheckedList,
		indeterminate: true,
		checkAll: false,
	};

	onChange = (checkedList) => {
		this.setState({
			checkedList,
			indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
			checkAll: checkedList.length === plainOptions.length,
		});
	};

	onCheckAllChange = (checked, e) => {
		this.setState({
			checkedList: checked ? plainOptions : [],
			indeterminate: false,
			checkAll: checked,
		});
	};

	render() {
		return (
			<div>
				<div className="site-checkbox-all-wrapper">
					<Checkbox
						indeterminate={this.state.indeterminate}
						onChange={this.onCheckAllChange}
						checked={this.state.checkAll}
					>
						Check all
					</Checkbox>
				</div>
				<br />
				<CheckboxGroup
					options={plainOptions}
					value={this.state.checkedList}
					onChange={this.onChange}
				/>
			</div>
		);
	}
}
