import React, { useEffect, useMemo, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import styles from './style.module.scss'
import { Nav } from './containers/nav'
import { BoardView } from './containers/board'
import { useRoomStore, useAppStore, useUIStore, useBoardStore } from '@/hooks'
import { useHistory } from 'react-router-dom'
import { Loading } from '@/components/loading'
import { AutoplayToast } from '@/components/autoplay-toast'
import {Trophy} from './containers/trophy/trophy'
import { Setting } from '@/pages/acadsoc/containers/setting';
import { RightContainer } from '@/pages/acadsoc/containers/right-container'
import { reportService } from '@/services/report-service'
import { GenericError, EduLogger } from 'agora-rte-sdk'
import { dialogManager } from 'agora-aclass-ui-kit'
import { t } from '@/i18n'
import { BusinessExceptions } from '@/utils/biz-error'

export const AcadsocOneToOne = observer(() => {

  const history = useHistory()
  const appStore = useAppStore()
  const uiStore = useUIStore()
  const roomStore = useRoomStore()
  const boardStore = useBoardStore()

  const handleJoinFail = async (err:GenericError) => {
    try {
      await appStore.destroy()
    } catch (err) {
      EduLogger.info(" appStore.destroyRoom ", err.message)
    }
    dialogManager.show({
      text: BusinessExceptions.getReadableText(err.errCode),
      showConfirm: true,
      showCancel: false,
      confirmText: t('aclass.confirm.yes'),
      visible: true,
      cancelText: t('aclass.confirm.no'),
      onConfirm: async () => {
        await appStore.destroyRoom()
        // uiStore.unblock()
        // history.push('/')
      }
    })
    appStore.uiStore.stopLoading()
    return
  }

  useEffect(() => {
    if (appStore.userRole < 0) {
      uiStore.unblock()
      history.push('/')
      return
    }
    roomStore.setHistory(history)
    // REPORT
    reportService.startTick('joinRoom', 'end')
    roomStore.join().then(() => {
      reportService.reportElapse('joinRoom', 'end', {result: true})
    }).catch(e => {
      console.log(" roomStore#join ", e)
      reportService.reportElapse('joinRoom', 'end', {result: false, errCode: `${e.message}`})
      handleJoinFail(e)
    })
  }, [])

  return (
    <div className={styles.container}>
      <>
        {uiStore.loading ? <Loading /> : null}
        <AutoplayToast />
      </>
      <Nav />
      <div className={!boardStore.isFullScreen ? styles.flexBox : styles.fullScreen}>
        <div className={styles.mainContainer}>
          <BoardView />
          <Trophy></Trophy>
          <div className={styles.rightContainer}>
            <RightContainer/>
          </div>
        </div>   
      </div>
      <Setting />
    </div>
  )
})