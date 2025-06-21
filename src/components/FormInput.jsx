export const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  unit,
  icon: Icon,
  step,
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4 text-blue-600" />}
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
    </div>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        step={step}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
      />
      {unit && (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {unit}
        </span>
      )}
    </div>
  </div>
);
