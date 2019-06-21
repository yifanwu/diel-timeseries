import * as React from "react";
import { DielComponent, ChartType, DielComponentProps, ChartSpec, ChannelName, UserSelection  } from "diel-ui";
import { RangeUnitSelection, AnnotationStyle } from "diel-ui/build/types";

enum ComponentRelations {
  pack_ther = "pack_ther",
  pack_cell = "pack_cell",
  current_time_selection_pretty = "current_time_selection_pretty"
}

export default class Dashboard extends DielComponent<DielComponentProps> {
  constructor(props: DielComponentProps) {
    super(props);
    this.state = {};
    this.BindDielOutputs(Object.keys(ComponentRelations));
  }
  render() {
    const {diel} = this.props;
    const spec: ChartSpec = {
      chartType: ChartType.LineChart,
      channelByColumn: new Map([
        [ChannelName.x, "ts"],
        [ChannelName.y, "val"],
        [ChannelName.color, "kind"]
      ]),
      annotation: {
        columns: ["time"],
        style: AnnotationStyle.Popup,
      }
    }
    const selectionHandler = (sel: UserSelection) => {
      // we know that this is a RangeUnitSelection
      const rangeSel = sel[0] as RangeUnitSelection;
      diel.NewInput("time_selection", {minTs: rangeSel.min, maxTs: rangeSel.max});
    };
    const deSelectHandler = () => diel.NewInput("time_selection", {minTs: null, maxTs: null});
    const handler = {
      selectionHandler,
      deSelectHandler
    };
    const therDiv = this.GenerateChart(spec, ComponentRelations.pack_ther, handler);
    const cellDiv = this.GenerateChart(spec, ComponentRelations.pack_cell, handler);
    const currentSelection = this.state[ComponentRelations.current_time_selection_pretty];
    const currentSelectionDiv = (currentSelection && currentSelection.length > 0)
      ? <h2>You have selected time range from {currentSelection[0]["minTs"]} to {currentSelection[0]["maxTs"]}</h2>
      : null;
      ;
    return <>
      {currentSelectionDiv}
      {therDiv}
      <br></br>
      {cellDiv}
    </>;
  }
}