import React, { useState, useRef } from 'react';
import 'antd/dist/antd.css';
import './player.scss';
import ReactPlayer from 'react-player';
import Controls from './Controls';
import screenful from 'screenfull';

const format = seconds => {
	if (isNaN(seconds)) {
		return `00:00`;
	}
	const date = new Date(seconds * 1000);
	const hh = date.getUTCHours();
	const mm = date.getUTCMinutes();
	const ss = date.getUTCSeconds().toString().padStart(2, '0');
	if (hh) {
		return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
	}
	return `${mm}:${ss}`;
};

let count = 0;

function VideoPlayer() {
	const [showControls, setShowControls] = useState(false);
	const [timeDisplayFormat, setTimeDisplayFormat] = useState('normal');
	const [state, setState] = useState({
		pip: false,
		playing: false,
		controls: false,
		light: false,
		muted: false,
		played: 0,
		duration: 0,
		playbackRate: 1.0,
		volume: 1,
		loop: false,
		seeking: false,
		fullscreen: false,
	});

	const playerRef = useRef(null);
	const playerContainerRef = useRef(null);
	const controlsRef = useRef(null);
	const { playing, controls, light, muted, loop, playbackRate, pip, played, seeking, volume, fullscreen } = state;

	const handlePlayPause = () => {
		setState({ ...state, playing: !state.playing });
	};

	const handleRewind = () => {
		playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
	};

	const handleFastForward = () => {
		playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
	};

	const handleProgress = changeState => {
		if (count > 3) {
			controlsRef.current.style.visibility = 'hidden';
			controlsRef.current.style.transition = 'all 0.4s ease-in-out';
			controlsRef.current.style.opacity = 0;
			count = 0;
		}
		if (controlsRef.current.style.visibility == 'visible') {
			count += 1;
		}
		if (!state.seeking) {
			setState({ ...state, ...changeState });
		}
	};

	const handleSeekChange = newValue => {
		console.log({ newValue });
		setState({ ...state, played: parseFloat(newValue / 100) });
	};

	const handleSeekMouseDown = () => {
		setState({ ...state, seeking: true });
	};

	const handleSeekMouseUp = newValue => {
		setState({ ...state, seeking: false });
		playerRef.current.seekTo(newValue / 100, 'fraction');
	};

	const handleDuration = duration => {
		setState({ ...state, duration });
	};

	const handleVolumeSeekDown = newValue => {
		setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
	};
	const handleVolumeChange = newValue => {
		console.log(newValue);
		setState({
			...state,
			volume: parseFloat(newValue / 100),
			muted: newValue === 0 ? true : false,
		});
	};

	const toggleFullScreen = () => {
		screenful.toggle(playerContainerRef.current);
		setState({ ...state, fullscreen: !state.fullscreen });
	};

	const handleMouseMove = () => {
		controlsRef.current.style.visibility = 'visible';
		controlsRef.current.style.transition = 'all 0.4s ease-in-out';
		controlsRef.current.style.opacity = 1;
		count = 0;
	};

	const hanldeMouseLeave = () => {
		controlsRef.current.style.visibility = 'hidden';
		controlsRef.current.style.transition = 'all 0.4s ease-in-out';
		controlsRef.current.style.opacity = 0;
		count = 0;
	};

	const handlePlaybackRate = rate => {
		setState({ ...state, playbackRate: rate });
	};

	const hanldeMute = () => {
		setState({ ...state, muted: !state.muted });
	};

	const currentTime = playerRef && playerRef.current ? playerRef.current.getCurrentTime() : '00:00';

	const duration = playerRef && playerRef.current ? playerRef.current.getDuration() : '00:00';
	const elapsedTime = timeDisplayFormat == 'normal' ? format(currentTime) : `-${format(duration - currentTime)}`;

    const totalDuration = format(duration);
    const remainingTime = format(duration - currentTime);

	return (
		<div onMouseMove={handleMouseMove} onMouseLeave={hanldeMouseLeave} ref={playerContainerRef} className='player-wrapper'>
			<ReactPlayer
				ref={playerRef}
				width='100%'
				height='100%'
				url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
				pip={pip}
				playing={playing}
				controls={false}
				light={light}
				loop={loop}
				playbackRate={playbackRate}
				volume={volume}
				muted={muted}
				onProgress={handleProgress}
			/>
			<Controls
				ref={controlsRef}
				onSeek={handleSeekChange}
				onSeekMouseDown={handleSeekMouseDown}
				onSeekMouseUp={handleSeekMouseUp}
				onDuration={handleDuration}
				onRewind={handleRewind}
				onPlayPause={handlePlayPause}
				onFastForward={handleFastForward}
				playing={playing}
				played={played}
				elapsedTime={elapsedTime}
                totalDuration={totalDuration}
                remainingTime={remainingTime}
				onMute={hanldeMute}
				muted={muted}
				onVolumeChange={handleVolumeChange}
				onVolumeSeekDown={handleVolumeSeekDown}
				playbackRate={playbackRate}
				onPlaybackRateChange={handlePlaybackRate}
				onToggleFullScreen={toggleFullScreen}
				volume={volume}
				fullscreen={fullscreen}
				videoDetails={
					<div>
						<div className='video-title'>Big Buck Bunny</div>
						<div className='video-caption'>Comedy</div>
					</div>
				}
			/>
		</div>
	);
}

export default VideoPlayer;
