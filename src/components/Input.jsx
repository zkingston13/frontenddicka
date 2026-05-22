import PropTypes from "prop-types";

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  className,
  disabled,
  name,
  required,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={`form-control ${className}`} // ✅ Bootstrap `form-control`
    />
  );
};

// ✅ Definir los tipos de propiedades
Input.propTypes = {
  type: PropTypes.oneOf(["text", "password", "number", "date"]),
  name: PropTypes.string, // ✅ Nombre del input
  placeholder: PropTypes.string, // ✅ Placeholder opcional
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // ✅ Puede ser string o número
  onChange: PropTypes.func.isRequired, // ✅ `onChange` es obligatorio
  className: PropTypes.string, // ✅ Clases CSS opcionales
  disabled: PropTypes.bool, // ✅ Input deshabilitado
  required: PropTypes.bool, // ✅ Campo obligatorio
};

// ✅ Valores por defecto
Input.defaultProps = {
  type: "text",
  className: "",
  disabled: false,
  required: false,
};

export default Input;
