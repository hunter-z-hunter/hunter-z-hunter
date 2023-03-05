import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { HuntAdded } from "../generated/schema"
import { HuntAdded as HuntAddedEvent } from "../generated/HunterZHunter/HunterZHunter"
import { handleHuntAdded } from "../src/hunter-z-hunter"
import { createHuntAddedEvent } from "./hunter-z-hunter-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let huntId = "Example string value"
    let name = "Example string value"
    let prize = BigInt.fromI32(234)
    let endTime = BigInt.fromI32(234)
    let target = "Example string value"
    let newHuntAddedEvent = createHuntAddedEvent(
      huntId,
      name,
      prize,
      endTime,
      target
    )
    handleHuntAdded(newHuntAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("HuntAdded created and stored", () => {
    assert.entityCount("HuntAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "HuntAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "huntId",
      "Example string value"
    )
    assert.fieldEquals(
      "HuntAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "HuntAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "prize",
      "234"
    )
    assert.fieldEquals(
      "HuntAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "endTime",
      "234"
    )
    assert.fieldEquals(
      "HuntAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "target",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
