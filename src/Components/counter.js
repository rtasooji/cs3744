import {Component, createRef} from "react";
import * as d3 from "d3";

class LetterCounter extends Component {
    constructor(props) {
        super(props);
        this.margin = {top: 20, bottom: 20, left: 20, right: 20}
        this.state = {letters: [],
            width:  600 - this.margin.left - this.margin.right,
            height: 300 - this.margin.top - this.margin.bottom}
        this.myRef = createRef()
        this.container = undefined
    }

    init(){
        if(!this.container){
            this.container = d3.select(this.myRef.current)
                .append('svg')
                .attr('class', 'parent')
                .attr('width', this.state.width + this.margin.left + this.margin.right)
                .attr('height', this.state.height + this.margin.top + this.margin.bottom)
                .attr('transform', 'rotate(180)')
        }
    }


    paint(){
        d3.selectAll('#rects').remove()
        if (Object.keys(this.state.letters).length === 0)
        {
            console.log("empty")
            return
        }
        let scX = d3.scaleBand().padding(.1).round(true)
            .domain(Object.keys(this.state.letters))
            .range([0, 100])
        let xLoc = d3.scaleLinear().domain([0, this.state.letters.length]).range([10, this.state.width])
        let values = this.state.letters.map(d=>d.count)
        let maxVal = d3.max(values)

        let scY = d3.scaleLinear().domain([0, parseInt(maxVal)]).range([0, 100])
        // How to group element on the go
        // Using enter
        this.container.append('g')
            .attr('id', 'rects')
            .selectAll('.data-group')
            .data(this.state.letters)
            .join((enter)=>{
                let counter = 0
                let e = enter
                let g= e.append('g')
                        .attr('class', 'data-group')
                g.append('rect')
                .attr('class', 'rect')
                .attr('width', scX.bandwidth())
                .attr('x', d=>xLoc(++counter))
                .attr('height', d=>scY(d.count))
                g.append('text')
                .text(d=>d.value)
                    .attr('x', '50%')
                    .attr('y', '50%')
                    .attr('dominant-baseline', 'middle')
                    .attr('text-anchor', 'middle')
                //.attr('transform', `translate(1, 1) rotate(180)`)
                return g
            })
        

        // Trying to make a text a child of rect. Does not work
        // let counter = 0
        // this.container.append('g')
        //     .attr('id', 'rects')
        //     .selectAll('.data-group')
        //     .data(this.state.letters)
        //     .enter()
        //     .append('g')
        //     .attr('class', 'data-group')
        //
        // this.container.selectAll('.data-group')
        //     .each(function(e){
        //
        //         d3.select(this)
        //             .append('rect')
        //             .attr('width', scX.bandwidth())
        //             .attr('x', d=>xLoc(++counter))
        //             .attr('height', d=>scY(d.count))
        //             .attr('class','bin-grp')
        //             .attr('opacity', '10%')
        //     })
        // // This is not possible
        // this.container.selectAll('.bin-grp')
        //     .each(function (e){
        //         d3.select(this)
        //             .append('text')
        //             .text(e.value)
        //             .attr('x', '50%')
        //             .attr('y', '50%')
        //             .attr('fill', 'red')
        //             .attr('text-anchor', 'center')
        //             .attr('dominant-baseline', 'center')
        //     })

    }

    onChangeHandler = (e)=>{
        let count = {}
        e.target.value.split("").forEach((c)=>{
            count[c]?count[c]++:count[c] = 1
        })

        let newState = []
        for (const [k, v] of Object.entries(count)){
            let value = {value: k, count: v}
            newState.push(value)
        }

        this.setState((s, p)=>{
            return{
                letters: newState
            }
        })
    }

    componentDidMount() {
        console.log("mounted")
        this.init()
        this.paint()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("updated")
        this.paint()
    }

    render() {
        return(
            <div>
                <div>
                    <input type={'text'} onChange={this.onChangeHandler}/>
                </div>
                <div ref={this.myRef}>

                </div>
            </div>

        )
    }
}

export default LetterCounter