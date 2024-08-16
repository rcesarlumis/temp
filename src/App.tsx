import { useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  OnConnectStart,
  OnConnectEnd,
  useReactFlow,
  Edge,
  ReactFlowProvider,
} from '@xyflow/react';
import { useShallow } from 'zustand/react/shallow';

import '@xyflow/react/dist/style.css';

import { AppNode, AppState } from './types';
import useStore from './store';
import { nodeTypes } from './nodes';
import { edgeTypes } from './edges';

const selector = (state: AppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export function App() {
  const { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(selector),
  );

  const connectingNodeId = useRef<string | null>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd: OnConnectEnd = useCallback((event) => {
      const source = connectingNodeId.current;
      connectingNodeId.current = null;
      if (!source || !(event instanceof MouseEvent) || !(event.target instanceof HTMLElement)) return;

      const targetIsPane = event.target.classList.contains('react-flow__pane');
      if (!targetIsPane)
        return;

      const id = `${Date.now()}`;
      const newNode: AppNode = {
        id,
        position: screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        }),
        data: { label: `Node ${id}` },
        origin: [0.5, 0.0],
      };

      setNodes([...nodes, newNode]);
      setEdges([...edges, { id, source, target: id } as Edge]);
    },
    [screenToFlowPosition, nodes, edges],
  );

  // Função para gerar JSON
  const generateJSON = () => {
    const data = {
      nodes,
      edges,
    };
    const json = JSON.stringify(data, null, 2);
    console.log(json); // Aqui você pode mudar para baixar o arquivo ou mostrar na tela
  };

  return (
    <>
      <button onClick={generateJSON}>Exportar JSON</button>
      <div
        style={{ width: '100%', height: '80%' }}
      >
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          deleteKeyCode={["Delete", "Backspace"]}
          proOptions={{hideAttribution: true}}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
}

export default () => (
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);
