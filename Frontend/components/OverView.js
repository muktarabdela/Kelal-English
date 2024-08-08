import React from 'react'

const OverView = ({ hederText, description }) => {
    return (
        <div>
            <nav className="text-sm text-neutral-500 mb-3">
                Learn / phase / week / day
            </nav>
            <div id="webcrumbs" className=" bg--50 rounded-lg  mb-6">
                <h1 className="text-3xl font-title font-bold text-neutral-900"> {hederText}
                </h1>
                <p className="mt-2 text-neutral-700"> {description}</p>
            </div>
        </div>
    )
}

export default OverView