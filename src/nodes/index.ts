import type { NodeTypes } from '@xyflow/react';

import { AppNode } from '../types';
import PositionLoggerNode from './PositionLoggerNode';
import ColorChooserNode from './ColorChooserNode';

export const initialNodes: AppNode[] = [
  { id: 'a', type: 'input', position: { x: 0, y: 0 }, data: { label: 'wire' } },
  {
    id: 'b',
    type: 'position-logger',
    position: { x: -100, y: 100 },
    data: { label: 'drag me!' },
  },
  { id: 'c', position: { x: 100, y: 100 }, data: { label: 'your ideas' } },
  {
    id: 'd',
    type: 'output',
    position: { x: 0, y: 200 },
    data: { label: 'with React Flow' },
  },
  {
    id: 'e',
    type: 'colorChooser',
    position: { x: 100, y: 200 },
    data: { color: '#00FFFF' },
  },
];

export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  colorChooser: ColorChooserNode
  // Add any of your custom nodes here!
} satisfies NodeTypes;
