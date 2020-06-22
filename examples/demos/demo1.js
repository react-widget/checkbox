import React, { Component } from "react";
import { RWCheckbox } from "../../src/RWCheckbox";
import { Checkbox } from "../../src/Checkbox";
import { CheckboxGroup } from "../../src/CheckboxGroup";

export default class DEMO extends Component {
	render() {
		return (
			<div>
				<input type="checkbox" />
				<RWCheckbox onChange={(e) => console.log(e.target.checked)} />{" "}
				<RWCheckbox checked /> <RWCheckbox disabled checked /> <RWCheckbox indeterminate />{" "}
				<RWCheckbox disabled indeterminate />{" "}
				<Checkbox style={{ width: 100 }} defaultChecked>
					CheckobzCheckobzCheckobz
				</Checkbox>
				<Checkbox style={{ width: 100 }} checked>
					CheckobzCheckobzCheckobz
				</Checkbox>
				<Checkbox checked disabled>
					checked disabled
				</Checkbox>
				<Checkbox indeterminate>indeterminate</Checkbox>
				<Checkbox indeterminate disabled>
					indeterminate disabled
				</Checkbox>
				<CheckboxGroup
					defaultValue={["A", "D"]}
					onChange={(v) => console.log("group changed:", v)}
				>
					<Checkbox value="A">A</Checkbox>
					<Checkbox value="B">B</Checkbox>
					<Checkbox value="C">C</Checkbox>
					<Checkbox value="D">D</Checkbox>
					<Checkbox value="E">E</Checkbox>
				</CheckboxGroup>
				<CheckboxGroup
					defaultValue={["A", "D"]}
					options={["A", "B", "C", "D", "E", "F"]}
				></CheckboxGroup>
			</div>
		);
	}
}
