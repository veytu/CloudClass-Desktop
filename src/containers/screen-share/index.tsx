import { useStore } from '@classroom/hooks/ui-store';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import './index.css';
import { CSSProperties, useEffect, useRef } from 'react';
import { EduStream } from 'agora-edu-core';
import { AGRenderMode } from 'agora-rte-sdk';

export const ScreenShareContainerMobile = observer(() => {
  const {
    shareUIStore: { isLandscape },
    boardUIStore: { boardContainerHeight },
    streamUIStore: { screenShareStream },
  } = useStore();

  const remotecls = classnames('remote-screen-share-container', 'fcr-t-0', {
    'remote-screen-share-container-landscape': isLandscape,
  });

  return screenShareStream ? (
    <div className={remotecls} style={{ height: boardContainerHeight }}>
      <ScreenShareRemoteTrackPlayer stream={screenShareStream} />
    </div>
  ) : null;
});
export const ScreenShareRemoteTrackPlayer = observer(
  ({
    style,
    stream,
    className,
  }: {
    style?: CSSProperties;
    stream: EduStream;
    className?: string;
  }) => {
    const {
      streamUIStore,
      classroomStore: {
        streamStore: { muteRemoteVideoStream },
      },
    } = useStore();
    const { setupRemoteVideo } = streamUIStore;

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (ref.current) {
        muteRemoteVideoStream(stream, false);
        setupRemoteVideo(stream, ref.current, false, AGRenderMode.fit);
      }
      return () => {
        muteRemoteVideoStream(stream, true);
      };
    }, [ref.current, stream]);

    return (
      <div
        style={{ width: '100%', height: '100%', ...style }}
        className={className}
        ref={ref}></div>
    );
  },
);
