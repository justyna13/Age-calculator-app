import { describe, it } from "vitest";
import { mount } from "@vue/test-utils";
import CalculatorResults from "../src/components/CalculatorResults.vue";

describe("CalculatorResults", () => {
  it("Displays '--' if no props", () => {
    const wrapper = mount(CalculatorResults, {
      props: {
        days: null,
        months: null,
        years: null
      }
    });
    expect(wrapper.text()).toContain("-- years-- months-- days");
  })

  it("Displays proper data when props are passed", () => {
    const wrapper = mount(CalculatorResults, {
      props: {
        days: 12,
        months: 3,
        years: 8
      }
    });
    expect(wrapper.text()).toContain("8 years3 months12 days");
  })
})
