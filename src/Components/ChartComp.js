/**
 * Answer to first question
 */

import {Component, createRef} from "react";
import * as d3 from 'd3'

class D3Comp extends Component{
    // Rest of the code
    constructor(props) {
        super(props);
        this.background = !this.props.background?'lightgrey':this.props.background
        this.myRef = createRef()
        this.margin= {top: 10, bottom: 10, left: 10, right: 10}
        this.width = this.props.width - this.margin.left - this.margin.right
        this.height = this.props.height - this.margin.top - this.margin.bottom
        this.container = undefined
        this.legend = undefined
        this.colors = undefined
    }

    compare(a, b){
        if(a.coord[0] < b.coord[0])
            return -1
        if (a.coord[0] > b.coord[0])
            return 1
        return 0

    }

    init = ()=>{
        let root = this.myRef.current
        if (!this.container){
            this.container = d3.select(root)
                .append('svg')
                .attr("width", this.width + this.margin.left + this.margin.right)
                .attr('height', this.height + this.margin.top + this.margin.bottom)
                .attr('id', 'parent')
                .style('background', this.background)
                .append('g')
                .attr('class', 'container')
        }
        this.setLegend()
    }

    setLegend(){
        let nameSet = new Set()
        let colorSet = new Set()
        this.props.data.forEach(element=>{
            nameSet.add(element[0].label)
            colorSet.add(element[0].color)
        })
        this.legend = Array.from(nameSet)
        this.colors = Array.from(colorSet)

    }

    scaleLayout(inputRange, bounds){
        return d3.scaleLinear().domain(inputRange).range(bounds).nice()
    }

    drawAxis(maxScaleX, maxScaleY){
        let xAxis = d3.axisTop(maxScaleX)
        let yAxis = d3.axisRight(maxScaleY)
        this.container.append('g')
            .attr("transform", `translate(${this.margin.left} ${this.margin.top + this.height})`)
            .call(xAxis)

        this.container.append('g')
            .attr("transform", `translate(${this.margin.left} ${this.margin.top})`)
            .call(yAxis)
    }

    drawPoints = (inputData, scaleLayout)=>{
        let z = this.container.append('g')
            .attr('transform', `translate(${this.margin.top} ${this.margin.left})`)
            .selectAll('circle')
            .data(inputData)
            .enter()
            .append('circle')
            .attr('r', 5)
            .attr('cx', (d)=>{
                let scX = scaleLayout[0]
                return scX(d.coord[0])})
            .attr('cy', (d)=>{
                let scy = scaleLayout[1]
                return scy(d.coord[1])
            })
            .attr('fill', d=>d.color)
            .attr('stroke', 'black')
            .attr('class', d=>`point-${d.color}`)
    }

    drawLine = (inputData, scaleLayout)=>{
        let genLine = d3.line()
            .x(d=>{
                let scX = scaleLayout[0]
                return scX(d.coord[0])})
            .y( d=>{
                let scy = scaleLayout[1]
                return scy(d.coord[1])})
        inputData = inputData.sort(this.compare)
        this.container.append('g')
            .attr('transform', `translate(${this.margin.top} ${this.margin.left})`)
            .selectAll('path')
            .data(inputData)
            .enter()
            .append('path')
            .sort((v1, v2)=>{
                let a = v1.coord[0]
                let b = v2.coord[0]
                return d3.ascending(a, b)
            })
            .attr('d', genLine(inputData))
            .attr('fill', 'none')
            .attr('stroke', d=>d.color)
            .attr('class', d=>`line-${d.color}`)

    }

    paint = ()=>{
        let scaleLayouts = [this.props.length]
        this.props.data.forEach((obj, i) =>{
            let xMin = Infinity, xMax = -Infinity
            let yMin = Infinity, yMax = -Infinity
            obj.forEach((element)=>{
                xMin = element.coord[0]<xMin?element.coord[0]:xMin
                xMax = element.coord[0]>xMax?element.coord[0]:xMax

                yMin = element.coord[1]<yMin?element.coord[1]:yMin
                yMax = element.coord[1]>yMax?element.coord[1]:yMax
            })
            let x = this.scaleLayout([xMin, xMax], [0, this.width])
            let y = this.scaleLayout([yMin, yMax], [this.height, 0])
            scaleLayouts[i] = [x.copy(), y.copy()]
        })
        let  maxX = -Infinity
        let  maxY = -Infinity
        let maxScaleX = undefined
        let maxScaleY = undefined
        scaleLayouts.forEach(scale=>{
            let domainX = scale[0].domain()
            let domainY = scale[1].domain()
            if (domainX[1] > maxX){
                maxScaleX = scale[0]
                maxX = domainX[1]
            }
            if (domainY[1] > maxY){
                maxScaleY = scale[1]
                maxY = domainY[1]
            }
        })
        this.drawAxis(maxScaleX, maxScaleY)
        this.props.data.forEach((data, i)=>{
            this.drawPoints(data, scaleLayouts[i])
            this.drawLine(data, scaleLayouts[i])
        })


    }

    componentDidMount() {
        this.init()
        this.paint()

        window.addEventListener('resize', ()=>{
            this.paint()
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.paint()
    }

    handleMouseOver = (color) =>{

        this.container.selectAll(`.point-${color}`).transition().duration(1000).attr('r', 8).attr('fill', 'white')
        this.container.selectAll(`.line-${color}`).transition().duration(1000).attr('stroke', 'white')
    }

    handleMouseOut = (color) =>{
        this.container.selectAll(`.point-${color}`).transition().duration(1000).attr('r', 5).attr('fill', color)
        this.container.selectAll(`.line-${color}`).transition().duration(1000).attr('stroke', color)
    }

    LegendComp = ()=>{
        let counter = 0
        let li = this.legend.map((element, i)=><li key={counter++}
                                                   style={{color: this.colors[i]}}
                                                   onMouseOver={(event)=>this.handleMouseOver(this.colors[i])}
                                                   onMouseOut={(event)=>this.handleMouseOut(this.colors[i])}>{element}</li>)
        return(
            <>
                {li}
            </>
        )
    }



    render() {
    this.setLegend()
        let contStyle = {
            display: 'flex',
            flexFlow: 'row wrap'
        }
        return(
            <div style={contStyle}>
                <div ref={this.myRef}>
                </div>
                <div>
                    <ul>
                        <this.LegendComp/>
                    </ul>
                </div>
            </div>

        )
    }
}

export default D3Comp