import React from "react";

export interface CheckboxGroupContextValue {
	toggleChange: (option: { value: any; label: React.ReactNode }) => void;
	value: any[];
	name: string | undefined;
	disabled: boolean;
	readOnly: boolean;
}

export default React.createContext<CheckboxGroupContextValue | null>(null);
