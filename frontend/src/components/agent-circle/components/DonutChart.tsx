import * as d3 from "d3";
import React, { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EntityData } from "../types";
import { ChartLabel } from "./ChartLabel";

interface DonutChartProps {
  data: EntityData[];
  width: number;
  height: number;
  onEntityClick: (entity: EntityData) => void;
  centerContent?: React.ReactNode;
  activeEntity?: EntityData;
}

export interface DonutChartRef {
  addSegment: (newData: EntityData) => void;
  removeSegment: (id: string) => void;
}

type ID3ChartInstance = {
  getSvg: () => d3.Selection<SVGSVGElement, unknown, null, undefined>;
  getChartGroup: () => d3.Selection<d3.BaseType, unknown, null, undefined>;
  getArc: () => d3.Arc<any, d3.DefaultArcObject>;
  radius: number;
  innerRadius: number;
};

// Constants
const ACTIVE_POSITION = 270; // Left side position in degrees

export const DonutChart = forwardRef<DonutChartRef, DonutChartProps>(
  ({ data, width, height, onEntityClick, centerContent, activeEntity }, ref) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [labelPositions, setLabelPositions] = useState<Array<{ x: number; y: number; data: EntityData }>>([]);

    const chartTimer = useRef<d3.Timer | null>(null);
    const d3Chart = useRef<ID3ChartInstance>();
    const entities = useRef<EntityData[]>(data);
    const prevActiveEntityId = useRef<string | undefined>(activeEntity?.id);

    // init chart.
    const initializeChart = (refToSvg: SVGSVGElement): ID3ChartInstance => {
      const getSvg = () => {
        return d3.select(refToSvg);
      };

      // Calculate dimensions
      const radius = Math.min(width, height) / 2;
      const innerRadius = radius * 0.5;

      // Clear previous content
      getSvg().selectAll("*").remove();

      // Create base SVG structure
      const svg = getSvg()
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      // Create chart group for rotation
      svg.append("g").attr("id", "chart-group");

      // Create arc generator
      const getArc = () => d3.arc().innerRadius(innerRadius).outerRadius(radius).cornerRadius(5);

      const getChartGroup = () => {
        const svg = getSvg();
        const chartGroup = svg.select("#chart-group");

        return chartGroup;
      };

      return { getSvg, getChartGroup, getArc, radius, innerRadius };
    };

    const addActiveGradientDef = (
      d3ChartInstance: ID3ChartInstance,
      data: d3.PieArcDatum<EntityData>
      // defs: d3.Selection<SVGDefsElement, unknown, null, undefined>
    ) => {
      if (!d3ChartInstance) return;

      const arcGenerator = d3.arc().innerRadius(d3ChartInstance.innerRadius).outerRadius(d3ChartInstance.radius);
      const centroid = arcGenerator.centroid(data as any);
      const defs = d3ChartInstance.getSvg().select("defs");

      const gradient = defs
        .append("radialGradient")
        .attr("id", `active-gradient-${data.data.id}`)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("cx", "0")
        .attr("cy", "0")
        .attr("r", d3ChartInstance.radius)
        .attr("fx", centroid[0])
        .attr("fy", centroid[1]);

      gradient.append("stop").attr("offset", "0%").attr("stop-color", "#CE92D6");
      gradient.append("stop").attr("offset", "100%").attr("stop-color", "#E8B8F0");
    };

    const addInActiveGradientDef = (d3ChartInstance: ID3ChartInstance, data: d3.PieArcDatum<EntityData>) => {
      if (!d3ChartInstance) return;

      const arcGenerator = d3.arc().innerRadius(d3ChartInstance.innerRadius).outerRadius(d3ChartInstance.radius);
      const centroid = arcGenerator.centroid(data as any);
      const defs = d3ChartInstance.getSvg().select("defs");

      const gradient = defs
        .append("radialGradient")
        .attr("id", `inactive-gradient-${data.data.id}`)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("cx", "0")
        .attr("cy", "0")
        .attr("r", d3ChartInstance.radius)
        .attr("fx", centroid[0])
        .attr("fy", centroid[1]);

      gradient.append("stop").attr("offset", "0%").attr("stop-color", "#00000010");
      gradient.append("stop").attr("offset", "100%").attr("stop-color", "#00000003");
    };

    // Update label positions
    const updateLabelPosition = (
      d3ChartInstance: ID3ChartInstance,
      segment: d3.PieArcDatum<EntityData>,
      rotation: number
    ) => {
      const { innerRadius, radius } = d3ChartInstance;
      const angle = ((segment.startAngle + segment.endAngle) / 2) * (180 / Math.PI) + rotation - 90;
      const radians = (angle * Math.PI) / 180;
      const x = Math.cos(radians) * (innerRadius + (radius - innerRadius) * 0.5) + width / 2;
      const y = Math.sin(radians) * (innerRadius + (radius - innerRadius) * 0.5) + height / 2;

      return { x, y, data: segment.data };
    };

    const updateSegmentsFill = (d3ChartInstance: ID3ChartInstance, activeSegmentId: string) => {
      const svg = d3ChartInstance.getSvg();

      svg.selectAll(".segment-path").attr("fill", (d: any) => {
        return activeSegmentId === d.data.id
          ? `url(#active-gradient-${d.data.id})`
          : `url(#inactive-gradient-${d.data.id})`;
      });
    };

    // Update label positions
    const updateLabelPositions = (
      d3ChartInstance: ID3ChartInstance,
      pieData: d3.PieArcDatum<EntityData>[],
      rotation: number
    ) => {
      const newPositions = pieData.map((d) => updateLabelPosition(d3ChartInstance, d, rotation));
      setLabelPositions(newPositions);
    };

    const rotateChartGroup = (chartGroup: ReturnType<ID3ChartInstance["getChartGroup"]>, targetRotation: number) => {
      // Use D3's transition for the chart rotation
      chartGroup
        .transition()
        .attr("transform", `rotate(${targetRotation})`)
        .duration(1000)
        .ease(d3.easeQuadInOut)
        .on("end", () => {});
    };

    const handleRotation = (d3ChartInstance: ID3ChartInstance, rotation: number) => {
      const chartGroup = d3ChartInstance.getChartGroup();
      const pieData = createPieData(entities.current);

      rotateChartGroup(chartGroup, rotation);

      const startRotation = parseFloat(chartGroup.attr("data-prev-rotation") || "0");
      const interpolator = d3.interpolate(startRotation, rotation);

      // Store current rotation for next transition
      chartGroup.attr("data-prev-rotation", rotation);

      // Create timer for smooth label animation
      chartTimer.current = d3.timer((elapsed) => {
        const duration = 1000;

        if (elapsed > duration) {
          updateLabelPositions(d3ChartInstance, pieData, rotation);
          chartTimer.current?.stop();
          return;
        }

        const t = elapsed / duration;
        const easedT = d3.easeQuadInOut(t);
        const interpolatedRotation = interpolator(easedT);

        updateLabelPositions(d3ChartInstance, pieData, interpolatedRotation);
      });
    };

    useEffect(() => {
      return () => chartTimer.current?.stop();
    }, []);

    const createPieData = (data: EntityData[]) => {
      const pie = d3
        .pie<EntityData>()
        .value(() => 1)
        .padAngle(0.015);
      return pie(data);
    };

    // Create chart segments
    const createSegments = async (d3ChartInstance: ID3ChartInstance, data: EntityData[]) => {
      // remove all segments
      d3ChartInstance.getSvg().selectAll(".segment").remove();
      const pieData = createPieData(data);

      for (const d of pieData) {
        createNewSegment(d);
      }

      updateSegmentsFill(d3ChartInstance, activeEntity?.id || "");
    };

    const createNewSegment = (pie: d3.PieArcDatum<EntityData>) => {
      if (!d3Chart.current) return;
      const chartGroup = d3Chart.current.getChartGroup();
      const arc = d3Chart.current.getArc();

      addActiveGradientDef(d3Chart.current, pie);
      addInActiveGradientDef(d3Chart.current, pie);

      const segment = chartGroup
        .append("g")
        .attr("class", "segment")
        .attr("id", pie.data.id)
        .style("cursor", "pointer");
      segment.datum(pie);
      segment
        .append("path")
        .attr("key", pie.data.id)
        .attr("class", "segment-path")
        .attr("d", arc as any)
        .attr("fill", "#F9F9FB")
        .attr("stroke", "#634670")
        .attr("stroke-width", "1px")
        .attr("stroke-opacity", "0.05")
        .on("click", (event: any, d: any) => {
          onEntityClick(d.data);
        });
    };

    if (activeEntity?.id !== prevActiveEntityId.current) {
      prevActiveEntityId.current = activeEntity?.id;
      const pieData = createPieData(entities.current);
      const item = pieData.find((d) => d.data.id === activeEntity?.id);
      if (item) {
        updateSegmentsFill(d3Chart.current!, item.data.id);
        const angle = ((item.startAngle + item.endAngle) / 2) * (180 / Math.PI);
        const targetRotation = ACTIVE_POSITION - angle;

        chartTimer.current?.stop();
        handleRotation(d3Chart.current!, targetRotation);
      }
    }

    const updateSegmentDatum = (d3ChartInstance: ID3ChartInstance, pie: d3.PieArcDatum<EntityData>) => {
      const chartGroup = d3ChartInstance.getChartGroup();
      const segment = chartGroup.select(`#${pie.data.id}`);
      const arc = d3ChartInstance.getArc();
      segment
        .datum(pie)
        .select(".segment-path")
        .attr("d", arc as any);
    };

    const addSegment = (newData: EntityData) => {
      entities.current = [...entities.current, newData];
      const newPieData = createPieData(entities.current);
      const existingItems = newPieData.slice(0, -1);
      const newItem = newPieData.at(-1)!;

      createNewSegment(newItem);
      for (const d of existingItems) {
        updateSegmentDatum(d3Chart.current!, d);
      }

      updateSegmentsFill(d3Chart.current!, activeEntity?.id || "");
      handleRotation(d3Chart.current!, 360 / entities.current.length);
    };

    const removeSegment = (id: string) => {
      entities.current = entities.current.filter((d) => d.id !== id);
      const pieData = createPieData(entities.current);

      d3Chart.current?.getSvg().select(`#${id}`).remove();
      for (const d of pieData) {
        updateSegmentDatum(d3Chart.current!, d);
      }

      updateSegmentsFill(d3Chart.current!, activeEntity?.id || "");
      handleRotation(d3Chart.current!, 360 / entities.current.length);
    };

    useImperativeHandle(ref, () => ({
      addSegment,
      removeSegment
    }));

    // init
    useLayoutEffect(() => {
      if (!svgRef.current || !containerRef.current) return;

      d3Chart.current = initializeChart(svgRef.current);
      const d3ChartInstance = d3Chart.current;

      d3ChartInstance.getSvg().append("defs");

      updateData(entities.current);
    }, []);

    const updateData = (data: EntityData[]) => {
      const d3ChartInstance = d3Chart.current!;

      // create segments
      createSegments(d3ChartInstance, data);

      // update label positions
      const pieData = createPieData(data);
      updateLabelPositions(d3ChartInstance, pieData, 0);
    };

    return (
      <div ref={containerRef} className="relative w-full h-full">
        <svg ref={svgRef} />
        {labelPositions.map((pos, index) => {
          return createPortal(
            <div
              key={pos.data.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: pos.x,
                top: pos.y
              }}
            >
              <ChartLabel entity={pos.data} isActive={activeEntity?.id === pos.data.id} />
            </div>,
            containerRef.current!
          );
        })}

        {centerContent &&
          containerRef.current &&
          createPortal(
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              {centerContent}
            </div>,
            containerRef.current
          )}
      </div>
    );
  }
);
