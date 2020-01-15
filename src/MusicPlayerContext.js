import React, { useState } from 'react'
const MusicPlayerContext = React.createContext([{}, () => {}])

const MusicPlayerProvider = (props) => {
	const [state, setState] = useState({
		isLoaded: false,
		tracks: [
			{
				name: 'Go For Landing',
				url:
					'https://res.cloudinary.com/makingthings/video/upload/v1576483365/mp3/jg_bd_2018.mp3',
				image:
					'https://res.cloudinary.com/makingthings/image/upload/v1579080574/mp3/photo-1446941611757-91d2c3bd3d45.jpg'
			},
			{
				name: 'JG_BD_08',
				url:
					'https://res.cloudinary.com/makingthings/video/upload/v1576483365/mp3/jg_bd_2018.mp3',
				image:
					'https://res.cloudinary.com/makingthings/image/upload/v1579080725/mp3/photo-1488921618671-463b781ac428.jpg'
			}
		]
	})
	return (
		<MusicPlayerContext.Provider value={[state, setState]}>
			{props.children}
		</MusicPlayerContext.Provider>
	)
}

export { MusicPlayerProvider, MusicPlayerContext }
