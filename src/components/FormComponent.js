import React from "react";
import { DatePicker, Input, InputPicker } from "rsuite";

const InputField = React.memo((props) => {
  let { input, meta, data, handleOnChange, ...rest } = props;
  return (
    <React.Fragment>
      <Input
        {...input}
        {...rest}
        value={input.value}
        onChange={(value) => {
          input.onChange(value);
          if (handleOnChange) handleOnChange(value);
        }}
      />

      {meta.error && meta.touched && (
        <span className="error">{meta.error}</span>
      )}
    </React.Fragment>
  );
});

const DateField = React.memo((props) => {
  let {
    input,
    disabledDate,
    meta,
    formatDate,
    handleOnChange,
    placeholder,
    placement,
    ...rest
  } = props;
  let val = input.value ? new Date(input.value) : new Date();
  return (
    <React.Fragment>
      <DatePicker
        {...rest}
        value={val}
        format={formatDate || "DD/MM/YYYY"}
        placement={placement || "autoVerticalStart"}
        placeholder={placeholder || "DD/MM/YYYY"}
        onChange={(value) => {
          input.onChange(value);
          if (handleOnChange) handleOnChange(value);
        }}
        disabledDate={disabledDate}
      />
      {meta.error && meta.touched && (
        <span className="error">{meta.error}</span>
      )}
    </React.Fragment>
  );
});

const RSTextAreaField = React.memo((props) => {
  let {
    input,
    meta,
    resizes,
    rows,
    className,
    placeholder,
    handleOnChange,
    ...rest
  } = props;
  return (
    <div className={className}>
      <Input
        componentClass="textarea"
        {...input}
        {...rest}
        placeholder={placeholder}
        value={input.value}
        rows={rows || 4}
        style={{ resize: resizes || "", minWidth: "100%" }}
        onChange={(value) => {
          input.onChange(value);
          if (handleOnChange) handleOnChange(value);
        }}
      />

      {meta.error && meta.touched && (
        <span className="error">{meta.error}</span>
      )}
    </div>
  );
});

const SelectField = React.memo((props) => {
  let {
    input,
    meta,
    dataInput,
    handleOnChange,
    disabled,
    disabledItemValues,
    placement,
    className,
    ...rest
  } = props;
  return (
    <React.Fragment>
      <InputPicker
        {...input}
        {...rest}
        disabled={disabled}
        disabledItemValues={disabledItemValues}
        renderMenuItem={(s) => {
          return <span style={{ marginBottom: 10, marginTop: 10 }}>{s}</span>;
        }}
        searchable
        placement={placement || "autoVerticalStart"}
        className={className}
        data={dataInput || []}
        onChange={(value) => {
          input.onChange(value);
          if (handleOnChange) handleOnChange(value, props.name);
        }}
      />
      {meta.error && meta.touched && (
        <span className="form-text text-center w-100 text-danger">
          {meta.error}
        </span>
      )}
    </React.Fragment>
  );
});

export { DateField, SelectField, InputField, RSTextAreaField };
