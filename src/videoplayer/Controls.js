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
			videoDetails,
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
					<div className='controls-icons_wrapper'>
						<div className='left_section'>
							{playing ? <PauseOutlined onClick={onPlayPause} className='controls-icon play-pause-icon' /> : <CaretRightOutlined onClick={onPlayPause} className='controls-icon play-pause-icon' />}
							<span className='valume-wrapper'>
								{muted ? <SoundFilled onClick={onMute} className='controls-icon valume-icon' /> : <SoundOutlined onClick={onMute} className='controls-icon valume-icon' />}
								<Slider
									min={0}
									max={100}
									value={muted ? 0 : volume * 100}
									onChange={onVolumeChange}
									onMouseDown={onSeekMouseDown}
									onAfterChange={onVolumeSeekDown}
									defaultValue={100}
									tooltipVisible={false}
									vertical={false}
								/>
							</span>
							<span className='speed-rate-wrapper'>
								<img src={MeterIcon} alt='' className='controls-icon meter-icon' />
								<span className='controls-text'>Speed ({playbackRate}x)</span>
								<div className='speed-rate-container'>
									<ul>
										{[0.5, 1, 1.5, 2].map(rate => (
											<li key={rate} onClick={() => onPlaybackRateChange(rate)}>
												{rate === playbackRate ? <span className='speed-rate-active'>{rate}x</span> : <span>{rate}x</span>}
											</li>
										))}
									</ul>
								</div>
							</span>
							<span onClick={onRewind} className='controls-icon svg-icons'>
								<img src={RewindIcon} alt='' className='rewind-icon' />
								<span className='caption'>10</span>
							</span>
							<span onClick={onFastForward} className='controls-icon svg-icons'>
								<img src={ForwardIcon} alt='' className='forward-icon' />
								<span className='caption'>10</span>
							</span>
						</div>
						<div className='middle_section'>
							<div className='controls-icon play-next'>
								<StepForwardOutlined />
								<span className='controls-text'>Next Video</span>
							</div>
						</div>
						<div className='right_section'>
                            <div className='video-quality'>
                                <span className='quality-badge'>HD</span>
                                <span className='controls-text'>Quality</span>
                            </div>
							<FullscreenOutlined onClick={onToggleFullScreen} className='controls-icon screen-icon' />
							{/* <FullscreenExitOutlined onClick={onToggleFullScreen} className='controls-icon screen-icon' /> */}
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
};

export default Controls;
