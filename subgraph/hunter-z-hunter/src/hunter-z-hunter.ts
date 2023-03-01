import {
  HuntAdded as HuntAddedEvent,
  PrizeWon as PrizeWonEvent
} from "../generated/HunterZHunter/HunterZHunter"
import { HuntAdded, PrizeWon } from "../generated/schema"

export function handleHuntAdded(event: HuntAddedEvent): void {
  let entity = new HuntAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.huntId = event.params.huntId
  entity.name = event.params.name
  entity.prize = event.params.prize
  entity.endTime = event.params.endTime
  entity.target = event.params.target

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePrizeWon(event: PrizeWonEvent): void {
  let entity = new PrizeWon(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.huntId = event.params.huntId
  entity.winner = event.params.winner
  entity.prize = event.params.prize

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
