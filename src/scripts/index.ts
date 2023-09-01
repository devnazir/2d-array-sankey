import generateNodes from "..";
import { Node } from "../types";
import fs from "fs";
import path from "path";

const nodes: Node[] = [
  {
    id: "1",
    name: "Step 1",
    from: [],
    to: ["2", "3"],
  },
  {
    id: "2",
    name: "Step 2",
    from: ["1"],
    to: [],
  },
  {
    id: "3",
    name: "Step 3",
    from: ["1"],
    to: [],
  },
  {
    id: "4",
    name: "Step 4",
    from: ["2", "3"],
    to: [],
  },
  {
    id: "5",
    name: "Step 5",
    from: ["4"],
    to: [],
  },
  {
    id: "6",
    name: "Step 6",
    from: ["3", "2"],
    to: [],
  },
];

const result = generateNodes(nodes);

const generatedFolder = path.join(__dirname, "../__generated__");
if (!fs.existsSync(generatedFolder)) {
  fs.mkdirSync(generatedFolder);
}

fs.writeFileSync(
  path.join(generatedFolder, "nodes.json"),
  JSON.stringify(result, null, 2)
);
