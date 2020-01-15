import React, { useContext, useRef, useEffect } from 'react'
import { MusicPlayerContext } from './MusicPlayerContext'
import { Player, Buffer, FFT } from 'tone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

const Tracklist = () => {
	const fft = useRef(null)
	const player = useRef(null)
	const buffer = useRef(null)
	const [state, setState] = useContext(MusicPlayerContext)
	const RAF = useRef(null)
	useEffect(() => {
		fft.current = new FFT(256)
		buffer.current = new Buffer(state.tracks[0].url)
		Buffer.on('load', () => {
			player.current = new Player(buffer.current)
			console.log(player)
			player.current.fan(fft.current).toMaster()
			setState((state) => ({ ...state, isLoaded: true }))
		})
		Buffer.on('progress', () =>
			setState((state) => ({ ...state, loadingProgress: calcProgress() }))
		)
		function calcProgress() {
			let totalProgress = 0
			for (var i = 0; i < Buffer._downloadQueue.length; i++) {
				totalProgress += Buffer._downloadQueue[i].progress
			}
			return totalProgress / Buffer._downloadQueue.length
		}
		const loop = () => {
			RAF.current = requestAnimationFrame(loop)
			const value = fft.current.getValue()
			setState((state) => ({ ...state, value: value }))
		}

		loop()

		return () => cancelAnimationFrame(RAF.current)
	}, [])
	console.log(state.value)
	console.log(state.isLoaded)
	const handleClick = () => {
		player.current.start()
	}

	return (
		<>
			{state.tracks.map((track) => (
				<div className='box' style={{ '--loader': state.loadingProgress }}>
					<button
						disabled={!state.isLoaded}
						className={
							!state.isLoaded
								? 'button is-primary is-loading'
								: 'button is-primary'
						}
						onClick={handleClick}>
						<FontAwesomeIcon icon={faPlay} />
					</button>
					<div className='song-title'>{track.name}</div>
				</div>
			))}
		</>
	)
}

export default Tracklist
