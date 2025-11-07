"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { mockOperators, Operator, availablePermissions } from "@/data/mockOperators";
import { cn } from "@/lib/utils";

export default function TeamSettingsPage() {
  const [operators, setOperators] = useState<Operator[]>(mockOperators);
  const [showModal, setShowModal] = useState(false);

  const getRoleBadge = (role: Operator["role"]) => {
    const styles = {
      admin: "bg-purple-500",
      operator: "bg-blue-500",
      viewer: "bg-gray-500",
    };

    return (
      <span className={cn("px-2.5 py-1 rounded-xl text-xs font-medium text-foreground", styles[role])}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Team</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Operator</span>
        </button>
      </div>

      {/* Operators table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary">
              <th className="px-6 py-3 text-left">
                <span className="text-[13px] font-semibold text-muted-foreground uppercase">Avatar</span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-[13px] font-semibold text-muted-foreground uppercase">Name</span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-[13px] font-semibold text-muted-foreground uppercase">Email</span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-[13px] font-semibold text-muted-foreground uppercase">Role</span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-[13px] font-semibold text-muted-foreground uppercase">Permissions</span>
              </th>
              <th className="px-6 py-3 text-right">
                <span className="text-[13px] font-semibold text-muted-foreground uppercase">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {operators.map((operator) => (
              <tr
                key={operator.id}
                className="border-b border-border hover:bg-secondary transition-colors"
              >
                <td className="px-6 py-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-foreground font-semibold text-sm"
                    style={{ backgroundColor: operator.color }}
                  >
                    {operator.avatar}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-foreground">
                    {operator.firstName} {operator.lastName}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{operator.email}</span>
                </td>
                <td className="px-6 py-4">{getRoleBadge(operator.role)}</td>
                <td className="px-6 py-4">
                  <span className="text-[13px] text-muted-foreground">
                    {operator.permissions.length} sections
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Operator Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-[560px] bg-card border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Add Operator</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full bg-secondary border border-border rounded-lg px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                  <input
                    placeholder="John"
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                  <input
                    placeholder="Doe"
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Permissions</label>
                <div className="grid grid-cols-2 gap-3">
                  {availablePermissions.map((permission) => (
                    <label
                      key={permission.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                      />
                      <span className="text-sm text-foreground">{permission.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary text-foreground rounded-lg text-sm font-medium hover:brightness-110 transition-all"
                >
                  Add Operator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

