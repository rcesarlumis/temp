import {
    Edge,
    Node,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    BuiltInNode,
  } from '@xyflow/react';
  
  export type ColorNode = Node<
    {
      color: string;
    },
    'colorChooser'
  >;
  
  export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;

  export type AppNode = ColorNode | BuiltInNode | PositionLoggerNode;
  
  export type AppState = {
    nodes: AppNode[];
    edges: Edge[];
    onNodesChange: OnNodesChange<AppNode>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: AppNode[]) => void;
    setEdges: (edges: Edge[]) => void;
    updateNodeColor: (nodeId: string, color: string) => void;
  };
  