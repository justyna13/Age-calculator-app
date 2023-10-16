import { describe, expect } from "vitest";
import { mount } from "@vue/test-utils";
import CalculatorForm from "../src/components/CalculatorForm.vue";

describe("CalculatorForm", () => {
  const wrapper = mount(CalculatorForm)
  it("On button click, no values entered - inputs should  be invalid", async () => {
    await wrapper.get("button").trigger("click");

    // There should be 3 invalid inputs
    const invalidInputs = wrapper.findAll("input.invalid");
    expect(invalidInputs.length).toBe(3);

    const validInputs = wrapper.findAll("input:not(.invalid)");
    expect(validInputs.length).toBe(0);
  })

  it("Input day no error msg displayed when correct value entered", async () => {
    const dayInput = wrapper.find("#age-day");
    expect(dayInput.exists()).toBe(true);

    await dayInput.setValue(2)
    const dayInputErrorMsg = wrapper.find(".input-error--day");
    expect(dayInputErrorMsg.exists()).toBe(false);
  })

  it("Input day show error msg when entered string", async () => {
    const dayInput = wrapper.find("#age-day");
    await dayInput.setValue("ads");

    const dayInputErrorMsg = wrapper.find(".input-error--day");
    expect(dayInputErrorMsg.text()).contain("Entered value is invalid");
  })

  it("Input day show error msg when entered float", async () => {
    const dayInput = wrapper.find("#age-day");
    await dayInput.setValue(21.2)
    const dayInputErrorMsg = wrapper.find(".input-error--day");
    expect(dayInputErrorMsg.text()).contain("Entered value is invalid");
  })

  it("Input day show error msg when entered number < 0", async () => {
    const dayInput = wrapper.find("#age-day");
    await dayInput.setValue(-1);
    const dayInputErrorMsg = wrapper.find(".input-error--day");
    expect(dayInputErrorMsg.text()).contain("Entered value is invalid");
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
