import { Icon } from "iconic-react";

type RadioTogglerButtonProps = {
  options: {
    value: string;
    icon: Icon;
    label: string;
  }[];
  defaultValue: string;
  onChange: (value: string) => void;
};

export default function RadioTogglerButton({
  options,
  defaultValue,
  onChange,
}: RadioTogglerButtonProps) {
  const handleOptionChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className="radio-toggler">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name="bgType"
            defaultChecked={defaultValue === option.value}
            value={option.value}
            onChange={() => handleOptionChange(option.value)}
          />
          <span>
            <option.icon size={16} variant="Bold" />
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
