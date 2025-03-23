import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EntityData } from "../types";
import { ChartLabel } from "./ChartLabel";

interface DonutChartProps {
  data: EntityData[];
  width: number;
  height: number;
  onEntityClick: (entity: EntityData) => void;
}

export const DonutChart: React.FC<DonutChartProps> = ({ data, width, height, onEntityClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [targetSegment, setTargetSegment] = useState<string | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [labelPositions, setLabelPositions] = useState<Array<{ x: number; y: number; data: EntityData }>>([]);

  // Constants
  const ACTIVE_POSITION = 270; // Left side position in degrees

  // Create memoized pie data
  const getPieData = () => {
    const pie = d3
      .pie<EntityData>()
      .value(() => 1)
      .padAngle(0.01);
    return pie(data);
  };

  // Initialize and render chart
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Calculate dimensions
    const radius = Math.min(width, height) / 2;
    const innerRadius = radius * 0.5;
    const pieData = getPieData();

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Create base SVG structure
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Create gradients
    createGradients(svg, pieData, radius, innerRadius);

    // Create chart group for rotation
    const chartGroup = svg.append("g").attr("id", "chart-group").attr("transform", `rotate(${currentRotation})`);

    // Create arc generator
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(radius).cornerRadius(6);

    // Create segments
    createSegments(chartGroup, pieData, arc as any);

    // Update label positions
    updateLabelPositions(pieData, innerRadius, radius);
  }, [data, width, height]); // Recreate chart when dimensions or data change

  // Update active segment and colors when animation completes
  useEffect(() => {
    if (!isAnimating && targetSegment !== null) {
      setActiveSegment(targetSegment);
      setTargetSegment(null);
    }
  }, [isAnimating, targetSegment]);

  // Update segment colors based on active segment
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Update segment colors
    svg.selectAll(".segment-path").attr("fill", (d: any) => {
      // Find the angle after rotation
      const midAngle = ((d.startAngle + d.endAngle) / 2) * (180 / Math.PI) + currentRotation;
      const normalizedAngle = ((midAngle % 360) + 360) % 360;

      // Check if this segment is at the active position (left side)
      const isAtActivePosition = Math.abs(normalizedAngle - ACTIVE_POSITION) < 10;

      return isAtActivePosition && activeSegment === d.data.id ? `url(#gradient-${d.data.id})` : "#F9F9FB";
    });
  }, [activeSegment, currentRotation]);

  // Handle rotation changes
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    const chartGroup = svg.select("#chart-group");

    // Begin animation
    setIsAnimating(true);

    // Use D3's transition for the chart rotation
    chartGroup
      .transition()
      .attr("transform", `rotate(${currentRotation})`)
      .duration(1000)
      .ease(d3.easeQuadInOut)
      .on("end", () => {
        setIsAnimating(false);
      });

    // Update label positions during rotation
    const pieData = getPieData();
    const radius = Math.min(width, height) / 2;
    const innerRadius = radius * 0.5;

    const startRotation = parseFloat(chartGroup.attr("data-prev-rotation") || "0");
    const interpolator = d3.interpolate(startRotation, currentRotation);

    // Store current rotation for next transition
    chartGroup.attr("data-prev-rotation", currentRotation);

    // Create timer for smooth label animation
    const timer = d3.timer((elapsed) => {
      const duration = 1000;

      if (elapsed > duration) {
        updateLabelPositions(pieData, innerRadius, radius);
        timer.stop();
        return;
      }

      const t = elapsed / duration;
      const easedT = d3.easeQuadInOut(t);
      const interpolatedRotation = interpolator(easedT);

      updateLabelPositions(pieData, innerRadius, radius, interpolatedRotation);
    });

    // Clean up timer on unmount
    return () => timer.stop();
  }, [currentRotation]);

  // Create gradient definitions
  const createGradients = (
    svg: d3.Selection<SVGGElement, unknown, null, undefined>,
    pieData: d3.PieArcDatum<EntityData>[],
    radius: number,
    innerRadius: number
  ) => {
    const defs = svg.append("defs");

    pieData.forEach((d) => {
      const arcGenerator = d3.arc().innerRadius(innerRadius).outerRadius(radius);
      const centroid = arcGenerator.centroid(d as any);

      const gradient = defs
        .append("radialGradient")
        .attr("id", `gradient-${d.data.id}`)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("cx", "0")
        .attr("cy", "0")
        .attr("r", radius)
        .attr("fx", centroid[0])
        .attr("fy", centroid[1]);

      gradient.append("stop").attr("offset", "0%").attr("stop-color", "#E8B8F0");

      gradient.append("stop").attr("offset", "100%").attr("stop-color", "#D5A1E5");
    });
  };

  // Create chart segments
  const createSegments = (
    chartGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
    pieData: d3.PieArcDatum<EntityData>[],
    arc: d3.Arc<any, d3.PieArcDatum<EntityData>>
  ) => {
    const segments = chartGroup
      .selectAll(".segment")
      .data(pieData)
      .enter()
      .append("g")
      .attr("class", "segment")
      .style("cursor", "pointer");

    segments
      .append("path")
      .attr("class", "segment-path")
      .attr("key", (d) => d.data.id)
      .attr("d", arc as any)
      .attr("fill", "#F9F9FB")
      .attr("stroke", "#634670")
      .attr("stroke-width", "1px")
      .attr("stroke-opacity", "0.05")
      .on("click", (event: MouseEvent, d: d3.PieArcDatum<EntityData>) => {
        if (isAnimating) return;

        const angle = ((d.startAngle + d.endAngle) / 2) * (180 / Math.PI);
        const targetRotation = ACTIVE_POSITION - angle;

        setTargetSegment(d.data.id);
        setCurrentRotation(targetRotation);
        onEntityClick(d.data);
      });
  };

  // Update label positions
  const updateLabelPositions = (
    pieData: d3.PieArcDatum<EntityData>[],
    innerRadius: number,
    radius: number,
    rotation = currentRotation
  ) => {
    const newPositions = pieData.map((d) => {
      const angle = ((d.startAngle + d.endAngle) / 2) * (180 / Math.PI) + rotation - 90;
      const radians = (angle * Math.PI) / 180;
      const x = Math.cos(radians) * (innerRadius + (radius - innerRadius) * 0.5) + width / 2;
      const y = Math.sin(radians) * (innerRadius + (radius - innerRadius) * 0.5) + height / 2;

      return { x, y, data: d.data };
    });

    setLabelPositions(newPositions);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <svg ref={svgRef} className="absolute top-0 left-0" />
      {labelPositions.map((pos, index) => {
        const midAngle =
          ((getPieData()[index].startAngle + getPieData()[index].endAngle) / 2) * (180 / Math.PI) + currentRotation;
        const normalizedAngle = ((midAngle % 360) + 360) % 360;
        const isAtActivePosition = Math.abs(normalizedAngle - ACTIVE_POSITION) < 10;

        return createPortal(
          <div
            key={pos.data.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: pos.x,
              top: pos.y
            }}
          >
            <ChartLabel entity={pos.data} isActive={isAtActivePosition && activeSegment === pos.data.id} />
          </div>,
          containerRef.current!
        );
      })}
    </div>
  );
};
