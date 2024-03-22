"use client";

import * as React from "react";
import {
  Grid,
  GridColumn,
  GridDataStateChangeEvent,
} from "@progress/kendo-react-grid";
import { DataResult, process, State } from "@progress/kendo-data-query";
import leads from "./leads.json";
import ChartPiContainer from "./components/pi";
import ChartBarContainer from "./components/column.chart";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import CreateLeadForm from "./components/create.lead.form";
import EditLeadForm from "./components/edit.lead";
import { Popup } from "@progress/kendo-react-popup";
const DATA_ITEM_KEY = "id";

export default function GridNextjs() {
  const [filterValue, setFilterValue] = React.useState();
  const [filteredData, setFilteredData] = React.useState(leads);
  const [currentSelectedState, setCurrentSelectedState] = React.useState<{
    [id: string]: boolean | number[];
  }>({});
  const [isEditFormVisible, setIsEditFormVisible] = React.useState(false);
  const [selectedLead, setSelectedLead] = React.useState(null);
  const [data, setData] = React.useState(filteredData);
  const [dataState, setDataState] = React.useState<State>({
    skip: 0,
    take: 20,
    sort: [{ field: "lead_creation_date", dir: "desc" }],
  });
  const [dataResult, setDataResult] = React.useState<DataResult>(
    process(leads, dataState)
  );

  const dataStateChange = (event: GridDataStateChangeEvent) => {
    setDataResult(process(leads, event.dataState));
    setDataState(event.dataState);
  };

  const handleEditLead = (lead) => {
    setSelectedLead(lead);
    setIsEditFormVisible(true);
  };

  const handleSaveLead = (editedLead) => {
  };

  const onFilterChange = (ev) => {
    let value = ev.value;
    setFilterValue(ev.value);
    let newData = leads.filter((item) => {
      let match = false;
      for (const property in item) {
        if (
          item[property]
            .toString()
            .toLocaleLowerCase()
            .indexOf(value.toLocaleLowerCase()) >= 0
        ) {
          match = true;
        }

        if (
          item[property].toLocaleDateString &&
          item[property].toLocaleDateString().indexOf(value) >= 0
        ) {
          match = true;
        }
      }
      return match;
    });
    setFilteredData(newData);
    let clearedPagerDataState = { ...dataState, take: 8, skip: 0 };
    let processedData = process(newData, clearedPagerDataState);
    processedData.data = processedData.data.map((item) => ({
      ...item,
      selected: currentSelectedState[item[DATA_ITEM_KEY]],
    }));
    setDataResult(processedData);
    setDataState(clearedPagerDataState);
    setData(newData);
  };

  const [showPopup, setShowPopup] = React.useState(false);

  const handleCreateLeadClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <ChartPiContainer leads={leads} />
        </div>
        <div style={{ flex: 1 }}>
          <ChartBarContainer leads={leads} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "40px 4px",
        }}
      >
        <Input
          value={filterValue}
          onChange={onFilterChange}
          style={{
            border: "2px solid #ccc",
            boxShadow: "inset 0px 0px 0.5px 0px rgba(0,0,0,0.0.1)",
            width: "300px",
            height: "30px",
            marginRight: "10px",
          }}
          placeholder="Search in all columns..."
        />
        <Button
          themeColor={"primary"}
          fillMode="solid"
          onClick={handleCreateLeadClick}
        >
          Create Lead
        </Button>
      </div>
      {showPopup && <CreateLeadForm onClose={handleClosePopup} />}
      <Grid
        id="test"
        sortable={true}
        reorderable={true}
        pageable={{ buttonCount: 4, pageSizes: true, previousNext: true }}
        data={dataResult}
        {...dataState}
        onDataStateChange={dataStateChange}
      >
        <GridColumn
          title="Customer Name"
          field="customer_name"
        />
        <GridColumn
          title="Property Name"
          field="property_name"
        />
        <GridColumn
          title="Customer Name"
          field="property_value"
          filter="numeric"
        />
        <GridColumn
          title="Lead Creation Date"
          field="lead_creation_date"
          filter="date"
          format="{0:D}"
        />
        <GridColumn title="Status" field="status" width="150px" />
        <GridColumn
          field="Actions"
          filterable={false}
          cell={(props) => (
            <div className="center border">
              <span
                className="k-icon k-font-icon k-i-edit "
                onClick={() => handleEditLead(props.dataItem)}
                style={{ cursor: "pointer" }}
              ></span>
            </div>
          )}
        />
      </Grid>
      {isEditFormVisible && (
        <EditLeadForm
          lead={selectedLead}
          onClose={() => setIsEditFormVisible(false)}
          onSave={handleSaveLead}
        />
      )}
    </div>
  );
}
