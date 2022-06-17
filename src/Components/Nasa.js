import React, {Component, useState} from 'react'

class NasaClass extends Component {
    constructor(props) {
        super(props);

        this.state = {description: "", url: ""}

    }

    updateState = (desc, url) => {
        this.setState({description: desc, url: url})
    }

    getImage = () => {
        const api = "MZwupgqfb2TSs5fb582TMbtyLSfhqy5CBiJRdzGB"
        const url = `https://api.nasa.gov/planetary/apod?api_key=${api}`
        fetch(url).then(response => response.json())
            .then(data => this.updateState(data.explanation, data.url))
    }

    render() {
        return(
            <div>
                <button onClick={this.getImage}>Get Image</button>
                <img src={this.state.url} alt={'Nasa apod api'}/>
                <section>
                    <p>{this.state.description}</p>
                </section>
            </div>
        )
    }
}

function NasaFunction(){
    const[desc, setDesc] = useState("")
    const[url, setUrl] = useState("")

    const getImage = () => {
        const api = "MZwupgqfb2TSs5fb582TMbtyLSfhqy5CBiJRdzGB"
        const url = `https://api.nasa.gov/planetary/apod?api_key=${api}`
        fetch(url).then(response => response.json())
            .then(data => {
                setDesc(data.explanation)
                setUrl(data.url)
            })
    }
    return(
        <div>
            <button onClick={getImage}>Get Image</button>
            <img src={url} alt={'Nasa apod api'}/>
            <section>
                <p>{desc}</p>
            </section>
        </div>
    )

}

export {NasaFunction, NasaClass}