import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Table,
  Badge,
  Alert,
  Form,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { getUsers, updateUserRole } from "../../services/admin.service";
import {
  getRoleDisplayName,
  getRoleBadgeColor,
  ROLES,
} from "../../utils/roleUtils";

const AdminUsers = () => {
  const { user: currentUser, token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [updating, setUpdating] = useState(null);
  const [hoveredRole, setHoveredRole] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers(token);
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      setMessage({ text: "Server error", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdating(userId);
      const response = await updateUserRole(userId, newRole, token);

      if (response.success) {
        setMessage({
          text: `✅ ${getRoleDisplayName(newRole)} role assigned successfully!`,
          type: "success",
        });
        fetchUsers();
        // Clear message after 3 seconds
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      }
    } catch (error) {
      setMessage({ text: "❌ Server error", type: "danger" });
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Role change preview colors
  const getRolePreviewColor = (role) => {
    const colors = {
      [ROLES.STAFF]: "text-info border-info",
      [ROLES.MANAGER]: "text-warning border-warning",
      [ROLES.ADMIN]: "text-danger border-danger",
    };
    return colors[role] || "";
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading users...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="py-3 px-2 px-md-4">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white d-flex justify-content-between align-items-center flex-wrap rounded-top">
          <h5 className="mb-0">
            <i className="bi bi-people-fill me-2"></i> User Management
          </h5>
          <Badge bg="light" text="dark" className="px-3 py-2">
            <i className="bi bi-person-badge me-1"></i> {users.length} Users
          </Badge>
        </Card.Header>

        <Card.Body>
          {message.text && (
            <Alert
              variant={message.type}
              dismissible
              onClose={() => setMessage({ text: "", type: "" })}
              className="animate-slide-down"
            >
              <i
                className={`bi bi-${message.type === "success" ? "check-circle" : "exclamation-triangle"} me-2`}
              ></i>
              {message.text}
            </Alert>
          )}

          {/* ================= DESKTOP TABLE ================= */}
          <div className="d-none d-md-block">
            <Table
              striped
              bordered
              hover
              responsive
              className="align-middle mb-0"
            >
              <thead className="bg-light">
                <tr>
                  <th className="py-3">#</th>
                  <th className="py-3">Username</th>
                  <th className="py-3">Email</th>
                  <th className="py-3">Full Name</th>
                  <th className="py-3">Current Role</th>
                  <th className="py-3">Change Role</th>
                  <th className="py-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.user_id} className="align-middle">
                    <td className="fw-bold">{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div
                          className="avatar-sm bg-primary text-white rounded-circle me-2 d-flex align-items-center justify-content-center"
                          style={{ width: "32px", height: "32px" }}
                        >
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        {user.username}
                        {user.user_id === currentUser?.user_id && (
                          <Badge bg="info" className="ms-2">
                            You
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="text-muted">{user.email}</td>
                    <td>{user.full_name || "-"}</td>
                    <td>
                      <Badge
                        bg={getRoleBadgeColor(user.role)}
                        className="px-3 py-2 fs-6"
                        style={{ cursor: "pointer" }}
                        onMouseEnter={() => setHoveredRole(user.user_id)}
                        onMouseLeave={() => setHoveredRole(null)}
                      >
                        <i
                          className={`bi bi-${
                            user.role === ROLES.ADMIN
                              ? "shield"
                              : user.role === ROLES.MANAGER
                                ? "star"
                                : "person"
                          } me-1`}
                        ></i>
                        {getRoleDisplayName(user.role)}
                      </Badge>
                    </td>
                    <td style={{ minWidth: "140px" }}>
                      {user.user_id !== currentUser?.user_id ? (
                        <div className="position-relative">
                          <Form.Select
                            size="sm"
                            value={user.role}
                            onChange={(e) =>
                              handleRoleChange(user.user_id, e.target.value)
                            }
                            disabled={updating === user.user_id}
                            className={`role-select transition-all ${
                              updating === user.user_id ? "opacity-50" : ""
                            }`}
                            style={{
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = "scale(1.02)";
                              e.target.style.boxShadow =
                                "0 0 0 3px rgba(13, 110, 253, 0.25)";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = "scale(1)";
                              e.target.style.boxShadow = "none";
                            }}
                          >
                            <option
                              value={ROLES.STAFF}
                              className="text-info"
                              style={{
                                backgroundColor:
                                  user.role === ROLES.STAFF ? "#e3f2fd" : "",
                                fontWeight:
                                  user.role === ROLES.STAFF ? "bold" : "normal",
                              }}
                            >
                              👤 Staff
                            </option>
                            <option
                              value={ROLES.MANAGER}
                              className="text-warning"
                              style={{
                                backgroundColor:
                                  user.role === ROLES.MANAGER ? "#fff3cd" : "",
                                fontWeight:
                                  user.role === ROLES.MANAGER
                                    ? "bold"
                                    : "normal",
                              }}
                            >
                              ⭐ Manager
                            </option>
                            <option
                              value={ROLES.ADMIN}
                              className="text-danger"
                              style={{
                                backgroundColor:
                                  user.role === ROLES.ADMIN ? "#f8d7da" : "",
                                fontWeight:
                                  user.role === ROLES.ADMIN ? "bold" : "normal",
                              }}
                            >
                              👑 Admin
                            </option>
                          </Form.Select>
                          {updating === user.user_id && (
                            <div className="position-absolute top-50 start-50 translate-middle">
                              <Spinner animation="border" size="sm" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted fst-italic">
                          <i className="bi bi-lock me-1"></i> Cannot change own
                          role
                        </span>
                      )}
                    </td>
                    <td className="text-muted small">
                      {formatDate(user.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* ================= MOBILE CARD VIEW ================= */}
          <div className="d-md-none">
            {users.map((user) => (
              <Card key={user.user_id} className="mb-3 shadow-sm border-0">
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center">
                      <div
                        className="avatar-md bg-gradient-to-r from-primary to-info text-white rounded-circle me-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: "48px",
                          height: "48px",
                          fontSize: "20px",
                        }}
                      >
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">{user.username}</h6>
                        <small className="text-muted">{user.email}</small>
                      </div>
                    </div>
                    <Badge
                      bg={getRoleBadgeColor(user.role)}
                      className="px-3 py-2"
                    >
                      {getRoleDisplayName(user.role)}
                    </Badge>
                  </div>

                  <div className="mb-2">
                    <strong>Name:</strong> {user.full_name || "-"}
                  </div>

                  <div className="mb-3">
                    <strong>Joined:</strong> {formatDate(user.created_at)}
                  </div>

                  {user.user_id !== currentUser?.user_id && (
                    <div className="mt-3">
                      <label className="form-label fw-semibold mb-2 bg-red-700/80 text-white px-2 py-1 rounded">
                        Change Role:
                      </label>
                      <Form.Select
                      
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.user_id, e.target.value)
                        }
                        disabled={updating === user.user_id}
                        className="role-select"
                      >
                        <option className="bg-red-800" value={ROLES.STAFF}>👤 Staff</option>
                        <option className="bg-yellow-800" value={ROLES.MANAGER}>⭐ Manager</option>
                        <option className="bg-purple-800" value={ROLES.ADMIN}>👑 Admin</option>
                      </Form.Select>
                    </div>
                  )}
                </Card.Body>
              </Card>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminUsers;
