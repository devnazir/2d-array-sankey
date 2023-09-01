import generateNodes from "..";
import { Node } from "../types";

import { describe, expect, it } from "@jest/globals";

describe("generateNodes", () => {
  it("should has the correct order", () => {
    const nodes: Node[] = [
      {
        id: "1",
        from: [],
        to: ["2", "3"],
      },
      {
        id: "2",
        from: ["1"],
        to: [],
      },
      {
        id: "3",
        from: ["1"],
        to: [],
      },
    ];

    const result = generateNodes(nodes);
    expect(result).toEqual([
      [
        {
          id: "1",
          from: [],
          to: ["2", "3"],
        },
      ],
      [
        {
          id: "2",
          from: ["1"],
          to: [],
        },
        {
          id: "3",
          from: ["1"],
          to: [],
        },
      ],
    ]);
  });

  it("should has the correct length", () => {
    const nodes1: Node[] = [
      {
        id: "1",
        from: [],
        to: ["2", "3"],
      },
      {
        id: "2",
        from: ["1"],
        to: [],
      },
      {
        id: "3",
        from: ["2"],
        to: [],
      },
    ];

    const nodes2: Node[] = [
      {
        id: "1",
        from: [],
        to: ["2", "3", "4"],
      },
      {
        id: "2",
        from: ["1"],
        to: ["3", "4"],
      },
      {
        id: "3",
        from: ["2"],
        to: [],
      },
      {
        id: "4",
        from: ["2", "1"],
        to: [],
      },
    ];

    const result = generateNodes(nodes1);
    expect(result).toHaveLength(3);

    const result2 = generateNodes(nodes2);
    expect(result2).toHaveLength(3);
  });
});
