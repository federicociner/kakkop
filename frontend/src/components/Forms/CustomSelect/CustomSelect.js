import React from "react";

import {useField} from "formik";
import PropTypes from "prop-types";
import Select from "react-select";

const CustomSelect = props => {
  const [field, meta, helpers] = useField(props.name);

  // TODO: Remove default Bootstrap colours and use theme colours
  const colourStyles = {
    option: provided => {
      return {
        ...provided,
      };
    },
  };

  const getValue = () => {
    let value = props.isMulti ? [] : "";

    if (props.options) {
      value = props.isMulti
        ? props.options.filter(option => field.value.indexOf(option.value) >= 0)
        : props.options.find(option => option.value === field.value);
    }

    return value;
  };

  const handleBlur = event => {
    field.onBlur(event);
    helpers.setTouched(true);
  };

  const handleChange = option => {
    let value = props.isMulti ? [] : "";

    if (option) {
      value = props.isMulti ? option.map(item => item.value) : option.value;
    }

    helpers.setValue(value);
  };

  return (
    <React.Fragment>
      <Select
        blurInputOnSelect={false}
        closeMenuOnSelect={props.isMulti ? false : true}
        isDisabled={props.isDisabled}
        isMulti={props.isMulti}
        name={field.name}
        onBlur={handleBlur}
        onChange={handleChange}
        options={props.options}
        styles={colourStyles}
        value={getValue()}
      />
      {!!meta.error && meta.touched && (
        <div className="form-error-message">{meta.error}</div>
      )}
    </React.Fragment>
  );
};

CustomSelect.propTypes = {
  name: PropTypes.string,
  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default CustomSelect;
