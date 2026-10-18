
import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

export type SelectOptionData = {
  label: string;
  value: string | number;
};

type SelectOptionProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> & {
  label: string;
  data: SelectOptionData[];
};

const SelectOption = forwardRef<HTMLSelectElement, SelectOptionProps>(
  ({ label, data, id, name, ...props }, ref) => {
    const selectId = id ?? name;

    return (
      <div className="buscar-field">
        <label htmlFor={selectId}>{label}</label>

        <select
          id={selectId}
          name={name}
          ref={ref}
          {...props}
        >
          {data.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

SelectOption.displayName = "SelectOption";

export default SelectOption;
