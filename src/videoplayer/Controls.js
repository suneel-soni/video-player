import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'antd';
import { CaretRightOutlined, PauseOutlined, SoundOutlined, SoundFilled, FullscreenOutlined, StepForwardOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import MeterIcon from './images/meter.svg';
import RewindIcon from './images/rewind.svg';
import ForwardIcon from './images/forward.svg';

function ValueLabelComponent(props) {
	const { children, open, value } = props;

	return (
		<div open={open} enterTouchDelay={0} placement='top' title={value}>
			{value}
		</div>
	);
}

const Controls = forwardRef(
	(
		{
			onSeek,
			onSeekMouseDown,
			onSeekMouseUp,
			onDuration,
			onRewind,
			onPlayPause,
			onFastForward,
			playing,
			played,
			elapsedTime,
			totalDuration,
			remainingTime,
			onMute,
			muted,
			onVolumeSeekDown,
			playbackRate,
			onPlaybackRateChange,
			onToggleFullScreen,
			volume,
			onVolumeChange,
			fullscreen,
			videoDetails,
			playNextChapter,
		},
		ref
	) => {
		const [anchorEl, setAnchorEl] = useState(null);
		const handleClick = event => {
			setAnchorEl(event.currentTarget);
		};

		const handleClose = () => {
			setAnchorEl(null);
		};

		const open = Boolean(anchorEl);
		const id = open ? 'simple-popover' : undefined;
		return (
			<div ref={ref} className='controls-wrapper'>
				<div className='video-details-container'>{videoDetails}</div>
				<div onClick={onPlayPause} className='play-pouse-video' />
				<div className='controls-container'>
					<div className='progress-wrapper'>
						<span className='video-duration' style={{ marginRight: 5 }}>
							{elapsedTime}
						</span>
						<Slider
							min={0}
							max={100}
							tipFormatter={props => <ValueLabelComponent {...props} value={elapsedTime} />}
							value={played * 100}
							onChange={onSeek}
							onMouseDown={onSeekMouseDown}
							onAfterChange={onSeekMouseUp}
							onDuration={onDuration}
						/>
						<span className='video-duration' style={{ justifySelf: 'flex-end' }}>
							{remainingTime} {/* {totalDuration} */}
						</span>
					</div>

					<div className='player-controls'>
						<div className='left-section'>
							<button>{playing ? <PauseOutlined onClick={onPlayPause} /> : <CaretRightOutlined onClick={onPlayPause} />}</button>
							<button className='value-control-button'>
								{muted ? <SoundFilled onClick={onMute} /> : <SoundOutlined onClick={onMute} />}
								<div className='valume-control'>
									<Slider
										min={0}
										max={100}
										value={muted ? 0 : volume * 100}
										onChange={onVolumeChange}
										onMouseDown={onSeekMouseDown}
										onAfterChange={onVolumeSeekDown}
										defaultValue={100}
										tooltipVisible={false}
										vertical={true}
									/>
								</div>
							</button>
							<button className='speedometer-button'>
								<img src={MeterIcon} alt='' className='svg-icon-image' />
								<div className='speed-rate-container'>
									<ul>
										{[0.5, 1, 1.5, 2].map(rate => (
											<li key={rate} onClick={() => onPlaybackRateChange(rate)}>
												{rate === playbackRate ? <span className='speed-rate-active'>{rate}x</span> : <span>{rate}x</span>}
											</li>
										))}
									</ul>
								</div>
							</button>
							<div className='info-text-container'>
								<span className='controls-text'>Speed ({playbackRate}x)</span>
							</div>
							<button onClick={onRewind} className='rewind-forward-button'>
								<img src={RewindIcon} alt='' className='svg-icon-image rewind-forward-icon' />
								<span className='caption'>10</span>
							</button>
							<button onClick={onFastForward} className='rewind-forward-button'>
								<img src={ForwardIcon} alt='' className='svg-icon-image rewind-forward-icon' />
								<span className='caption'>10</span>
							</button>
						</div>
						<div className='middle-section'>
							<div onClick={playNextChapter} className='next-chapter-button'>
								<StepForwardOutlined />
								<span className='controls-text'>Next Chapter</span>
							</div>
						</div>
						<div className='right-section'>
							<div className='video-quality-button'>
								<span className='quality-badge'>HD</span>
								<span className='controls-text'>Quality</span>
							</div>
							<button onClick={onToggleFullScreen}>{fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
);

Controls.propTypes = {
	onSeek: PropTypes.func,
	onSeekMouseDown: PropTypes.func,
	onSeekMouseUp: PropTypes.func,
	onDuration: PropTypes.func,
	onRewind: PropTypes.func,
	onPlayPause: PropTypes.func,
	onFastForward: PropTypes.func,
	onVolumeSeekDown: PropTypes.func,
	onPlaybackRateChange: PropTypes.func,
	onToggleFullScreen: PropTypes.func,
	onMute: PropTypes.func,
	playing: PropTypes.bool,
	played: PropTypes.number,
	elapsedTime: PropTypes.string,
	totalDuration: PropTypes.string,
	muted: PropTypes.bool,
	playbackRate: PropTypes.number,
	fullscreen: PropTypes.bool,
};

export default Controls;
