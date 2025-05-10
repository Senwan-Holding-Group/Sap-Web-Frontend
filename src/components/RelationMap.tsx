/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Stage,
  Layer,
  Arrow,
  Rect,
  Label,
  Tag,
  Text,
  Group,
  Line
} from "react-konva";

type Node = {
  id: string;
  x: number;
  y: number;
  text: string;
};

type Relation = {
  from: string;
  to: string;
  label: string;
};
const RECT_WIDTH = 200;
const RECT_HEIGHT = 250;
const RelationMap = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "po", x: 20, y: 40, text: "Purchase Order" },
    { id: "grpo", x: 400, y: 40, text: "GR Purchase Order" },
    { id: "ap", x: 800, y:40, text: "A/P Invoice" },
    { id: "op", x: 1200, y: 40, text: "Outgoing Payment" },
  ]);

  const relations: Relation[] = [
    { from: "po", to: "grpo", label: "Confirms Delivery" },
    { from: "grpo", to: "ap", label: "Triggers Payment" },
    { from: "ap", to: "op", label: " Payment" },
  ];

  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
console.log(nodeMap);

  const handleDragMove = (nodeId: string, event: any) => {
    const newNodes = nodes.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          x: event.target.x(),
          y: event.target.y(),
        };
      }
      return node;
    });
    setNodes(newNodes);
  };
  const calculateConnectionPoints = (fromNode: Node, toNode: Node) => {
    const fromCenterX = fromNode.x + RECT_WIDTH / 2;
    const fromCenterY = fromNode.y + RECT_HEIGHT / 2;
    const toCenterX = toNode.x + RECT_WIDTH / 2;
    const toCenterY = toNode.y + RECT_HEIGHT / 2;

    return {
      fromPoint: { x: fromCenterX, y: fromCenterY },
      toPoint: { x: toCenterX, y: toCenterY },
      midPoint: {
        x: (fromCenterX + toCenterX) / 2,
        y: (fromCenterY + toCenterY) / 2,
      },
    };
  };
  const handleMouseOver = (e:any) => {
    e.target.getStage().container().style.cursor = 'pointer';
  };

  const handleMouseOut = (e:any) => {
    e.target.getStage().container().style.cursor = 'default';
  };
  return (
    <Stage  width={2000} height={500}>
      <Layer>
        {relations.map((relation, index) => {
          const fromNode = nodeMap.get(relation.from)!;
          const toNode = nodeMap.get(relation.to)!;

          const { fromPoint, toPoint, midPoint } = calculateConnectionPoints(
            fromNode,
            toNode
          );

          return (
            <Group  key={`relation-${index}`}>
              <Arrow
                points={[fromPoint.x, fromPoint.y, toPoint.x, toPoint.y]}
                fill="#999"
                stroke="#999"
                strokeWidth={2}
                pointerLength={10}
                pointerWidth={10}
              />
              <Text
                x={midPoint.x - 80}
                y={midPoint.y - 15}
                text={relation.label}
                fontSize={14}
                fill="#666"
                width={150}
                align="center"
              />
            </Group>
          );
        })}

        {nodes.map((node) => (
          <Group
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
            key={node.id}
            x={node.x}
            y={node.y}
            draggable
            onDragMove={(e) => handleDragMove(node.id, e)}>
            <Rect
              width={RECT_WIDTH}
              height={RECT_HEIGHT}
              fill="#fff"
              stroke="#333"
              strokeWidth={2}
            />
            {/* <Text
              x={RECT_WIDTH / 2 - 50}
              y={RECT_HEIGHT / 2 - 10}
              width={100}
              text={node.text}
              fontSize={14}
              fill="#333"
              align="center"
            /> */}
            <Label x={1}  y={1} >
              <Tag  fill="#d5e7e2"   />
              <Text
                text={node.text}
                width={RECT_WIDTH-2}
                height={25}  
                fontFamily="Calibri"
                fontSize={16}
                align="center"
                verticalAlign="middle"
                padding={5}
                fill="black"
              />
            </Label>
            <Line
              y={25}
              points={[0, 0, RECT_WIDTH, 0]}
              stroke="#333"
              strokeWidth={2}
             />
          </Group>
        ))}
      </Layer>
    </Stage>
  );
};

export default RelationMap;
