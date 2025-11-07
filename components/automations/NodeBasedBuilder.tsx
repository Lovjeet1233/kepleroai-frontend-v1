"use client";

import { useState } from "react";
import { Plus, List, MoreVertical, Trash2, Check } from "lucide-react";
import { Automation, AutomationNode as NodeType, nodeServices } from "@/data/mockAutomations";
import { AutomationNode } from "./AutomationNode";
import { NodeConnector } from "./NodeConnector";
import { NodeConfigPanel } from "./NodeConfigPanel";
import { AutomationList } from "./AutomationList";

interface NodeBasedBuilderProps {
  automations: Automation[];
}

export function NodeBasedBuilder({ automations: initialAutomations }: NodeBasedBuilderProps) {
  const [automations, setAutomations] = useState(initialAutomations);
  const [selectedAutomationId, setSelectedAutomationId] = useState<string | null>(
    initialAutomations[0]?.id || null
  );
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showNodeSelector, setShowNodeSelector] = useState(false);
  const [insertPosition, setInsertPosition] = useState<number | null>(null);

  const selectedAutomation = automations.find(
    (a) => a.id === selectedAutomationId
  );

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setShowNodeSelector(false);
  };

  const handleAddNode = (position: number) => {
    setInsertPosition(position);
    setShowNodeSelector(true);
    setSelectedNodeId(null);
  };

  const handleSelectNodeType = (
    type: "trigger" | "action",
    service: string
  ) => {
    if (!selectedAutomation || insertPosition === null) return;

    const newNode: NodeType = {
      id: `node_${Date.now()}`,
      type,
      service,
      config: {},
      position: insertPosition,
    };

    const updatedNodes = [...selectedAutomation.nodes];
    updatedNodes.splice(insertPosition, 0, newNode);

    // Update positions
    updatedNodes.forEach((node, index) => {
      node.position = index;
    });

    setAutomations(
      automations.map((a) =>
        a.id === selectedAutomationId ? { ...a, nodes: updatedNodes } : a
      )
    );

    setShowNodeSelector(false);
    setInsertPosition(null);
    setSelectedNodeId(newNode.id);
  };

  const handleAddDelay = () => {
    if (!selectedAutomation || insertPosition === null) return;

    const newNode: NodeType = {
      id: `node_${Date.now()}`,
      type: "delay",
      service: "delay",
      config: { delay: 5, delayUnit: "minutes" },
      position: insertPosition,
    };

    const updatedNodes = [...selectedAutomation.nodes];
    updatedNodes.splice(insertPosition, 0, newNode);

    updatedNodes.forEach((node, index) => {
      node.position = index;
    });

    setAutomations(
      automations.map((a) =>
        a.id === selectedAutomationId ? { ...a, nodes: updatedNodes } : a
      )
    );

    setShowNodeSelector(false);
    setInsertPosition(null);
    setSelectedNodeId(newNode.id);
  };

  const handleUpdateNode = (config: NodeType["config"]) => {
    if (!selectedAutomation || !selectedNodeId) return;

    const updatedNodes = selectedAutomation.nodes.map((node) =>
      node.id === selectedNodeId ? { ...node, config } : node
    );

    setAutomations(
      automations.map((a) =>
        a.id === selectedAutomationId ? { ...a, nodes: updatedNodes } : a
      )
    );
  };

  const handleDeleteNode = (nodeId: string) => {
    if (!selectedAutomation) return;

    const updatedNodes = selectedAutomation.nodes
      .filter((node) => node.id !== nodeId)
      .map((node, index) => ({ ...node, position: index }));

    setAutomations(
      automations.map((a) =>
        a.id === selectedAutomationId ? { ...a, nodes: updatedNodes } : a
      )
    );

    setSelectedNodeId(null);
  };

  const handleToggleStatus = () => {
    if (!selectedAutomation) return;

    setAutomations(
      automations.map((a) =>
        a.id === selectedAutomationId
          ? {
              ...a,
              status: a.status === "enabled" ? "disabled" : "enabled",
            }
          : a
      )
    );
  };

  const handleNewAutomation = () => {
    const newAutomation: Automation = {
      id: `auto_${Date.now()}`,
      name: `Automation ${automations.length + 1}`,
      status: "disabled",
      nodes: [],
      lastExecuted: null,
      executionCount: 0,
      createdAt: new Date().toISOString(),
    };

    setAutomations([...automations, newAutomation]);
    setSelectedAutomationId(newAutomation.id);
    setSelectedNodeId(null);
  };

  const selectedNode = selectedAutomation?.nodes.find(
    (n) => n.id === selectedNodeId
  );

  return (
    <div className="flex h-full bg-background">
      <AutomationList
        automations={automations}
        selectedId={selectedAutomationId}
        onSelect={setSelectedAutomationId}
        onNew={handleNewAutomation}
      />

      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-2 bg-secondary border border-border text-white rounded-lg text-sm font-medium hover:bg-accent transition-colors">
              <List className="w-4 h-4" />
              <span>Executions</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedAutomation?.status === "enabled"
                  ? "Enabled"
                  : "Disabled"}
              </span>
              <button
                onClick={handleToggleStatus}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  selectedAutomation?.status === "enabled"
                    ? "bg-primary"
                    : "bg-border"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    selectedAutomation?.status === "enabled"
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto p-10 bg-background">
          <div className="flex flex-col items-center gap-0">
            {selectedAutomation?.nodes.length === 0 && (
              <button
                onClick={() => handleAddNode(0)}
                className="w-12 h-12 border-2 border-dashed border-border rounded-full flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-secondary transition-all"
              >
                <Plus className="w-6 h-6" />
              </button>
            )}

            {selectedAutomation?.nodes.map((node, index) => (
              <div key={node.id} className="flex flex-col items-center">
                <AutomationNode
                  node={node}
                  isSelected={node.id === selectedNodeId}
                  isIncomplete={
                    !node.config.event &&
                    !node.config.template &&
                    !node.config.subject &&
                    node.service !== "delay"
                  }
                  onClick={() => handleNodeClick(node.id)}
                  onDelete={() => handleDeleteNode(node.id)}
                />

                {index < selectedAutomation.nodes.length - 1 && (
                  <NodeConnector onAddNode={() => handleAddNode(index + 1)} />
                )}
              </div>
            ))}

            {selectedAutomation && selectedAutomation.nodes.length > 0 && (
              <button
                onClick={() => handleAddNode(selectedAutomation.nodes.length)}
                className="mt-6 w-12 h-12 border-2 border-dashed border-border rounded-full flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-secondary transition-all"
              >
                <Plus className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-card border-t border-border px-6 py-4 flex items-center justify-end gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg text-sm font-medium hover:bg-red-600/10 transition-colors">
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:brightness-110 transition-all">
            <Check className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Node selector dropdown */}
      {showNodeSelector && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                Add Node
              </h3>
            </div>

            <div className="p-4 space-y-4">
              {insertPosition === 0 && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Triggers
                  </h4>
                  <div className="space-y-2">
                    {nodeServices.triggers.map((service) => (
                      <button
                        key={service.id}
                        onClick={() =>
                          handleSelectNodeType("trigger", service.id)
                        }
                        className="w-full flex items-center gap-3 px-3 py-2 bg-secondary border border-border rounded-lg hover:border-primary hover:bg-border transition-colors text-left"
                      >
                        <span className="text-xl">{service.icon}</span>
                        <span className="text-sm font-medium text-foreground">
                          {service.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {insertPosition !== 0 && (
                <>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Delay
                    </h4>
                    <button
                      onClick={handleAddDelay}
                      className="w-full flex items-center gap-3 px-3 py-2 bg-secondary border border-border rounded-lg hover:border-primary hover:bg-border transition-colors text-left"
                    >
                      <span className="text-xl">⏱️</span>
                      <span className="text-sm font-medium text-foreground">
                        Delay
                      </span>
                    </button>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Actions
                    </h4>
                    <div className="space-y-2">
                      {nodeServices.actions.map((service) => (
                        <button
                          key={service.id}
                          onClick={() =>
                            handleSelectNodeType("action", service.id)
                          }
                          className="w-full flex items-center gap-3 px-3 py-2 bg-secondary border border-border rounded-lg hover:border-primary hover:bg-border transition-colors text-left"
                        >
                          <span className="text-xl">{service.icon}</span>
                          <span className="text-sm font-medium text-foreground">
                            {service.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-4 border-t border-border">
              <button
                onClick={() => {
                  setShowNodeSelector(false);
                  setInsertPosition(null);
                }}
                className="w-full px-4 py-2 bg-secondary border border-border text-white rounded-lg text-sm font-medium hover:bg-accent transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Config panel */}
      {selectedNode && (
        <NodeConfigPanel
          node={selectedNode}
          onClose={() => setSelectedNodeId(null)}
          onUpdate={handleUpdateNode}
          onDelete={() => handleDeleteNode(selectedNode.id)}
        />
      )}
    </div>
  );
}

