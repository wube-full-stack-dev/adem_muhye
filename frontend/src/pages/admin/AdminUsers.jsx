import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Badge,
  Alert,
  Form,
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

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers(token);
      if (response.success) {
        setUsers(response.data);
      } else {
        setMessage({ text: "Failed to load users", type: "danger" });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
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
          text: `✅ User role updated to ${getRoleDisplayName(newRole)} successfully`,
          type: "success",
        });
        // Refresh the user list
        fetchUsers();
      } else {
        setMessage({
          text: response.message || "❌ Failed to update role",
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Error updating role:", error);
      setMessage({ text: "❌ Server error", type: "danger" });
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading users...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <i className="bi bi-people-fill me-2"></i>
          </h4>
          <Badge bg="light" text="dark" className="px-3 py-2">
            Total Users: {users.length}
          </Badge>
        </Card.Header>

        <Card.Body>
          {message.text && (
            <Alert
              variant={message.type}
              dismissible
              onClose={() => setMessage({ text: "", type: "" })}
              className="mb-4"
            >
              {message.text}
            </Alert>
          )}

          <Table striped bordered hover responsive className="align-middle">
            <thead className="bg-light">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Full Name</th>
                <th>Current Role</th>
                <th>Change Role</th>
                <th>Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.user_id}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{user.username}</strong>
                    {user.user_id === currentUser?.user_id && (
                      <Badge bg="info" className="ms-2">
                        You
                      </Badge>
                    )}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.full_name || "-"}</td>
                  <td>
                    <Badge
                      bg={getRoleBadgeColor(user.role)}
                      className="px-3 py-2"
                    >
                      {getRoleDisplayName(user.role)}
                    </Badge>
                  </td>
                  <td>
                    {user.user_id !== currentUser?.user_id ? (
                      <Form.Select
                        size="sm"
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.user_id, e.target.value)
                        }
                        disabled={updating === user.user_id}
                        style={{ width: "130px" }}
                      >
                        <option value={ROLES.STAFF}>👤 Staff</option>
                        <option value={ROLES.MANAGER}>⭐ Manager</option>
                        <option value={ROLES.ADMIN}>👑 Admin</option>
                      </Form.Select>
                    ) : (
                      <span className="text-muted fst-italic">
                        Cannot change own role
                      </span>
                    )}
                  </td>
                  <td>{formatDate(user.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Role Legend */}
          <Card className="mt-4 bg-light">
            <Card.Body>
              <h6 className="mb-3">Role Permissions:</h6>
              <div className="d-flex gap-4 flex-wrap">
                <div>
                  <Badge bg="danger" className="me-2">
                    👑 Admin
                  </Badge>
                  <small className="text-muted">
                    Full access - can do everything
                  </small>
                </div>
                <div>
                  <Badge bg="warning" className="me-2">
                    ⭐ Manager
                  </Badge>
                  <small className="text-muted">
                    Can view users, manage sales
                  </small>
                </div>
                <div>
                  <Badge bg="info" className="me-2">
                    👤 Staff
                  </Badge>
                  <small className="text-muted">
                    Basic - add/view sales only
                  </small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminUsers;
