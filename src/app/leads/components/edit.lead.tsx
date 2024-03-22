import { Button, ButtonGroup } from "@progress/kendo-react-buttons";
import { Dialog } from "@progress/kendo-react-dialogs";
import {
  FieldWrapper,
  Form,
  FormElement,
} from "@progress/kendo-react-form";
import { Input, NumericTextBox } from "@progress/kendo-react-inputs";
import { useState } from "react";

const EditLeadForm = ({ lead, onClose, onSave }) => {
  const [editedLead, setEditedLead] = useState({ ...lead });
  const handleSubmit = () => {
    onSave(editedLead);
    onClose();
  };
  const handleInputChange = (e, field) => {
    setEditedLead({ ...editedLead, [field]: e.target.value });
  };

  const handleNumericFieldChange = (value, field) => {
    setEditedLead({ ...editedLead, [field]: value });
  };

  const handleToggleChange = (value, field) => {
    setEditedLead({
      ...editedLead,
      [field]: value ? "salaried" : "non-salaried",
    });
  };

  return (
    <Dialog title="Edit Lead" onClose={onClose}>
      <Form
        onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <FormElement>
            <fieldset className={"k-form-fieldset"}>
              <legend className={"k-form-legend"}>Property Details</legend>
              <FieldWrapper>
                <div className="k-form-field-wrap">
                  <Input
                    type={"text"}
                    name={"property_name"}
                    label={"Property Name"}
                    value={editedLead.property_name}
                    onChange={(e) => handleInputChange(e, "property_name")}
                    placeholder="Enter property name"
                  />
                </div>
              </FieldWrapper>

              <FieldWrapper>
                <div className="k-form-field-wrap">
                  <Input
                    type={"number"}
                    name={"property_value"}
                    label={"Property Value"}
                    value={editedLead.property_value}
                    onChange={(e) => handleInputChange(e, "property_value")}
                    placeholder="Enter estimated property value"
                  />
                </div>
              </FieldWrapper>

              <FieldWrapper>
                <div className="k-form-field-wrap">
                  <Input
                    type={"text"}
                    name={"property_value"}
                    label={"Property Size"}
                    value={editedLead.property_value}
                    onChange={(e) => handleInputChange(e, "property_size")}
                    placeholder="Enter estimated property size"
                  />
                </div>
              </FieldWrapper>
            </fieldset>
            <fieldset className={"k-form-fieldset"}>
              <legend className={"k-form-legend"}>Customer Details</legend>
              <FieldWrapper>
                <div className="k-form-field-wrap">
                  <Input
                    type={"text"}
                    name={"customer_name"}
                    label={"Customer Name"}
                    value={editedLead.customer_name}
                    onChange={(e) => handleInputChange(e, "customer_name")}
                    placeholder="Enter customer name"
                  />
                </div>
              </FieldWrapper>

              <FieldWrapper>
                <div className="k-form-field-wrap">
                  <Input
                    type={"text"}
                    name={"customer_cibil_score"}
                    label={"Customer CIBIL Score"}
                    value={editedLead.customer_cibil_score}
                    onChange={(e) =>
                      handleInputChange(e, "customer_cibil_score")
                    }
                    placeholder="Enter customer CIBIL score"
                  />
                </div>
              </FieldWrapper>

              <FieldWrapper>
                <div className="k-form-field-wrap">
                  <label>Employment Type:</label>
                  <ButtonGroup>
                    <Button
                      togglable={true}
                      selected={
                        editedLead.customer_employment_details === "salaried"
                      }
                      onClick={() =>
                        handleToggleChange(true, "customer_employment_details")
                      }
                    >
                      Salaried
                    </Button>
                    <Button
                      togglable={true}
                      selected={
                        editedLead.customer_employment_details ===
                        "non-salaried"
                      }
                      onClick={() =>
                        handleToggleChange(false, "customer_employment_details")
                      }
                    >
                      Non-Salaried
                    </Button>
                  </ButtonGroup>
                </div>
              </FieldWrapper>

              <FieldWrapper>
                <div className="k-form-field-wrap">
                  <Input
                    type={"text"}
                    name={"monthly_income"}
                    label={"Monthly Income"}
                    value={editedLead.monthly_income}
                    onChange={(e) => handleInputChange(e, "monthly_income")}
                    placeholder="Enter monthly income"
                  />
                </div>
              </FieldWrapper>

              {editedLead.customer_employment_details === "salaried" && (
                <FieldWrapper>
                  <div className="k-form-field-wrap">
                    <Input
                      type={"text"}
                      name={"monthly_obligations"}
                      label={"Monthly Obligations"}
                      value={editedLead.monthly_obligations}
                      onChange={(e) =>
                        handleInputChange(e, "monthly_obligations")
                      }
                      placeholder="Enter monthly obligations"
                    />
                  </div>
                </FieldWrapper>
              )}
            </fieldset>
            <div className="k-form-buttons">
              <button
                type={"submit"}
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              >
                Save
              </button>
            </div>
          </FormElement>
        )}
      />
    </Dialog>
  );
};

export default EditLeadForm;
