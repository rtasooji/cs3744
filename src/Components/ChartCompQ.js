import {Component, createRef} from "react";
import * as d3 from 'd3'

class D3Comp extends Component{
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
        /**
         * Sort the x coord to draw line correctly
         */
        if(a.coord[0] < b.coord[0])
            return -1
        if (a.coord[0] > b.coord[0])
            return 1
        return 0

    }

    init = ()=>{
        /**
         * Use init method to initialize values that are fixed
         * @type {T}
         */
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
        /**
         * Set the value and color based on the input props
         * We use this.legend and this.colors  in another component to provide interactivity between legend
         * and our chart
         * @type {Set<unknown>}
         */
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
        /**
         * Provide the range for each input chart
         */
        return d3.scaleLinear().domain(inputRange).range(bounds).nice()
    }

    drawAxis(maxScaleX, maxScaleY){
        /**
         * Draw axis
         * @type {Axis<AxisDomain>}
         */
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
        /**
         * Draw points
         * Pay attention to the class name that we defined
         */
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
        /**
         * Draw lines
         * Pay attention to the class name that we define
         * @type {Line<[number, number]>}
         */
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
        /**
         * Call this method for every re-drawy
         * @type {*[]}
         */
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
        /**
         * When the mouse goes over the legends, for point and circle the color change to white and the circle radius increase
         * Using animation
         */
        // your code here

    }

    handleMouseOut = (color) =>{
        /**
         * When the mouse goes away from the legend, it goes back to normal
         */
        // your code here
    }

    LegendComp = ()=>{
        let counter = 0
        let li = this.legend.map((element, i)=><li key={counter++}
                                                   style={{color: this.colors[i]}}>{element}</li>)
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