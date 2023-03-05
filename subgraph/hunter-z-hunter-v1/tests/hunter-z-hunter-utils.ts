import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { HuntAdded, PrizeWon } from "../generated/HunterZHunter/HunterZHunter"

export function createHuntAddedEvent(
  huntId: string,
  name: string,
  prize: BigInt,
  endTime: BigInt,
  target: string
): HuntAdded {
  let huntAddedEvent = changetype<HuntAdded>(newMockEvent())

  huntAddedEvent.parameters = new Array()

  huntAddedEvent.parameters.push(
    new ethereum.EventParam("huntId", ethereum.Value.fromString(huntId))
  )
  huntAddedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  huntAddedEvent.parameters.push(
    new ethereum.EventParam("prize", ethereum.Value.fromUnsignedBigInt(prize))
  )
  huntAddedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )
  huntAddedEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromString(target))
  )

  return huntAddedEvent
}

export function createPrizeWonEvent(
  huntId: string,
  winner: Address,
  prize: BigInt
): PrizeWon {
  let prizeWonEvent = changetype<PrizeWon>(newMockEvent())

  prizeWonEvent.parameters = new Array()

  prizeWonEvent.parameters.push(
    new ethereum.EventParam("huntId", ethereum.Value.fromString(huntId))
  )
  prizeWonEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )
  prizeWonEvent.parameters.push(
    new ethereum.EventParam("prize", ethereum.Value.fromUnsignedBigInt(prize))
  )

  return prizeWonEvent
}
