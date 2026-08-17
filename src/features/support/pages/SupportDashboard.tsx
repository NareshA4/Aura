import React from "react";
import { Link } from "wouter";
import { LifeBuoy, Clock, ShieldAlert, CheckCircle2, ListChecks, ArrowRight, UserCheck, AlertCircle } from "lucide-react";
import Card from "../../../components/ui/card";
import Button from "../../../components/ui/button";
import { ErrorState, LoadingState, EmptyState } from "../../portal/components/StateViews";
import { TicketCategoryBadge, TicketPriorityBadge, TicketStatusBadge } from "../../portal/components/TicketMeta";
import { formatDateTime } from "../../portal/utils/format";
import { buildTicketStats } from "../../portal/types/portal.types";
import useExecutiveTickets from "../hooks/useExecutiveTickets";

export const SupportDashboard: React.FC = () => {
  const tickets = useExecutiveTickets();
  const stats = tickets.data ? buildTicketStats(tickets.data) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p className="eyebrow" style={{ color: "#63f5e8", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <LifeBuoy size={14} /> SUPPORT EXECUTIVE DESK
          </p>
          <h1 style={{ fontSize: "2rem", margin: "0.25rem 0 0 0", fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Support Operations Dashboard
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: "0.25rem 0 0 0" }}>
            Real-time control center for client inquiries, ticket assignments, and issue resolutions.
          </p>
        </div>
        <Link href="/support/tickets">
          <Button glow size="sm">
            <ListChecks size={14} />
            View All Tickets
          </Button>
        </Link>
      </div>

      {tickets.isLoading ? (
        <LoadingState rows={4} label="Loading support operations metrics" />
      ) : tickets.isError ? (
        <ErrorState error={tickets.error} onRetry={tickets.refetch} title="Unable to load support tickets queue" />
      ) : stats ? (
        <>
          {/* KPI Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
            <Card glowOnHover>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.75rem", fontFamily: "IBM Plex Mono, monospace", color: "#94a3b8" }}>TOTAL ASSIGNED</span>
                <LifeBuoy size={18} style={{ color: "#63f5e8" }} />
              </div>
              <p style={{ fontSize: "2rem", fontWeight: 600, color: "#63f5e8", margin: "0.5rem 0 0 0" }}>{stats.total}</p>
              <span style={{ color: "#64748b", fontSize: "0.8rem" }}>Assigned support tickets</span>
            </Card>

            <Card glowOnHover>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.75rem", fontFamily: "IBM Plex Mono, monospace", color: "#94a3b8" }}>OPEN & ASSIGNED</span>
                <Clock size={18} style={{ color: "#fbbf24" }} />
              </div>
              <p style={{ fontSize: "2rem", fontWeight: 600, color: "#fbbf24", margin: "0.5rem 0 0 0" }}>{stats.open + stats.assigned}</p>
              <span style={{ color: "#64748b", fontSize: "0.8rem" }}>Awaiting executive action</span>
            </Card>

            <Card glowOnHover>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.75rem", fontFamily: "IBM Plex Mono, monospace", color: "#94a3b8" }}>IN PROGRESS</span>
                <UserCheck size={18} style={{ color: "#60a5fa" }} />
              </div>
              <p style={{ fontSize: "2rem", fontWeight: 600, color: "#60a5fa", margin: "0.5rem 0 0 0" }}>{stats.inProgress}</p>
              <span style={{ color: "#64748b", fontSize: "0.8rem" }}>Currently being resolved</span>
            </Card>

            <Card glowOnHover>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.75rem", fontFamily: "IBM Plex Mono, monospace", color: "#94a3b8" }}>AWAITING CLIENT</span>
                <AlertCircle size={18} style={{ color: "#c4b5fd" }} />
              </div>
              <p style={{ fontSize: "2rem", fontWeight: 600, color: "#c4b5fd", margin: "0.5rem 0 0 0" }}>{stats.awaitingClient}</p>
              <span style={{ color: "#64748b", fontSize: "0.8rem" }}>Client feedback pending</span>
            </Card>

            <Card glowOnHover>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.75rem", fontFamily: "IBM Plex Mono, monospace", color: "#94a3b8" }}>RESOLVED & CLOSED</span>
                <CheckCircle2 size={18} style={{ color: "#4ade80" }} />
              </div>
              <p style={{ fontSize: "2rem", fontWeight: 600, color: "#4ade80", margin: "0.5rem 0 0 0" }}>{stats.resolved + stats.closed}</p>
              <span style={{ color: "#64748b", fontSize: "0.8rem" }}>Resolved & closed tickets</span>
            </Card>

            <Card glowOnHover>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.75rem", fontFamily: "IBM Plex Mono, monospace", color: "#ef4444" }}>CRITICAL PRIORITY</span>
                <ShieldAlert size={18} style={{ color: "#ef4444" }} />
              </div>
              <p style={{ fontSize: "2rem", fontWeight: 600, color: "#ef4444", margin: "0.5rem 0 0 0" }}>{stats.critical}</p>
              <span style={{ color: "#64748b", fontSize: "0.8rem" }}>Urgent intervention required</span>
            </Card>
          </div>

          {/* Active Ticket Ledger Queue */}
          <Card glowOnHover>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h3 style={{ margin: 0, color: "#63f5e8", fontSize: "1.1rem" }}>Recent Assigned Tickets</h3>
                <p style={{ margin: "0.25rem 0 0 0", color: "#94a3b8", fontSize: "0.825rem" }}>
                  Tickets assigned to your executive account needing immediate processing or status updates.
                </p>
              </div>
              <Link href="/support/tickets">
                <Button variant="outline" size="sm">
                  View full queue <ArrowRight size={14} />
                </Button>
              </Link>
            </div>

            {tickets.data && tickets.data.length === 0 ? (
              <EmptyState
                title="No assigned tickets"
                description="You currently have no support tickets assigned to your account."
              />
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "750px", fontSize: "0.875rem" }}>
                  <thead>
                    <tr style={{ textAlign: "left", color: "#64748b", fontFamily: "IBM Plex Mono, monospace", fontSize: "0.7rem", letterSpacing: "0.08em" }}>
                      <th style={{ padding: "0.75rem", borderBottom: "1px solid rgba(140,174,187,0.2)" }}>TICKET ID</th>
                      <th style={{ padding: "0.75rem", borderBottom: "1px solid rgba(140,174,187,0.2)" }}>SUBJECT</th>
                      <th style={{ padding: "0.75rem", borderBottom: "1px solid rgba(140,174,187,0.2)" }}>CLIENT</th>
                      <th style={{ padding: "0.75rem", borderBottom: "1px solid rgba(140,174,187,0.2)" }}>CATEGORY</th>
                      <th style={{ padding: "0.75rem", borderBottom: "1px solid rgba(140,174,187,0.2)" }}>PRIORITY</th>
                      <th style={{ padding: "0.75rem", borderBottom: "1px solid rgba(140,174,187,0.2)" }}>STATUS</th>
                      <th style={{ padding: "0.75rem", borderBottom: "1px solid rgba(140,174,187,0.2)" }}>UPDATED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(tickets.data || []).slice(0, 8).map((ticket) => (
                      <tr key={ticket.id} style={{ borderBottom: "1px solid rgba(140,174,187,0.12)" }}>
                        <td style={{ padding: "0.75rem", fontFamily: "IBM Plex Mono, monospace", fontSize: "0.75rem", color: "#63f5e8" }}>
                          <Link href={`/support/tickets/${ticket.id}`} style={{ color: "#63f5e8" }}>
                            {ticket.ticket_id}
                          </Link>
                        </td>
                        <td style={{ padding: "0.75rem", maxWidth: "280px" }}>
                          <Link href={`/support/tickets/${ticket.id}`} style={{ color: "#e2e8f0", textDecoration: "none" }}>
                            <span style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500 }}>
                              {ticket.subject}
                            </span>
                          </Link>
                        </td>
                        <td style={{ padding: "0.75rem", color: "#cbd5e1" }}>{ticket.client_username}</td>
                        <td style={{ padding: "0.75rem" }}>
                          <TicketCategoryBadge category={ticket.category} />
                        </td>
                        <td style={{ padding: "0.75rem" }}>
                          <TicketPriorityBadge priority={ticket.priority} />
                        </td>
                        <td style={{ padding: "0.75rem" }}>
                          <TicketStatusBadge status={ticket.status} />
                        </td>
                        <td style={{ padding: "0.75rem", color: "#94a3b8", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                          {formatDateTime(ticket.updated_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      ) : null}
    </div>
  );
};

export default SupportDashboard;
