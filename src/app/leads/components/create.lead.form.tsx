import React, { useState } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Input, NumericTextBox } from "@progress/kendo-react-inputs";
import { Button, ButtonGroup } from "@progress/kendo-react-buttons";
import {
  Field,
  FieldWrapper,
  Form,
  FormElement,
} from "@progress/kendo-react-form";

const CreateLeadForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    propertyName: "",
    propertyValue: "",
    propertySize: "",
    customerName: "",
    cibilScore: "",
    employmentDetails: "salaried",
    monthlyIncome: "",
    monthlyObligations: "",
  });

  const handleSubmit = (dataItem) => {
    alert(JSON.stringify(dataItem, null, 2));
    onClose();
  };

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleEmploymentTypeChange = (value) => {
    setFormData({ ...formData, employmentDetails: value });
  };

  const renderCustomerDetails = () => {
    if (parseInt(formData.cibilScore) > 500) {
      return (
        <>
          <FieldWrapper>
            <div className="k-form-field-wrap">
              <label>Employment Type <br/></label>
              <ButtonGroup>
                <Button
                  togglable={true}
                  selected={formData.employmentDetails === "Salaried"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleEmploymentTypeChange("Salaried");
                  }}
                >
                  Salaried
                </Button>
                <Button
                  togglable={true}
                  selected={formData.employmentDetails === "Non-Salaried"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleEmploymentTypeChange("Non-Salaried");
                  }}
                >
                  Non-Salaried
                </Button>
              </ButtonGroup>
            </div>
          </FieldWrapper>
          <FieldWrapper>
            <div className="k-form-field-wrap">
              <Field
                name={"monthlyIncome"}
                label={"Monthly Income"}
                component={NumericTextBox}
                value={formData.monthlyIncome}
                onChange={(e) => handleInputChange(e, "monthlyIncome")}
                placeholder="Enter monthly income"
              />
            </div>
          </FieldWrapper>

          {formData.employmentDetails === "Salaried" && (
            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name={"monthlyObligations"}
                  label={"Monthly Obligations"}
                  component={NumericTextBox}
                  value={formData.monthlyObligations}
                  onChange={(e) => handleInputChange(e, "monthlyObligations")}
                  placeholder="Enter monthly obligations here..."
                />
              </div>
            </FieldWrapper>
          )}
        </>
      );
    }
  };

  return (
    <Dialog title="Create Lead" onClose={onClose}>
      <Form
        onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <FormElement>
            <fieldset className={"k-form-fieldset"}>
              <legend className={"k-form-legend"}>Property Details</legend>
              <FieldWrapper>
                <div className="k-form-field-wrap">
                  <Field
                    name={"propertyName"}
                    label={"Property Name"}
                    component={Input}
                    value={formData.propertyName}
                    onChange={(e) => handleInputChange(e, "propertyName")}
                    placeholder="Enter property name"
                  />
                </div>
              </FieldWrapper>

              <FieldWrapper>
                <div className="k-form-field-wrap">
                  <Field
                    name={"propertyValue"}
                    label={"Property Value"}
                    component={NumericTextBox}
                    value={formData.propertyValue}
                    onChange={(e) => handleInputChange(e, "propertyValue")}
                    placeholder="Enter estimated property value"
                  />
                </div>
              </FieldWrapper>

              <FieldWrapper>
                <div className="k-form-field-wrap">
                  <Field
                    name={"propertySize"}
                    label={"Property Size"}
                    component={Input}
                    value={formData.propertySize}
                    onChange={(e) => handleInputChange(e, "propertySize")}
                    placeholder="Enter estimated property size"
                  />
                </div>
              </FieldWrapper>
            </fieldset>
            <fieldset className={"k-form-fieldset"}>
              <legend className={"k-form-legend"}>Customer Details</legend>
              <FieldWrapper>
                <div className="k-form-field-wrap">
                  <Field
                    name={"customerName"}
                    label={"Customer Name"}
                    component={Input}
                    value={formData.customerName}
                    onChange={(e) => handleInputChange(e, "customerName")}
                    placeholder="Enter customer name"
                  />
                </div>
              </FieldWrapper>

              <FieldWrapper>
                <div className="k-form-field-wrap">
                  <Field
                    name={"cibilScore"}
                    label={"Customer CIBIL Score"}
                    component={NumericTextBox}
                    value={formData.cibilScore}
                    onChange={(e) => handleInputChange(e, "cibilScore")}
                    placeholder="Enter customer CIBIL score"
                  />
                </div>
              </FieldWrapper>

              {renderCustomerDetails()}
            </fieldset>
            <div className="k-form-buttons">
              <button
                type={"submit"}
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                disabled={!formRenderProps.allowSubmit}
              >
                Submit
              </button>
            </div>
          </FormElement>
        )}
      />
    </Dialog>
  );
};

export default CreateLeadForm;
