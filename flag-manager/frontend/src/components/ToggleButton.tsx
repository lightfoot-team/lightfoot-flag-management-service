interface ToggleButtonProps {
  isEnabled: boolean;
  onToggle: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isEnabled, onToggle }) => {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      role="switch"
      aria-checked={isEnabled}
      tabIndex={0}
      onClick={onToggle}
      style={{ fontSize: "1em" }}
    >
      <div
        className={`relative inline-flex items-center rounded-full transition-colors ${
          isEnabled ? "bg-yellow-500" : "bg-gray-300"
        }`}
        style={{
          width: "2.5em",
          height: "1.25em",
        }}
      >
        <span
          className={`inline-block transform rounded-full bg-white transition-transform ${
            isEnabled ? "translate-x-[1.25em]" : "translate-x-[0.125em]"
          }`}
          style={{
            width: "1em",
            height: "1em",
          }}
        />
      </div>
      <span
        className={`font-medium ${
          isEnabled ? "text-yellow-600" : "text-gray-600"
        }`}
      >
        {isEnabled ? "Enabled" : "Disabled"}
      </span>
    </div>
  );
};


export default ToggleButton;
