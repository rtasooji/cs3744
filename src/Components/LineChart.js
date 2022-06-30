/*
 * Homework 4
 * LineChart component JavaScript source code
 *
 * Author: Denis Gracanin
 * Version: 1.0
 */

import './css/LineChart.css';
import React from "react";
import * as d3 from "d3";

class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.myReference = React.createRef();
    }

/*
 * Creates the SVG element used for D3.
 */
    init() {
        let container = d3.select(this.myReference.current);
        container
            .append("svg")
            .attr("class", "linechart");
    }

/*
 * D3 rendering
 */
    paint() {
// If there is no reference to the component (e.g., fast window resize) then return.
        if (!this.myReference.current) {
            return;
        }

// Variables used to specify LINE chart layout.
        let lineData = this.props.data;
        let lineValues = [];
        let lineLabels = [];
        const offsetX = 0.2;
        const offsetY = 0.8;
        const fontScale = 1.8;
        let container = d3.select(this.myReference.current);
        let length = this.props.data.length; // number of points
        let linechart = container.select("svg");
        let width = this.myReference.current.offsetWidth - 10;
        let height = this.myReference.current.offsetHeight - 10;
        let labelWidth = offsetX * width;
        let chartWidth = width - labelWidth;
        let chartHeight = offsetY * height;
        let chartTextHeight = 30;
        let chartTextWidth = 0;
        let chartBorderHeight = 1;
        let descriptionHeight = height - chartHeight;
        let descriptionBorder = 5;
        let tooltipWidth = 70;
        let tooltipHeight = 30;
        let tipWidth = 20;
        let tipHeight = 10;
        let chartLineTip = 4;
        let tooltip = null;
        let yMax = 0;

        function getYLabels(data) {
            let maxValue = data[0].value;
            data.forEach((element) => {
                if (maxValue < element.value) {
                    maxValue = element.value;
                };
            });
            let step = maxValue > 75000 ? 10000 : 5000;
            let count = Math.ceil (maxValue / step);
            let labels = [];
            for (let i = 0; i <= count; i++) {
                labels.push(i * step);
            }
            return labels;
        }

        /*
  * Creates a tooltip.
  */
        function createTooltip(chart) {
            let tooltip = chart  // Tooltip - initially hidden
                .append("g")
                .attr("x", 0)
                .attr("y", 0)
                .attr("id", "tooltip");
            tooltip
                .append("polygon")
                .attr("id", "tip")
                .attr("points", (tooltipWidth / 2 - tipWidth / 2) + "," + tooltipHeight + " "
                    + tooltipWidth / 2 + "," + (tooltipHeight - tipHeight) + " "
                    + (tooltipWidth / 2 + tipWidth / 2) + "," + tooltipHeight + " "
                    + tooltipWidth / 2 + "," + (tooltipHeight + tipHeight)
                );
            tooltip
                .append("rect")
                .attr("width", tooltipWidth)
                .attr("height", tooltipHeight);
            tooltip
                .append("text")
                .attr("x", tooltipWidth / 2)
                .attr("y", tooltipHeight - tipHeight)
                .text("Test");
            return tooltip;
        }

        /*
         * Show the previously created tooltip.
         */
        function showTooltip(tooltip, index) {
            tooltip.style("visibility", "hidden");
            if (index !== -1 && parseInt(lineData[index].value) > 0) {
                let xTranslate = labelWidth + chartTextWidth + (index) * (chartWidth - chartTextWidth) / (length-1) - tooltipWidth / 2;
                let yTranslate = (chartHeight - chartTextHeight - parseInt(lineData[index].value) * yLabelScale - tooltipHeight - tipHeight);
                if (yTranslate < 0) {
                    tooltip.select("#tip").attr("transform", "translate(0, -" + tooltipHeight + ")");
                    yTranslate += tooltipHeight + 2 * tipHeight;
                } else {
                    tooltip.select("#tip").attr("transform", "translate(0, 0)");
                }
                let translate = "translate(" + xTranslate + "," + yTranslate + ")"
                tooltip
                    .select("text")
                    .text(lineData[index].value);
                tooltip
                    .attr("transform", translate)
                    .style("visibility", "visible");
                return true;
            }
            return false;
        }

        this.props.data.forEach(function(data, index) {
            lineValues[index] = data.value;
            lineLabels[index] = data.label;
        });
        yMax = Math.max(...lineValues);
        yMax = 75000; //Math.ceil(yMax / 10000) * 10000;

// Removes all elements in the SVG (clears bar chart)
        linechart
            .selectAll("*")
            .remove();
// Sets the line chart's size and background.
        linechart
            .attr("width", width)
            .attr("height", height)
            .style("background-color", this.props.backgroundColor); // barchart background
// Set the chart group and the corresponding components
        let chart = linechart
            .append("g")
            .attr("id", "chart");
// Set the label group and the corresponding text
        linechart
            .append("g")
            .attr("id", "label")
            .append("text")
            .attr("x", 0)
            .attr("y", chartHeight / 2 + chartBorderHeight)
            .text(this.props.label);
        linechart
            .append("g")
            .attr("id", "description")
            .append("text")
            .attr("x", labelWidth + chartWidth / 2)
            .attr("y", height - 2 * chartBorderHeight)
            .style("font-size", "x-large")
            .text("By Quarter");
        let xAxes = d3
            .scaleLinear()
            .domain([0, length - 1])
            .range([0, chartWidth]);
        chart
            .append('g')
            .attr("id", "xAxis")
            .attr("transform", "translate(" + labelWidth + "," + (chartHeight + chartBorderHeight) + ")")
            .style("font-size", "small")
            .call(d3.axisBottom(xAxes).ticks(length));
        chart
            .selectAll("#xAxis .tick text")
            .text(function(d, index) { return lineLabels[index]})
            .attr("transform", "translate(-20 30) rotate(-80) ");
        chart
            .selectAll("#xAxis > line")
            .data(lineValues)
            .enter()
            .append("line")
            .attr("x1", (item, index) => { return index * chartWidth / (length - 1); })
            .attr("y1", 0)
            .attr("x2", (item, index) => { return index * chartWidth / (length - 1); })
            .attr("y2", chartHeight)
            .attr("transform", "translate(" + labelWidth + " " + chartBorderHeight + ")");

        let yAxis = d3
            .scaleLinear()
            .domain([0, yMax])
            .range([chartHeight, 0]);
        chart
            .append('g')
            .attr("id", "yAxis")
            .attr("transform", "translate(" + labelWidth + "," + chartBorderHeight + ")")
            .style("font-size", "medium")
            .call(d3.axisLeft(yAxis).ticks(16));
        let yLabels = getYLabels(this.props.data);
        chart
            .selectAll("#yAxis .tick text")
            .text(function(d, index) { return yLabels[index]});

        let yLabelScale = (chartHeight - chartTextHeight - chartBorderHeight) / yLabels[yLabels.length - 1];
        chart
            .selectAll("#yAxis > line")
            .data(yLabels)
            .enter()
            .append("line")
            .attr("x1", labelWidth)
            .attr("y1", (item, index) => { return chartHeight + chartBorderHeight - (1 + index) * (chartHeight - 1) / (yLabels.length - 1); })
            .attr("x2", width)
            .attr("y2", (item, index) => { return chartHeight + chartBorderHeight - (1 + index) * (chartHeight - 1) / (yLabels.length - 1); });

        chart
            .append("g")
            .attr("id", "points")
            .selectAll("circle")
            .data(lineValues)
            .enter()
            .append("circle")
            .attr("fill", "red")

            chart.attr("cx", function(d, index) {
                return xAxes(index) + labelWidth; })
            .attr("cy", function(d, index) {
                console.log(d)
                return yAxis(d) + chartBorderHeight; })
            .attr("r", 5)
            .attr("pointid", (item, index) => { return index; })
            .on("mouseenter", function (d) {
                let index = parseInt(this.getAttribute("pointid"));
                showTooltip(tooltip, index);
            })
            .on("mouseout", function () {
                tooltip.style("visibility", "hidden");
            });;


        //let lineGen = d3.line().x((d, i)=>xAxes(i)).y(d=>(yAxis(d)))
        chart.selectAll('path')
            .append("path")
            .attr("d", lineGen(lineValues))
            .attr("fill", "transparent")
            .attr("stroke", "red")
            .attr("transform", "translate(" + labelWidth + "," + chartBorderHeight + ")");
        tooltip = createTooltip(chart);
    }

/*
 * Initializes the component (D3),
 * does the initial rendering (D3), and
 * attaches a listener to window resize event to re-render the component (D3).
 */
    componentDidMount() {
        this.init();
        this.paint();
        window.addEventListener('resize', () => {
            this.paint();
        })
    }

/*
 * Renders the component (D3).
 */
    componentDidUpdate() {
        this.paint();
    }

/*
 * Renders the component (React).
 */
    render() {
        return (
            <div className="LineChart" ref={this.myReference}>
            </div>
        );
    }
}

export default LineChart;
