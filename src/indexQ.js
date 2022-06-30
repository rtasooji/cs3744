import CreateRoot from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import * as ReactDOM from 'react-dom'
import Page from './Components/Page'
import {NasaClass} from "./Components/Nasa"
import MyMain from "./Components/Main";
import P5Sketch from "./Components/Sketch1";
import P5Comp from "./Components/P5Comp";
import LoadingComp from "./Components/LoadingComp";
import NotFound from "./Components/404";
import D3Comp from "./Components/ChartCompQ";
import LetterCounter from "./Components/counter";


const domRoot = document.getElementById('root')
// ReactDOM.render(<App/>, domRoot)

const root = CreateRoot.createRoot(domRoot)


let inputData = {
    result: [[
        {
            "coord": [
                2,
                4
            ],
            "label": "set1",
            "color": "red"
        },
        {
            "coord": [
                3,
                3
            ],
            "label": "set1",
            "color": "red"
        },
        {
            "coord": [
                5,
                2
            ],
            "label": "set1",
            "color": "red"
        },
        {
            "coord": [
                1,
                5
            ],
            "label": "set1",
            "color": "red"
        },
        {
            "coord": [
                3,
                8
            ],
            "label": "set1",
            "color": "red"
        }
    ],
        [
            {
                "coord": [
                    4,
                    14
                ],
                "label": "set2",
                "color": "blue"
            },
            {
                "coord": [
                    2,
                    8
                ],
                "label": "set2",
                "color": "blue"
            },
            {
                "coord": [
                    6,
                    21
                ],
                "label": "set2",
                "color": "blue"
            },
            {
                "coord": [
                    12,
                    24
                ],
                "label": "set2",
                "color": "blue"
            },
            {
                "coord": [
                    18,
                    18
                ],
                "label": "set2",
                "color": "blue"
            }
        ],
        [
            {
                "coord": [
                    8,
                    24
                ],
                "label": "set3",
                "color": "black"
            },
            {
                "coord": [
                    26,
                    18
                ],
                "label": "set3",
                "color": "black"
            },
            {
                "coord": [
                    16,
                    5
                ],
                "label": "set3",
                "color": "black"
            },
            {
                "coord": [
                    2,
                    15
                ],
                "label": "set3",
                "color": "black"
            },
            {
                "coord": [
                    9,
                    11
                ],
                "label": "set3",
                "color": "black"
            }
        ],
        [
            {
                "coord": [
                    22,
                    15
                ],
                "label": "set4",
                "color": "yellow"
            },
            {
                "coord": [
                    13,
                    12
                ],
                "label": "set4",
                "color": "yellow"
            },
            {
                "coord": [
                    17,
                    10
                ],
                "label": "set4",
                "color": "yellow"
            },
            {
                "coord": [
                    22,
                    16
                ],
                "label": "set4",
                "color": "yellow"
            },
            {
                "coord": [
                    5,
                    7
                ],
                "label": "set4",
                "color": "yellow"
            }
        ]
    ]
}
root.render(
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Page />}>
                ....
                <Route path={"/d3"} element={<D3Comp CORRECTLY_PASS_PROPS_TO_D3COMP/>}/>
                ....
            </Route>
        </Routes>
    </BrowserRouter>
)
