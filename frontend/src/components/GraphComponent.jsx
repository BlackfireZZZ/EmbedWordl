import React, { useEffect, useRef, useState } from "react";
import { ForceGraph2D } from "react-force-graph";

const GraphComponent = ({ data, setCurrentWord }) => {
    const graphRef = useRef();
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

    useEffect(() => {
        const nodes = [];
        const links = [];

        data.forEach(([value, connectedIndices], index) => {
            nodes.push({ id: index, text: value }); // Assign text to each node
            connectedIndices.forEach((connectedIndex) => {
                links.push({ source: index, target: connectedIndex });
            });
        });

        setGraphData({ nodes, links });
    }, [data]);

    useEffect(() => {
        const handleResize = () => {
            const sumWordsHeight = document.querySelector(".sum-words")?.offsetHeight || 0;
            setAvailableHeight(window.innerHeight - sumWordsHeight);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (graphRef.current) {
            graphRef.current.d3Force("center", null); // Disable initial animation

            // Handle zoom constraints
        }
    }, [graphData]);

    return (
        <div style={{ width: "100%", height: availableHeight, overflow: "hidden" }}>
            <ForceGraph2D
                ref={graphRef}
                graphData={graphData}
                nodeAutoColorBy="group"
                linkWidth={3}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.text;
                    const fontSize = 16 / globalScale;
                    ctx.font = `${fontSize}px Sans-Serif`;
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2);

                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                    ctx.fillRect(
                        node.x - bckgDimensions[0] / 2,
                        node.y - bckgDimensions[1] / 2,
                        ...bckgDimensions
                    );

                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = node.color;
                    ctx.fillText(label, node.x, node.y);

                    node.__bckgDimensions = bckgDimensions;
                }}
                nodePointerAreaPaint={(node, color, ctx) => {
                    ctx.fillStyle = color;
                    const bckgDimensions = node.__bckgDimensions;
                    bckgDimensions &&
                    ctx.fillRect(
                        node.x - bckgDimensions[0] / 2,
                        node.y - bckgDimensions[1] / 2,
                        ...bckgDimensions
                    );
                }}
                onNodeClick={(node) => {
                    if (setCurrentWord) {
                        setCurrentWord(node.text);
                    }
                }}
                width={window.innerWidth}
                height={window.innerHeight}
                minZoom={0.7} // Minimum zoom level
                maxZoom={2} // Maximum zoom level
            />
        </div>
    );
};

export default GraphComponent;
