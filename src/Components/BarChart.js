/*
 * Homework 4
 * BarChart component JavaScript source code
 *
 * Author: Denis Gracanin
 * Version: 1.0
 */

import './css/BarChart.css';
import React from "react";
import * as d3 from "d3";

class BarChart extends React.Component {
    constructor(props) {
        super(props);
// A reference to the created BarChart object.
        this.myReference = React.createRef();
    }

    /*
     * Creates the SVG element used for D3.
     */
    init() {
        let container = d3.select(this.myReference.current);
        container
            .append("svg")
            .attr("class", "barchart");
    }

    /*
     * D3 rendering
     */
    paint() {
// If there is no reference to the component (e.g., fast window resize) then return.
        if (!this.myReference.current) {
            return;
        }

// Variables used to specify bar chart layout.
        let barData = this.props.data;
        const offsetX = 0.12;
        const offsetY = 0.7;
        const fontScale = 1.8;
        let container = d3.select(this.myReference.current);
        let length = this.props.data.length; // number of bars
        let firstColor = this.props.firstColor; // color of the first bars
        let color = this.props.color; // color of the other bars
        let barchart = container.select("svg");
        let width = this.myReference.current.offsetWidth - 10;
        let height = this.myReference.current.offsetHeight - 10;
        let labelWidth = offsetX * width;
        let chartWidth = width - labelWidth;
        let chartHeight = offsetY * height;
        let chartTextHeight = 30;
        let chartTextWidth = 60;
        let chartBorderHeight = 10;
        let descriptionHeight = height - chartHeight;
        let descriptionBorder = 5;
        let tooltipWidth = 70;
        let tooltipHeight = 30;
        let tipWidth = 20;
        let tipHeight = 10;
        let chartLineTip = 4;
        let tooltip = null;

        /*
         * Creates an array for y labels
         */
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
            if (index !== -1 && parseInt(barData[index].value) > 0) {
                let xTranslate = labelWidth + chartTextWidth + (index + 0.5) * (chartWidth - chartTextWidth) / length - tooltipWidth / 2;
                let yTranslate = (chartHeight - chartTextHeight - parseInt(barData[index].value) * yLabelScale - tooltipHeight - tipHeight);
                if (yTranslate < 0) {
                    tooltip.select("#tip").attr("transform", "translate(0, -" + tooltipHeight + ")");
                    yTranslate += tooltipHeight + 2 * tipHeight;
                } else {
                    tooltip.select("#tip").attr("transform", "translate(0, 0)");
                }
                let translate = "translate(" + xTranslate + "," + yTranslate + ")"
                tooltip
                    .select("text")
                    .text((index + 1) + ": " + barData[index].value);
                tooltip
                    .attr("transform", translate)
                    .style("visibility", "visible");
                return true;
            }
            return false;
        }

// Removes all elements in the SVG (clears bar chart)
        barchart
            .selectAll("*")
            .remove();
// Sets the bar chart's size and background.
        barchart
            .attr("width", width)
            .attr("height", height)
            .style("background-color", this.props.backgroundColor); // barchart background
// Set the label group and the corresponding text
        barchart
            .append("g")
            .attr("id", "label")
            .append("text")
            .attr("x", 0)
            .attr("y", chartHeight / 2)
            .text(this.props.label);

// Set the description group and the corresponding text
        barchart
            .append("g")
            .attr("id", "description")
            .selectAll("text")
            .data(this.props.data)
            .enter()
            .append("text")
            .attr("x", () => { return labelWidth; })
            .attr("y", (item, index) => { return chartHeight + (index + 1) * (descriptionHeight - descriptionBorder) / length; })
            .style("font-size", (descriptionHeight - descriptionBorder)/ (fontScale * length))
            .text((item, index) => { return "Bar " + (index + 1) + ": " + item.description; });

// Set the chart group and the corresponding components
        let chart = barchart
            .append("g")
            .attr("id", "chart");
// Set the chart xAxis group and the corresponding components
// Set the xAxis group text
        chart
            .append("g")
            .attr("id", "xAxis")
            .selectAll("text")
            .data(this.props.data)
            .enter()
            .append("text")
            .attr("x", (item, index) => { return labelWidth + chartTextWidth + (index + 0.5) * (chartWidth - chartTextWidth) / length; })
            .attr("y", chartHeight)
            .text((item, index) => { return (index + 1)});
// Set the xAxis group vertical lines
        d3
            .select("#xAxis")
            .selectAll("line")
            .data(this.props.data)
            .enter()
            .append("line")
            .attr("x1", (item, index) => { return labelWidth + chartTextWidth + index * (chartWidth - chartTextWidth) / length; })
            .attr("y1", chartBorderHeight - chartLineTip)
            .attr("x2", (item, index) => { return labelWidth + chartTextWidth + index * (chartWidth - chartTextWidth) / length; })
            .attr("y2", chartHeight - chartTextHeight + chartLineTip);
// Set the chart yAxis group and the corresponding components
// Set the yAxis group text
        let yLabels = getYLabels(this.props.data);
        let yLabelScale = (chartHeight - chartTextHeight - chartBorderHeight) / yLabels[yLabels.length - 1];
        chart
            .append("g")
            .attr("id", "yAxis")
            .selectAll("text")
            .data(yLabels)
            .enter()
            .append("text")
            .attr("x", labelWidth + chartTextWidth - chartLineTip)
            .attr("y", (item, index) => { return chartHeight - chartTextHeight - item * yLabelScale })
            .text((item) => { return item; });
        chart
            .select("#yAxis")
            .selectAll("line")
            .data(yLabels)
            .enter()
            .append("line")
            .attr("x1", labelWidth + chartTextWidth - 4)
            .attr("y1", (item, index) => { return chartHeight - chartTextHeight - index * (chartHeight - chartTextHeight - chartBorderHeight) / (yLabels.length - 1); })
            .attr("x2", width)
            .attr("y2", (item, index) => { return chartHeight - chartTextHeight - index * (chartHeight - chartTextHeight - chartBorderHeight) / (yLabels.length - 1); });
        chart
            .append("g")
            .attr("id", "bars")
            .selectAll("rect")
            .data(this.props.data)
            .enter()
            .append("rect")
            .attr("x", (item, index) => { return labelWidth + chartTextWidth + (index + 0.1) * (chartWidth - chartTextWidth) / length; })
            .attr("y", (item, index) => { return chartHeight - chartTextHeight - item.value * yLabelScale; })
            .attr("width", 0.8 * (chartWidth - chartTextWidth) / length)
            .attr("height", (item) => { return (item.value > 0 ? item.value * yLabelScale : 1); })
            .attr("fill", (item, index) => { return index === 0 ? firstColor : color; })
            .attr("barid", (item, index) => { return index; })
            .on("mouseenter", function (d) {
                let index = parseInt(this.getAttribute("barid"));
                showTooltip(tooltip, index);
            })
            .on("mouseout", function () {
                tooltip.style("visibility", "hidden");
            });
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
            <div className="BarChart" ref={this.myReference}>
            </div>
        );
    }
}

export default BarChart;
