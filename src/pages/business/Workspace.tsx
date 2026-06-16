import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Plus, X, Kanban, Users, Ticket, ArrowLeft, MoreHorizontal,
  MessageSquare, FileText, Calendar, Upload, Send, Paperclip, Tag,
  ChevronDown,
} from "@/icons";
import { cn } from "@/lib/utils";
import { WORKSPACES, type Workspace } from "@/lib/mock/business";

// ── Types ─────────────────────────────────────────────────────────────────────

type KanbanStatus = "todo" | "in_progress" | "review" | "done";

type KanbanComment = {
  id: string;
  author: string;
  initials: string;
  text: string;
  date: string;
};

type MockFile = {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
};

type KanbanTicket = {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: KanbanStatus;
  tags: string[];
  dueDate: string;
  createdAt: string;
  files: MockFile[];
  comments: KanbanComment[];
};

// ── Config ────────────────────────────────────────────────────────────────────

const COLUMNS: { status: KanbanStatus; label: string; color: string }[] = [
  { status: "todo",        label: "To Do",       color: "#6b7280" },
  { status: "in_progress", label: "In Progress",  color: "#0ea5e9" },
  { status: "review",      label: "Review",       color: "#f59e0b" },
  { status: "done",        label: "Done",         color: "#16a34a" },
];

const PRIORITY_CFG = {
  high:   { label: "High",   className: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
  medium: { label: "Medium", className: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
  low:    { label: "Low",    className: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400" },
};

function makeTickets(wsId: string): KanbanTicket[] {
  const base: KanbanComment[] = [
    { id: "c1", author: "Alex Reyes",   initials: "AR", text: "Starting on this today.",          date: "2026-06-10" },
    { id: "c2", author: "Maria Santos", initials: "MS", text: "Looks good, moving to review.",    date: "2026-06-12" },
  ];
  if (wsId === "ws1") return [
    { id: "T-001", title: "Wireframe homepage",         description: "Create low-fidelity wireframes for all key pages.",         priority: "high",   status: "done",        tags: ["Design", "UX"], dueDate: "2026-06-05", createdAt: "2026-05-28", files: [{ id: "f1", name: "wireframes_v1.fig", size: "2.4 MB", uploadedAt: "2026-05-30" }], comments: base },
    { id: "T-002", title: "Design hero section",        description: "Pixel-perfect hero with animation and responsive layout.",  priority: "high",   status: "review",      tags: ["Design"],       dueDate: "2026-06-18", createdAt: "2026-06-01", files: [],  comments: [base[0]] },
    { id: "T-003", title: "Build navigation component", description: "React component with mobile drawer and desktop rail.",      priority: "medium", status: "in_progress", tags: ["Dev"],          dueDate: "2026-06-22", createdAt: "2026-06-05", files: [],  comments: [] },
    { id: "T-004", title: "Write SEO copy",             description: "Meta tags, headings, and structured data for all pages.",   priority: "low",    status: "todo",        tags: ["Content"],      dueDate: "2026-06-30", createdAt: "2026-06-08", files: [],  comments: [] },
    { id: "T-005", title: "Setup analytics",            description: "Integrate GA4 and heatmap tooling.",                        priority: "medium", status: "todo",        tags: ["Dev"],          dueDate: "2026-07-02", createdAt: "2026-06-08", files: [],  comments: [] },
    { id: "T-006", title: "QA testing",                 description: "Cross-browser and mobile QA on staging environment.",       priority: "high",   status: "todo",        tags: ["QA"],           dueDate: "2026-07-05", createdAt: "2026-06-10", files: [],  comments: [] },
  ];
  if (wsId === "ws2") return [
    { id: "T-001", title: "Define campaign goals",  description: "OKRs and KPIs for Q3 brand awareness.",         priority: "high",   status: "done",        tags: ["Strategy"], dueDate: "2026-05-30", createdAt: "2026-05-20", files: [{ id: "f2", name: "campaign_brief.pdf", size: "310 KB", uploadedAt: "2026-05-21" }], comments: base },
    { id: "T-002", title: "Create visual assets",   description: "Banners, stories, and reels for 3 platforms.",  priority: "medium", status: "in_progress", tags: ["Design"],   dueDate: "2026-06-25", createdAt: "2026-05-25", files: [],  comments: [base[0]] },
    { id: "T-003", title: "Write ad copy",          description: "Headlines and CTAs for paid social campaigns.",  priority: "medium", status: "todo",        tags: ["Content"],  dueDate: "2026-06-28", createdAt: "2026-05-28", files: [],  comments: [] },
    { id: "T-004", title: "Schedule posts",         description: "Buffer calendar for all campaign content.",      priority: "low",    status: "todo",        tags: ["Ops"],      dueDate: "2026-07-01", createdAt: "2026-06-01", files: [],  comments: [] },
  ];
  return [
    { id: "T-001", title: "Draft client contract",  description: "Service agreement based on latest client brief.", priority: "high",   status: "done",        tags: ["Legal"],   dueDate: "2026-05-20", createdAt: "2026-04-15", files: [{ id: "f3", name: "contract_draft.docx", size: "128 KB", uploadedAt: "2026-04-16" }], comments: base },
    { id: "T-002", title: "Send for signing",       description: "Share via DocuSign and follow up in 3 days.",    priority: "high",   status: "in_progress", tags: ["Legal"],   dueDate: "2026-06-20", createdAt: "2026-06-01", files: [],  comments: [base[0]] },
    { id: "T-003", title: "Archive signed copies",  description: "Store in Google Drive legal folder.",             priority: "low",    status: "todo",        tags: ["Ops"],     dueDate: "2026-06-30", createdAt: "2026-06-10", files: [],  comments: [] },
  ];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function isOverdue(iso: string) {
  return new Date(iso) < new Date(new Date().toDateString());
}

// ── Priority Badge ────────────────────────────────────────────────────────────

function PriorityBadge({ priority }: { priority: KanbanTicket["priority"] }) {
  const cfg = PRIORITY_CFG[priority];
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", cfg.className)}>
      {cfg.label}
    </span>
  );
}

// ── Create Ticket Modal ───────────────────────────────────────────────────────

const BLANK_TICKET: Omit<KanbanTicket, "id" | "files" | "comments" | "createdAt"> = {
  title: "", description: "", priority: "medium",
  status: "todo", tags: [], dueDate: "",
};

function CreateTicketModal({
  onAdd, onClose,
}: { onAdd: (t: KanbanTicket) => void; onClose: () => void }) {
  const [draft,    setDraft]    = useState(BLANK_TICKET);
  const [tagsRaw,  setTagsRaw]  = useState("");

  const inputCls  = "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30";
  const labelCls  = "mb-1 block text-[12px] font-semibold text-foreground/60";
  const selectCls = "w-full appearance-none rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] text-foreground focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30";

  function handleCreate() {
    if (!draft.title.trim()) return;
    const tags = tagsRaw.split(",").map((t) => t.trim()).filter(Boolean);
    onAdd({
      ...draft,
      id: `T-${String(Math.floor(Math.random() * 900) + 100)}`,
      tags,
      createdAt: new Date().toISOString().slice(0, 10),
      files: [],
      comments: [],
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="text-[16px] font-bold text-foreground">Create New Ticket</h2>
            <p className="mt-0.5 text-[12px] text-foreground/45">
              New tickets are automatically placed in <span className="font-semibold text-foreground/60">To Do</span>
            </p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-foreground/60 hover:bg-foreground/8">
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-5">
          <div>
            <label className={labelCls}>Title <span className="text-red-500">*</span></label>
            <input
              value={draft.title}
              onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))}
              placeholder="e.g. Service Agreement — Partner X"
              autoFocus
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Description</label>
            <textarea
              value={draft.description}
              onChange={(e) => setDraft((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              placeholder="Describe what this ticket covers…"
              className={cn(inputCls, "resize-none")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Priority</label>
              <div className="relative">
                <select
                  value={draft.priority}
                  onChange={(e) => setDraft((p) => ({ ...p, priority: e.target.value as KanbanTicket["priority"] }))}
                  className={selectCls}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-foreground/60" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Due Date</label>
              <input
                type="date"
                value={draft.dueDate}
                onChange={(e) => setDraft((p) => ({ ...p, dueDate: e.target.value }))}
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>Tags <span className="font-normal text-foreground/55">(comma separated)</span></label>
            <input
              value={tagsRaw}
              onChange={(e) => setTagsRaw(e.target.value)}
              placeholder="legal, contract, Q2"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Documents</label>
            <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-foreground/2 py-6">
              <Upload className="size-5 text-foreground/55" />
              <p className="text-[12px] font-medium text-foreground/45">Click to upload or drag &amp; drop</p>
              <p className="text-[11px] text-foreground/55">PDF, DOCX, XLSX, PNG, JPG — select multiple</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-border px-6 py-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-border py-2.5 text-[13px] font-medium text-foreground/60 hover:bg-foreground/5"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!draft.title.trim()}
            className="flex-1 rounded-xl bg-[#F62C7D] py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Create Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Ticket Detail Modal ───────────────────────────────────────────────────────

function TicketDetailModal({
  ticket, onMove, onClose,
}: { ticket: KanbanTicket; onMove: (id: string, status: KanbanStatus) => void; onClose: () => void }) {
  const [t,           setT]           = useState(ticket);
  const [commentText, setCommentText] = useState("");

  function moveTo(status: KanbanStatus) {
    setT((prev) => ({ ...prev, status }));
    onMove(ticket.id, status);
  }

  function postComment() {
    if (!commentText.trim()) return;
    const c: KanbanComment = {
      id: `c${Date.now()}`,
      author: "You",
      initials: "YO",
      text: commentText.trim(),
      date: new Date().toISOString().slice(0, 10),
    };
    setT((prev) => ({ ...prev, comments: [...prev.comments, c] }));
    setCommentText("");
  }

  function deleteFile(fid: string) {
    setT((prev) => ({ ...prev, files: prev.files.filter((f) => f.id !== fid) }));
  }

  const currentCol = COLUMNS.find((c) => c.status === t.status)!;
  const due = t.dueDate;
  const overdue = due && isOverdue(due) && t.status !== "done";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl" style={{ maxHeight: "90vh" }}>

        {/* Header */}
        <div className="flex shrink-0 items-center gap-2 border-b border-border px-5 py-4">
          <span className="font-mono text-[11px] text-foreground/55">{t.id}</span>
          <PriorityBadge priority={t.priority} />
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{ backgroundColor: `${currentCol.color}18`, color: currentCol.color }}
          >
            {currentCol.label}
          </span>
          <button onClick={onClose} className="ml-auto rounded-lg p-1.5 text-foreground/60 hover:bg-foreground/8">
            <X className="size-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">

          {/* Title */}
          <h2 className="text-[20px] font-bold text-foreground leading-tight">{t.title}</h2>

          {/* Move to status */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-foreground/55">Move to status</p>
            <div className="flex flex-wrap gap-2">
              {COLUMNS.map((col) => (
                <button
                  key={col.status}
                  onClick={() => moveTo(col.status)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors",
                    t.status === col.status
                      ? "border-transparent font-semibold"
                      : "border-border text-foreground/55 hover:border-foreground/20",
                  )}
                  style={t.status === col.status ? { backgroundColor: `${col.color}18`, color: col.color } : {}}
                >
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: col.color }} />
                  {col.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-foreground/2 px-4 py-3">
            <div>
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground/55">Created</p>
              <p className="text-[13px] text-foreground/70">{fmtDate(t.createdAt)}</p>
            </div>
            {due && (
              <div>
                <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground/55">Due Date</p>
                <div className="flex items-center gap-1.5">
                  <p className={cn("text-[13px] font-medium", overdue ? "text-red-500" : "text-foreground/70")}>{fmtDate(due)}</p>
                  {overdue && <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">Overdue</span>}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {t.description && (
            <div>
              <p className="mb-1.5 text-[13px] font-semibold text-foreground">Description</p>
              <p className="text-[13px] text-foreground/60 leading-relaxed">{t.description}</p>
            </div>
          )}

          {/* Tags */}
          {t.tags.length > 0 && (
            <div>
              <div className="mb-2 flex items-center gap-1.5">
                <Tag className="size-3.5 text-foreground/55" />
                <p className="text-[13px] font-semibold text-foreground">Tags</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {t.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#0ea5e9]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#0ea5e9]">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Paperclip className="size-3.5 text-foreground/55" />
                <p className="text-[13px] font-semibold text-foreground">Documents</p>
                <span className="rounded-full bg-foreground/8 px-1.5 py-0.5 text-[10px] text-foreground/60">{t.files.length}</span>
              </div>
              <button className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-[11px] font-medium text-foreground/55 hover:bg-foreground/5">
                <Upload className="size-3" /> Add Files
              </button>
            </div>

            <div className="mb-3 flex flex-col items-center gap-1.5 rounded-xl border border-dashed border-border bg-foreground/2 py-5">
              <p className="text-[12px] text-foreground/60">
                Drop files here or <span className="font-medium text-[#F62C7D] cursor-pointer hover:underline">click to browse</span>
                <span className="text-foreground/55"> — select as many as you need</span>
              </p>
            </div>

            {t.files.length > 0 && (
              <div className="space-y-2">
                {t.files.map((f) => (
                  <div key={f.id} className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#F62C7D]/8">
                      <FileText className="size-4 text-[#F62C7D]/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-[12px] font-medium text-foreground">{f.name}</p>
                      <p className="text-[10px] text-foreground/55">{f.size} · Uploaded {f.uploadedAt}</p>
                    </div>
                    <div className="flex shrink-0 gap-1.5">
                      <button className="rounded-lg border border-border px-2.5 py-1 text-[11px] font-medium text-foreground/55 hover:bg-foreground/5">View</button>
                      <button onClick={() => deleteFile(f.id)} className="rounded-lg border border-red-200 px-2.5 py-1 text-[11px] font-medium text-red-500 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20">
                        <X className="size-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity */}
          <div>
            <div className="mb-3 flex items-center gap-1.5">
              <MessageSquare className="size-3.5 text-foreground/55" />
              <p className="text-[13px] font-semibold text-foreground">Activity</p>
              <span className="rounded-full bg-foreground/8 px-1.5 py-0.5 text-[10px] text-foreground/60">{t.comments.length}</span>
            </div>

            {t.comments.length > 0 && (
              <div className="mb-3 space-y-3">
                {t.comments.map((c) => (
                  <div key={c.id} className="flex items-start gap-2.5">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#7c3aed]/15">
                      <span className="text-[10px] font-bold text-[#7c3aed]">{c.initials}</span>
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-foreground">{c.author} <span className="font-normal text-foreground/55">{c.date}</span></p>
                      <p className="text-[12px] text-foreground/65">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), postComment())}
                placeholder="Add a comment…"
                className="h-[38px] flex-1 rounded-xl border border-border bg-background px-3 text-[13px] text-foreground placeholder:text-foreground/55 focus:outline-none focus:ring-2 focus:ring-[#F62C7D]/30"
              />
              <button
                onClick={postComment}
                disabled={!commentText.trim()}
                className="flex h-[38px] items-center gap-1.5 rounded-xl bg-[#F62C7D] px-3 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <Send className="size-3.5" />
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Ticket Card ───────────────────────────────────────────────────────────────

function TicketCard({
  ticket, onClick, onDragStart, onDragEnd, isDragging,
}: {
  ticket: KanbanTicket;
  onClick: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}) {
  const due = ticket.dueDate;
  const overdue = due && isOverdue(due) && ticket.status !== "done";

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={cn(
        "group cursor-grab rounded-xl border border-border bg-card p-3.5 shadow-sm transition-all active:cursor-grabbing hover:shadow-md hover:border-foreground/15",
        isDragging && "opacity-40 scale-95",
      )}
    >
      {/* Top row: ID + priority */}
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] text-foreground/55">{ticket.id}</span>
        <PriorityBadge priority={ticket.priority} />
      </div>

      {/* Title */}
      <p className="mb-1 text-[13px] font-semibold text-foreground leading-snug select-none">{ticket.title}</p>

      {/* Description */}
      {ticket.description && (
        <p className="mb-2.5 text-[11px] text-foreground/50 line-clamp-2 select-none">{ticket.description}</p>
      )}

      {/* Tags */}
      {ticket.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {ticket.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#0ea5e9]/10 px-2 py-0.5 text-[10px] font-medium text-[#0ea5e9]">{tag}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-3 border-t border-border pt-2.5">
        {ticket.files.length > 0 && (
          <span className="flex items-center gap-1 text-[10px] text-foreground/55">
            <Paperclip className="size-3" /> {ticket.files.length}
          </span>
        )}
        {ticket.comments.length > 0 && (
          <span className="flex items-center gap-1 text-[10px] text-foreground/55">
            <MessageSquare className="size-3" /> {ticket.comments.length}
          </span>
        )}
        <div className="ml-auto flex items-center gap-2.5">
          <span className="text-[10px] text-foreground/55">{ticket.createdAt}</span>
          {due && (
            <span className={cn("flex items-center gap-0.5 text-[10px] font-medium", overdue ? "text-red-500" : "text-foreground/55")}>
              <Calendar className="size-3" /> {due}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Kanban Board ──────────────────────────────────────────────────────────────

function KanbanBoard({ workspace, onBack }: { workspace: Workspace; onBack: () => void }) {
  const [tickets,      setTickets]      = useState<KanbanTicket[]>(() => makeTickets(workspace.id));
  const [createModal,  setCreateModal]  = useState(false);
  const [detailTicket, setDetailTicket] = useState<KanbanTicket | null>(null);
  const [draggingId,   setDraggingId]   = useState<string | null>(null);
  const [dragOverCol,  setDragOverCol]  = useState<KanbanStatus | null>(null);

  function addTicket(t: KanbanTicket) { setTickets((prev) => [...prev, t]); }

  function moveTicket(id: string, status: KanbanStatus) {
    setTickets((prev) => prev.map((t) => t.id === id ? { ...t, status } : t));
    setDetailTicket((prev) => prev?.id === id ? { ...prev, status } : prev);
  }

  function onDragStart(e: React.DragEvent, id: string) {
    setDraggingId(id);
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  }
  function onDragEnd() { setDraggingId(null); setDragOverCol(null); }

  function onColDragOver(e: React.DragEvent, status: KanbanStatus) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverCol(status);
  }
  function onColDragLeave(e: React.DragEvent) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOverCol(null);
  }
  function onColDrop(e: React.DragEvent, status: KanbanStatus) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) moveTicket(id, status);
    setDraggingId(null);
    setDragOverCol(null);
  }

  // Status count breakdown for header
  const statusCounts = COLUMNS.map((col) => ({
    ...col, count: tickets.filter((t) => t.status === col.status).length,
  }));

  return (
    <>
      {createModal  && <CreateTicketModal onAdd={addTicket} onClose={() => setCreateModal(false)} />}
      {detailTicket && (
        <TicketDetailModal
          ticket={detailTicket}
          onMove={moveTicket}
          onClose={() => setDetailTicket(null)}
        />
      )}

      <div className="flex h-[calc(100vh-4rem)] flex-col xl:h-screen">
        {/* Top bar */}
        <div className="shrink-0 border-b border-border bg-card/50 px-5 py-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="rounded-lg p-1.5 text-foreground/60 hover:bg-foreground/8">
              <ArrowLeft className="size-4" />
            </button>
            <h1 className="text-[17px] font-bold text-foreground">{workspace.name}</h1>
            <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold", workspace.categoryColor)}>
              {workspace.category}
            </span>

            {/* Status breakdown */}
            <div className="hidden items-center gap-3 sm:flex">
              <span className="text-foreground/50">·</span>
              <span className="text-[12px] text-foreground/60">{tickets.length} tickets</span>
              {statusCounts.map(({ status, color, count }) => (
                <span key={status} className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-[12px] text-foreground/50">{count}</span>
                </span>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button className="hidden items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-[12px] font-medium text-foreground/60 hover:bg-foreground/5 sm:flex">
                <Users className="size-3.5" /> Collaborators
              </button>
              <button
                onClick={() => setCreateModal(true)}
                className="flex items-center gap-1.5 rounded-xl bg-[#F62C7D] px-3 py-2 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Plus className="size-3.5" /> New Ticket
              </button>
            </div>
          </div>
        </div>

        {/* Columns */}
        <div className="flex flex-1 gap-0 overflow-x-auto overflow-y-hidden">
          {COLUMNS.map((col) => {
            const colTickets   = tickets.filter((t) => t.status === col.status);
            const isDropTarget = dragOverCol === col.status;

            return (
              <div
                key={col.status}
                className={cn(
                  "flex min-w-[260px] flex-1 flex-col border-r border-border last:border-r-0 transition-colors",
                  isDropTarget && "bg-[#F62C7D]/2",
                )}
                onDragOver={(e) => onColDragOver(e, col.status)}
                onDragLeave={onColDragLeave}
                onDrop={(e) => onColDrop(e, col.status)}
              >
                {/* Column header */}
                <div className="flex shrink-0 items-center gap-2 border-b border-border bg-card/30 px-4 py-3">
                  <span className="size-2 rounded-full" style={{ backgroundColor: col.color }} />
                  <p className="text-[13px] font-semibold text-foreground">{col.label}</p>
                  <span
                    className="ml-auto flex size-5 items-center justify-center rounded-full text-[11px] font-bold text-white"
                    style={{ backgroundColor: col.color }}
                  >
                    {colTickets.length}
                  </span>
                </div>

                {/* Ticket list */}
                <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-3">
                  {colTickets.map((ticket) => (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      onClick={() => setDetailTicket(ticket)}
                      onDragStart={(e) => onDragStart(e, ticket.id)}
                      onDragEnd={onDragEnd}
                      isDragging={draggingId === ticket.id}
                    />
                  ))}

                  {/* Empty drop hint */}
                  {colTickets.length === 0 && (
                    <div className={cn(
                      "flex flex-1 items-center justify-center rounded-xl border border-dashed py-10 text-[12px] transition-colors",
                      isDropTarget
                        ? "border-[#F62C7D]/40 text-[#F62C7D]/60"
                        : "border-border text-foreground/45",
                    )}>
                      {isDropTarget ? "Drop here" : "No tickets"}
                    </div>
                  )}
                </div>

                {/* Add ticket */}
                <div className="shrink-0 border-t border-border p-3">
                  <button
                    onClick={() => setCreateModal(true)}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-medium text-foreground/55 transition-colors hover:bg-foreground/5 hover:text-foreground/60"
                  >
                    <Plus className="size-3.5" /> Add ticket
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ── Workspace Card ────────────────────────────────────────────────────────────

function WorkspaceCard({ ws, onOpen }: { ws: Workspace; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="flex flex-col items-start rounded-2xl border border-border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-3 flex w-full items-start justify-between gap-2">
        <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", ws.categoryColor)}>
          {ws.category}
        </span>
        <MoreHorizontal className="size-4 text-foreground/55" />
      </div>
      <div className={cn("mb-2 size-3 rounded-full", ws.dotColor)} />
      <h3 className="text-[15px] font-bold text-foreground">{ws.name}</h3>
      <p className="mt-1 text-[12px] text-foreground/50 line-clamp-2">{ws.description}</p>

      <div className="mt-4 flex w-full items-center gap-4 border-t border-border pt-3">
        <div className="flex items-center gap-1.5 text-[12px] text-foreground/50">
          <Ticket className="size-3.5" />
          <span>{ws.ticketCount} tickets</span>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-foreground/50">
          <Users className="size-3.5" />
          <span>{ws.collaboratorCount}</span>
        </div>
        <div className="ml-auto text-[11px] text-foreground/55">
          {new Date(ws.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </div>
      </div>
    </button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function BusinessWorkspace() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const navigate        = useNavigate();
  const [workspaces]    = useState<Workspace[]>(WORKSPACES);

  const activeWs = workspaceId ? (workspaces.find((w) => w.id === workspaceId) ?? null) : null;

  if (activeWs) {
    return <KanbanBoard workspace={activeWs} onBack={() => navigate("/business/workspace")} />;
  }

  return (
    <div className="pb-16">
      <div className="border-b border-border bg-card/50 px-6 py-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-[22px] font-bold text-foreground">Workspace</h1>
            <p className="text-[13px] text-foreground/50">Document workspaces with Kanban boards and collaborators</p>
          </div>
          <button className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#F62C7D] px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90">
            <Plus className="size-4" />
            New Workspace
          </button>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6">
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: "Workspaces",    value: workspaces.length,                                       color: "#7c3aed", icon: Kanban },
            { label: "Total Tickets", value: workspaces.reduce((a, w) => a + w.ticketCount, 0),       color: "#0ea5e9", icon: Ticket },
            { label: "Collaborators", value: workspaces.reduce((a, w) => a + w.collaboratorCount, 0), color: "#16a34a", icon: Users  },
          ].map(({ label, value, color, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-4">
              <Icon className="mb-1.5 size-4" style={{ color }} />
              <p className="text-[22px] font-bold text-foreground">{value}</p>
              <p className="text-[11px] text-foreground/45">{label}</p>
            </div>
          ))}
        </div>

        {workspaces.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Kanban className="mb-3 size-10 text-foreground/45" />
            <p className="text-[14px] font-medium text-foreground/60">No workspaces yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workspaces.map((ws) => (
              <WorkspaceCard key={ws.id} ws={ws} onOpen={() => navigate(`/business/workspace/${ws.id}`)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
