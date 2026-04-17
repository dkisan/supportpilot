"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

export default function CreateTicketModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      if (!title.trim()) return setError("Title is required");
      if (!description.trim()) return setError("Description is required");

      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          priority,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error || "Failed to create ticket");
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        setTitle("");
        setDescription("");
        setPriority("MEDIUM");
        setSuccess(false);
        onClose();
      }, 1200);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Create New Ticket
              </h2>

              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-3 flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-3 flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300 text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  Ticket created successfully
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              <input
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
                placeholder="Ticket title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading || success}
              />

              <textarea
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 outline-none"
                placeholder="Describe your issue..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading || success}
              />

              <select
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                disabled={loading || success}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={loading || success}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50"
                >
                  {loading
                    ? "Creating..."
                    : success
                    ? "Created"
                    : "Create Ticket"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}