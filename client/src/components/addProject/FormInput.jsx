const FormInput = ({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
  pattern,
  placeholder,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      className="h-10 p-3 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      value={value}
      onChange={onChange}
      required={required}
      pattern={pattern}
      placeholder={placeholder}
    />
  </div>
);

export default FormInput;
