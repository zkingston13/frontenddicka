import PropTypes from "prop-types";

const Button = ({ children, onClick, type, variant, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} ${disabled ? "disabled" : ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// ✅ Definir los tipos de propiedades
Button.propTypes = {
  children: PropTypes.node.isRequired, // 👈 `children` debe ser un nodo válido (texto o JSX)
  onClick: PropTypes.func, // 👈 `onClick` es una función opcional
  type: PropTypes.oneOf(["button", "submit", "reset"]), // 👈 Solo acepta estos valores
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
  ]), // 👈 Solo variantes de Bootstrap
  disabled: PropTypes.bool, // 👈 `disabled` debe ser booleano
};

// ✅ Valores por defecto
Button.defaultProps = {
  type: "button",
  variant: "primary",
  disabled: false,
};

export default Button;
