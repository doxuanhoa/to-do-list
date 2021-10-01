import React, { useState, useEffect } from "react";
import {
  DateField,
  InputField,
  RSTextAreaField,
  SelectField,
} from "./FormComponent";
import { Field, Form } from "react-final-form";
import { ControlLabel, FormGroup, Button } from "rsuite";
import { Required } from "./validation";

const typePiority = [
  { value: 1, label: "Low" },
  { value: 2, label: "Normal" },
  { value: 3, label: "Hight" },
];

export default function Detail({ type, taskData, onSave, ...props }) {
  const onSubmit = (values) => {
    onSave(values);
  };

  return (
    <div className={type != "update" ? "to-do-form" : ""}>
      <Form
        onSubmit={onSubmit}
        initialValues={taskData || []}
        render={({ handleSubmit }) => {
          return (
            <form className={type === "update" ? "form-detail" : ""}>
              <div className="row mt-3 ">
                {type !== "update" && (
                  <div className="col-12 col-lg-8 offset-lg-2 mb-3">
                    <h5 className="text-center"> New Task</h5>
                  </div>
                )}
                <div className="col-12 col-lg-8 offset-lg-2 mb-3">
                  <FormGroup>
                    <Field
                      validate={Required}
                      component={InputField}
                      name="task"
                      block
                      placeholder="Add new task..."
                    />
                  </FormGroup>
                </div>

                <div className="col-12 col-lg-8 offset-lg-2 mb-3">
                  <FormGroup>
                    <ControlLabel>Description</ControlLabel>
                    <Field
                      component={RSTextAreaField}
                      name="description"
                      componentClass="textarea"
                      block
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-lg-4 offset-lg-2 mb-3">
                  <FormGroup>
                    <ControlLabel>Due Date</ControlLabel>
                    <Field
                      name="dueDate"
                      component={DateField}
                      value="2021-02-24T15:08:26.4714711"
                      block
                    />
                  </FormGroup>
                </div>

                <div className="col-12 col-lg-4 mb-3">
                  <FormGroup>
                    <ControlLabel>Piority</ControlLabel>
                    <Field
                      component={SelectField}
                      name="piority"
                      dataInput={typePiority}
                      defaultValue={2}
                      block
                    />
                  </FormGroup>
                </div>

                <div className="col-12 col-lg-8 offset-lg-2 mb-3">
                  <Button
                    className="w-100"
                    color="green"
                    onClick={handleSubmit}
                  >
                    {type === "update" ? "Update" : "Add"}
                  </Button>
                </div>
              </div>
            </form>
          );
        }}
      />
    </div>
  );
}
