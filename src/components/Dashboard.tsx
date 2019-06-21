import * as React from "react";
import { DielComponent, ChartType, DielComponentProps, ChartSpec, ChannelName, UserSelection  } from "diel-ui";
import { RangeUnitSelection, AnnotationStyle } from "diel-ui/build/types";
import { diel } from "../setup";

enum ComponentRelations {
  pack_ther = "pack_ther",
  pack_cell = "pack_cell",
  gps = "gps",
  speed = "speed",
  // messages = "messages",
  pack_break_regen = "pack_break_regen",
  current_time_selection_pretty = "current_time_selection_pretty"
}

export default class Dashboard extends DielComponent<DielComponentProps> {
  constructor(props: DielComponentProps) {
    super(props);
    this.state = {};
    this.BindDielOutputs(Object.keys(ComponentRelations));
    diel.NewInput("time_selection", {minTs: null, maxTs: null});
  }
  render() {
    const {diel} = this.props;
    const multiSeriesSpec: ChartSpec = {
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
    };
    const singleValueSpec: ChartSpec = {
      chartType: ChartType.LineChart,
      channelByColumn: new Map([
        [ChannelName.x, "ts"],
        [ChannelName.y, "val"],
      ]),
      annotation: {
        columns: ["time"],
        style: AnnotationStyle.Popup,
      }
    };
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
    const therDiv = this.GenerateChart(multiSeriesSpec, ComponentRelations.pack_ther, handler);
    const cellDiv = this.GenerateChart(multiSeriesSpec, ComponentRelations.pack_cell, handler);
    const gpsDiv = this.GenerateChart(multiSeriesSpec, ComponentRelations.gps, handler);
    const speedDiv = this.GenerateChart(multiSeriesSpec, ComponentRelations.speed, handler);
    const breakDiv = this.GenerateChart(singleValueSpec, ComponentRelations.pack_break_regen, handler);
    // const rawMessages = this.state[ComponentRelations.messages]
    // const messagesDiv = rawMessages
    //   ? rawMessages.map(d => d["message"]).join("\n")
    //   : null
    //   ;
    const currentSelection = this.state[ComponentRelations.current_time_selection_pretty];
    const currentSelectionDiv = (currentSelection && currentSelection.length > 0)
      ? <h2>You have selected time range from {currentSelection[0]["minTs"]} to {currentSelection[0]["maxTs"]}</h2>
      : null;
      ;
    return <>
      {currentSelectionDiv}
      <h3>pack_ther</h3>
      {therDiv}
      <h3>pack_cell</h3>
      {cellDiv}
      <h3>gps</h3>
      {gpsDiv}
      <h3>speed</h3>
      {speedDiv}
      <h3>break</h3>
      {breakDiv}
      {/* <h3>Mesages</h3>
      <p>{messagesDiv}</p> */}
    </>;
  }
}