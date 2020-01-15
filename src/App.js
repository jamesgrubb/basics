import React, { useEffect, useState, useRef } from 'react'
import './App.css'
import Tracklist from './TrackList'
import { MusicPlayerProvider } from './MusicPlayerContext'
import { Player } from 'tone'
import Canvas from './components/Canvas'
function App() {
	const player = useRef(null)

	// useEffect(()=>{
	//   player.current =
	// })

	return (
		<MusicPlayerProvider>
			<div className='container'>
				<div className='columns'>
					<div className='column is-one-quarter'></div>
					<div className='column is-three-quarters'>
						<Tracklist />
					</div>
				</div>
				<Canvas />
			</div>
		</MusicPlayerProvider>
	)
}

export default App
