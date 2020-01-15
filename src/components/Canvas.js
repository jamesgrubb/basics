import React, { useContext, useRef, useEffect } from 'react'
import { MusicPlayerContext } from '../MusicPlayerContext'
import './canvas.scss'
const Canvas = (props) => {
	const cnvRef = useRef()
	const ctx = useRef()
	const RAF = useRef(null)
	const [state, setState] = useContext(MusicPlayerContext)
	useEffect(() => {
		const loop = () => {
			RAF.current = requestAnimationFrame(loop)
			ctx.current = cnvRef.current.getContext('2d')
		}

		loop()

		return () => cancelAnimationFrame(RAF.current)
	})

	return <canvas ref={cnvRef} />
}

export default Canvas
