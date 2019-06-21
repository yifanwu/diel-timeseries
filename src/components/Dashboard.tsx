import * as React from "react";
import { DielComponent, ChartType, DielComponentProps, ChartSpec, ChannelName, UserSelection  } from "diel-ui";
import { RangeUnitSelection } from "diel-ui/build/types";

enum ComponentRelations {
  pack_ther = "pack_ther",
  pack_cell = "pack_cell"
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
      ])
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
    return <>
      {therDiv}
      {cellDiv}
    </>;
  }
}