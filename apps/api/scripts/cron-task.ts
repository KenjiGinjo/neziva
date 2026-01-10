import { ds } from 'db'

async function CronTask() {
  await ds.characterCrowdfunding.runCheckAndUpdate()
  await ds.characterVote.runCheckAndUpdate()
  await ds.notification.runHandleSystemEvent()
}

CronTask()
