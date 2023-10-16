import { describe, expect } from "vitest";
import { mount } from "@vue/test-utils";
import CalculatorForm from "../src/components/CalculatorForm.vue";

describe("CalculatorForm", () => {
  const wrapper = mount(CalculatorForm)
  it("On button click, no values entered - inputs should  be invalid", async () => {
    await wrapper.get("button").trigger("click");

    // There should be 3 invalid inputs
    const invalidInputs = wrapper.findAll("input.invalid")
    expect(invalidInputs.length).toBe(3)

    // There should not be any valid inputs
    const validInputs = wrapper.findAll("input:not(.invalid)")
    expect(validInputs.length).toBe(0)
  })

  it("Input border is red when class invalid", () => {
  })

  it("Input border is gray when no class invalid", () => {

  })

  it("Input day show error msg when entered string", () => {

  })

  it("Input day show error msg when entered float", () => {

  })

  it("Input day show error msg when entered number < 0", () => {

  })

  it("Future date entered, day only - input day shows error", () => {

  })

  it("Future date entered, month - input month shows error", () => {

  })

  it("Future date entered, year - input year shows error", () => {

  })

  it("Entered month > 12, month input shows error", () => {

  })

  it("Entered day > 31, day input shows error", () => {

  })
})
