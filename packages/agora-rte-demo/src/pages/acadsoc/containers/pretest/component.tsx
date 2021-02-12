import { InputLabel, MenuItem, Select, Theme, withStyles } from '@material-ui/core'
import { DevicePicker, Volume, VolumeDirectionEnum } from 'agora-aclass-ui-kit'
import React, { useCallback, useRef } from 'react'
import styles from './style.module.scss'
import CustomIconArrow from './assets/rectangle.png'
import { RendererPlayer } from '@/components/media-player'
import { SpeakerDeviceVolume } from '../pretest'

interface PretestButtonProps {
  text: string
  active?: boolean
  type: string
  onClick: (type: string) => any
}

export const PretestButton: React.FC<PretestButtonProps> = (props) => {

  const mapping = {
    ['video']: styles.video,
    ['audio']: styles.audio,
    ['speaker']: styles.speaker,
  }

  const classKey = mapping[props.type]

  return (
    <div className={props.active ? styles.buttonItem : styles.buttonItemActive} onClick={() => {
      props.onClick(props.type)
    }}>
      <div className={styles.icon}>
        <div className={classKey}></div>
      </div>
      <div className={styles.font}>
        {props.text}
      </div>
    </div>
  )
}

export interface PretestHeaderProps {
  title: string
}

export const PretestHeader: React.FC<PretestHeaderProps> = (props) => {
  return (
    <span className={styles.header}>
      {props.title}
    </span>
  )
}

const AClassSelect = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: 0,
    minWidth: '100%',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    height: 30,
    '&$selected': { // <-- mixing the two classes
      backgroundColor: 'transparent'
    },
    '& .MuiSelect-select': {
      padding: 0,
      backgroundColor: '#000000',
      '&:focus': {
        backgroundColor: '#000000'
      }
    },
  },
  select: {
    '&$selected': {
      backgroundColor: 'transparent'
    },
    '&.MuiSelect-select': {
      padding: 0,
      backgroundColor: 'transparent',
      '&:focus': {
        backgroundColor: 'transparent'
      }
    },
  }
}))(Select);

export type DeviceSelectItemType = {
  label: string,
  deviceId: string
}

export interface DeviceSelectProps {
  name: string,
  value: any,
  defaultValue?: any,
  onChange: (evt: any) => any,
  list: DeviceSelectItemType[],
  id?: string,
  selectStyle?: React.CSSProperties,
  pickerStyle?: React.CSSProperties,
}

export const DeviceSelect: React.FC<DeviceSelectProps> = (props) => {
  return (
    <div className={styles.selectItem}>
      <InputLabel
        style={{
          color: '#002591',
          fontSize: '16px',
          // marginRight: '13px'
        }}
        id={props.id}
      >{props.name}</InputLabel>
      <div className={styles.select}>
        <AClassSelect
          //@ts-ignore
          // IconComponent={
          //   <>
          //     <img src={CustomIconArrow} />
          //   </>
          // }
          defaultValue={props.defaultValue}
          disableUnderline
          variant="standard"
          labelId={props.id}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          style={{
            paddingRight: '24px',
            width: '100%',
          }}
          inputProps={{
            style: {}
          }}
        >
          {props.list.map((item: any, idx: number) => (
            <MenuItem key={idx} value={item.deviceId}>{item.label}</MenuItem>
          ))}
        </AClassSelect>
      </div>
    </div>
  )
}

export const MediaDetect: React.FC<any> = (props) => {
  return (
    <DeviceSelect
      name="摄像头选项："
      value={0}
      onChange={() => {

      }}
      list={[
        {
          deviceId: 'unknown',
          label: '禁用',
        },
        {
          deviceId: '1',
          label: '设备1'
        },
        {
          deviceId: '2',
          label: '设备2'
        },
        {
          deviceId: '3',
          label: '设备3'
        },
      ]}
    />
  )
}

export interface CameraPreviewProps {
  renderer?: any
  previewPlaceText: string
  id: string
}

export const CameraPreview: React.FC<CameraPreviewProps> = (props) => {
  return (
    <RendererPlayer
      className={styles.rendererPlaceholder}
      key={props.renderer && props.renderer.videoTrack ? props.renderer.videoTrack.getTrackId() : ''}
      track={props.renderer}
      id={props.id}
      placeholderComponent={
        <div className={styles.placeholder}>
          <div className={styles.camIcon}></div>
          <div className={styles.text}>
            {props.previewPlaceText}
          </div>
        </div>
      }
    />
  )  
}

export interface PretestMediaDetectBaseProps {
  label: string,
  value: any,
  list: DeviceSelectItemType[],
  onChange: (type: any) => any,
  noText: string,
  yesText: string,
  onNo: () => any,
  onYes: () => any,
  detectText?: string,
}

export interface PretestVideoDetectProps extends PretestMediaDetectBaseProps {
  renderer?: any,
  // disableBtnGroup: boolean
}

export const VideoDetect: React.FC<PretestVideoDetectProps> = (props) => {
  return (
    <div className={styles.foreground}>
      <DeviceSelect
        name={props.label}
        value={props.value}
        onChange={props.onChange}
        list={props.list}
      />
      <div className={styles.detectPosition}>
        <CameraPreview
          id={'camera'}
          previewPlaceText="请保持微笑哦~"
          renderer={props.renderer}
        />
      </div>
      <BottomButtonGroup
        // disable={props.disableBtnGroup}
        detectText={props.detectText}
        noText={props.noText}
        yesText={props.yesText}
        onNo={props.onNo}
        onYes={props.onYes}
      />
    </div>
  )
}

export const DetectNoticeText: React.FC<any> = (props) => {
  return (
    <div className={styles.detectText}>
      {props.text}
    </div>
  )
}

export const ReportBottomButtonGroup: React.FC<any> = (props) => {
  return (
    <div className={styles.btnGroup}>
      <div className={props.swapYes ? styles.no : styles.yes} onClick={props.onYes}>
        {props.yesText}
      </div>
      <div className={props.swapYes ? styles.yes : styles.no}  onClick={props.onNo}>
        {props.noText}
      </div>
    </div>
  )
}

export const BottomButtonGroup: React.FC<any> = (props) => {
  return (
    <div className={styles.btnGroup}>
      {props.detectText ? <DetectNoticeText text={props.detectText} /> : null}
      <div className={styles.no} onClick={props.onNo}>
        <div className={styles.icon}></div>
        {props.noText}
      </div>
      <div className={styles.yes} onClick={props.onYes}>
        <div className={styles.icon}></div>
        {props.yesText}
      </div>
    </div>
  )
}

export interface PretestAudioDetectProps extends PretestMediaDetectBaseProps {
  volume?: number,
  // disableBtnGroup: boolean
}

export const AudioDetect: React.FC<PretestAudioDetectProps> = (props) => {

  // TODO: need more test volume indicator
  const volume = props.volume ? (props.volume * 100) % 25 : 0

  return (
    <div className={styles.foreground}>
      <DeviceSelect
        name={props.label}
        value={props.value}
        onChange={props.onChange}
        list={props.list}
      />
      <div className={styles.positionVolume}>
        <div className={styles.iconVolume}></div>
        <Volume
          currentVolume={volume}
          width={'5px'}
          height={'35px'}
          maxLength={25}
          direction={VolumeDirectionEnum.Right}
        />
      </div>
      <BottomButtonGroup
        // disable={props.disableBtnGroup}
        detectText={props.detectText}
        noText={props.noText}
        yesText={props.yesText}
        onNo={props.onNo}
        onYes={props.onYes}
      />
    </div>
  )
}

export interface PretestSpeakerDetectProps extends PretestMediaDetectBaseProps {
  url?: string,
  // disableBtnGroup: boolean
}

export const SpeakerDetect: React.FC<PretestSpeakerDetectProps> = (props) => {

  const audioRef = useRef<any>(null)

  const paused = useRef<any>(false)

  const handlePlay = () => {
    if (audioRef.current) {
      if (!paused.current) {
        audioRef.current.play()
        paused.current = true
      } else {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        paused.current = false
      }
    }
  }

  return (
    <div className={styles.foreground}>
      <DeviceSelect
        name={props.label}
        value={props.value}
        onChange={props.onChange}
        list={props.list}
      />
      <div className={styles.positionSpeaker}>
        <div className={styles.iconPlay} onClick={handlePlay}></div>
        <audio ref={audioRef} src={props.url}></audio>
      </div>
      <BottomButtonGroup
        // disable={props.disableBtnGroup}
        detectText={props.detectText}
        noText={props.noText}
        yesText={props.yesText}
        onNo={props.onNo}
        onYes={props.onYes}
      />
      {/* <div class></div> */}
    </div>
  )
}

export interface TestReportProps extends PretestMediaDetectBaseProps {
  result: boolean,
  resultText: string,
  videoText: string,
  video: boolean,
  audioText: string,
  audio: boolean,
  speakerText: string,
  speaker: boolean,
}

export const TestReport: React.FC<any> = (props) => {
  return (
    <div className={styles.foreground}>
      <div className={styles.textReport}>
        <div className={styles.resultHeader}>
          <div className={props.result ? styles.smile : styles.bad}></div>
          <div className={props.text}>
            {props.resultText}
          </div>
        </div>
        <div className={styles.resultContent}>
          <div className={styles.resultItem}>
            <div className={props.video ? styles.detectVideo : styles.detectFail}></div>
            <div className={props.video ? styles.result : styles.resultFailText}>
              {props.videoText}
            </div>
          </div>
          <div className={styles.resultItem}>
            <div className={props.audio ? styles.detectAudio : styles.detectFail}></div>
            <div className={props.audio ? styles.result : styles.resultFailText}>
              {props.audioText}
            </div>
          </div>
          <div className={styles.resultItem}>
            <div className={props.speaker ? styles.detectSpeaker : styles.detectFail}></div>
            <div className={props.speaker ? styles.result : styles.resultFailText}>
              {props.speakerText}
            </div>
          </div>
        </div>
      </div>
      <ReportBottomButtonGroup
        swapYes={props.result}
        noText={props.noText}
        yesText={props.yesText}
        onNo={props.onNo}
        onYes={props.onYes}
      />
    </div>
  )
}

export const PretestNativeComponent = () => {
  return (
    <div></div>
  )  
}