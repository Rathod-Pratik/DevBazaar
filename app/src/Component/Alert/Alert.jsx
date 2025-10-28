import React from "react";

const Alert = (props) => {
  return (
    <div>
      {props.alert && (
        <div
          className={`p-4 mb-4 text-sm ${props.alert.color} rounded-lg ${props.alert.bgcolor}`}
          role="alert"
        >
          <span className="font-medium">{props.alert.message}</span>
        </div>
      )}
    </div>
  );
};

export default Alert;
