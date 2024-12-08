import React, { useEffect, useRef, useState } from "react";
import { ForceGraph2D } from "react-force-graph";

const GraphComponent = ({ data, setCurrentWord }) => {
    const graphRef = useRef();
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

    useEffect(() => {
        const nodes = [];
        const links = [];

        data.forEach(([value, connectedIndices, probability], index) => {
            const color = getGradientColor(probability);
            nodes.push({ id: index, text: value, probability, color });
            connectedIndices.forEach((connectedIndex) => {
                links.push({ source: index, target: connectedIndex });
            });
        });

        setGraphData({ nodes, links });
    }, [data]);

    const getGradientColor = (probability) => {
        let r, g, b;
        if (probability <= 0.5) {
            // Переход от красного к желтому
            r = 255;
            g = Math.round(255 * (probability / 0.5)); // Интерполяция от 0 до 255
            b = 150;
        } else {
            // Переход от желтого к зеленому
            r = Math.round(255 * ((1 - probability) / 0.5)); // Интерполяция от 255 до 0
            g = 255;
            b = 150;
        }
        return `rgb(${r}, ${g}, ${b})`;
    };


    useEffect(() => {
        const handleResize = () => {
            const sumWordsHeight = document.querySelector(".sum-words")?.offsetHeight || 0;
            const gradientBarHeight = document.querySelector(".gradient-bar")?.offsetHeight || 0;
            setAvailableHeight(window.innerHeight - sumWordsHeight);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (graphRef.current) {
            graphRef.current.d3Force("center", null); // Disable initial animation
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
                    ctx.font = `bold ${fontSize}px Sans-Serif`;
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2);

                    // Background for text
                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                    ctx.fillRect(
                        node.x - bckgDimensions[0] / 2,
                        node.y - bckgDimensions[1] / 2,
                        ...bckgDimensions
                    );

                    // Text
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = node.color; // Use gradient color
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
                maxZoom={5} // Maximum zoom level
            />
        </div>
    );
};

export default GraphComponent;
