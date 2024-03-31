import { Icon } from "iconic-react";

type RadioTogglerButtonProps = {
  options: {
    value: string;
    icon: Icon;
    label: string;
  }[];
};

export default function RadioTogglerButton({
  options,
}: RadioTogglerButtonProps) {
  return (
    <div className="radio-toggler">
      {options.map((option) => (
        <label key={option.value}>
          <input type="radio" name="bgType" value={option.value} />
          <span>
            <option.icon size={16} variant="Bold" />
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
