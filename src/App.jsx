import { useState } from 'react';

import Header from './components/Header';
import LocationIcon from './components/LocationIcon';
import SearchButton from './components/SearchButton';

import './App.css';

const API_KEY = '401e18073a627dbae370a0b3eba5d2f3';

function App() {
	let [currentData, setCurrentData] = useState([]);
	const [weatherIcon, setWeatherIcon] = useState('');
	const [userInput, setUserInput] = useState('');

	function fetchData() {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=metric&appid=${API_KEY}`
		)
			.then(res => {
				if (res.ok) return res.json();

				throw new Error('404');
			})
			.then(data => {
				setCurrentData((currentData = data));
				settingWeatherIcon();
				console.log(currentData);
			})
			.catch(err => {
				console.log(err);
				setWeatherIcon(null);
			});
	}

	function settingWeatherIcon() {
		switch (currentData.weather[0].main) {
			case 'Clear':
				setWeatherIcon('clear.png');
				break;
			case 'Clouds':
				setWeatherIcon('cloud.png');
				break;
			case 'Rain':
				setWeatherIcon('rain.png');
				break;
			case 'Snow':
				setWeatherIcon('snow.png');
				break;
			case 'Storm':
				setWeatherIcon('storm.png');
				break;
			case 'Mist':
				setWeatherIcon('mist.png');
				break;
			default:
				setWeatherIcon('error.png');
		}
	}

	return (
		<>
			<Header />
			<div className='card-container'>
				<form
					onSubmit={e => {
						e.preventDefault();
						fetchData();
					}}
					className='card-header'
				>
					<LocationIcon />
					<input
						type='text'
						className='card-searching-input'
						placeholder='enter your location'
						onChange={e => setUserInput(e.target.value)}
					/>
					<SearchButton fetchData={fetchData} />
				</form>
				<div className='weather-details-container'>
					{weatherIcon ? (
						<>
							<img
								src={'./src/assets/weather/' + weatherIcon}
								alt=''
								width='220'
								height='220'
							/>
							<span className='temperature-detail'>
								{currentData.main.temp.toFixed() + '°C'}
							</span>
							<span className='weather-description'>
								{currentData.weather[0].description}
							</span>
						</>
					) : (
						<img
							src='./src/assets/weather/error.png'
							alt=''
							width='325'
							height='250'
						/>
					)}
				</div>
				<div className='advanced-details-container'>
					{weatherIcon && (
						<>
							<div className='humidity-detail-wrapper'>
								<div className='humidity-section-1'>
									<img
										src='./src/assets/weather/humidity.png'
										alt=''
										width='40'
										height='40'
									/>
									<span>{currentData.main.humidity + '%'}</span>
								</div>
								<div className='humidity-section-2'>
									<span>humidity</span>
								</div>
							</div>
							<div className='wind-speed-detail-wrapper'>
								<div className='wind-speed-section-1'>
									<img
										src='./src/assets/weather/wind.png'
										alt=''
										width='40'
										height='40'
									/>
									<span>{currentData.wind.speed + 'Km/h'}</span>
								</div>
								<div className='wind-speed-section-2'>
									<span>wind speed</span>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default App;
