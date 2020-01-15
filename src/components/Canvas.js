import React, { useContext, useRef, useEffect } from 'react'
import { MusicPlayerContext } from '../MusicPlayerContext'
import { scaleLinear } from 'd3'
import './canvas.scss'
const Canvas = (props) => {
	const cnvRef = useRef()
	const ctx = useRef()

	const [state, setState] = useContext(MusicPlayerContext)

	useEffect(() => {
		const lineWidth = 50
		const arrayLength = state.value.length

		const size = 500
		const canvas = document.querySelector('canvas')
		canvas.width = size * 2
		canvas.height = size

		ctx.current = cnvRef.current.getContext('2d')
		var gradient = ctx.current.createLinearGradient(0, 0, 170, 0)
		gradient.addColorStop('0', 'magenta')
		gradient.addColorStop('0.5', 'blue')
		gradient.addColorStop('1.0', 'red')

		ctx.current.save()

		// var img = new Image()
		// img.onload = function() {
		// 	img.naturalWidth = size
		// 	img.naturalHeight = size
		// 	ctx.current.beginPath()
		// 	ctx.current.rect(size / 2 - 50, size / 2 - 50, 100, 100)
		// 	var items = 10
		// 	var r = 200

		// 	ctx.current.moveTo(size * 1.5 + r, size / 2)
		// 	for (var i = 0; i < items; i++) {
		// 		var x = size * 1.5 + r * Math.cos((2 * Math.PI * i) / items)
		// 		var y = size / 2 + r * Math.sin((2 * Math.PI * i) / items)
		// 		ctx.current.lineTo(x, y)
		// 	}
		// 	ctx.current.closePath()

		// 	ctx.current.clip()
		// 	ctx.current.globalCompositeOperation = 'lighten'
		// 	ctx.current.drawImage(img, 0, 0)
		// 	ctx.current.arc(0, 0, 60, 0, Math.PI * 2, true)
		// }

		// img.src = `https://images.unsplash.com/photo-1524843496980-e84a553ed501?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=900`

		ctx.current.restore()

		//Save
		ctx.current.save()

		ctx.current.beginPath()
		ctx.current.strokeStyle = gradient
		ctx.current.lineWidth = lineWidth

		ctx.current.setLineDash([0, 90])
		ctx.current.lineDashOffset = 10
		ctx.current.lineCap = 'round'
		ctx.current.setTransform(1, 0, 0, 1, lineWidth / 2, 0)
		state.value.map((value, index) => {
			const x = scaleLinear()
				.domain([0, arrayLength / 2])
				.range([0, size])
			const y = scaleLinear()
				.domain([0, size])
				.range([0, value * 10])
			ctx.current.moveTo(x(index), size)
			console.log(y(value))
			ctx.current.lineTo(x(index), y(value))
		})

		ctx.current.stroke()
		// ctx.current.strokeStyle='hsla(224, 92%, 55%, 0.5)'
		ctx.current.strokeStyle = 'hsla(224, 92%, 55%, 0.5)'
		ctx.current.lineWidth = 3

		ctx.current.setLineDash([30, 30])
		ctx.current.lineDashOffset = 10
		ctx.current.lineCap = 'square'
		ctx.current.setTransform(1, 0, 0, 1, lineWidth / 2, 0)
		state.value.map((value, index) => {
			const x = scaleLinear()
				.domain([0, arrayLength])
				.range([0, size])
			const y = scaleLinear()
				.domain([0, index])
				.range([0, size])
			ctx.current.moveTo(x(index), size)
			console.log(y(value))
			ctx.current.lineTo(x(index), y(value))
		})

		ctx.current.stroke()
		ctx.current.restore()
	})

	return <canvas ref={cnvRef} />
}

export default Canvas
