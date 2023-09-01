type ExtraNode = {
  [key: string]: any;
  id: string;
  from: string[];
  to: string[];
};

export type Node<N extends ExtraNode = ExtraNode> = N & {
  proccessBackFrom?: string[];
};

export type ParentNodes = Node[][];
