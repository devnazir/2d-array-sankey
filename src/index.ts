import { Node, ParentNodes } from "./types";

const generateNodes = (nodes: Node[] = []) => {
  const parentNodes: ParentNodes = Array.from(
    { length: nodes.length },
    () => []
  );

  nodes.forEach((node, _, nodes) => {
    // if the node doesn't have from, then it's a parent node
    if (!node.from || node.from.length === 0) {
      parentNodes[0].push(node);
    } else {
      // find the last index of the node that has the same id as the fromId
      node.from.forEach((fromId) => {
        const fromNode = nodes.find((node) => node.id === fromId);
        const fromNodeIndex = parentNodes.findLastIndex(
          (nodes) => fromNode && nodes?.includes(fromNode)
        );

        parentNodes[fromNodeIndex + 1].push(node);
      });
    }
  });

  const uniqueNodeIds = new Set();
  let finalResults: ParentNodes = Array.from(
    { length: parentNodes.filter((nodes) => nodes.length > 0).length },
    () => []
  );

  parentNodes.forEach((nodes, columnPos) => {
    // remove duplicate node, except the last found node
    nodes.forEach((node) => {
      if (!uniqueNodeIds.has(node.id)) {
        uniqueNodeIds.add(node.id);
        finalResults[columnPos].push(node);
      } else {
        const foundColumnPos = finalResults.findIndex((nodes) =>
          nodes.find((existingNode) => existingNode.id === node.id)
        );

        if (foundColumnPos < columnPos) {
          finalResults[foundColumnPos] = finalResults[foundColumnPos].filter(
            (n) => n.id !== node.id
          );

          finalResults[columnPos].push(node);
        }
      }

      // add proccessBackFrom to the node that has been found
      node.to?.forEach((to) => {
        const toPos = finalResults.findIndex((nodes) =>
          nodes.find((existingNode) => existingNode.id === to)
        );

        if (toPos < columnPos && toPos !== -1) {
          finalResults[toPos] = finalResults[toPos].map((existingNode) => {
            if (existingNode.id === to) {
              return {
                ...existingNode,
                proccessBackFrom: [...(existingNode.proccessBackFrom || []), node.id],
              };
            }

            return node;
          });
        }
      });
    });
  });

  return finalResults;
};

export default generateNodes;
