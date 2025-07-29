interface ToggleButtonProps {
  isEnabled: boolean;
  onToggle: () => void;
  size?: "sm" | "lg";
}

interface SizeClass {
  container: string;
  circle: string;
  translateOn: string;
  translateOff: string;
  text: string;
}

const sizeClasses = {
  sm: {
    container: "w-9 h-5",
    circle: "w-4 h-4",
    translateOn: "translate-x-4.5",
    translateOff: "translate-x-0.5",
    text: "text-sm"
  },
  lg: {
    container: "w-14 h-7",
    circle: "w-6 h-6",
    translateOn: "translate-x-7",
    translateOff: "translate-x-1",
    text: "text-lg"
  }
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isEnabled,
  onToggle,
  size = "sm",
}) => {
  const sizeClass: SizeClass = sizeClasses[size];

  return (
    <div
      className={`flex items-center gap-2 cursor-pointer ${sizeClass.text}`}
      role="switch"
      aria-checked={isEnabled}
      tabIndex={0}
      onClick={onToggle}
    >
      <div
        className={`relative inline-flex items-center rounded-full transition-colors ${
          isEnabled ? "bg-yellow-500" : "bg-gray-300"
        } ${sizeClass.container}`}
      >
        <span
          className={`inline-block bg-white rounded-full transition-transform transform ${
            isEnabled ? sizeClass.translateOn : sizeClass.translateOff
          } ${sizeClass.circle}`}
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
