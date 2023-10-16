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

  it("Future date entered, day only - input day shows error", async () => {
    const dayInput = wrapper.find("#age-day");
    const monthInput = wrapper.find("#age-month");
    const yearInput = wrapper.find("#age-year");
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    // moths are numbered from 0, so I need to add two
    const futureDay = now.getDate() + 1;

    // another case
    if (futureDay > 31) return;

    await dayInput.setValue(futureDay);
    await monthInput.setValue(currentMonth);
    await yearInput.setValue(currentYear);
    const dayInputErrorMsg = wrapper.find(".input-error--day");
    const monthInputErrorMsg = wrapper.find(".input-error--month");
    const yearInputErrorMsg = wrapper.find(".input-error--year");

    expect(dayInputErrorMsg.text()).contain("Entered value is invalid");
    expect(monthInputErrorMsg.exists()).toBe(false);
    expect(yearInputErrorMsg.exists()).toBe(false);
  })

  it("Future date entered, month - input month shows error", async () => {
    const monthInput = wrapper.find("#age-month");
    const yearInput = wrapper.find("#age-year");
    const now = new Date();
    const currentYear = now.getFullYear();
    // moths are numbered from 0, so I need to add two
    const futureMonth = now.getMonth() + 2;

    // another case
    if (futureMonth > 12) return;

    await yearInput.setValue(currentYear);
    await monthInput.setValue(futureMonth);
    const monthInputErrorMsg = wrapper.find(".input-error--month");

    expect(monthInputErrorMsg.text()).contain("Entered value is invalid");
  })

  it("Future date entered, year - input year shows error", async () => {
    const yearInput = wrapper.find("#age-year");
    const now = new Date();
    const futureYear = now.getFullYear() + 1;
    await yearInput.setValue(futureYear);
    const yearInputErrorMsg = wrapper.find(".input-error--year");
    expect(yearInputErrorMsg.text()).contain("Entered value is invalid");
  })

  it("Entered month > 12, month input shows error", async () => {
    const monthInput = wrapper.find("#age-month");
    await monthInput.setValue(13);
    const monthInputErrorMsg = wrapper.find(".input-error--month");
    expect(monthInputErrorMsg.text()).contain("Entered value is invalid");
  })

  it("Entered day > 31, day input shows error", async () => {
    const dayInput = wrapper.find("#age-day");
    await dayInput.setValue(32);
    const dayInputErrorMsg = wrapper.find(".input-error--day");
    expect(dayInputErrorMsg.text()).contain("Entered value is invalid");
  })
})
