import { describe, test } from "vitest";
import { BasicElement, CompositeElement, compositeElementFromBasicElements } from "./Element";
import * as Assert from "assert";

describe("Composite Element", async () => {
  test("should return STEAM element from basic elements", async () => {
    // when
    const result = compositeElementFromBasicElements(BasicElement.FIRE, BasicElement.WATER);
    const resultSwapped = compositeElementFromBasicElements(BasicElement.WATER, BasicElement.FIRE);

    // then
    Assert.equal(result, CompositeElement.STEAM);
    Assert.equal(resultSwapped, CompositeElement.STEAM);
  });

  test("should return LAVA element from basic elements", async () => {
    // when
    const result = compositeElementFromBasicElements(BasicElement.FIRE, BasicElement.EARTH);
    const resultSwapped = compositeElementFromBasicElements(BasicElement.EARTH, BasicElement.FIRE);

    // then
    Assert.equal(result, CompositeElement.LAVA);
    Assert.equal(resultSwapped, CompositeElement.LAVA);
  });

  test("should return SCORCHING element from basic elements", async () => {
    // when
    const result = compositeElementFromBasicElements(BasicElement.FIRE, BasicElement.WIND);
    const resultSwapped = compositeElementFromBasicElements(BasicElement.WIND, BasicElement.FIRE);

    // then
    Assert.equal(result, CompositeElement.SCORCHING);
    Assert.equal(resultSwapped, CompositeElement.SCORCHING);
  });

  test("should return LIGHT element from basic elements", async () => {
    // when
    const result = compositeElementFromBasicElements(BasicElement.FIRE, BasicElement.LIGHTNING);
    const resultSwapped = compositeElementFromBasicElements(BasicElement.LIGHTNING, BasicElement.FIRE);

    // then
    Assert.equal(result, CompositeElement.LIGHT);
    Assert.equal(resultSwapped, CompositeElement.LIGHT);
  });

  test("should return ICE element from basic elements", async () => {
    // when
    const result = compositeElementFromBasicElements(BasicElement.WIND, BasicElement.WATER);
    const resultSwapped = compositeElementFromBasicElements(BasicElement.WATER, BasicElement.WIND);

    // then
    Assert.equal(result, CompositeElement.ICE);
    Assert.equal(resultSwapped, CompositeElement.ICE);
  });

  test("should return STORM element from basic elements", async () => {
    // when
    const result = compositeElementFromBasicElements(BasicElement.LIGHTNING, BasicElement.WATER);
    const resultSwapped = compositeElementFromBasicElements(BasicElement.WATER, BasicElement.LIGHTNING);

    // then
    Assert.equal(result, CompositeElement.STORM);
    Assert.equal(resultSwapped, CompositeElement.STORM);
  });

  test("should return WOOD element from basic elements", async () => {
    // when
    const result = compositeElementFromBasicElements(BasicElement.EARTH, BasicElement.WATER);
    const resultSwapped = compositeElementFromBasicElements(BasicElement.WATER, BasicElement.EARTH);

    // then
    Assert.equal(result, CompositeElement.WOOD);
    Assert.equal(resultSwapped, CompositeElement.WOOD);
  });

  test("should return DUST element from basic elements", async () => {
    // when
    const result = compositeElementFromBasicElements(BasicElement.EARTH, BasicElement.WIND);
    const resultSwapped = compositeElementFromBasicElements(BasicElement.WIND, BasicElement.EARTH);

    // then
    Assert.equal(result, CompositeElement.DUST);
    Assert.equal(resultSwapped, CompositeElement.DUST);
  });

  test("should return MAGNETISM element from basic elements", async () => {
    // when
    const result = compositeElementFromBasicElements(BasicElement.EARTH, BasicElement.LIGHTNING);
    const resultSwapped = compositeElementFromBasicElements(BasicElement.LIGHTNING, BasicElement.EARTH);

    // then
    Assert.equal(result, CompositeElement.MAGNETISM);
    Assert.equal(resultSwapped, CompositeElement.MAGNETISM);
  });

  test("should return TEMPEST element from basic elements", async () => {
    // when
    const result = compositeElementFromBasicElements(BasicElement.LIGHTNING, BasicElement.WIND);
    const resultSwapped = compositeElementFromBasicElements(BasicElement.WIND, BasicElement.LIGHTNING);

    // then
    Assert.equal(result, CompositeElement.TEMPEST);
    Assert.equal(resultSwapped, CompositeElement.TEMPEST);
  });
});